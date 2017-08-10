<template>
<div class="section">
    <div class="keyword-input">
        <el-row>
            <el-col :span="6" class="import-font">KEY：</el-col>
            <el-col :span="10">
                <el-input :span="10" v-model="keyword" type="text" size="large" @keyup.enter.native="loadData" placeholder="请输入缓存关键字"></el-input>
            </el-col>
            <el-col :span="4" class="import-search">
                <el-button type="primary" @click="loadData" style="width:100px;">搜 索</el-button>
            </el-col>
        </el-row>
    </div>

  
    <div class=" " style="margin-top:30px;">
        缓存内容
    </div>

</div>
</template>

<script>
import localEvent from 'src/vuex/function.js';


export default {
  data() {
    return {
        keyword:'',
        tableData:[],

    }
  },
  created() {
    // this.loadData();
  },
  methods: {
    loadData(){

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
