<template>
<div class="section">
  <div class="keyword-input">
    <el-row>
      <el-col :span="6" class="import-font">关键字：</el-col>
      <el-col :span="10">
          <el-input :span="10" v-if="regFlag" :type="number" onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" v-model="keyword" size="large" @keyup.enter.native="loadData" placeholder="请输入支付宝绑定的手机号/订单号/运单号"></el-input>
          <el-input :span="10" v-if="!regFlag" :type="number" v-model="keyword" size="large" @keyup.enter.native="loadData" placeholder="请输入支付宝绑定的手机号/订单号/运单号"></el-input>
      </el-col>
      <el-col :span="4" class="import-search">
        <el-button type="primary" @click="loadData" style="width:100px;">搜 索</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top:14px;">
      <el-col :span="6" style="height:26px;"></el-col>
      <el-radio-group v-model="radio" @change="handleRadio">
        <el-radio class="radio" label="1">支付宝绑定手机号</el-radio>
        <el-radio class="radio" label="2">订单号</el-radio>
        <el-radio class="radio" label="3">运单号</el-radio>
        <el-radio class="radio" label="4">UID</el-radio>
      </el-radio-group>
    </el-row>
  </div>


  <el-table
    :data="tableData"
    stripe v-loading.body="listLoading"
    lement-loading-text="拼命加载中"
    style="width: 100%"
    max-height="3000"
  >
    <el-table-column prop="gmtCreate" align="center" width="180" label="下单时间">
    </el-table-column>
    <el-table-column align="center" label="相关订单号" width="250">
      <template scope="scope">
          <p style="text-align:left">订单号：{{scope.row.orderNo}}</p>
          <p style="text-align:left">运单号：{{scope.row.waybillNo || "-"}}</p>
      </template>
    </el-table-column>
    <el-table-column align="center" label="寄件人信息">
      <template scope="scope">
          <span>{{scope.row.snderName}}</span> <span>{{scope.row.snderMobile}}</span><br/>
          <span>{{scope.row.snderAddress}}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="收件人信息" >
      <template scope="scope">
          <span>{{scope.row.rcvrName}} {{scope.row.rcvrMobile}}</span><br/>
          <span>{{scope.row.rcvrAddress}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="expName" align="center" width="110" label="快递公司">
    </el-table-column>
    <el-table-column prop="status" align="center" label="状态" width="130">
    </el-table-column>
    <el-table-column label="操作" align="center" width="200">
      <template scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
        <el-button ref='allIfo' @click="handleEdit(scope.$index,scope.row)" type="text" size="small">{{scope.row.checked?"隐藏完整信息":"查看完整信息"}}</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="block pagination" style="margin-top:30px;float:right;">
    <el-pagination
       @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :current-page="currentPage"
       :page-sizes="[5,10,20,30]"
       :page-size="pageSize"
       layout="total,sizes,prev, pager, next,jumper" :total="totalCount">
    </el-pagination>
  </div>
</div>
</template>

<script>
import localEvent from 'src/vuex/function.js';


export default {
  data() {
    return {
      number:'number',
      regFlag:true,
      pageSize: 5,
      currentPage: 1,
      //输入框关键字
      type:"1", //检索类型（支付宝绑定手机号：1，订单号：2，运单号：3，UID：4）
      keyword: '', //输入框关键字
      url: '', // 当前页面的url
      radio: '1',
      totalCount:0,//默认数据总数
      listLoading: false, //loading框
      tableData: [],
      showAllifo:'查看完整信息',
      viewIfoArray:[],
      oldNum:0  
    }
  },
  mounted() {
      if(localEvent.get("localorderKeyword")){
          var localKeyword = localEvent.get("localorderKeyword");
          var localRadio = localEvent.get("localorderRadio");

          this.keyword = localKeyword;
          this.type = localRadio;
          this.radio = localRadio;
          console.log(localKeyword);

          this.loadData(true);
      }else{
          this.radir = '1';
          this.keyWord = '';
      }

  },
  computed:{
    keyword:{
        get:function(){
            return this.oldNum;
        
        },
        set:function(newValue){
            this.oldNum=newValue.replace(/[^\d]/g,'');
        }
    }
  },
  created() {
    this.currentPage = Number(this.PageStore.pageCount);
    this.pageSize = this.PageStore.pageSize;
    // this.loadData();
  },
  methods: {
    //从服务器读取数据
    loadData: function(pageNotChange){
      var _this =this;
      if(pageNotChange){}else {
        _this.currentPage = 1;
        _this.pageSize = 5;
        this.PageStore.commit("setPage",1);
        this.PageStore.commit("setPageSize",5);
      }
      _this.listLoading = true;
      _this.url = "/api/order/list"; // 默认展开
      if(this.keyword == ""){
        this.$message({
          message: '请输入关键字查询！',
          type: 'warning'
        });
        _this.listLoading = false;
        return;
      }
      _this.$http.post(this.url,{
        "pages": {
          "page_size": this.pageSize,
          "page_num": this.currentPage - 1
        },
        "con": {
          "type": this.type,
          "keyword": this.keyword
        }
      },(rsp)=>{
        _this.listLoading = false;
        _this.tableData = rsp.page_list;
        _this.totalCount = parseInt(rsp.pages.cnt);
        if(_this.totalCount == "0"){
          this.$message({
            message: '未查询到内容，请重新输入！',
            type: 'warning'
          });
        }
      },(error)=>{
        console.log(error)
        _this.listLoading = false;
        this.$message({
            message: '未查询到内容，请重新输入！',
            type: 'warning'
          });
        console.log('failed');
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.PageStore.commit("setPage",1);
      this.PageStore.commit("setPageSize",val);
      this.loadData(true);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.listLoading = true;
      this.PageStore.commit("setPage",val);
      this.$message(`当前页${val}`);
      var _this = this;
      _this.$http.post(this.url,{
        "pages": {
          "page_size": this.pageSize,
          "page_num": this.currentPage - 1
        },
        "con": {
          "type": this.type,
          "keyword": this.keyword
        }
      },(rsp)=>{
        _this.listLoading = false;
        _this.tableData = rsp.page_list;
        _this.totalCount = parseInt(rsp.pages.cnt);
      },(error)=>{
          console.log('failed');
      });
      // setTimeout(() => {
      //   this.listLoading = false;
      // }, 600);
      console.log(`当前页: ${val}`);
    },
    handleClick(row) {
      localEvent.set("localorderManage", row.orderNo);
      localEvent.set("localorderKeyword", this.keyword);
      localEvent.set("localorderRadio", this.radio);

      this.$router.push({path:'/orderManage/orderDetail'});
    },
    handleEdit(index,row) {

      console.log(index)
      console.log(row)
      console.log(row.orderNo)


      var orderNo = row.orderNo;
      var _this = this;
      var allIfoUrl = '/api/order/details';
      var requestData = {};
      //脱敏判断
      if(this.viewIfoArray.indexOf(row.orderNo) == -1){
        this.viewIfoArray.push(row.orderNo)
        console.log(this.viewIfoArray)
        requestData = {
          'orderNo': orderNo,
          'isFull':'1'
        }
        this.tableData[index].checked = true;
      }else{
        this.viewIfoArray.splice(this.viewIfoArray.indexOf(row.orderNo),1);
        console.log(this.viewIfoArray)
        requestData = {
          'orderNo': orderNo,
          'isFull':'0'
        }
        this.tableData[index].checked = false;

      }
      // if(this.checked  == false){
      //   requestData = {
      //     'orderNo': orderNo,
      //     'isFull':'1'
      //   }
      //   this.checked = true;
      // }else{
      //   requestData = {
      //     'orderNo': orderNo,
      //     'isFull':'0'
      //   }
      //   this.checked = false;

      // }

      _this.$http.post(allIfoUrl,requestData,(rsp)=>{
         console.log(rsp);
          row.snderName =  rsp.snderName;
          row.snderMobile = rsp.snderMobile;
          row.snderAddress = rsp.snderAddress;
          row.rcvrName = rsp.rcvrName;
          row.rcvrMobile = rsp.rcvrMobile;
          row.rcvrAddress  = rsp.rcvrAddress;
      },(error)=>{
          console.log('failed');
      });

    },
    handleRadio(){
      this.type = this.radio.toString()
      if(this.radio == 3){
        this.number = '';
        this.regFlag = false;
      }else{
        this.number = 'number';
        this.regFlag = true;
      }
    }
  }
}
</script>

<style>
.keyword-input{
  margin: 20px 0 10px;
}
.import-font{
  height:42px;
  line-height: 42px;
  text-align: right;
  padding-right: 20px;
  font-weight: 700;
}
.order-input{
  width: 500px;
}
.import-search{
  margin-left: 20px;
}


</style>
