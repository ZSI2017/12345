<template>
  <div class="section main1" style="height:500px;">
    <el-row>
      <el-col :span="24" class="status-font">当前状态：
        当日用户取消 ≥          
        <el-input-number v-if="!showNumber" v-model="num1" @change="handleChange" :min="1" :max="100"></el-input-number>
        <span v-if="showNumber" style="color:red;font-size:26px;">{{ num1 }}</span>
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
        showNumber:true
      }
    },
    mounted() {
    // var localData = localEvent.get("blacklistTimes");
    // if(localData == ""){
    //     this.num1 = 5;
    // }else{
    //     this.num1 = localData;        
    // }
    let cancleUrl = "/api/commonConf/getCancelFreq";
    var _this = this;
    _this.$http.post(cancleUrl,{},(result) => {
        console.log(result)
        this.num1 = result;  
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
        this.showNumber = false;
      },
      handleCtrl(){
        this.showNumber = true;
        // localEvent.set("blacklistTimes",this.num1);
        let ctrlUrl = "/api/commonConf/updateCancelFreq";
          var _this = this;
          _this.$http.post(ctrlUrl,{'cancelFreq':this.num1.toString()},(result) => {
              console.log(result)
              // this.num1 = result;  
              this.$message({
                  type: 'success',
                  message: "订单取消频次报存成功！"
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
        var localData = localEvent.get("blacklistTimes");
        this.num1 = localData;
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

