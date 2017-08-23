<template>
  <div class="section main1" style="height:500px;">
    <el-row>
      <el-col :span="24" class="status-font">当前状态：
        当日用户取消 ≥          
        <el-input-number v-if="!showNumber" v-model="num1" @change="handleChange" :min="1" :max="100"></el-input-number>
        <span v-if="showNumber" style="color:red;font-size:26px;">{{ num2 }}</span>
        单，将被列为黑名单   
      </el-col>
      <el-col :span="4" v-if="showNumber">
        <el-button type="primary" @click="handleShift" size="large">修改</el-button>
      </el-col> 
      <el-col :span="4" v-if="!showNumber">
        <el-button type="primary" @click="handleCtrl" size="large">保存</el-button> 
        <el-button @click="handleCancle" size="large">取消</el-button>        
      </el-col>     
    </el-row>
  </div>

</template>
<script>
import localEvent from 'src/vuex/function.js';

  export default {
    data() {
      return {
        num1: "",
        num2:"",
        showNumber:true
      }
    },
    mounted() {
    let cancleUrl = "/api/commonConf/getCancelFreq";
    var _this = this;
    _this.$http.post(cancleUrl,{},(result) => {
        console.log(result)
        this.num2 = result;  
    },(error) => {
        this.$message({
            type: 'error',
            message: error.data.meta.code+"--"+error.data.meta.msg
        });
    });


  },
    methods: {
      handleChange(value) {
        console.log(value);
      },
      handleShift(){
        this.num1 = this.num2;
        this.showNumber = false;
      },
      handleCtrl(){
        this.showNumber = true;
        let ctrlUrl = "/api/commonConf/updateCancelFreq";
          var _this = this;
          this.num2 = this.num1;          
          _this.$http.post(ctrlUrl,{'cancelFreq':this.num1.toString()},(result) => {
              console.log(result)
              this.$message({
                  type: 'success',
                  message: `订单取消频次保存成功！`
              });

          },(error) => {
              this.$message({
                  type: 'error',
                  message: error.data.meta.code+"--"+error.data.meta.msg
              });
          });
      },
      handleCancle(){
        this.showNumber = true;
      }
    }
  };
</script>

<style lang="scss">
.main1{
    .status-font{
      margin: 10px 0;
    }
} 

</style>

