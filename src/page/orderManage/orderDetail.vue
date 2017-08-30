<template>
  <div class="section main">
    <el-row>
        <el-col :span="24"><span class="grid-content bg-purple-dark orderTitle" style="font-size:28px;font-weight:600;">
            订单号：{{orderNo}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-size:20px;font-weight:600;">运单号：{{waybillNo}}</span> </el-col>
        <el-col :span="24">
            <h4 class="grid-content bg-purple-dark orderTitle" style="margin:0;">
              <span>快递公司：{{expName}}</span>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                <span :class="{'success_color':orderSuccess, 'pickupno_color': sendExpress, 'pickupyes_color':payOrder,'cancle_color':cancleColor}">当前状态：{{strOrderStatus}}</span>
            </h4>
        </el-col>


    </el-row>
    <el-row class="orderDetail">
        <el-collapse v-model="activeNames" >
            <el-collapse-item title="基本信息" name="0">
                <el-row class="basic-table">
                    <el-col  :lg="12" v-for="(item,index) in items" :key="index">
                        <div class="grid-content bg-purple" ref="mybox">
                            <el-col :span="9" class="cell-left">{{item.name}}</el-col >
                            <el-col :span="15" class="cell-right">{{item.message}}</el-col>
                        </div>
                    </el-col>
                </el-row>
            </el-collapse-item>
        </el-collapse>
    </el-row>
    <el-collapse v-model="activeNames">
        <el-collapse-item title="寄件人信息" name="1" class="selfCollapse">
            <el-row class="sender-table">
                <el-col :span="24" v-for="(senderItem,index) in senderItems" :key="index"><div class="grid-content bg-purple"><el-col :span="3">{{senderItem.name}}：</el-col ><el-col :span="18">{{senderItem.message}}</el-col></div></el-col>
            </el-row>
        </el-collapse-item>
        <el-collapse-item title="收件人信息" name="2" class="selfCollapse">
            <el-row class="sender-table">
                <el-col :span="24" v-for="(rcvrItem,index) in rcvrItems" :key="index"><div class="grid-content bg-purple"><el-col :span="3">{{rcvrItem.name}}：</el-col ><el-col :span="18">{{rcvrItem.message}}</el-col></div></el-col>
            </el-row>
        </el-collapse-item>
        <el-collapse-item title="物品信息" name="3" class="selfCollapse">
            <el-row class="goods-table">
                <el-col :span="24" v-for="(goodsItem,index) in goodsItems" :key="index"><div class="grid-content bg-purple"><el-col :span="3">{{goodsItem.name}}：</el-col ><el-col :span="18">{{goodsItem.message}}</el-col></div></el-col>
            </el-row>
        </el-collapse-item>
        <el-collapse-item title="揽收员信息" name="4" class="selfCollapse">
            <el-row class="courier-table">
                <el-col :span="24" v-for="(courier,index) in couriers" :key="index"><div class="grid-content bg-purple"><el-col :span="3">{{courier.name}}：</el-col ><el-col :span="18">{{courier.message}}</el-col></div></el-col>
            </el-row>
        </el-collapse-item>
        <el-collapse-item title="快递费用" name="5" class="selfCollapse">
            <el-row class="expressPay-table">
                <el-col :span="24" v-for="(expressPay,index) in expressPays" :key="index"><div class="grid-content bg-purple"><el-col :span="3">{{expressPay.name}}：</el-col ><el-col :span="18">{{expressPay.message}}</el-col></div></el-col>
            </el-row>
        </el-collapse-item>
        <el-collapse-item title="支付详情" name="6" class="selfCollapse" v-if="payDetailFlag">
            <el-row class="payDetail-table">
                <el-col :span="24" v-for="(payDetail,index) in payDetails" :key="index"><div class="grid-content bg-purple"><el-col :span="3">{{payDetail.name}}：</el-col ><el-col :span="18">{{payDetail.message}}</el-col></div></el-col>
            </el-row>
        </el-collapse-item>
        <el-row class="footer">
            <el-button class="return" type="primary" @click="$router.go(-1)">返回</el-button>
            <el-button class="complateInfo" @click="handleShowIfo" type="primary">{{showAllIfo}}</el-button>
            <el-button class="serverRecord" @click="handleShowServer" type="primary">查看服务记录</el-button>
            <el-button :plain="true" v-if="cancleOrderFlag" class="complateInfo" @click="handleCancleOrder" type="danger">取消订单</el-button>
            <el-button :plain="true" v-if="InvaliOrderFlag" class="serverRecord" @click="handleInvalidorder" type="danger">作废订单</el-button>
            <el-button :plain="true" v-if="OtherPayFlag" class="serverRecord" @click="handleOtherPay" type="danger">标记其他支付渠道</el-button>
            <el-button :plain="true" v-if="ChangeExpressFlag" class="serverRecord" @click="handleChangeExpress" type="danger">超时转快递</el-button>
        </el-row>
        <!--  取消原因对话框       :label-width="formLabelWidth" -->
        <el-dialog title="取消原因" :visible.sync="dialogCancelVisible" size="tiny">
            <el-form :model="cancelCause" :rules="cancelRules">
              <el-form-item label="请选择取消原因" :label-width="formLabelWidth">
               <el-select v-model="cancelCause.region" placeholder="请选择">
                    <el-option v-for="(item,index) in cancelCauseArr" :label="item"  :value="item"></el-option>
               </el-select>
              </el-form-item>
           </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCancelVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleDialogCancelSave">确 定</el-button>
              </div>
        </el-dialog>
           <!--  查看信息服务       :label-width="formLabelWidth" -->
        <el-dialog title="服务记录" :visible.sync="dialogServerVisible" :lock-scroll="!dialogServerVisible">
            <div style="max-height:300px; overflow-y: auto;" v-if="serverShow">
                <div v-for='serverList in serverLists'>
                    <el-row :span="24" class="serverList serverList1">
                        <el-col :span="6">{{serverList.time}}</el-col>
                        <el-col :span="6">{{serverList.title || '暂无信息'}}</el-col>
                    </el-row>
                    <el-row :span="24" class="serverList serverList2">
                        <el-col :span="24">原因：{{serverList.content || '无'}}</el-col>
                    </el-row>
                </div>
            </div>
            <div style="max-height:300px; overflow-y: auto;" v-if="serverShow == false" >
                    暂无服务信息！
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogServerVisible = false">关 闭</el-button>
            </div>
        </el-dialog>
         <!--  订单作废对话框       :label-width="formLabelWidth" -->
        <el-dialog title="作废订单" :visible.sync="dialogOrderVisible">
         <p style="color:red"> 该订单已经生产账单，作废后将用户取消订单不再提示用户支付。请与用户、快递方核实情况后再操作。</p>
          <el-form :model="cancelCause" :rules="cancelRules">
            <el-form-item label="作废原因">
                 <el-input  style="color:red" type="textarea" maxlength="150" placeholder="请记录具体原因，最多150字" v-model="invalid"></el-input>
           </el-form-item>
         </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogOrderVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleDialogOrderSave">确 定</el-button>
            </div>
        </el-dialog>
         <!--  标记其他渠道支付对话框       :label-width="formLabelWidth" -->
        <el-dialog title="确认标记其他渠道支付？" :visible.sync="dialogOtherpayVisible">
         <p style="color:red"> 该订单已经生产账单，标记其他渠道支付后将为用户取消账单且显示支付完成，不再提示用户支付，请与用户、快递方核实情况后再操作。</p>
          <el-form>
            <el-form-item label="标记其他渠道支付原因">
                 <el-input  style="color:red" type="textarea" maxlength="150" placeholder="请记录具体原因，最多150字" v-model="invalid1"></el-input>
           </el-form-item>
         </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogOtherpayVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleDialogOtherpaySave">确 定</el-button>
            </div>
        </el-dialog>
         <!--  超时转快递       :label-width="formLabelWidth" -->
        <el-dialog
            title="确定将该订单转为其他快递公司吗？"
            :visible.sync="dialogTimeVisible"
            size="tiny"
            :before-close="handleClose">
            <i class="el-icon-information" style="color:#f7ba2a;font-size:40px;float:left;"></i><span style="height:40px;line-height:40px;display:inline-block;float:left;padding-left:10px;">确认后该订单将由EMS上门取件，请与客户提前沟通。</span>
            <span slot="footer" class="dialog-footer" style="display:inline-block;">
                <el-button @click="dialogTimeVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleChangeExpressConfirm">确 定</el-button>
            </span>
        </el-dialog>
        <!--按钮操作-->
        <el-dialog
            title="提示"
            :visible.sync="dialogButtonVisible"
            size="tiny"
            :before-close="handleClose">
            <i class="el-icon-information"
                style="color:#f7ba2a;font-size:40px;float:left;"></i><span style="height:40px;line-height:40px;display:inline-block;float:left;padding-left:10px;">
                    {{buttonText}}
                </span>
            <span slot="footer" class="dialog-footer" style="display:inline-block;">
                <el-button type="primary" @click="handleChangeButtonConfirm">确 定</el-button>
            </span>
        </el-dialog>


    </el-collapse>
  </div>
</template>

<script>
import localEvent from 'src/vuex/function.js';

  export default {
    data() {
      return {
        orderSuccess:false,
        sendExpress:false,
        payOrder:false,
        cancleColor:false,
        activeNames: ['0','1','2','3','4',"5","6"],
        orderNo:'',
        waybillNo:'',
        expName:'',
        orderStatus:'',
        url:'',
        serverLists:'',
        dialogServerVisible:false,
        // 取消订单相关
        dialogCancelVisible:false,
        dialogOrderVisible:false,
        dialogOtherpayVisible:false,
        dialogTimeVisible:false,
        dialogButtonVisible:false,
        cancelCauseArr:[],
        payDetailFlag:false, //支付详情显示
        serverShow:true,
        buttonText:'',//button 操作失败弹框
        cancelCause:{
          region:''
        },
        cancelRules:{
          region: [
              { required: true, message: '请选择活动区域', trigger: 'change' }
            ]
        },
        cancleOrderFlag:true,
        InvaliOrderFlag:true,
        OtherPayFlag:true,
        ChangeExpressFlag:true,
        // cancelFlag:true,   // 默认没有取消
        // 作废订单相关
        invalid:'',
        invalid1:'',
        showAllIfo:'查看完整信息',
        items:[
            {name: "下单时间",message: '',},{name: "实际承运公司",message: '',},
            {name: "期望上门时间",message: '',},{name: "是否转快递",message: '',},
            {name: "接单时间",message: '',},{name: "取件码",message: '',},
            {name: "取件时间",message: '',},{name: "物流公司订单号",message: '',},
            {name: "账单回传时间",message: '',},{name: ".",message: '',},
            {name: "运单回传时间",message: '',},{name: ".",message: '',}
        ],
        senderItems:[
            {name: "寄件人",message: '',},
            {name: "联系电话",message: '',},
            {name: "寄件地址",message: '',}
        ],
       rcvrItems:[
           {name: "收件人",message: '',},
           {name: "联系电话", message: '',},
           {name: "收件地址",message: '',}
        ],
        goodsItems:[
            {name: "类型",message: '',},
            {name: "物品重量",message: '',},
            {name: "额外服务",message: '',},
            {name: "备注",message: '',}
        ],
        couriers:[
            {name: "揽件员信息",message: '',},
            {name: "联系电话",message: '',}
        ],
        expressPays:[
            {name: "支付方式",message: '',},
            {name: "预计费用",message: "",},
            {name: "账单费用",message: "",},
            {name: "实付费用",message: '',}
        ],
        payDetails:[
            {name: "支付交易号",message: '',},
            {name: "支付完成时间",message: "",},
            {name: "实际支付金额",message: "",}
        ],
        requestData:{},
      }

    },
    mounted() {
        document.body.scrollTop = '0';
        document.documentElement.scrollTop = '0';
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
            _this.$http.post(_this.url,this.requestData,(rsp)=>{
                console.log(rsp);
                console.log(rsp.orderStatus)
                console.log(rsp.payStatus)
                
                if(rsp.orderStatus == "2" || rsp.orderStatus == "1"){
                    this.cancleOrderFlag = true;
                }else{
                    this.cancleOrderFlag = false;
                }
                if(rsp.payStatus == '1' && rsp.orderStatus == '3'){
                    this.InvaliOrderFlag = true;
                    this.OtherPayFlag = true;
                }else{
                    this.InvaliOrderFlag = false;
                    this.OtherPayFlag = false;
                }
                if(rsp.orderStatus == '1'){
                    this.ChangeExpressFlag = true;
                }else{
                    this.ChangeExpressFlag = false;
                }
                if(rsp.payStatus == '3'){
                    this.payDetailFlag = true;
                }else{
                    this.payDetailFlag = false;
                }
                this.waybillNo = rsp.waybillNo|| '暂无';
                this.expName = rsp.expName|| '暂无';
                this.strOrderStatus = rsp.strOrderStatus|| '暂无';
                //基本信息
                this.items[0].message = rsp.gmtCreate || '暂无';
                this.items[1].message = rsp.actCarrierName || '暂无';
                this.items[2].message = rsp.gmtExp || '暂无';
                this.items[3].message = rsp.expNameOld? rsp.expNameOld+'转EMS':'否';//是否转运快递
                this.items[4].message = rsp.gmtAccept || '暂无';
                this.items[5].message = rsp.pickUpCode || '暂无';
                this.items[6].message = rsp.gmtTake || '暂无';
                this.items[7].message = rsp.outOrderNo || '暂无';
                this.items[8].message = rsp.gmtBill || '暂无';
                this.items[9].message = '.';
                this.items[10].message = rsp.gmtWaybill || '暂无';
                this.items[11].message = '.';
                
                if(rsp.orderStatus == '1'){
                    this.orderSuccess = true;
                    this.payOrder = false;
                    this.sendExpress = false;  
                    this.cancleColor = false;                    
                }else if(rsp.orderStatus == '4'){
                    this.cancleColor = true;
                    this.orderSuccess = false;
                    this.payOrder = false;
                    this.sendExpress = false; 
                }else if (rsp.orderStatus == '3' && rsp.payStatus == '1') {
                    this.orderSuccess = false;
                    this.payOrder = false;
                    this.sendExpress = true;    
                    this.cancleColor = false;                
                }else if (rsp.orderStatus == '3' && rsp.payStatus == '5') {
                    this.orderSuccess = false;
                    this.payOrder = false;
                    this.sendExpress = false;    
                    this.cancleColor = true;                
                }else{
                    this.payOrder = true;
                    this.orderSuccess = false;
                    this.sendExpress = false; 
                    this.cancleColor = false;
                }

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
                this.expressPays[0].message = rsp.payStatus=="5"? "其他" : '支付宝在线支付';
                this.expressPays[1].message = rsp.estimatePrice || '暂无';
                this.expressPays[2].message = rsp.orderAmount || '暂无';
                this.expressPays[3].message = rsp.receiptAmount || '暂无';

                //支付详情
                this.payDetails[0].message = rsp.tradeNo || '暂无';
                this.payDetails[1].message = rsp.gmtPayment || '暂无';
                this.payDetails[2].message = rsp.receiptAmount || '暂无';


            },(error)=>{
                console.log('failed');
            });
        },
        handleChangeButtonConfirm(){
            this.requestHttp();
            this.dialogButtonVisible = false;
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
            this.dialogServerVisible = true;
            this.$http.post("/api/order/getServiceRecord",
                {orderNo:this.orderNo},
                (rsp)=>{
                    console.log(rsp)
                    this.serverLists = rsp;
                    console.log(rsp.length)
                    if(rsp.length <= 0 ){
                        this.serverShow = false;
                    }else{
                        this.serverShow = true;
                    }
                },(error)=>{
                    this.$message({
                        type: 'error',
                        message: error.data.meta.msg
                    });
                });

        },
        handleCancleOrder(){
            this.dialogCancelVisible = true;
            this.$http.post("/api/order/cancelCause",{},(rsp)=>{
               this.cancelCauseArr = rsp;
                   console.log(rsp)
            })

         },
      handleDialogCancelSave() {
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
                                    message: '取消成功!'
                                });
                                this.requestHttp();
                                // this.cancelFlag = false;
                        },(error)=>{
                            console.log(error.data.meta.code)
                            if(error.data.meta.code == '0212'|| error.data.meta.code == '0211'){
                                this.buttonText = '该订单不能取消，请对点击确定重新操作！';
                                this.dialogButtonVisible = true;
                            }else if(error.data.meta.code == '0514'){
                                this.$message({
                                    type: 'warning',
                                    message: '该订单已取消！'
                                });
                                this.requestHttp();
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: error.data.meta.msg
                                });
                            }

                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
        },
        handleOtherPay(){
            this.dialogOtherpayVisible = true;
            this.invalid1 = '';
        },
        handleDialogOtherpaySave(){
            if(this.invalid1 == ''){
                this.$message({
                    type: 'warning',
                    message: '请填写标记其他渠道支付原因！'
                });
                return false;
            }
            this.$http.post("/api/order/otherPay",{"cause":this.invalid1,orderNo:this.orderNo},(rsp)=>{
                console.log(rsp)
                this.$message({
                    type: 'success',
                    message: '标记成功!'
                });
                this.dialogOtherpayVisible = false;
                this.requestHttp();
            },(error)=>{
                this.dialogOtherpayVisible = false;
                if(error.data.meta.code == '1101'){
                    this.buttonText = '该订单不能标记其他渠道支付，请对点击确定重新操作！';
                    this.dialogButtonVisible = true;
                }else{
                    this.$message({
                        type: 'error',
                        message: error.data.meta.msg
                    });
                }
            });

        },
        handleInvalidorder(){
            this.dialogOrderVisible = true;
            this.invalid = '';
        },
        //  确定 作废
        handleDialogOrderSave () {
            if(this.invalid == ''){
                this.$message({
                    type: 'warning',
                    message: '请填写订单作废原因！'
                });
                return false;
            }
            this.$http.post("/api/order/revoke",{"cause":this.invalid,orderNo:this.orderNo},(rsp)=>{
                this.$message({
                    type: 'success',
                    message: '作废成功!'
                });
                this.requestHttp();
                this.dialogOrderVisible = false;
            },(error)=>{
                this.dialogOrderVisible = false;
                console.log(error.data.meta.code)
                if(error.data.meta.code == '1001'){
                    this.buttonText = '该订单不能作废，请对点击确定重新操作！';
                    this.dialogButtonVisible = true;
                }else{
                    this.$message({
                        type: 'error',
                        message: error.data.meta.msg
                    });
                }

            })
        },
        handleChangeExpress(){
            this.dialogTimeVisible = true;
        },
        handleChangeExpressConfirm(){
            this.$http.post("/api/order/changeExpress",{orderNo:this.orderNo},(rsp)=>{
                    console.log(rsp)
                    this.$message({
                        type: 'success',
                        message: '转快递成功!'
                    });

                    this.requestHttp();
                    this.dialogTimeVisible = false;
            },(error)=>{
                this.dialogTimeVisible = false;
                console.log(error.data.meta.code)
                if(error.data.meta.code == '0915'){
                    this.buttonText = '该订单不能转其他快递，请对点击确定重新操作！';
                    this.dialogButtonVisible = true;
                }else{
                    this.$message({
                        type: 'error',
                        message: error.data.meta.msg
                    });
                }
            });

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
        height: 40px;
        line-height: 40px;
    }
    @media screen and (min-width: 1201px) {
        .cell-left{
            border-top: 1px solid #333;
            border-left: 1px solid #333;
            text-align: center;
            background: #eef1f6;
            box-sizing:border-box;
            white-space:nowrap;
            display: inline-block;
        }
       .cell-right{
            border-top: 1px solid #333;
            border-left: 1px solid #333;
            background: #fff;
            text-align: left;
            text-indent: 5px;
            white-space:nowrap;
            display: inline-block;
        }
        .basic-table .el-col:nth-child(2n+1) .cell-right{
            border-right: 1px solid #333;

        }
        .basic-table .el-col:nth-child(2n) .cell-left{
            border-left:0;
        }
        .basic-table .el-col:nth-child(2n) .cell-right{
            border-right:1px solid #333;
        }
        .basic-table .el-col:nth-child(11),.basic-table .el-col:nth-child(12){
            border-bottom: 1px solid #333;
        }
        .basic-table .el-col:nth-child(10),.basic-table .el-col:nth-child(12){
            color:#fff;
        }
    }

    @media screen and (max-width: 1201px) {
        .cell-left{
            border-top: 1px solid #333;        
            border-left: 1px solid #333;         
            text-align: center;
            background: #eef1f6;
            box-sizing:border-box;
            white-space:nowrap;
            display: inline-block;
        }
       .cell-right{
            border-top: 1px solid #333;        
            border-left: 1px solid #333;  
            border-right:1px solid #333;         
            background: #fff;
            text-align: left;
            text-indent: 5px;
            white-space:nowrap;
            display: inline-block;            
        }
        .basic-table .el-col:nth-child(12){
            border-bottom: 1px solid #333; 
        }
    }

    .selfCollapse .goods-table div:nth-child(2) div .el-col-18{
            color:red;
    }
    .footer{
        padding:20px 0 20px 15px;
    }
    .main .el-collapse-item__header{
        background-color: #eaeefb;
        color:#5295e2;
    }
    .main .serverList{
        line-height: 48px;
        font-size: 14px;
        border-left: 1px solid #eaeefb;
        border-right: 1px solid #eaeefb;
        padding-left: 15px;
        padding-right: 15px;
    }
    .main .serverList1{
        background-color: #eaeefb;
        color: #5295e2;
        border-bottom: 1px solid #eaeefb;
    }
    .main .serverList2{
        background-color: #fbfdff;
        color: #1f2d3d;
        border-bottom: 1px solid #eaeefb;

    }

    .success_color {
        color: #ff851b;
    }

    .pickupno_color {
        color: red;
    }

    .pickupyes_color {
        color: #00a65a;
    }
    .cancle_color {
        color: #000;
    }

</style>
