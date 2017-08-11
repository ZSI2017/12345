<template>
<div class="section">
    <div class="keyword-input">
        <el-row>
            <el-col :span="6" class="import-font">KEY：</el-col>
            <el-col :span="10">
                <el-input :span="10" v-model="keyword" type="text" size="large" @keyup.enter.native="handleSearchData" placeholder="请输入缓存关键字"></el-input>
                
            </el-col>
            <el-col :span="4" class="import-search">
                <el-button type="primary" @click="handleSearchData" style="width:100px;">搜 索</el-button>
                <el-button type="primary" v-if='detButtonShow' @click="handleDelete" style="width:100px;">删 除</el-button>                
            </el-col>
        </el-row>
    </div>


    <div class="cache" style="margin-top:30px;">
        缓存内容:
        {{cecheData}}
    </div>

</div>
</template>

<script>
import localEvent from 'src/vuex/function.js';


export default {
  data() {
    return {
        keyword:'',
        url:'/api/ocs/info/get',
        tableData:[],
        detButtonShow:false,
        cacheData:'',
    }
  },
  created() {
    // this.loadData();
  },
  methods: {
    handleSearchData(){
      this.$http.post(this.url,{
          "key":this.keyword
      },(rsp)=>{
        // _this.listLoading = false;
        console.log(rsp)
        

        this.$message({
          message: '查询到内容！',
          type: 'success'
        });

      },(error)=>{
        this.$message({
            message: '未查询到内容，请重新输入！',
            type: 'warning'
          });
        console.log('failed');
      });
    },

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
.import-search{
  margin-left: 20px;
}     


</style>
