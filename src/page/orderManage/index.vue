<template>
<div class="section">
  <div class="keyword-input">
    <el-row>
      <el-col :span="4" class="import-font">关键字：</el-col>      
      <el-col :span="10">
          <el-input :span="10" v-model="input" size="large" placeholder="请输入支付宝绑定的手机号/订单号/运单号"></el-input>
      </el-col>
      <el-col :span="4" class="import-search">
        <el-button type="primary" style="width:100px;">搜 索</el-button>
      </el-col>   
    </el-row>
    <el-row style="margin-top:14px;">
      <el-col :span="4" class="import-font"></el-col>            
      <el-radio class="radio" v-model="radio" label="1">支付宝绑定手机号</el-radio>
      <el-radio class="radio" v-model="radio" label="2">订单号</el-radio>
      <el-radio class="radio" v-model="radio" label="3">运单号</el-radio>
      <el-radio class="radio" v-model="radio" label="4">UID</el-radio>
      
    </el-row>
  </div>

  <!-- 表格  -->
  <el-table :data="tableData" stripe v-loading.body="listLoading" lement-loading-text="拼命加载中" style="width: 100%" max-height="400" :default-sort="{prop: 'date', order: 'descending'}">
    <el-table-column prop="orderTime" label="下单时间" sortable width="180">
    </el-table-column>
    <el-table-column prop="ordernumber" label="相关订单号" sortable width="180">
    </el-table-column>
    <el-table-column prop="sendifo" label="寄件人信息">
    </el-table-column>
    <el-table-column prop="recipientifo" label="收件人信息">
    </el-table-column>
    <el-table-column prop="company" label="快递公司">
    </el-table-column>
    <el-table-column prop="status" label="状态">
    </el-table-column>
    <el-table-column label="操作" width="200">
      <template scope="scope">
           <el-button @click="handleClick" type="text" size="small">详情</el-button>
           <el-button @click="handleEdit" type="text" size="small">查看完整信息</el-button>
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
       layout="total,sizes,prev, pager, next,jumper" :total="totalCount">
    </el-pagination>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      pageSize: 5,
      input: '',
      radio: '1',
      totalCount:1000,//默认数据总数
      listLoading: false,
      currentPage4: 1,
      // value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      tableData: [
      
      ],
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    //从服务器读取数据
    loadData: function(){    
      var _this =this;                
        _this.$http.get("./rest/list5").then(function(rsp){
            _this.tableData = rsp.data.data;  //表格
            _this.totalCount = rsp.data.data.length; //获取数据长度
        },function(){
            console.log('failed');
        });                 
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
      this.$router.push({path:'./orderDetail'});
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