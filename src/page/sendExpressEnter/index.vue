<template>
  <div class="sendExpressEnter">
    <!-- <el-row>
      <el-col :span="2" class="import-font">关键字：</el-col>
      <el-col :span="10">
          <el-input :span="10" v-model="input" size="large" placeholder="请输入支付宝绑定的手机号/订单号/运单号"></el-input>
      </el-col>
      <el-col :span="4" class="import-search">
        <el-button type="primary" size="large">搜 索</el-button>
      </el-col>
    </el-row> -->
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
 <div style="margin: 15px 0;"></div>
 <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
   <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
 </el-checkbox-group>
  </div>

</template>
<script>
    const cityOptions = ['上海', '北京', '广州', '深圳'];
    export default {
      data() {
        return {
          checkAll: true,
          checkedCities: ['上海', '北京'],
          cities: cityOptions,
          isIndeterminate: true
        };
      },
      methods: {
        handleCheckAllChange(event) {
          this.checkedCities = event.target.checked ? cityOptions : [];
          this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
          console.log("value");
          console.log(this.checkedCities);
          let checkedCount = value.length;
          this.checkAll = checkedCount === this.cities.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        }
      }
    };
</script>

<style>
.import-font{
  height:42px;
  line-height: 42px;
}
.order-input{
  width: 500px;
}
.import-search{
  margin-left: 20px;
}

</style>
