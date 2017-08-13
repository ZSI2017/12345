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
      <el-radio-group v-model="radio2">
        <el-radio :label="3">审核通过</el-radio>
        <el-radio :label="6">驳回</el-radio>
        <el-radio :label="9">待审核</el-radio>
        <el-radio :label="12">草稿</el-radio>
      </el-radio-group>
    </el-col>
    <el-col :span="2" style="position: relative;padding-left:32px;">
      <el-button type="primary" @click="setNewData" style="float:right;"><i class="el-icon-plus"></i> 添加</el-button>
    </el-col>
  </el-row>

  <!-- 表格  -->
  <el-table
      v-if="tableFalg"
      class="mainTable"
      v-loading.body.lock="halfListLoading"
      @sort-change="handleSortChange"
      :data="tableData"
      @cell-mouse-enter="handleMouseEnter"
      style="width: 100%;margin-top:10px;"
      max-height="450"
      empty-text="暂无数据"
      align="center"
      :default-sort="{prop: 'date', order: 'descending'}"
      >
    <el-table-column prop="operationsMapName"  label="公告名称">
    </el-table-column>
    <el-table-column prop="content" label="内容">
    </el-table-column>
    <el-table-column prop="address" label="覆盖地区">
      <template scope="scope">
         <el-button @click="checkArea" type="text" size="small">查看</el-button>
       </template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间">
    </el-table-column>
    <el-table-column prop="activeTime" label="有效时段" width="220">
      <template scope="scope">
          <p style="padding:0;margin:0;text-align:center">{{scope.row.activeTime1}}</p>
          <p style="padding:0;margin:0;text-align:center">至</p>
          <p style="padding:0;margin:0;text-align:center">{{scope.row.activeTime2}}</p>
       </template>
    </el-table-column>
    <el-table-column prop="currentState" label="状态" :sortable="showSortable">
    </el-table-column>
    <el-table-column v-if="showConfig" prop="reviewState" width="80" label="审核状态">
    </el-table-column>
    <!-- <el-table-column prop="content"  label="标价">
    </el-table-column> -->
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
    :current-page="currentPage4"
    :page-sizes="[5,10,15,20]"
    :page-size="pageSize"
    layout="total,sizes,prev, pager, next,jumper"
    :total="totalCount">
    </el-pagination>
  </div>

  <!--  覆盖地区 查看对话框 -->
  <cover-area
       :visible="dialogTableVisible"
       :gridData="gridData"
       @listenToCoverArea ="changeVisible"
      ></cover-area>

  <!-- 置为下架 通过申请 申请驳回 对话框  -->
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
import coverArea from "@/page/chooseExpress/coverArea.vue";

export default {
  components: {
    coverArea
   },
  data() {
    return {
      // 排序是否显示
      showSortable:true,
      totalCount:1000,
      myDialogTitle: "确认置为下架？",
      myDiglogContent: "确认后，该内容将提交审核，通过后变为'已下架'",
      // 置为下架对话框
      showOperation: true,
      showOperation2: false,
      loadingTakeOffFlag: false,
      tableFalg: true,
      showConfig: true,
      gridData: [],
      radio2: 3,
      activeName2: 'first',
      showHeader: false,
      dialogTableVisible: false,
      value: '',
      pageSize: 5,
      listLoading: false,
      halfListLoading:false,
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
      currentPage4: 1,
      tableData: [],
      formLabelWidth: '120px',
      selectedOptions: [],
      selectedOptions2: []
    }
  },
  computed() {
    return {

    }
  },
  created() {
    console.log("$router: " + this.$route.path);
    let url = "/rest/list2";
    var _this = this;
    _this.$http.get(url, (data) => {
      console.log("success");
      console.log(data);
      _this.tableData = data.data.data;
      _this.totalCount = data.data.data.length;
    }, (error) => {
      console.log("error");
      console.log(error);
    });
    console.log(this.$route.matched);
  },
  watch: {
    '$route': function(to, from) {
      // 默认状态是 运营位管理的 寄快递首页
      console.log("$router: " + to.path);
      let url = "/rest/list2";
      var _this = this;
      _this.$http.get(url, (rsp) => {
        _this.tableData = rsp.data.data
        //  console.log("success");
        //  console.log(data);
      }, (error) => {
        console.log("error");
        console.log(error);
      })
    }
  },
  methods: {
    // 监听 子组件覆盖对话框 的回调函数
    changeVisible(flag){
      this.dialogTableVisible = flag;
    },
    // 操作排序值改变
    handleSortChange(column) {
       if(column.prop === "createTime") {
          // 创建时间进行排序
          console.log(column.prop,column.order);
       }else if (column.prop === "currentState") {
          // 状态进行排序
          console.log(column.prop,column.order);
       }
    },
    // 操作栏对应的事件响应
    OperationTakeOff() {
        this.loadingTakeOffFlag = true;
        this.myDialogTitle="确认置为下架？";
        this.myDiglogContent="确认后，该内容将提交审核，通过后变为'已下架'";
    },
    Operationchange() {
       this.loadingTakeOffFlag = true;
       this.myDialogTitle="修改？";
       this.myDiglogContent="确认后，该内容将修改";
    },
    OperationApproved() {
            this.loadingTakeOffFlag = true;
            this.myDialogTitle="通过申请？";
            this.myDiglogContent="确认后，该内容将通过申请";
    },
    OperationApprovedFail() {
           this.loadingTakeOffFlag = true;
           this.myDialogTitle="申请驳回？";
           this.myDiglogContent="确认后，该内容将申请驳回";
    },
    OperationEffectDetail() {
           this.loadingTakeOffFlag = true;
           this.myDialogTitle="已生效详情？";
           this.myDiglogContent="确认后，该内容将已生效";
    },
    OperationwaitDetail() {
           this.loadingTakeOffFlag = true;
           this.myDialogTitle="确认置为下架？";
           this.myDiglogContent="确认后，该内容将待审详情";
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
        _this.showSortable = true;
        _this.tableData = [];
        // window.location.reload();
        _this.showConfig = true;
        _this.showOperation = true;
        _this.showOperation2 = false;
        _this.tableData = tableDataCopy;
      } else if (tab.label == "已上线") {
        // 配置排序
        _this.showSortable = false;
        _this.tableData = [];
        // window.location.reload();
        _this.showConfig = false;
        _this.showOperation = true;
        _this.showOperation2 = false;
        _this.tableData = tableDataCopy;
      } else {
        // 配置排序
        _this.showSortable = false;
        _this.showOperation = false;
        _this.tableData = [];
        // window.location.reload();
        _this.showConfig = false;
        _this.showOperation2 = true;
        _this.tableData = tableDataCopy;
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
      }, (error) => {
        console.log(error);
      })
    },
    setNewData() {
      this.$router.push('/noticeManage/addData')
    },
    handleClose() {
      alert("asdfsd");
    },
    handleChange(value) {
      console.log(value);
    },
    getAddPage(e) {
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
      this.$message(`每页${val}`);
      var count = this.pageSize / 5;
      if (this.pageSize > 5) {
        if (this.currentPage4 <= 1) {
          var count = this.pageSize / 5;
          var temp = [];
          for (var i = 0; i < count; i++) {
            temp = temp.concat(this.tableData[i]);
          }
          this.table2 = temp;
        }

      } else {
        this.table2 = this.tableData[this.currentPage4 - 1];
      }
      // this.currentPage4 = 1;

      //  console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage4 = val;
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
    handleEdit(row) {
      localEvent.set("localNoticeManage",row);
      this.$router.push('/noticeManage/editData')
    },
    effectiveDetails(row) {
      localEvent.set("localNoticeManage",row);
      this.$router.push('/noticeManage/detail')
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
     .cell{
        text-align: center;
      }
    }
      .el-tabs__item{
        width:90px;
        height:30px;
        line-height:30px;
        text-align: center;
      }

      .el-table .cell,
      .el-table th>.cell {
        padding: 0 7px;
      }

}
</style>
