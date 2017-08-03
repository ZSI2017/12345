<template type="html">
<section class="section">
  <p style="color:#00b7f9;cursor:pointer;margin-top:0;width:100px;" @click="handleBackClick"><i class="el-icon-arrow-left"></i> 返回</p>
  <el-alert
       style="margin-left:100px;margin-bottom:30px;width:800px;"
       title="检查表单数据"
       type="error"
       v-if="showAlert"
       >
  </el-alert>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" label-position="left" style="width:800px;padding-left:100px">
    <el-form-item label="名称" prop="name">
      <el-input v-model.trim="ruleForm.name" placeholder="请输入运营图名称"> </el-input>
    </el-form-item>
    <el-form-item label="运营图" prop="imageUrl">
      <el-upload
        class="upload-demo"
        action="http://sendexmng-sit.alipay-eco.com/api/promotion/upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success='handleSuccess'
        :on-error='handlerror'
        >
        <el-dialog v-model="dialogVisible" size="tiny">
          <img width="100%" :src="ruleForm.fileList" alt="">
        </el-dialog>
        <el-button size="small" style="width:60px;background:#f1f1f1;"><i class="el-icon-upload2"></i> </el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item label="排序值" prop="sortWeight">
      <el-input v-model.number="ruleForm.sortWeight" placeholder="请输入1-999，排序值越大越靠前"> </el-input>
    </el-form-item>
    <el-form-item label="链接" prop="linkUrl">
      <el-input v-model.trim="ruleForm.linkUrl" placeholder="请输入需要跳转的链接，如果跳外部链接必须以http://开头"> </el-input>
    </el-form-item>
    <el-form-item label="有效时段">
      <el-date-picker
         v-model="ruleForm.date1"
         type="datetimerange"
         placeholder="选择时间范围">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="覆盖地区" prop="coverArea">
      <el-button size="mini" @click="dialogConfig">点击配置</el-button>
      <el-button size="mini" type="text" @click="dialogTable ">查看已配置</el-button>
      <!-- <el-input v-model="form.name" placeholder="点击配置"> </el-input> -->
    </el-form-item>
    <el-form-item label="当前状态" prop="status">
      <el-radio-group v-model="ruleForm.status">
        <el-radio class="radio" v-model="radio" label="1">上架</el-radio>
        <el-radio class="radio" v-model="radio" label="2">下架</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-col class="line" :span="2"> </el-col>
    <el-button type="primary" @click="handleSubmit('ruleForm')">提交</el-button>
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
    <el-table :data="gridData" border :show-header="showHeader" max-height="400">
      <el-table-column property="provinceName" label="省" width="200">
        <template scope="scope">
            <el-tag type="primary" style="float:left;overflow:hidden;font-size:16px;width:80px;margin-right:10px;text-overflow:ellipsis">{{scope.row.provinceName}}</el-tag>
            <el-checkbox
                  v-model="checkAll[scope.$index]"
                  @change="handleCheckAllChange(scope.$index,$event)"
               >全选</el-checkbox>
          </template>
      </el-table-column>
      <el-table-column property="citys" label="市">
        <template scope="scope">
            <el-checkbox-group
                  v-model="checkedCities[scope.$index]"
                  @change="handleCheckedCitiesChange(scope.$index)"
                  >
                 <el-checkbox style="margin-left:0;margin-right:15px;"
                   @change="handleCheckedEveryChange(scope.$index,index,$event)"
                  v-for="(city,index) in scope.row.citys" :label="city.cityName" :key="city.cityName">{{city.cityName}}</el-checkbox>
            </el-checkbox-group>

     </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleDialogConfigCancel">取 消</el-button>
      <el-button type="primary" @click="handleDialogConfigSave">保 存</el-button>
    </div>
  </el-dialog>

  <!--  覆盖地区 查看对话框 -->
  <cover-area
      :visible="dialogTableVisible"
      :coverGridData="CoverData"
      @listenToCoverArea ="changeVisible"
      ></cover-area>
</section>
</template>
<script type="text/javascript">
  import {
    formatDate
  } from 'src/util/date.js';
  import coverArea from "@/page/chooseExpress/coverArea.vue";
  import localEvent from 'src/vuex/function.js';
export default {
  components:{
     coverArea
  },
  data() {
    return {
     // 展示警告信息
      showAlert:false,
      dialogVisible:false,
      // 添加搜索框
      state1: "",
      provinces: [],
      // 覆盖地区选择
      check: false,
      checkAll: [],
      checkedCities: [],
      isIndeterminate: [],
      // radio 代表上下架状态的选择
      radio: 1,
      url:'/api/promotion/saveAudit',
      // dialogFormVisible 代表是否打开配置地区的对话框
      dialogFormVisible: false,
      // 查看配置地区中的表格数据 和 是否显示的标志
      showHeader: false,
      dialogTableVisible: false,
      gridData: [],
      gridDataCopy: [],
      // 对输入表单进行验证
      ruleForm: {
        name: '',
        sortWeight: '',
        linkUrl: '',
        date1: '',
        gmtBegin:'',
        gmtEnd:'',
        status: '',
        fileList: []

      },
      // pickerOptions2: {
      //   onPick:function({ maxDate, minDate }){
      //     // var minDate = new Date(minDate);
      //     // var maxDate = new Date(maxDate);
      //     console.log(minDate)
      //     console.log(maxDate)
      //     this.ruleForm.gmtBegin = formatDate(minDate);
      //     this.ruleForm.gmtEnd = formatDate(maxDate);
      //     console.log(this.ruleForm.gmtBegin)
      //     console.log(this.ruleForm.gmtEnd)
      //
      //   }
      // },
      rules: {
        name: [{
          type: "string",
          required: true,
          message: '请输入运营图名称',
          trigger: 'blur'
        }, ],
        sortWeight: [
          { required: true, message: '排序值不能为空'},
          { type: 'number', message: '排序值必须为数字值'}
        ],
        linkUrl: [{
          required: true,
          message: "请输入链接",
          trigger: 'blur'
        }],
        date1: [{
          type: 'date',
          required: true,
          message: '请选择日期',
          trigger: 'change'
        }],
        status: [{
          required: true,
          message: '请选择状态',
          trigger: 'change'
        }],
        // imageUrl: [{
        //   required: true,
        //   message: '请上传图片'
        // }],
        // coverArea: [{
        //   required: true,
        //   message: '请选择覆盖地区'
        // }]
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
    changeVisible(flag){
      this.dialogTableVisible = flag;
    },
    //  点击提交
    handleSubmit(formName) {
      var _this = this;
     // alert(this.ruleForm),
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('error submit');
          // router.app.$store.state.loadingChange = true
          // _this.$router.app.$store.state.loadingChange = true;
          // _this.$store.dispatch('changeLoadingChange',true);
          // _this.$router.go(-1);
          //开始/结束 日期转换为  yyyy-MM-dd hh:mm:ss 格式
          let submitDate = _this.ruleForm.date1;
          console.log(submitDate)
          this.ruleForm.gmtBegin = formatDate(submitDate[0], 'yyyy-MM-dd hh:mm:ss');
          this.ruleForm.gmtEnd = formatDate(submitDate[1], 'yyyy-MM-dd hh:mm:ss');
          console.log(this.ruleForm.gmtBegin)
          console.log(this.ruleForm.gmtEnd)

          let httpData = {
                "data": {
                  "pageId": "",
                  "name": _this.ruleForm.name,
                  "imageUrl": _this.ruleForm.fileList,
                  "sortWeight": 12,
                  "linkUrl": _this.ruleForm.linkUrl,
                  "gmtBegin": _this.ruleForm.gmtBegin,
                  "gmtEnd": _this.ruleForm.gmtEnd,
                  "opStatus": _this.ruleForm.Status
                },
                "area": {
                  "code": "000000",
                  "check": true,
                  "provinces": _this.gridData,

                }
              };
            _this.$http.post(_this.url,httpData, (result) => {
            _this.tableData = result.page_list;
            _this.totalCount = parseInt(result.pages.cnt);
          },(error)=>{
             console.log(error)
          });

          // console.log(this.$route.matched);

        } else {
          console.log(_this);
          _this.showAlert = true;
          return false;
        }
      })
    },
    // 点击返回 对应的事件处理
    handleBackClick() {
        this.$router.go(-1);
      // this.loadingFlag = true;
    },
    handlePreview(file) {
      this.dialogVisible = true;
      console.log(file.response)
    },
    handleSuccess(file){
      console.log(file.result)
      this.ruleForm.fileList = file.result;
    },
    handlerror(err, file, fileList){
      alert(err);
      alert(file);
      alert(fileList);
    },
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
      // var _this = this;
      // _this.$http.get("/rest/list3", (rsp) => {
      //   _this.gridData = rsp.data.data;
      //   _this.gridDataCopy = _this.gridData;
      //   _this.provinces = _this.gridData;
      //   // 初始化 配置的多选框操作
      //   var tableDataLength = _this.gridData.length;
      //   for (var i = 0; i < tableDataLength; i++) {
      //     _this.checkAll[i] = false;
      //     // _this.isIndeterminate[i] = true;
      //     _this.checkedCities[i] = [];
      //   }
      //   _this.dialogFormVisible = true;
      //   // console.log(_this.gridData);
      // }, (error) => {
      //   console.log(error);
      // })
      if(this.gridData.length>0){
          if(this.DialogConfigSaveFlag){
              this.dialogFormVisible = true;
              return;
          }else {
              let localResult = localEvent.get("gridData")
              this.gridData = localResult.provinces;
              console.log("12344444444444444%o",this.gridData);
              this.initCheckBox(localResult.check)
            return;
          }
      }
      var _this = this;
      var URL = "/api/promotion/areaAudit";   // 默认是 配置 中的覆盖地区
      // _this.$http.post(URL,{id:"0"},
      //   (rsp) => {
        var rsp =  {
        "code": "000000",
        "check": false,
        "provinces": [
            {
                "provinceNo": "340000",
                "provinceName": "安徽省",
                "check": false,
                "city":[1,2,3,4],
                "citys": [
                    {
                        "cityNo": "340800",
                        "cityName": "安庆市",
                        "check": true,
                        "currStatus": "0"
                    },
                    {
                        "cityNo": "340300",
                        "cityName": "蚌埠市",
                        "check": true,
                        "currStatus": "0"
                    },
                    {
                        "cityNo": "341700",
                        "cityName": "池州市",
                        "check": false,
                        "currStatus": "0"
                    },
                    {
                        "cityNo": "341100",
                        "cityName": "滁州市",
                        "check": false,
                        "currStatus": "0"
                    },
                    {
                        "cityNo": "341200",
                        "cityName": "阜阳市",
                        "check": false,
                        "currStatus": "0"
                    },
                    {
                        "cityNo": "340100",
                        "cityName": "合肥市",
                        "check": false,
                        "currStatus": "0"
                    },
                    {
                        "cityNo": "340600",
                        "cityName": "淮北市",
                        "check": false,
                        "currStatus": "0"
                    },
                    {
                        "cityNo": "340400",
                        "cityName": "淮南市",
                        "check": false,
                        "currStatus": "0"
                    },
                    {
                        "cityNo": "341000",
                        "cityName": "黄山市",
                        "check": false,
                        "currStatus": "0"
                    },
                    {
                        "cityNo": "341500",
                        "cityName": "六安市",
                        "check": false,
                        "currStatus": "0"
                    },
                    {
                        "cityNo": "340500",
                        "cityName": "马鞍山市",
                        "check": false,
                        "currStatus": "0"
                    },
                    {
                        "cityNo": "341300",
                        "cityName": "宿州市",
                        "check": false,
                        "currStatus": "0"
                    },
                    {
                        "cityNo": "340700",
                        "cityName": "铜陵市",
                        "check": false,
                        "currStatus": "0"
                    },
                    {
                        "cityNo": "340200",
                        "cityName": "芜湖市",
                        "check": false,
                        "currStatus": "0"
                    },
                    {
                        "cityNo": "341800",
                        "cityName": "宣城市",
                        "check": false,
                        "currStatus": "0"
                    },
                    {
                        "cityNo": "341600",
                        "cityName": "亳州市",
                        "check": true,
                        "currStatus": "0"
                    }
                ],
                "currStatus": "0"
            },
            {
                "provinceNo": "110000",
                "provinceName": "北京",
                "check": false,
                "citys": [
                    {
                        "cityNo": "110100",
                        "cityName": "北京市",
                        "check": false,
                        "currStatus": "0"
                    }
                ],
                "currStatus": "0"
            }
        ],
        "currStatus": "0"
    };
        // rsp.provinces =
          _this.gridData = rsp.provinces.slice(0);
              localEvent.set("gridData", rsp);
              _this.initCheckBox(rsp.check);
          // _this.gridDataCopy123 = _this.gridData.slice(0);

          // console.log(_this.gridData);
        // }, (error) => {
        //   console.log(error);
        // })
    },
    initCheckBox(isAllcheck){
      // console.log(_this.gridDataCopy);

      this.provinces = this.gridData;
      // 初始化 配置的多选框操作
      for (var i = 0; i < this.gridData.length; i++) {
        // _this.isIndeterminate[i] = true;
          this.checkedCities[i] = [];
           if(this.gridData[i].check){
              this.checkAll[i] = true;
              for(let j = 0;j<this.gridData[i].citys.length;j++) {
                  this.checkedCities[i].push(this.gridData[i].citys[j].cityName)
              }
           }else {
              this.checkAll[i] = false;
              for(let j = 0;j<this.gridData[i].citys.length;j++) {
                  if(this.gridData[i].citys[j].check) {

                    this.checkedCities[i].push(this.gridData[i].citys[j].cityName)
                  }
              }
           }
      }
      console.log(this.checkAll);
      // 检查是否 全选
      this.check = isAllcheck;
      if(this.check){
        this.handleCheckAll({target:{checked:true}})
      }
      this.dialogFormVisible = true;

    },
    handleCheckAll(event) {
      var allCount = this.gridData.length;
      for (var m = 0; m < allCount; m++) {
        this.isIndeterminate.splice(m, 1, !event.target.checked)
        this.checkAll.splice(m, 1, event.target.checked);
        let CityAllCity = [];
        for(let i =0;i<this.gridData[m].citys.length;i++) {
           CityAllCity.push(this.gridData[m].citys[i].cityName)
        };
        this.checkedCities.splice(m, 1, event.target.checked ? CityAllCity : [])
      }

    },
    // 配置覆盖地区 取消
    handleDialogConfigCancel(){
        this.dialogFormVisible = false
        this.DialogConfigSaveFlag = false;
    },
    // 配置覆盖地区 保存
    handleDialogConfigSave(){
        localEvent.set("gridData",{"provinces":this.gridData,"check":this.check,code:"000000"})
        this.dialogFormVisible = false;
        this.DialogConfigSaveFlag = true;

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
      // 改变数据状态
      let flag = event.target.checked
      this.gridData[index].check = flag;
      for(let j =0 ;j<this.gridData[index].citys.length;j++) {
             this.gridData[index].citys[j].check = flag;
            //  console.log(this.gridData[index].citys[j]);
      }
      let CityAllCity = [];
      for(let i =0;i<this.gridData[index].citys.length;i++) {
         CityAllCity.push(this.gridData[index].citys[i].cityName)
      };
      this.checkedCities.splice(index, 1, event.target.checked ? CityAllCity : [])
      this.isIndeterminate.splice(index, 1, false);
      // console.log("%c handleCheckAllChange &o","font-size:20px",this.gridDataCopy123);
      this.observeCheckAll();
    },
    handleCheckedCitiesChange(index) {
      let value = this.checkedCities[index];
      let checkedCount = value.length;
      // if(checkedCount === this.gridData[index].citys.length) {
         this.gridData[index].check = checkedCount === this.gridData[index].citys.length;
      // }else {
      //    this.gridData[index].check = false;
      // }
      this.checkAll.splice(index, 1, checkedCount === this.gridData[index].citys.length)
      // console.log(checkedCount + "  " + this.gridData[index].city.length + " " + this.checkAll[index]);
      // this.isIndeterminate.splice(index, 1, checkedCount > 0 && checkedCount < this.gridData[index].citys.length);
      this.observeCheckAll();
    },
    handleCheckedEveryChange(outIndex,index,event) {
        this.gridData[outIndex].citys[index].check = event.target.checked;
    },
    dialogTable() {
      let localResult = localEvent.get("gridData")
      this.CoverData = localResult.provinces;
      this.dialogTableVisible = true;
    },
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
label {
    font-weight: bold;
}
.dialog-class {
    .el-dialog__body{
       padding-top:15px !important;

    }
}

</style>
