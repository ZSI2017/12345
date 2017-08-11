<template>
  <div class="section main">
    <el-row>
      <el-col :span="24" class="status-font tip1"><i class="el-icon-warning" style="color:#F7BA2A;padding-right:10px;"></i>提示：
        当日用户取消 ≥          
        <span style="color:red;font-size:26px;">{{ num1 }}</span>
        单，将被列为黑名单并永久限制下单操作如需解除黑名单，需用户提供与支付宝绑定的手机号   
      </el-col>   
      <el-col :span="2" class="status-font">手机号：</el-col>      
      <el-col :span="10">
          <el-input :span="10" v-model="input" size="large" placeholder="请输入用户手机号码"></el-input>
      </el-col>
      <el-col :span="4" class="import-search">
        <el-button type="primary" size="large">查 询</el-button>
      </el-col>   
    </el-row>

    <!-- 表格  -->
    <el-table
        v-if="tableFalg"
        class="mainTable"
        v-loading.body.lock="halfListLoading"
        :data="tableData"
        style="width: 100%;margin-top:10px;"
        max-height="450"
        empty-text="暂无数据"
    >
        <el-table-column prop="operationsMapName" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="ordernumber" label="手机号" align="center">
        </el-table-column>
        <el-table-column prop="Forder" label="拉黑次数" class-name="blangListRed" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <div>
                <el-button @click="loadingTakeOffFlag = true" type="text" size="small">解除黑名单</el-button>
                <el-button @click="handleEdit(scope.row)" type="text" size="small">查看相关订单</el-button>
                <el-button type="text" plain @click="showAllIfo" size="small">查看完整信息</el-button>
            </div>
          </template>
        </el-table-column>
    </el-table>

      <!-- 拉黑 对话框  -->
    <el-dialog title="提示" :visible.sync="loadingTakeOffFlag" size="tiny">
      <i class="el-icon-warning" style="color:#F7BA2A;padding-right:10px;font-size: 36px!important;position: absolute;top: 34%;"></i>
      <p style="font-weight:bold;padding-left:44px;">确认解除黑名单？</p>
      <span style="padding-left:44px;">确认后，将恢复用户的下单功能</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="loadingTakeOffFlag = false">取 消</el-button>
        <el-button type="primary" @click="loadingTakeOffFlag = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--相关订单对话框-->
    <el-dialog title="相关订单" :visible.sync="dialogTableVisible" @close="handleClose">
      <el-table :data="gridData">
        <el-table-column property="ordernumber" label="订单号"></el-table-column>
        <el-table-column property="createTime" label="取消时间"></el-table-column>
      </el-table>
    </el-dialog>

  </div>

</template>
<script>
import store from 'src/vuex/store.js'
import localEvent from 'src/vuex/function.js';

  export default {
    data() {
      return {
        num1: "",
        tableFalg: true,
        tableData: [],
        loadingTakeOffFlag: false,
        halfListLoading:false,
        // 相关订单对话框
        dialogTableVisible: false,
        gridData: [],
        orderNumber:"",
        cancleTime:""
      }
    },
     mounted() {
      var localData = localEvent.get("blacklistTimes");
      this.num1 = localData;
    },
    created() {
      console.log("$router: " + this.$route.path);
      let url = "/rest/list2";
      var _this = this;
      _this.$http.get(url, (data) => {
        console.log("success");
        console.log(data);
        _this.tableData = data.data.data
      }, (error) => {
        console.log("error");
        console.log(error);
      });

      console.log(this.$route.matched);
    },
    methods: {
      handleEdit(row) {
        console.log(row);   
        this.dialogTableVisible = true;  
        this.gridData.push(row);    
        console.log(this.gridData)  
        console.log(this.tableData)  
        // this.orderNumber = row.ordernumber;
        // this.cancleTime = row.createTime;
        
      },
      handleClose(){
        this.gridData = [];
      },
      showAllIfo(){
        this.$notify({
          title: '查看完整信息',
          message: '点击了查看完整信息',
          type: 'success'
        });
      }
    }
  }    
</script>

<style lang="scss">
.main{
    .status-font{
      height:42px;
      line-height: 42px;
    }
    .tip1{
      margin: 10px 0 20px;
    }

    .import-search{
      margin-left: 20px;
    }
    .blangListRed{
      color:red;
    }
}


</style>

