<template>
<div class="section">
  <div class="keyword-input">
    <el-row>
      <el-col :span="4" class="import-font">关键字：</el-col>
      <el-col :span="10">
          <el-input :span="10" v-model="keyword" size="large" @keyup.enter.native="loadData" placeholder="请输入支付宝绑定的手机号/订单号/运单号"></el-input>
      </el-col>
      <el-col :span="4" class="import-search">
        <el-button type="primary" @click="loadData" style="width:100px;">搜 索</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top:14px;">
      <el-col :span="4" class="import-font"></el-col>
      <el-radio-group v-model="radio" @change="handleRadio">
        <el-radio class="radio" label="1">支付宝绑定手机号</el-radio>
        <el-radio class="radio" label="2">订单号</el-radio>
        <el-radio class="radio" label="3">运单号</el-radio>
        <el-radio class="radio" label="4">UID</el-radio>
      </el-radio-group>
    </el-row>
  </div>

  <!-- 表格  -->
  <el-table :data="tableData" stripe v-loading.body="listLoading" lement-loading-text="拼命加载中" style="width: 100%" max-height="400" :default-sort="{prop: 'date', order: 'descending'}">
    <el-table-column prop="gmtCreate" align="center" label="下单时间" sortable>
    </el-table-column>
    <el-table-column align="center" label="相关订单号" sortable width="160">
      <template scope="scope">
          <p>{{scope.row.orderNo}}</p>
          <p>{{scope.row.waybillNo}}</p>
      </template>
    </el-table-column>
    <el-table-column align="center" label="寄件人信息">
      <template scope="scope">
          <p>{{scope.row.snderName}} {{scope.row.snderPhone}}</p>
          <p>{{scope.row.snderAddress}}</p>
      </template>
    </el-table-column>
    <el-table-column align="center" label="收件人信息">
      <template scope="scope">
          <p>{{scope.row.rcvrName}} {{scope.row.rcvrPhone}}</p>
          <p>{{scope.row.rcvrAddress}}</p>
      </template>
    </el-table-column>
    <el-table-column prop="expName" align="center" label="快递公司">
    </el-table-column>
    <el-table-column prop="status" align="center" label="状态">
    </el-table-column>
    <el-table-column label="操作" align="center" width="200">
      <template scope="scope">
           <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
           <el-button @click="handleEdit" type="text" size="small">查看完整信息</el-button>
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
      pageSize: 5,
      currentPage: 1,
      //输入框关键字
      type:"1", //检索类型（支付宝绑定手机号：1，订单号：2，运单号：3，UID：4）
      keyword: '', //输入框关键字
      url: '', // 当前页面的url
      radio: '1',
      totalCount:0,//默认数据总数
      listLoading: false, //loading框
      // value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      tableData: [],
      // ruleForm: {
      //   name: '',
      //   region: '',
      //   date1: '',
      //   date2: '',
      //   delivery: false,
      //   resource: '',
      //   desc: ''
      // },
    }
  },
  created() {
    // this.loadData();
  },
  methods: {
    //从服务器读取数据
    loadData: function(){
      var _this =this;
      _this.url = "/api/order/getList"; // 默认展开
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
              _this.tableData = rsp.page_list;
              _this.totalCount = parseInt(rsp.pages.cnt);
      },(error)=>{
          console.log('failed');
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.loadData();
      // this.$http.post(this.url, {
      //   "pages": {
      //     "page_size": this.pageSize,
      //     "page_num": this.currentPage - 1
      //   },
      //   "con": {
      //     "type": this.type,
      //     "keyword": this.keyword
      //   }
      // }, (rsp) => {
      //   this.tableData = rsp.page_list;
      //   this.totalCount =  parseInt(rsp.pages.cnt);
      // })

      // this.$message(`每页${val}`);
      // var count = this.pageSize / 5;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loadData();

      // this.$http.post(this.url, {
      //   "pages": {
      //     "page_size": this.pageSize,
      //     "page_num": this.currentPage - 1
      //   },
      //   "con": {
      //     "type": this.type,
      //     "keyword": this.keyword
      //   }
      // }, (rsp) => {
      //   this.tableData = rsp.page_list;
      //   this.totalCount =  parseInt(rsp.pages.cnt);
      // })

      // var _this = this;
      this.listLoading = true;
      this.$message(`当前页${val}`);
      // var count = this.pageSize / 5;
      // if (count == 1) {
      //   this.table2 = this.tableData[val - 1];
      // } else {
      //   if (val == 1) {
      //     var temp = [];
      //     for (var i = 0; i < count; i++) {
      //       temp = temp.concat(this.tableData[i]);
      //     }
      //     this.table2 = temp;
      //   } else {
      //     var temp = [];
      //     for (var i = count; i < 4; i++) {
      //       temp = temp.concat(this.tableData[i]);
      //     }
      //     this.table2 = temp;
      //   }
      // }


      setTimeout(() => {
          this.listLoading = false;
      }, 600);
      console.log(`当前页: ${val}`);
    },
    handleClick(row) {
      localEvent.set("localorderManage", row);
      this.$router.push({path:'/orderManage/orderDetail'});
    },
    handleEdit() {
      this.$notify({
        title: "点击了编辑",
        message: "即将跳转到编辑界面"
      })
    },
    handleRadio(){
      this.type = toString(this.radio)
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
