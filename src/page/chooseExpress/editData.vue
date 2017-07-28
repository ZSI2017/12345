<template type="html">
<section class="section editData-class">
  <p style="color:#00b7f9;cursor:pointer;margin-top:0;width:100px;" @click="handleBackClick"><i class="el-icon-arrow-left"></i> 返回</p>
  <el-form ref="form" :model="form" label-width="100px" label-position="left" style="width:800px;padding-left:100px">
    <el-form-item label="名称">
      <el-input v-if="isFromAddData" v-model="form.name" placeholder="请输入运营图名称"> </el-input>
      <div class="detail-content" v-if="!isFromAddData"> {{form.name}} </div>
    </el-form-item>

    <el-form-item label="运营图">
      <el-upload v-if="isFromAddData" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="fileList2">
        <!--<i class="el-icon-plus"></i>-->
        <el-button size="small" style="width:60px;background:#f1f1f1;"><i class="el-icon-upload2"></i> </el-button>
      </el-upload>
      <img v-if="!isFromAddData" width="150px" style="float:left;" src="https://expressprod.oss-cn-hangzhou.aliyuncs.com/OperativeLogo/f2c570f3-7f84-44ca-afa9-e19a71ba10c5.png" alt="">
      <el-dialog v-model="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <el-popover ref="popover4" placement="right" trigger="click">
        <img src="https://expressprod.oss-cn-hangzhou.aliyuncs.com/OperativeLogo/f2c570f3-7f84-44ca-afa9-e19a71ba10c5.png">
      </el-popover>
      <el-button v-if="!isFromAddData" style="float:left;margin-left:20px" size="small" v-popover:popover4>查看原图</el-button>

    </el-form-item>
    <el-form-item label="排序值">
      <el-input v-if="isFromAddData" v-model="form.Forder" placeholder="请输入1-999，排序值越大越靠前"> </el-input>
      <div class="detail-content" v-if="!isFromAddData"> {{form.Forder}} </div>
    </el-form-item>
    <el-form-item label="链接">
      <el-input v-if="isFromAddData" v-model="form.link" placeholder="请输入需要跳转的链接，如果调"> </el-input>
      <div class="detail-content" v-if="!isFromAddData"> {{form.link}} </div>
    </el-form-item>
    <el-form-item label="有效时段">
      <el-date-picker v-if="isFromAddData" v-model="value3" type="datetimerange" placeholder="选择时间范围">
      </el-date-picker>
      <div class="detail-content" v-if="!isFromAddData">2223-11-22T14:22:00.000--3335-11-03T01:33:00.000</div>
    </el-form-item>
    <el-form-item label="覆盖地区">
      <el-button v-if="isFromAddData" size="mini" @click="dialogConfig">点击配置</el-button>
      <el-button v-if="!isFromAddData" size="mini" type="text" @click="dialogTable ">查看已配置</el-button>
      <!-- <el-input v-model="form.name" placeholder="点击配置"> </el-input> -->
    </el-form-item>
    <el-form-item label="当前状态">
      <el-radio-group v-if="isFromAddData" v-model="radio">
        <el-radio class="radio" :label="2">上架</el-radio>
        <el-radio class="radio" :label="1">下架</el-radio>
      </el-radio-group>
      <div class="detail-content" v-if="!isFromAddData"> {{currentStateText}} </div>
    </el-form-item>
    <el-col class="line" :span="2"> </el-col>
    <el-button v-if="isFromAddData" type="primary" @click="handleSubmit">提交</el-button>
  </el-form>

  <!-- 覆盖地区   配置对话框 -->
  <el-dialog title="覆盖地区" :visible.sync="dialogFormVisible" class="dialog-class">
    <el-row :span="24" style="margin-bottom:10px;padding-top:5px;border-top:1px solid grey">
      <el-col :span="4" style="padding-top:10px;">
        <el-checkbox v-model="check" @change="handleCheckAll($event)">全选</el-checkbox>
      </el-col>
      <el-col :span="10" style="height:10px;"></el-col>
      <el-col :span="10" style="font-weight:bold;font-size:16px;margin-top:2px;padding-left:20px;line-height:40px;height:40px;">
        快速搜索:
        <el-autocomplete class="inline-input" v-model="state1" style="float:right;" :fetch-suggestions="querySearch" placeholder="请输入搜索内容" icon="close" :on-icon-click="handleIconClick" @select="handleQuerySelect"></el-autocomplete>
      </el-col>
    </el-row>
    <el-table :data="gridData" border :show-header="showHeader" max-height="400" style="padding-top:0;">
      <el-table-column property="value" label="省" width="200">
        <template scope="scope">
            <el-tag type="primary" style="float:left;overflow:hidden;font-size:16px;width:80px;margin-right:10px;text-overflow:ellipsis">{{scope.row.value}}</el-tag>
            <el-checkbox
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
  <cover-area
      :visible="dialogTableVisible"
      :gridData="gridData"
      @listenToCoverArea ="changeVisible"
      ></cover-area>
  <!-- <el-dialog title="覆盖地区" :visible.sync="dialogTableVisible">
    <el-table :data="gridData" border :show-header="showHeader" max-height="400">
      <el-table-column property="value" label="省" width="200"></el-table-column>
      <el-table-column property="city" label="市">
        <template scope="scope">
      <el-tag
       style="margin-right:10px;margin-bottom:5px;"
        v-for="(item,index) in scope.row.city"
        >{{item}}</el-tag>
    </template>
      </el-table-column>
    </el-table>
  </el-dialog> -->
</section>
</template>
<script type="text/javascript">
import localEvent from 'src/vuex/function.js';
import coverArea from "./coverArea.vue";

export default {
  components:{
    coverArea
  },
  data() {
    return {
      // 从详情页面
      isDetail: false,
      // 即将离开的对话框

      loadingFlag: false,
      dialogVisible: false,
      // dialogImageUrl:'https://expressprod.oss-cn-hangzhou.aliyuncs.com/OperativeLogo/f2c570f3-7f84-44ca-afa9-e19a71ba10c5.png',
      fileList2: [{
        name: '运营图.jpeg',
        url: ""
      }],
      // 添加搜索框
      state1: "",
      provinces: [],
      //标签页
      activeName: 'C',
      tabPaneData: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", 'O', "P", "Q", "R"],
      // 覆盖地区选择
      check: false,
      checkAll: [],
      checkedCities: [],
      isIndeterminate: [],
      // cities: cityOptions,
      // radio 代表上下架状态的选择
      radio: "",
      // dialogFormVisible 代表是否打开配置地区的对话框
      dialogFormVisible: false,

      // 查看配置地区中的表格数据 和 是否显示的标志
      showHeader: false,
      dialogTableVisible: false,
      gridData: [],
      gridDataCopy: [],
      currentStateText: '',
      // value3 代表时间段选择的
      value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      form: {
        name: '',
        Forder: '',
        link:'',
        imageUrl:''
      }
    }
  },
  mounted() {
    var localData = localEvent.get("localChooseExpress");
    console.log(localData);
    console.log(localData.status);
    this.form.name = localData.name;
    this.form.Forder = localData.sortWeight;
    this.form.link = localData.linkUrl;
    this.fileList2[0].url = localData.imageUrl;
    this.form.gmtBegin = localData.gmtBegin;
    this.form.gmtEnd = localData.gmtEnd;  
    this.value3 = [new Date(this.form.gmtBegin), new Date(this.form.gmtEnd)];
    this.currentStateText = localData.status;
    if (localData.status == "1") {
      this.radio = 1;
    } else {
      this.radio = 2;
    }
  },
  created() {
    if ( this.$route.path == "/chooseExpress/detail"
          || this.$route.path == "/sendExpress/detail"
          || this.$route.path == "/expressOrder/detail") {
      this.isFromAddData = false;
    } else {
      this.isFromAddData = true;
    }
  },
  beforeMount() {

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
  computed: {
    GETEDITFORM() {
      alert(this.$store.getters.GETEDITFORM)
      return this.$store.getters.GETEDITFORM;
    }
  },
  methods: {
    changeVisible(flag){
      this.dialogTableVisible = flag;
    },
    //  点击提交
    handleSubmit() {
      // this.$router.app.$store.state.loadingFlag = true;
      _this.$store.dispatch('changeLoadingChange', true);
      // this.$router.app.$store.state.loadingChange = true;
      console.log(this);
      this.$router.go(-1);
    },
    // 点击返回 对应的事件处理
    handleBackClick() {
      this.$router.go(-1);
      // if (this.isFromAddData) {
      //   this.loadingFlag = true;
      // } else {
      //     this.$router.go(-1);
      // }
    },
    // 即将离开的对话框
    // editSure() {
    //   this.loadingFlag = false;
    //   this.$router.app.$store.state.loadingFlag = true;
    //   console.log(this);
    //   this.$router.go(-1);
    //   //  this.$router.push({ path:this.defaultActive});
    //   //  this.$route.push({ path:this.defaultActive});
    // },
    handlePreview() {},
    handleRemove() {},

    // 标签页选择
    handleTabClick(tab, event) {
      console.log("handTabClick");
      console.log(tab.label);
    },
    handleQueryBlur() {
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
    handleQuerySelect(items) {
      console.log(items);
      this.gridData = this.gridDataCopy.filter(function(item) {
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
      _this.$http.get("/rest/list3",
        (rsp) => {
          _this.gridData = rsp.data.data;
          _this.gridDataCopy = _this.gridData;
          _this.provinces = _this.gridData;
          // 初始化 配置的多选框操作
          var tableDataLength = _this.gridData.length;
          for (var i = 0; i < tableDataLength; i++) {
            _this.checkAll[i] = false;
            // _this.isIndeterminate[i] = true;
            _this.checkedCities[i] = [];
          }
          _this.dialogFormVisible = true;
          // console.log(_this.gridData);
        }, (error) => {
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
      _this.$http.get("/rest/list3", (rsp) => {
        _this.gridData = rsp.data.data;
        _this.dialogTableVisible = true;

        console.log(_this.gridData);
      }, (error) => {
        console.log(error);
      })
    },
    onSubmit() {
      console.log('submit!');
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.editData-class {
    label {
        font-weight: bold;
    }
    .dialog-class {
        .el-dialog__body {
            padding-top: 15px !important;
        }
    }
}
</style>
