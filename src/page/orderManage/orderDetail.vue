<template>
  <div class="section">
    <el-row>
        <el-col :span="24"><h1 class="grid-content bg-purple-dark orderTitle">订单号：{{orderNo}}</h1></el-col>
    </el-row>
    <el-row class="orderDetail">
        <el-collapse v-model="activeNames" >
            <el-collapse-item title="基本信息" name="0">
                <el-row class="basic-table">
                    <el-col :md="12" :lg="6" v-for="(item,index) in items" :key="index">
                        <div class="grid-content bg-purple">
                            <el-col :span="9" class="cell-left">{{item.name}}</el-col >
                            <el-col :span="15" class="cell-right">{{item.message}}</el-col>
                        </div>
                    </el-col>
                </el-row>
            </el-collapse-item>
        </el-collapse>
    </el-row>
    <el-collapse v-model="activeNames">
        <el-collapse-item title="寄件人信息" name="1">
            <el-row class="sender-table">
                <el-col :span="24" v-for="(senderItem,index) in senderItems" :key="index"><div class="grid-content bg-purple"><el-col :span="3">{{senderItem.name}}：</el-col ><el-col :span="18">{{senderItem.message}}</el-col></div></el-col>
            </el-row>
        </el-collapse-item>
        <el-collapse-item title="收件人信息" name="2">
            <el-row class="sender-table">
                <el-col :span="24" v-for="(rcvrItem,index) in rcvrItems" :key="index"><div class="grid-content bg-purple"><el-col :span="3">{{rcvrItem.name}}：</el-col ><el-col :span="18">{{rcvrItem.message}}</el-col></div></el-col>
            </el-row>
        </el-collapse-item>
        <el-collapse-item title="物品信息" name="3">
            <el-row class="goods-table">

                <el-col :span="24" v-for="(goodsItem,index) in goodsItems" :key="index"><div class="grid-content bg-purple"><el-col :span="3">{{goodsItem.name}}：</el-col ><el-col :span="18">{{goodsItem.message}}</el-col></div></el-col>
            </el-row>
        </el-collapse-item>
        <el-collapse-item title="揽收员信息" name="4">
            <el-row class="courier-table">
                <el-col :span="24" v-for="(courier,index) in couriers" :key="index"><div class="grid-content bg-purple"><el-col :span="3">{{courier.name}}：</el-col ><el-col :span="18">{{courier.message}}</el-col></div></el-col>
            </el-row>
        </el-collapse-item>
        <el-collapse-item title="快递费用" name="5">
            <el-row class="expressPay-table">
                <el-col :span="24" v-for="(expressPay,index) in expressPays" :key="index"><div class="grid-content bg-purple"><el-col :span="3">{{expressPay.name}}：</el-col ><el-col :span="18">{{expressPay.message}}</el-col></div></el-col>
            </el-row>
        </el-collapse-item>
        <el-row class="footer">
            <el-button class="return" type="primary" @click="$router.go(-1)">返回</el-button>
            <el-button class="complateInfo" @click="handleShowIfo" type="primary">{{showAllIfo}}</el-button>
            <el-button class="serverRecord" @click="handleShowServer" type="primary">查看信息服务</el-button>
            <el-button v-if="cancelFlag" class="complateInfo" @click="handleCancleOrder" type="danger">取消订单</el-button>
            <el-button v-if="cancelFlag" class="serverRecord" @click="handleInvalidorder" type="danger">作废订单</el-button>
        </el-row>
        <!--  取消原因对话框       :label-width="formLabelWidth" -->
        <el-dialog title="取消原因" :visible.sync="dialogCancelVisible">
            <el-form :model="cancelCause" :rules="cancelRules">
              <el-form-item label="请选择取消原因" :label-width="formLabelWidth">
               <el-select v-model="cancelCause.region" placeholder="请选择活动区域">
                    <el-option v-for="(item,index) in cancelCauseArr" :label="item"  :value="item"></el-option>
               </el-select>
              </el-form-item>
           </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleDialogCanceSave">确 定</el-button>
              </div>
      </el-dialog>


    </el-collapse>
  </div>
</template>
<script>
import localEvent from 'src/vuex/function.js';

  export default {
    data() {
      return {
        activeNames: ['0','1','2','3','4',"5"],
        orderNo:'',
        url:'',
        dialogCancelVisible:false,
        cancelCauseArr:[],
        cancelCause:{
          region:''
        },
        cancelRules:{
          region: [
              { required: true, message: '请选择活动区域', trigger: 'change' }
            ]
        },
        cancelFlag:true,   // 默认没有取消
        showAllIfo:'查看完整信息',
        items:[{
            name: "快递公司",
            message: '',
          },
          {
            name: "实际承运公司",
            message: '',
          },
          {
            name: "运单号",
            message: '',
          },
          {
            name: "取件码",
            message: '',
          },
          {
            name: "期望上门时间",
            message: '',
          },
          {
            name: "下单时间",
            message: '',
          },
          {
            name: "接单时间",
            message: '',
          },
          {
            name: "运单回传时间",
            message: '',
          },
          {
            name: "物流公司订单号",
            message: '',
          },
          {
            name: "是否转快递",
            message: '',
          },
          {
            name: "账单回传时间",
            message: '',
          },
          {
            name: "订单状态",
            message: '',
          }
        ],
        senderItems:[{
            name: "寄件人",
            message: '',
        }, {
            name: "联系电话",
            message: '',
        },{
          name: "寄件地址",
           message: '',
       }],
       rcvrItems:[{
            name: "收件人",
            message: '',
        }, {
            name: "联系电话",
            message: '',
        },{
          name: "收件地址",
           message: '',
       }],
        goodsItems:[{
            name: "类型",
            message: '',
        },
        {
            name: "物品重量",
            message: '',
        },{
            name: "额外服务",
            message: '',
        },{
            name: "备注",
            message: '',
        }],
        couriers:[{
            name: "揽件员信息",
            message: '',
        },
        {
            name: "联系电话",
            message: '',
        }],
        expressPays:[{
            name: "支付方式",
            message: '',
        },
        {
            name: "预计费用",
            message: "",
        },
        {
            name: "实际费用",
            message: '',
        }],
        requestData:{},
      }

    },
    mounted() {
        var _this = this;
        var localData = localEvent.get("localorderManage");
        console.log(localData);
        _this.orderNo = localData;
        this.requestData = {
                orderNo:_this.orderNo
            }
        this.requestHttp();
    },
     methods: {
        requestHttp(){
            var _this = this;
            // var localData = localEvent.get("localorderManage");
            // console.log(localData);
            // this.orderNo = localData;
            _this.url = "/api/order/details"; // 默认展开
            _this.$http.post(this.url,this.requestData,(rsp)=>{
                console.log(rsp);

                //基本信息
                this.items[0].message = rsp.expName || '暂无';
                this.items[1].message = rsp.actCarrierName || '暂无';
                this.items[2].message = rsp.waybillNo || '暂无';
                this.items[3].message = rsp.pickUpCode || '暂无';
                this.items[4].message = rsp.gmtExp || '暂无';
                this.items[5].message = rsp.gmtCreate || '暂无';
                this.items[6].message = rsp.gmtAccept || '暂无';
                this.items[7].message = rsp.gmtBill || '暂无';
                this.items[8].message = rsp.outOrderNo || '暂无';
                this.items[9].message = rsp.expNameOld? '是':'否';//是否转运快递
                this.items[10].message = rsp.gmtBill || '暂无';
                this.items[11].message = rsp.orderStatus || '暂无';
                //寄件人信息
                this.senderItems[0].message = rsp.snderName || '暂无';
                this.senderItems[1].message = rsp.snderMobile || '暂无';
                this.senderItems[2].message = rsp.snderAddress || '暂无';
                //收件人信息
                this.rcvrItems[0].message = rsp.rcvrName || '暂无';
                this.rcvrItems[1].message = rsp.rcvrMobile || '暂无';
                this.rcvrItems[2].message = rsp.rcvrAddress || '暂无';
                //物品信息
                this.goodsItems[0].message = rsp.goodsType || '暂无';
                this.goodsItems[1].message = rsp.goodsWeight || '暂无';
                this.goodsItems[2].message = rsp.addService || '暂无';
                this.goodsItems[3].message = rsp.remark || '暂无';
                //揽件员信息
                this.couriers[0].message = rsp.acppeter || "暂无";
                this.couriers[1].message = rsp.acppetermobile || "暂无";
                //快递费用
                this.expressPays[1].message = rsp.estimatePrice || '暂无';
                this.expressPays[2].message = rsp.orderAmount || '暂无';
                this.expressPays[3].message = rsp.receiptAmount || '暂无';
            },(error)=>{
                console.log('failed');
            });
        },
        handleShowIfo(){
            var _this = this;
            var localData = localEvent.get("localorderManage");
            console.log(localData);
            _this.orderNo = localData;
            if(this.showAllIfo == '查看完整信息'){
                this.requestData = {
                        "orderNo":_this.orderNo,
                        "isFull":"1"
                    }
                this.requestHttp();
                this.showAllIfo ='隐藏完整信息'
            }else{
               this.requestData = {
                        "orderNo":_this.orderNo,
                        "isFull":"0"
                    }
                this.requestHttp();
                this.showAllIfo ='查看完整信息'
            }

        },
        handleShowServer(){

        },
        handleCancleOrder(){
            this.dialogCancelVisible = true;
            this.$http.post("/api/order/cancelCause",{},(rsp)=>{
               this.cancelCauseArr = rsp;
                   console.log(rsp)
            })

         },
      handleDialogCanceSave() {
           this.dialogCancelVisible = false;
           console.log(this.cancelCause.region);
           this.$confirm('确定后该订单将被取消，请与客户提前沟通', '确定取消该订单吗？', {
                              confirmButtonText: '确定',
                              cancelButtonText: '取消',
                              type: 'warning'
                      }).then(() => {
                        this.$http.post("/api/order/cancelConfirm",{"cause":this.cancelCause.region,orderNo:this.orderNo},(rsp)=>{
                           this.cancelCauseArr = rsp;
                               console.log(rsp)
                               this.$message({
                                 type: 'success',
                                 message: '删除成功!'
                               });
                               this.cancelFlag = false;
                        },(error)=>{
                            this.$message({
                                type: 'error',
                                message: error.data.meta.code+"--"+error.data.meta.msg
                            });
                        });
                      }).catch(() => {
                        this.$message({
                          type: 'info',
                          message: '已取消删除'
                        });
                      });
      },
        handleInvalidorder(){

        }

     }

  }
</script>

<style lang="scss">
 .orderDetail {
     .el-table__row td:nth-child(2n+1){
       background-color:#f5f5f5;
     }
 }
    .orderTitle{
        height: 60px;
        line-height: 60px;
    }
    @media screen and (min-width: 1201px) {
        .cell-left{
            border-top: 1px solid #333;
            text-align: left;
            background: #e1e1e1;
            box-sizing:border-box;
            white-space:nowrap;
            text-indent: 5px;
        }
        .cell-right{
            background: #fff;
            border: 1px solid #333;
            border-bottom:0;
            text-align: left;
            white-space:nowrap;
            text-indent: 5px;
        }
        .basic-table .el-col:nth-child(n+9){
            border-bottom: 1px solid #333;
        }
        .basic-table .el-col:nth-child(4n+1) .cell-left{
            border-left:1px solid #333;
        }
    }
    @media screen and (max-width: 1201px) {
        .cell-left{
            border-left: 1px solid #333;
            border-top: 1px solid #333;
            text-align: left;
            background: #e1e1e1;
            box-sizing:border-box;
            white-space:nowrap;
            text-indent: 5px;
        }
        .cell-right{
            overflow: hidden;
            background: #fff;
            border-left: 1px solid #333;
            border-top: 1px solid #333;
            text-align: left;
            white-space:nowrap;
            text-indent: 5px;
        }
        .basic-table .el-col:nth-child(2n) .cell-right{
            border-right: 1px solid #333;
        }
        .basic-table .el-col:nth-child(11),.basic-table .el-col:nth-child(12){
            border-bottom:1px solid #333;
        }
    }

    @media screen and (max-width: 999px) {
        .cell-left{
            text-align: left;
            background: #e1e1e1;
            box-sizing:border-box;
            white-space:nowrap;
        }
       .cell-right{
            background: #fff;
            text-align: center;
            white-space:nowrap;
        }
        .basic-table .el-col:nth-child(2n+1) .cell-right{
            border-right: 1px solid #333;
        }
        .basic-table .el-col:nth-child(11){
            border-bottom: 0;
        }
    }
    //    @media screen and (min-width: 901px) {
    //     .cell-left{
    //         text-align: left;
    //         background: #e1e1e1;
    //         box-sizing:border-box;
    //         white-space:nowrap;
    //     }
    //    .cell-right{
    //         background: #fff;
    //         text-align: center;
    //         white-space:nowrap;
    //     }
    //     .basic-table .el-col:nth-child(2n+1) .cell-right{
    //         border-right: 1px solid #333;
    //     }
    //     .basic-table .el-col:nth-child(11){
    //         border-bottom: 0;
    //     }
    // }
    .footer{
        padding:20px 0 20px 15px;
    }


</style>


</style>
