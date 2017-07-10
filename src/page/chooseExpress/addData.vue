<template type="html">
<section class="section">
  <p style="color:#00b7f9;cursor:pointer" @click="$router.go(-1)">&lt; 返回</p>
  <el-form ref="form" :model="form" label-width="80px" label-position="left" style="width:800px;padding-left:100px">
    <el-form-item label="名称">
      <el-input v-model="form.name" placeholder="请输入运营图名称"> </el-input>
    </el-form-item>
    <el-form-item label="运营图">
      <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item label="排序值">
      <el-input v-model="form.name" placeholder="请输入1-999，排序值越大越靠前"> </el-input>
    </el-form-item>
    <el-form-item label="链接">
      <el-input v-model="form.name" placeholder="请输入需要跳转的链接，如果调"> </el-input>
    </el-form-item>
    <el-form-item label="有效时段">
      <el-date-picker v-model="value3" type="datetimerange" placeholder="选择时间范围">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="覆盖地区">
      <el-button size="mini" @click="dialogConfig">点击配置</el-button>
      <el-button size="mini" type="text" @click="dialogTable ">查看已配置</el-button>
      <!-- <el-input v-model="form.name" placeholder="点击配置"> </el-input> -->
    </el-form-item>
    <el-form-item label="当前状态">
      <el-radio class="radio" v-model="radio" label="1">上架</el-radio>
      <el-radio class="radio" v-model="radio" label="2">下架</el-radio>
    </el-form-item>
    <el-col class="line" :span="2">-</el-col>
    <el-button type="primary" @click="">提交</el-button>
  </el-form>

  <!-- 覆盖地区   配置对话框 -->
  <el-dialog title="覆盖地区" :visible.sync="dialogFormVisible">
    <!-- <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane v-for="(item,index) in tabPaneData" :label="item" :key="index" :name="item" style="font-size:20px;">{{item}}
      </el-tab-pane>
    </el-tabs> -->
    <el-row :span="24" style="margin-bottom:20px;padding-top:5px;border-top:1px solid grey">
     <el-col :span = "4" style="padding-top:10px;" >
       <el-checkbox v-model="check" @change="handleCheckAll($event)">全选</el-checkbox>
     </el-col>
     <el-col :span="12" style="height:10px;"></el-col>
      <el-col :span="8" style="font-weight:bold;font-size:20px;">
          <span>快速搜索: </span>
          <el-autocomplete
               class="inline-input"
               v-model="state1"
               :fetch-suggestions="querySearch"
               placeholder="请输入搜索内容"
                icon="close"
               :on-icon-click = "handleIconClick"
               @select="handleQuerySelect"
          ></el-autocomplete>
        </el-col>

  </el-row>
    <el-table :data="gridData" border :show-header="showHeader" max-height="400">
      <el-table-column property="value" label="省" width="200">
        <template scope="scope">
            <el-tag type="primary" style="float:left;overflow:hidden;font-size:16px;width:80px;margin-right:10px;text-overflow:ellipsis">{{scope.row.value}}</el-tag>
            <el-checkbox
                  :indeterminate="isIndeterminate[scope.$index]"
                  v-model="checkAll[scope.$index]"
                  @change="handleCheckAllChange(scope.$index,$event)"
               >全选</el-checkbox>
          </template>
      </el-table-column>
      <el-table-column property="city" label="市">
        <template scope="scope">
            <el-checkbox-group
                  v-model="checkedCities[scope.$index]"
                  @change="handleCheckedCitiesChange(scope.$index)"
                  >
                 <el-checkbox style="margin-left:0;margin-right:15px;" v-for="city in scope.row.city" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>

     </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
    </div>
  </el-dialog>

  <!--  覆盖地区 查看对话框 -->
  <el-dialog title="覆盖地区" :visible.sync="dialogTableVisible">
    <el-table :data="gridData" border :show-header="showHeader" max-height="400">
      <el-table-column property="value" label="省" width="200"></el-table-column>
      <el-table-column property="city" label="市">
        <template scope="scope">
       <el-tag
        style="margin-right:10px;"
         v-for="(item,index) in scope.row.city"
         >{{item}}</el-tag>
     </template>
      </el-table-column>
    </el-table>
  </el-dialog>

  <!-- 即将离开的 对话框  -->



</section>
</template>
<script type="text/javascript">
import {
  getLoadingFlag
} from "@/vuex/getters";
export default {
  data() {
    return {
     // 添加搜索框
     state1:"",
    //  provinces: [{
    //      "value": "三全鲜食（北新泾店）",
    //      "address": "长宁区新渔路144号"
    //    },
    //    {
    //      "value": "Hot honey 首尔炸鸡（仙霞路）",
    //      "address": "上海市长宁区淞虹路661号"
    //    },
    //    {
    //      "value": "新旺角茶餐厅",
    //      "address": "上海市普陀区真北路988号创邑金沙谷6号楼113"
    //    },
    //    {
    //      "value": "泷千家(天山西路店)",
    //      "address": "天山西路438号"
    //    },
    //    {
    //      "value": "胖仙女纸杯蛋糕（上海凌空店）",
    //      "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
    //    },
    //    {
    //      "value": "贡茶",
    //      "address": "上海市长宁区金钟路633号"
    //    },
    //    {
    //      "value": "豪大大香鸡排超级奶爸",
    //      "address": "上海市嘉定区曹安公路曹安路1685号"
    //    },
    //    {
    //      "value": "茶芝兰（奶茶，手抓饼）",
    //      "address": "上海市普陀区同普路1435号"
    //    },
    //    {
    //      "value": "十二泷町",
    //      "address": "上海市北翟路1444弄81号B幢-107"
    //    },
    //    {
    //      "value": "星移浓缩咖啡",
    //      "address": "上海市嘉定区新郁路817号"
    //    },
    //    {
    //      "value": "阿姨奶茶/豪大大",
    //      "address": "嘉定区曹安路1611号"
    //    },
    //    {
    //      "value": "新麦甜四季甜品炸鸡",
    //      "address": "嘉定区曹安公路2383弄55号"
    //    },
    //    {
    //      "value": "Monica摩托主题咖啡店",
    //      "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F"
    //    },
    //    {
    //      "value": "浮生若茶（凌空soho店）",
    //      "address": "上海长宁区金钟路968号9号楼地下一层"
    //    },
    //    {
    //      "value": "NONO JUICE  鲜榨果汁",
    //      "address": "上海市长宁区天山西路119号"
    //    },
    //    {
    //      "value": "CoCo都可(北新泾店）",
    //      "address": "上海市长宁区仙霞西路"
    //    },
    //    {
    //      "value": "快乐柠檬（神州智慧店）",
    //      "address": "上海市长宁区天山西路567号1层R117号店铺"
    //    },
    //    {
    //      "value": "Merci Paul cafe",
    //      "address": "上海市普陀区光复西路丹巴路28弄6号楼819"
    //    },
    //    {
    //      "value": "猫山王（西郊百联店）",
    //      "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306"
    //    },
    //    {
    //      "value": "枪会山",
    //      "address": "上海市普陀区棕榈路"
    //    },
    //    {
    //      "value": "纵食",
    //      "address": "元丰天山花园(东门) 双流路267号"
    //    },
    //    {
    //      "value": "钱记",
    //      "address": "上海市长宁区天山西路"
    //    },
    //    {
    //      "value": "壹杯加",
    //      "address": "上海市长宁区通协路"
    //    },
    //    {
    //      "value": "唦哇嘀咖",
    //      "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元"
    //    },
    //    {
    //      "value": "爱茜茜里(西郊百联)",
    //      "address": "长宁区仙霞西路88号1305室"
    //    },
    //    {
    //      "value": "爱茜茜里(近铁广场)",
    //      "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺"
    //    },
    //    {
    //      "value": "鲜果榨汁（金沙江路和美广店）",
    //      "address": "普陀区金沙江路2239号金沙和美广场B1-10-6"
    //    },
    //    {
    //      "value": "开心丽果（缤谷店）",
    //      "address": "上海市长宁区威宁路天山路341号"
    //    },
    //    {
    //      "value": "超级鸡车（丰庄路店）",
    //      "address": "上海市嘉定区丰庄路240号"
    //    },
    //    {
    //      "value": "妙生活果园（北新泾店）"
    //    },
    //    {
    //      "value": "香宜度麻辣香锅"
    //    },
    //    {
    //      "value": "凡仔汉堡（老真北路店）"
    //    },
    //    {
    //      "value": "港式小铺"
    //    },
    //    {
    //      "value": "蜀香源麻辣香锅（剑河路店）"
    //    },
    //    {
    //      "value": "北京饺子馆"
    //    },
    //    {
    //      "value": "饭典*新简餐（凌空SOHO店）"
    //    },
    //    {
    //      "value": "焦耳·川式快餐（金钟路店）"
    //    },
    //    {
    //      "value": "动力鸡车"
    //    },
    //    {
    //      "value": "浏阳蒸菜"
    //    },
    //    {
    //      "value": "四海游龙（天山西路店）"
    //    },
    //    {
    //      "value": "樱花食堂（凌空店）"
    //    },
    //    {
    //      "value": "壹分米客家传统调制米粉(天山店)"
    //    },
    //    {
    //      "value": "福荣祥烧腊（平溪路店）"
    //    },
    //    {
    //      "value": "速记黄焖鸡米饭",
    //    },
    //    {
    //      "value": "红辣椒麻辣烫",
    //    },
    //    {
    //      "value": "(小杨生煎)西郊百联餐厅",
     //
    //    },
    //    {
    //      "value": "阳阳麻辣烫"
    //    },
    //    {
    //      "value": "南拳妈妈龙虾盖浇饭",
    //    }
    //  ],
     provinces:[
    {
      "value": "宁夏回族自治区"
    },
    {
      "value": "澳门特别行政区"
    },
    {
      "value": "河北省"
    },
    {
      "value": "宁夏回族自治区"
    }],
      //标签页
      activeName: 'C',
      tabPaneData: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", 'O', "P", "Q", "R"],
      // 覆盖地区选择
      check: false,
      checkAll: [],
      checkedCities: [],
      isIndeterminate: [],
      // cities: cityOptions,
      // value3 代表时间段选择的
      value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      // radio 代表上下架状态的选择
      radio: 1,
      // dialogFormVisible 代表是否打开配置地区的对话框
      dialogFormVisible: false,

      // 查看配置地区中的表格数据 和 是否显示的标志
      showHeader: false,
      dialogTableVisible: false,
      gridData: [],
      gridDataCopy:[],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  created() {
    console.log(this);

  },
  beforeMount() {

  },
  mounted() {

  },
  beforeDestory() {
    alert("beforeDestory")
  },
  watch: {
    //  loadingFlag:{
    //     handler:(val,old) => {
    //          alert(val),
    //          console.log(old);
    //     }
    //  }
  },
  methods: {
    handlePreview(){},
    handleRemove(){},

    // 标签页选择
    handleTabClick(tab, event) {
      console.log("handTabClick");
      console.log(tab.label);
    },
    handleQueryBlur(){
        alert("dsfasdf");

    },
    // 搜索框
    querySearch(queryString, cb) {
      // var provinces = this.provinces;
      // var results = queryString ? provinces.filter(this.createFilter(queryString)) : provinces;
      // // 调用 callback 返回建议列表的数据
      // cb(results);
      var provinces = this.provinces;
      var results = queryString ? provinces.filter(this.createFilter(queryString)) : provinces;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      // return (province) => {
      //   return (province.province.indexOf(queryString.toLowerCase()) === 0);
      // };
      return (province) => {
        return (province.value.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleQuerySelect(items){
      console.log(items);
      this.gridData = this.gridDataCopy.filter(function(item){
             return item.value == items.value
      })
        console.log(this.gridData);
    },
    handleIconClick(ev) {
       this.gridData = this.gridDataCopy;
       this.state1 = '';
    },
    // 覆盖地区选择
    dialogConfig() {
      var _this = this;
      _this.$http.get("/rest/list3")
        .then(function(rsp) {
          _this.gridData = rsp.data.data;
          _this.gridDataCopy = _this.gridData;
          _this.provinces = _this.gridData;
          // 初始化 配置的多选框操作
          var tableDataLength = _this.gridData.length;
          for (var i = 0; i < tableDataLength; i++) {
            _this.checkAll[i] = true;
            _this.isIndeterminate[i] = true;
            _this.checkedCities[i] = [];
          }
          _this.dialogFormVisible = true;
          // console.log(_this.gridData);
        })
        .catch(function(error) {
          console.log(error);
        })
    },
    handleCheckAll(event) {
      var allCount = this.gridData.length;
      for (var m = 0; m < allCount; m++) {
        this.isIndeterminate.splice(m, 1, !event.target.checked)
        this.checkAll.splice(m, 1, event.target.checked);
        this.checkedCities.splice(m, 1, event.target.checked ? this.gridData[m].city : [])
      }
    },
    observeCheckAll() {
      let checkall = this.checkAll.filter(function(value) {
        return value === false;
      });
      let Indeterminateall = this.isIndeterminate.filter(function(value) {
        return value === true;
      })
      console.log(checkall);
      if (checkall.length === 0 && Indeterminateall.length === 0) {
        this.check = true;
        console.log(this.check);
      } else {
        this.check = false;
      }
    },
    handleCheckAllChange(index, event) {
      this.checkedCities.splice(index, 1, event.target.checked ? this.gridData[index].city : [])
      this.isIndeterminate.splice(index, 1, false);
      this.observeCheckAll();
    },
    handleCheckedCitiesChange(index) {
      let value = this.checkedCities[index];
      let checkedCount = value.length;
      this.checkAll.splice(index, 1, checkedCount === this.gridData[index].city.length)
      console.log(checkedCount + "  " + this.gridData[index].city.length + " " + this.checkAll[index]);
      this.isIndeterminate.splice(index, 1, checkedCount > 0 && checkedCount < this.gridData[index].city.length);
      this.observeCheckAll();
    },
    dialogTable() {
      var _this = this;
      _this.$http.get("/rest/list3")
        .then(function(rsp) {
          _this.gridData = rsp.data.data;
          _this.dialogTableVisible = true;

          console.log(_this.gridData);
        })
        .catch(function(error) {
          console.log(error);
        })
    },
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
label {
    font-weight: bold;
}
</style>
