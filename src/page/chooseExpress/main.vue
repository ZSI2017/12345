<template>
<div class="section main" style="overflow:hidden" v-loading.body.fullscreen.lock="listLoading">
  <el-tabs v-model="activeName2" type="card" @tab-click="handleTabClick">
    <el-tab-pane label="配置" name="first">配置</el-tab-pane>
    <el-tab-pane label="已上线" name="second">已上线</el-tab-pane>
    <el-tab-pane label="待审核" name="third">待审核</el-tab-pane>
  </el-tabs>
  <!--  单选框   -->
  <el-row :span="24" type="flex" align="middle" v-if="showConfig" style="padding-left:5px;">
    <el-col :span="22">
      <el-radio-group v-model="radio2" @change="handleRadio">
        <el-radio :label="1">审核通过</el-radio>
        <el-radio :label="2">驳回</el-radio>
        <el-radio :label="3">待审核</el-radio>
        <el-radio :label="4">草稿</el-radio>
      </el-radio-group>
    </el-col>
    <el-col :span="2">
      <el-button type="primary" @click="setNewData" style="float:right;"><i class="el-icon-plus"></i> 添加</el-button>
    </el-col>
  </el-row>

  <!-- 表格  -->
  <el-table v-if="tableFalg"
    class="mainTable"
    @sort-change="handleSortChange"
    :data="tableData"
    @cell-mouse-enter="handleMouseEnter"
    style="width: 100%;margin-top:10px;"
    max-height="500"
    empty-text="暂无数据"
    align="center"
    :default-sort="{prop: 'date', order: 'descending'}">
    <el-table-column prop="name" label="运营图称">
    </el-table-column>
    <el-table-column prop="imageUrl" label="运营图">
       <template scope="scope">
            <img width="50px" :src="scope.row.imageUrl">
        </template>
    </el-table-column>
    <el-table-column label="链接">
      <template scope="scope">
        <el-popover :content="scope.row.linkUrl" ref="popover4" width="300" trigger="click">
        </el-popover>
        <el-button v-popover:popover4 style="font-size:12px;" size="small">查看链接</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="覆盖地区">
      <template scope="scope">
         <el-button @click="checkArea" type="text" size="small">查看</el-button>
       </template>
    </el-table-column>
    <el-table-column prop="gmtCreate" label="创建时间" width="160"  :sortable="showSortable">
      <template scope="scope">
          {{scope.row.gmtCreate | formatDate}}
      </template>
    </el-table-column>
    <el-table-column prop="gmtModified" label="修改时间" width="160">
      <template scope="scope">
          {{scope.row.gmtModified | formatDate}}
      </template>
    </el-table-column>
    <el-table-column prop="activeTime" label="有效时段" width="220">
      <template scope="scope">
          <p style="padding:0;margin:0;text-align:center">{{scope.row.gmtBegin | formatDate}}</p>
          <p style="padding:0;margin:0;text-align:center">至</p>
          <p style="padding:0;margin:0;text-align:center">{{scope.row.gmtEnd | formatDate}}</p>
       </template>
    </el-table-column>
    <el-table-column prop="sortWeight" width="70" align="center" label="排序值">
    </el-table-column>
    <el-table-column prop="status" width="100" label="状态" :sortable="showSortable">>
      <template scope="scope">
            {{ scope.row.status==0? "草稿":(scope.row.status==1?"已下架":"已上架")}}
        </template>
    </el-table-column>
    <el-table-column v-if="showConfig" prop="auditStatus" width="80" label="审核状态">
      <template scope="scope">
          {{scope.row.auditStatus==0? "已驳回":(scope.row.auditStatus==1?"已通过":(scope.row.auditStatus==2?"上架待审核":(scope.row.auditStatus==3?"下架待审核":(scope.row.auditStatus==4?"新增待审核":(scope.row.auditStatus==5?"修改待审核":"草稿")))))}}
      </template>
    </el-table-column>
    <el-table-column v-if="showOperation||showOperation2" label="操作" width="130">
      <template scope="scope">
        <div>
          <div v-if="showOperation">
            <el-button  @click="loadingTakeOffFlag = true" type="text" size="small">置为下架</el-button>
            <br/>
          </div>
          <div v-if="showOperation">
            <el-button  @click="handleEdit(scope.row)" type="text" size="small">修改</el-button>
            <br/>
          </div>
          <div v-if="showOperation2">
           <el-button @click="OperationApproved" type="text" size="small">通过申请</el-button>
           <br/>
          </div>
          <div v-if="showOperation2">
            <el-button @click="OperationApprovedFail" type="text" size="small">申请驳回</el-button>
            <br/>
          </div>
          <div v-if="showOperation2">
           <el-button @click="effectiveDetails(scope.row)" type="text" size="small">已生效详情</el-button>
           <br/>
          </div>
          <div v-if="showOperation2">
            <el-button @click="effectiveDetails(scope.row)" type="text" size="small">待审详情</el-button>
            <br/>
          </div>
        </div>

        </template>
    </el-table-column>
  </el-table>

  <div class="block pagination" style="margin-top:30px;float:right;">
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10,20,50]"
        :page-size="pageSize"
        layout="total,sizes,prev, pager, next,jumper"
        :total="totalCount">
    </el-pagination>
  </div>

  <!--  覆盖地区 查看对话框 -->
  <cover-area :visible="dialogTableVisible" :gridData="gridData" @listenToCoverArea="changeVisible"></cover-area>
  <!-- <el-dialog title="覆盖地区" :visible.sync="dialogTableVisible">
    <el-table :data="gridData" border :show-header="showHeader" max-height="400">
      <el-table-column property="value" label="省" width="200"></el-table-column>
      <el-table-column property="city" label="市">
        <template scope="scope">
       <el-tag
        style="margin-right:10px;margin-bottom:5px;"
         v-for="(item,index) in scope.row.city"
         >{{item}}</el-tag>
     </template>
      </el-table-column>
    </el-table>
  </el-dialog> -->

  <!-- 置为下架 对话框  -->
  <el-dialog title="提示" :visible.sync="loadingTakeOffFlag" size="tiny">
    <i class="el-icon-warning" style="color:#F7BA2A;padding-right:10px;font-size: 36px!important;position: absolute;top: 34%;"></i>
    <p style="font-weight:bold;padding-left:44px;">{{myDialogTitle}}</p>
    <span style="padding-left:44px;">{{myDiglogContent}}</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="loadingTakeOffFlag = false">取 消</el-button>
      <el-button type="primary" @click="loadingTakeOffFlag = false">确 定</el-button>
    </span>
  </el-dialog>

</div>
</template>

<script>
import store from 'src/vuex/store.js'
import localEvent from 'src/vuex/function.js';
import coverArea from "./coverArea.vue";
import {
  formatDate
} from 'src/util/date.js';

export default {
  components: {
    coverArea
  },
  data() {
    return {
      pageId: '', // 当前页的id
      url: '', // 当前页面的url
      // 排序是否显示
      showSortable: 'custom',
      totalCount: 0, //默认数据总数
      myDialogTitle: "确认置为下架？",
      myDiglogContent: "确认后，该内容将提交审核，通过后变为'已下架'",
      // 置为下架对话框
      showOperation: true,
      showOperation2: false,
      loadingTakeOffFlag: false,
      tableFalg: true,
      showConfig: true,
      gridData: [],
      radio2: 1,
      activeName2: 'first',
      showHeader: false,
      dialogTableVisible: false,
      value: '',
      listLoading: false,
      halfListLoading: false,
      value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      options2: [{
        label: '江苏',
        cities: []
      }, {
        label: '浙江',
        cities: []
      }],
      props: {
        value: 'label',
        children: 'cities'
      },
      orderColumn : "",//需要排序的字段，默认修改时间
      orderStatus : "",//需要排序的状态，默认降序
      pageSize: 5,
      currentPage: 1,
      tableData: [],
      formLabelWidth: '120px',
      selectedOptions: [],
      selectedOptions2: []
    }
  },
  computed() {
    return {
      // table2:function(){
      //     return this.tableData[0]
      // }
    }
  },
  created() {

    console.log("$router: " + this.$route.path);
    this.url = "/api/promotion/getConfList"; // 默认展开 配置
    this.pageId = "SD1010"; // 寄快递首页
    ((this.$route.path == "/chooseExpress" &&
        (this.pageId = "BM1010")) ||
      (this.$route.path == "/expressOrder" &&
        (this.pageId = "SS1010")))

    var _this = this;
    _this.$http.post(_this.url,{
      "pages": {
        "page_size": this.pageSize,
        "page_num": this.currentPage - 1
      },
      "con": {
        "pageId": this.pageId
      }
    }, (result) => {
      _this.tableData = result.page_list;
      _this.totalCount = parseInt(result.pages.cnt);
      // _this.totalCount = result.page_list.length; //获取数据长度
    });

    console.log(this.$route.matched);
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
    }
  },
  watch: {
    '$route': function(to, from) {
      // 默认状态是 运营位管理的 寄快递首页
      // this.url = "/api/promotion/getOptionList";
      this.pageId = "SD1010"; // 寄快递首页
      ((this.$route.path == "/chooseExpress" &&
          (this.pageId = "BM1010")) ||
        (this.$route.path == "/expressOrder" &&
          (this.pageId = "SS1010")))

      var _this = this;
      _this.$http.post(this.url, {
        "pages": {
          "page_size": this.pageSize,
          "page_num": _this.currentPage - 1
        },
        "con": {
          "pageId": this.pageId
        }
      }, (rsp) => {
        _this.tableData = rsp.page_list
        _this.totalCount =  parseInt(rsp.pages.cnt);
        //  console.log("success");
        //  console.log(data);
      })
    }
  },
  methods: {
    // 监听 子组件覆盖对话框 的回调函数
    changeVisible(flag) {
      this.dialogTableVisible = flag;
    },
    // 操作排序值改变
    handleSortChange(column) {
        // 创建时间进行排序
        var _this = this;
        _this.$http.post(this.url, {
          "pages": {
            "page_size": this.pageSize,
            "page_num": _this.currentPage - 1
          },
          "con": {
            "pageId": this.pageId,
            "orderColumn":column.prop,
            "orderStatus":column.order&&column.order.slice(0,4)
          }
        }, (rsp) => {

          _this.tableData = rsp.page_list
          _this.totalCount = parseInt(rsp.pages.cnt);
          //  console.log("success");
          //  console.log(data);
        })
    },
    // 操作栏对应的事件响应
    OperationTakeOff() {
      this.loadingTakeOffFlag = true;
      this.myDialogTitle = "确认置为下架？";
      this.myDiglogContent = "确认后，该内容将提交审核，通过后变为'已下架'";
    },
    Operationchange() {
      this.loadingTakeOffFlag = true;
      this.myDialogTitle = "修改？";
      this.myDiglogContent = "确认后，该内容将修改";
    },
    OperationApproved() {
      this.loadingTakeOffFlag = true;
      this.myDialogTitle = "通过申请？";
      this.myDiglogContent = "确认后，该内容将通过申请";
    },
    OperationApprovedFail() {
      this.loadingTakeOffFlag = true;
      this.myDialogTitle = "申请驳回？";
      this.myDiglogContent = "确认后，该内容将申请驳回";
    },
    OperationEffectDetail() {
      this.loadingTakeOffFlag = true;
      this.myDialogTitle = "已生效详情？";
      this.myDiglogContent = "确认后，该内容将已生效";
    },
    OperationwaitDetail() {
      this.loadingTakeOffFlag = true;
      this.myDialogTitle = "确认置为下架？";
      this.myDiglogContent = "确认后，该内容将待审详情";
    },
    // 标签页导航
    handleTabClick(tab, event) {

      var _this = this;
      _this.listLoading = true;
      _this.tableFalg = false
      _this.showConfig = false;
      console.log(tab.label);
      var tableDataCopy = _this.tableData;
      if (tab.label == "配置") {
        // 配置排序
        _this.showSortable = "custom";
        _this.tableData = [];
        _this.showConfig = true;
        _this.showOperation = true;
        _this.showOperation2 = false;
        _this.currentPage = 1;
        this.radio = 1;
        _this.url = "/api/promotion/getConfList"
        _this.$http.post(_this.url, {
          "pages": {
            "page_size": this.pageSize,
            "page_num": _this.currentPage - 1
          },
          "con": {
            "pageId": _this.pageId
          }
        }, (rsp) => {
          _this.tableData = rsp.page_list;
          _this.totalCount =  parseInt(rsp.pages.cnt);
          //  console.log("success");
          //  console.log(data);
        })
      } else if (tab.label == "已上线") {
        // 配置排序
        _this.showSortable = false;
        _this.tableData = [];
        // window.location.reload();
        _this.showConfig = false;
        _this.showOperation = true;
        _this.showOperation2 = false;
        _this.currentPage = 1;
        this.radio = "";
        _this.url = "/api/promotion/getList"
        _this.$http.post(_this.url, {
          "pages": {
            "page_size": _this.pageSize,
            "page_num": _this.currentPage - 1
          },
          "con": {
            "pageId": _this.pageId
          }
        }, (rsp) => {
          _this.tableData = rsp.page_list
            _this.totalCount =  parseInt(rsp.pages.cnt);
          //  console.log("success");
          //  console.log(data);
        })
      } else {
        // 配置排序
        _this.showSortable = false;
        _this.showOperation = false;
        _this.tableData = [];
        // window.location.reload();
        _this.showConfig = false;
        _this.showOperation2 = true;
        _this.currentPage = 1;
        this.radio = "";
        _this.url = "/api/promotion/getAuditList"
        _this.$http.post(_this.url, {
          "pages": {
            "page_size": _this.pageSize,
            "page_num": _this.currentPage - 1
          },
          "con": {
            "pageId": _this.pageId
          }
        }, (rsp) => {
          _this.tableData = rsp.page_list;
          _this.totalCount =  parseInt(rsp.pages.cnt);
          //  console.log("success");
          //  console.log(data);
        })
      }
      setTimeout(() => {
        _this.listLoading = false;
        _this.tableFalg = true;
      }, 300);

    },
    // 查看覆盖地区
    checkArea() {
      var _this = this;
      _this.listLoading = true;
      _this.$http.get("/rest/list3", (rsp) => {
        _this.gridData = rsp.data.data;
        // console.log(_this.gridData);
        _this.listLoading = false;
        _this.dialogTableVisible = true
      })
    },
    setNewData() {
      var _this = this;
      this.$router.push({
        path: _this.$route.path + '/addData'
      });
    },
    handleClose() {
      alert("asdfsd");
    },
    handleChange(value) {
      console.log(value);
    },
    getAddPage(e) {
      //  let router = new VueRouter();
      console.log(e);
      this.$router.push({
        path: "table3",
        query: {
          plan: 'private'
        }
      });
      this.addFlag = true;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.$http.post(this.url, {
        "pages": {
          "page_size": this.pageSize,
          "page_num": this.currentPage - 1
        },
        "con": {
          "pageId": this.pageId,
          "status": this.radio2
        }
      }, (rsp) => {
        this.tableData = rsp.page_list;
        this.totalCount =  parseInt(rsp.pages.cnt);
        //  console.log("success");
        //  console.log(data);
      })


      this.$message(`每页${val}`);
      var count = this.pageSize / 5;
      // if (this.pageSize > 5) {
      //   if (this.currentPage <= 1) {
      //     var count = this.pageSize / 5;
      //     var temp = [];
      //     for (var i = 0; i < count; i++) {
      //       temp = temp.concat(this.tableData[i]);
      //     }
      //     this.table2 = temp;
      //   }
      //
      // } else {
      //   this.table2 = this.tableData[this.currentPage - 1];
      // }
      // this.currentPage = 1;

      //  console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$http.post(this.url, {
        "pages": {
          "page_size": this.pageSize,
          "page_num": this.currentPage - 1
        },
        "con": {
          "pageId": this.pageId,
          "status": this.radio2
        }
      }, (rsp) => {
        this.tableData = rsp.page_list;
        this.totalCount =  parseInt(rsp.pages.cnt);
      })
      var _this = this;
      this.halfListLoading = true;
      this.$message(`当前页${val}`);
      var count = this.pageSize / 5;
      if (count == 1) {
        this.table2 = this.tableData[val - 1];
      } else {
        if (val == 1) {
          var temp = [];
          for (var i = 0; i < count; i++) {
            temp = temp.concat(this.tableData[i]);
          }
          this.table2 = temp;
        } else {
          var temp = [];
          for (var i = count; i < 4; i++) {
            temp = temp.concat(this.tableData[i]);
          }
          this.table2 = temp;
        }
      }


      setTimeout(() => {
        _this.halfListLoading = false;
      }, 600);
      console.log(`当前页: ${val}`);
    },
    handleClick() {
      this.$notify({
        title: '点击了查看',
        message: '即将跳转到查看界面',
        duration: 6000
      })
    },
    handleEdit(row) {
      localEvent.set("localChooseExpress", row);
      var _this = this;
      this.$router.push({
        path: _this.$route.path + '/editData'
      });
    },
    effectiveDetails(row) {
      localEvent.set("localChooseExpress", row);

      var _this = this;
      this.$router.push({
        path: _this.$route.path + '/detail'
      });

    },
    handleRadio(){
      var _this = this;
      _this.url = "/api/promotion/getConfList"
        _this.$http.post(_this.url, {
          "pages": {
            "page_size": this.pageSize,
            "page_num": _this.currentPage - 1
          },
          "con": {
            "pageId": this.pageId,
            "status":this.radio2
          }
        }, (rsp) => {
          _this.tableData = rsp.page_list;
          _this.totalCount =  parseInt(rsp.pages.cnt);
          //  console.log("success");
          //  console.log(data);
        })
    }
  }
}
</script>
<style lang="scss">
.el-tabs .el-tabs__content {
    display: none;
}

.main {
    .mainTable {
        .cell {
            text-align: center;
        }
    }
    .el-tabs__item {
        width: 90px;
        height: 30px;
        line-height: 30px;
        text-align: center;
    }

    .el-table .cell,
    .el-table th > .cell {
        padding: 0 7px;
    }

    /*.el-table__body .el-table__row .cell {
        max-height: 150px !important;
        overflow-y: auto;
      }*/

    .link_button {
        border: 0;
    }
    .link_button:hover {
        background-color: no;
    }
}

/*.el-table__body .el-table__row .el-table_1_column_14 .cell {
       max-height: 150px !important;
       overflow-y:auto;
   }*/
</style>
