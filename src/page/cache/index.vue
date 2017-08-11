<template>
<div class="section">
    <div class="keyword-input">
        <el-row :span="24">
            <el-col :span="6" class="import-font">KEY：</el-col>
            <el-col :span="10">
                <el-input :span="10" v-model="keyword" type="text" size="large" @keyup.enter.native="loadData" placeholder="请输入缓存关键字"></el-input>
            </el-col>
            <el-col :span="4" class="import-search">
                <el-button type="primary" @click="loadData" style="width:100px;">搜 索</el-button>
                <el-button v-if="hasData" type="primary" @click="clearData" style="width:100px;">清 除</el-button>
            </el-col>

        </el-row>
    </div>
    <div class=" " style="margin-top:30px;">
        缓存内容
    </div>

<pre>
    <code v-html="content" style="display: block;overflow-x: auto;font-size:20px;padding: 0.5em;background: #474949;color: #d1d9e1;" >
    </code>
</pre>



</div>
</template>

<script>
import localEvent from 'src/vuex/function.js';
import hljs from "highlight.js";
import "@/style/tomorrow-night-eighties.css"


export default {
  data() {
    return {
        hasData:false,
        keyword:'',
        url:'/api/ocs/info/get',
        tableData:[],
        content:{
                  code:'adsfasdf',
                   backgroudn:'ADSFASDF',
              },

    }
  },
  created() {

    console.log(hljs);
    // this.loadData();
  },
  mounted() {

  },
  methods: {
    loadData(){
      var _this =this;
      this.$http.post(this.url,{
          "key":this.keyword
      },(rsp)=>{
         _this.content = rsp;
         _this.hasData = true;
        // _this.listLoading = false;
        console.log(rsp)
        // _this.tableData = rsp.page_list;
        // _this.totalCount = parseInt(rsp.pages.cnt);
        // if(_this.totalCount == "0"){
        //   this.$message({
        //     message: '未查询到内容，请重新输入！',
        //     type: 'warning'
        //   });
        // }
      },(error)=>{
        this.$message({
            message: '未查询到内容，请重新输入！',
            type: 'warning'
          });
        console.log('failed');
      });
    },
    clearData() {
      var _this =this;
      this.$http.post(this.url,{
          "key":this.keyword
      },(rsp)=>{
         _this.content = '';
         _this.hasData = false;
         this.$message({
             message: '清除成功',
             type: 'success'
           });
      },(error)=>{
        this.$message({
            message: '清除失敗，請重試！',
            type: 'warning'
          });
      });
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
.import-search{
  margin-left: 20px;
}


</style>
