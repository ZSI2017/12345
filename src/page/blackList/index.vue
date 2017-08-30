<template>
  <div class="section main mainFont">
    <el-row>
      <el-col :span="24" class="status-font tip1"><i class="el-icon-warning" style="color:#F7BA2A;padding-right:10px;"></i>提示：
        当日用户取消 ≥
        <span style="color:red;font-size:26px;">{{ num1 }}</span>
        单，将被列为黑名单并永久限制下单操作如需解除黑名单，需用户提供与支付宝绑定的手机号
      </el-col>
      <el-col :span="2" class="status-font">手机号：</el-col>
      <el-col :span="10">
          <el-input :span="10" v-model="keyword" type="number" onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" @keyup.enter.native="handleSearch" size="large" placeholder="请输入用户手机号码"></el-input>
      </el-col>
      <el-col :span="4" class="import-search">
        <el-button type="primary" @click='handleSearch' size="large">查 询</el-button>
      </el-col>
    </el-row>

    <!-- 表格  -->
    <el-table
        class="mainTable fontTable"
        style="width: 100%;margin-top:10px;"
        :data="tableData"
        stripe v-loading.body="listLoading"
        lement-loading-text="拼命加载中"
        max-height="3000"
    >
        <el-table-column prop="alipayUserName" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="alipayUserMoblie" label="手机号" align="center">
        </el-table-column>
        <el-table-column prop="blackCnt" label="拉黑次数" align="center">
            <template scope="scope">
                <div style="color:red;">
                    {{scope.row.blackCnt}}
                </div>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template scope="scope">
                <div>
                    <el-button @click="loadingTakeOffFlag = true" type="text" size="small">解除黑名单</el-button>
                    <el-button @click="RegardOrderFlag = true" type="text" size="small">查看相关订单</el-button>
                    <el-button ref='allIfo' @click="handleEdit(scope.$index,scope.row)" type="text" size="small">{{scope.row.checked?"隐藏完整信息":"查看完整信息"}}</el-button>
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
            <el-button type="primary" @click="handleConfirm">确 定</el-button>
        </span>
    </el-dialog>
      <!-- 相关订单 对话框  -->
    <el-dialog title="相关订单" :visible.sync="RegardOrderFlag" size="tiny">
        <el-table :data="gridData">
            <el-table-column property="orderNo" label="订单号" ></el-table-column>
            <el-table-column property="time" label="创建时间"></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="RegardOrderFlag = false">取 消</el-button>
            <el-button type="primary" @click="handleRegardOrder">确 定</el-button>
        </span>
    </el-dialog>

  </div>

</template>
<script>

  export default {
    data() {
      return {
        keyword:"",
        num1: "",
        tableData: [],
        loadingTakeOffFlag: false,
        RegardOrderFlag: false,
        alipayUserId:'',//Uid
        viewIfoArray:[]
      }
    },
     mounted() {
        let cancleUrl = "/api/commonConf/getCancelFreq";
        var _this = this;
        _this.$http.post(cancleUrl,{},(result) => {
            console.log(result)
            this.num1 = result;

        },(error) => {
            this.$message({
                type: 'error',
                message: error.data.meta.msg
            });
        });

    },
    created() {

    },
    methods: {
      handleSearch(){
          console.log("$router: " + this.$route.path);
          let url = "/api/epuser/findByMobile";
          var _this = this;
          if(this.keyword == ''){
              _this.$message({
                  type: 'warning',
                  message: '查询内容不能为空！'
              });
              return;
          }
          _this.$http.post(url,{'mobile':this.keyword},(result) => {
              console.log(result)
              if(result.result === null){
                  _this.$message({
                      type: 'warning',
                      message: '该数据没有查询到内容！'
                  });
                  return;
              }
              let resultSpace = [];
              resultSpace.push(result);
              _this.alipayUserId = result.alipayUserId;
              _this.tableData = resultSpace.splice(0,1);
          },(error) => {
              _this.$message({
                  type: 'error',
                  message: error.data.meta.msg
              });
          });

        },
        handleConfirm(){
            let confirmUrl = "/api/epuser/unban";
            var _this = this;
            _this.$http.post(confirmUrl,{'alipayUid':this.alipayUserId,"mobile":this.keyword},(result) => {
                console.log(result)
                _this.$message({
                    type: 'success',
                    message: '解除黑名单成功！'
                });
                _this.alipayUserId = '';
                _this.tableData = '';
                _this.loadingTakeOffFlag = false;
            },(error) => {
                _this.loadingTakeOffFlag = false;              
                _this.$message({
                    type: 'error',
                    message: error.data.meta.msg
                });
            });
        },
        //查看相关订单
        handleRegardOrder(){
            
        },
        handleEdit(index,row) {

            // console.log(index)
            // console.log(row)
            // console.log(row.orderNo)


            // var orderNo = row.orderNo;
            // var _this = this;
            // var allIfoUrl = '/api/order/details';
            // var requestData = {};
            // //脱敏判断
            // if(this.viewIfoArray.indexOf(row.orderNo) == -1){
            //     this.viewIfoArray.push(row.orderNo)
            //     console.log(this.viewIfoArray)
            //     requestData = {
            //     'orderNo': orderNo,
            //     'isFull':'1'
            //     }
            //     this.tableData[index].checked = true;
            // }else{
            //     this.viewIfoArray.splice(this.viewIfoArray.indexOf(row.orderNo),1);
            //     console.log(this.viewIfoArray)
            //     requestData = {
            //     'orderNo': orderNo,
            //     'isFull':'0'
            //     }
            //     this.tableData[index].checked = false;

            // }
            // // if(this.checked  == false){
            // //   requestData = {
            // //     'orderNo': orderNo,
            // //     'isFull':'1'
            // //   }
            // //   this.checked = true;
            // // }else{
            // //   requestData = {
            // //     'orderNo': orderNo,
            // //     'isFull':'0'
            // //   }
            // //   this.checked = false;

            // // }

            // _this.$http.post(allIfoUrl,requestData,(rsp)=>{
            //     console.log(rsp);
            //     row.snderName =  rsp.snderName;
            //     row.snderMobile = rsp.snderMobile;
            //     row.snderAddress = rsp.snderAddress;
            //     row.rcvrName = rsp.rcvrName;
            //     row.rcvrMobile = rsp.rcvrMobile;
            //     row.rcvrAddress  = rsp.rcvrAddress;
            // },(error)=>{
            //     console.log('failed');
            // });

        },

    }
  }
</script>

<style lang="scss">
    .mainFont .el-table__body-wrapper .el-table__row .cell,.mainFont .el-table__body-wrapper .el-table__row .cell span{
        font-size: 20px;
    }
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
    input[type=number] {
    -moz-appearance:textfield;
    }
    input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button{
          -webkit-appearance: none !important;
          margin: 0;
      }
  }


</style>
