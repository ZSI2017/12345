<template>
<div class="sendExpressEnter">
  <el-row class="demo-autocomplete">
    <el-col :span="12">
      <div class="sub-title">激活即列出输入建议</div>
      <el-autocomplete
          class="inline-input"
          v-model="state1"
          :fetch-suggestions="querySearch"
          @focus="handleQueryFocus"
          v-on:focus="alert(1)"
          :change.native="handleQueryBlur"
           icon="close"
           :on-icon-click = "handleIconClick"
           placeholder="请输入搜索内容" ></el-autocomplete>
    </el-col>
          <el-input
               size="large"
               placeholder="请输入内容"
               @blur="handleQueryBlur"
               >
         </el-input>
    <el-col :span="12">
      <div class="sub-title">输入后匹配输入建议</div>
      <el-autocomplete class="inline-input" v-model="state2" :fetch-suggestions="querySearch" placeholder="请输入内容" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
    </el-col>
  </el-row>

</div>
</template>
<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
  data() {
    return {
      restaurants: [{
          "value": "三全鲜食（北新泾店）",
          "address": "长宁区新渔路144号"
        },
        {
          "value": "Hot honey 首尔炸鸡（仙霞路）",
          "address": "上海市长宁区淞虹路661号"
        },
        {
          "value": "新旺角茶餐厅",
          "address": "上海市普陀区真北路988号创邑金沙谷6号楼113"
        },
        {
          "value": "泷千家(天山西路店)",
          "address": "天山西路438号"
        },
        {
          "value": "胖仙女纸杯蛋糕（上海凌空店）",
          "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
        },
        {
          "value": "贡茶",
          "address": "上海市长宁区金钟路633号"
        },
        {
          "value": "豪大大香鸡排超级奶爸",
          "address": "上海市嘉定区曹安公路曹安路1685号"
        },
        {
          "value": "茶芝兰（奶茶，手抓饼）",
          "address": "上海市普陀区同普路1435号"
        },
        {
          "value": "十二泷町",
          "address": "上海市北翟路1444弄81号B幢-107"
        },
        {
          "value": "星移浓缩咖啡",
          "address": "上海市嘉定区新郁路817号"
        },
        {
          "value": "阿姨奶茶/豪大大",
          "address": "嘉定区曹安路1611号"
        },
        {
          "value": "新麦甜四季甜品炸鸡",
          "address": "嘉定区曹安公路2383弄55号"
        }
      ],
      state1: '',
      state2: ''
    };
  },
  methods: {
    handleQueryBlur(event){
        console.log("sadfsdfdsevent")
    },
    handleQueryFocus(event) {
         console.log(event);
    },
    handleIconClick(ev){
       console.log(ev);
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return ;
    },
    handleSelect(item) {
      console.log(item);
    }
  },
  mounted() {
    // this.restaurants = this.loadAll();
  }
};
</script>

<style lang="scss">
  .sendExpressEnter{



  }
</style>
