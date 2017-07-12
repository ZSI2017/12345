<template>
<div class="section" style="overflow:hidden" v-loading.body.fullscreen.lock="listLoading">
  <el-tabs v-model="activeName2" type="card" @tab-click="handleTabClick">
    <el-tab-pane label="配置" name="first">配置</el-tab-pane>
    <el-tab-pane label="已上线" name="second">已上线</el-tab-pane>
    <el-tab-pane label="待审核" name="third">待审核</el-tab-pane>
  </el-tabs>
  <!--  单选框   -->
  <el-row :span="24" type="flex" align="middle" v-if="showConfig">
    <el-col :span="8">
      <el-radio-group v-model="radio2">
        <el-radio :label="3">审核通过</el-radio>
        <el-radio :label="6">驳回</el-radio>
        <el-radio :label="9">待审核</el-radio>
        <el-radio :label="12">草稿</el-radio>
      </el-radio-group>
    </el-col>
    <el-col :span="14" style="height:20px"></el-col>
    <el-col :span="2">
      <el-button type="primary" @click="setNewData" size="large">+添加</el-button>
    </el-col>
  </el-row>

  <!-- 表格  -->
  <el-table v-if="tableFalg" :data="tableData" style="width: 98%;margin-top:10px" max-height="450" empty-text="_" align="center" :default-sort="{prop: 'date', order: 'descending'}">
    <el-table-column prop="operationsMapName" label="运营图称" sortable width="140">
    </el-table-column>
    <el-table-column prop="name" label="运营图" sortable width="130">
      <template scope="scope">
            <img width="50px" src="https://expressprod.oss-cn-hangzhou.aliyuncs.com/OperativeLogo/f2c570f3-7f84-44ca-afa9-e19a71ba10c5.png">
        </template>
    </el-table-column>
    <el-table-column prop="link" min-width="200" label="链接">
    </el-table-column>
    <el-table-column prop="address" width="50" label="覆盖地区">
      <template scope="scope">
         <el-button @click="checkArea" type="text" size="small">查看</el-button>
       </template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" width="130">
    </el-table-column>
    <el-table-column prop="modifyTime" label="修改时间" width="130">
    </el-table-column>
    <el-table-column prop="activeTime" label="有效时段">
    </el-table-column>
    <el-table-column prop="Forder" width="70" align="center" label="排序值">
    </el-table-column>
    <el-table-column prop="currentState" width="100" label="当前状态">

    </el-table-column>
    <el-table-column v-if="showConfig" prop="auditState" width="100" label="审核状态">
    </el-table-column>
    <el-table-column v-if="showConfig" label="操作" width="130">
      <template scope="scope">
           <el-button v-if="showOperation"  @click="OperationTakeOff" type="text" size="small">置为下架</el-button>
           <el-button v-if="showOperation"  @click="Operationchange" type="text" size="small">修改</el-button>
           <el-button v-if="showOperation2" @click="OperationApproved" type="text" size="small"> 通过申请</el-button><br/>
           <el-button v-if="showOperation2" @click="OperationApprovedFail" type="text" size="small"> 申请驳回</el-button><br/>
           <el-button v-if="showOperation2" @click="OperationEffectDetail" type="text" size="small">已生效详情</el-button><br/>
           <el-button v-if="showOperation2" @click="OperationwaitDetail" type="text" size="small">待审详情</el-button>
         </template>
    </el-table-column>
  </el-table>

  <div class="block pagination" style="margin-top:30px;float:right;">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[5,10,15,20]" :page-size="pageSize" layout="total,sizes,prev, pager, next,jumper" :total="20">
    </el-pagination>
  </div>

  <!--  覆盖地区 查看对话框 -->
  <el-dialog title="覆盖地区" :visible.sync="dialogTableVisible">
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
  </el-dialog>

  <!-- 置为下架 对话框  -->
  <el-dialog title="提示" :visible.sync="loadingTakeOffFlag" size="tiny">
    <p style="font-weight:bold">{{myDialogTitle}}</p>
    <span>{{myDiglogContent}}</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="loadingTakeOffFlag = false">取 消</el-button>
    <el-button type="primary" @click="loadingTakeOffFlag = false">确 定</el-button>
  </span>
  </el-dialog>

</div>
</template>

<script>
export default {
  data() {
    return {
      myDialogTitle: "确认置为下架？",
      myDiglogContent: "确认后，该内容将提交审核，通过后变为'已下架'",
      // 置为下架对话框
      showOperation: false,
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
      // table2:function(){
      //     return this.tableData[0]
      // }
    }
  },
  created() {
    console.log("$router: " + this.$route.path);
    let url = "/rest/list2";
    if (this.$route.path == "/chooseExpress") {
      url = "/rest/list2-2"
    } else if (this.$route.path == "/expressOrder") {
      url = "/rest/list2-3";
    }
    var _this = this;
    _this.$http.get(url, (data) => {
      console.log("success");
      console.log(data);
      _this.tableData = data.data.data
    }, (error) => {
      console.log("error");
      console.log(error);
    });

    // var _this = this;
    // _this.$http.get(url)
    //   .then(function(rsp) {
    //     _this.tableData = rsp.data.data
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   })

    console.log(this.$route.matched);
  },
  watch: {
    '$route': function(to, from) {
      // 默认状态是 运营位管理的 寄快递首页
      console.log("$router: " + to.path);
      let url = "/rest/list2";
      if (to.path == "/chooseExpress") {
        // 这里是运营位管理的 选择快递页面 的相关配置
        url = "/rest/list2-2"
      } else if (to.path == "/expressOrder") {
        // 这里是运营位管理的 选快递下单页面的相关配置
        url = "/rest/list2-3";
      }
      var _this = this;
      _this.$http.get(url, (rsp) => {
        _this.tableData = rsp.data.data
        //  console.log("success");
        //  console.log(data);
      }, (error) => {
        console.log("error");
        console.log(error);
      })
      // _this.$http.get(url)
      //   .then(function(rsp) {
      //     _this.tableData = rsp.data.data
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   })

    }
  },
  methods: {
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

        _this.tableData = [];
        // window.location.reload();
        _this.showConfig = true;
        _this.showOperation = true;
        _this.showOperation2 = false;
        _this.tableData = tableDataCopy;
      } else if (tab.label == "已上线") {
        _this.showOperation = false;
        _this.tableData = [];
        // window.location.reload();
        _this.showConfig = false;
        _this.tableData = tableDataCopy;
      } else {
        _this.showOperation = false;
        _this.tableData = [];
        // window.location.reload();
        _this.showConfig = true;
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
      this.listLoading = true;
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
        _this.listLoading = false;
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
    handleEdit() {
      this.$notify({
        title: "点击了编辑",
        message: "即将跳转到编辑界面"
      })
    }
  }
}
</script>
<style>
/*.el-table__row td:nth-child(2n){
       background-color:#f5f5f5;
   }
   .el-table_1_column_2{
        background-color: #f5f5f5;
   }*/

.el-tabs .el-tabs__content {
  display: none;
}

.el-table .cell,
.el-table th>.cell {
  padding: 0 7px;
}

.el-table__body .el-table__row .cell {
  max-height: 150px !important;
  overflow-y: auto;
}



/*.el-table__body .el-table__row .el-table_1_column_14 .cell {
       max-height: 150px !important;
       overflow-y:auto;
   }*/
</style>
