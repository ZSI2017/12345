<template type="html">
<section class="section editData-class">
  <p style="color:#00b7f9;cursor:pointer;margin-top:0;width:100px;" @click="handleBackClick"><i class="el-icon-arrow-left"></i> 返回</p>
  <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="left" style="width:800px;padding-left:100px">
    <el-form-item label="名称" prop="name">
      <el-input v-if="isFromAddData" v-model="form.name" placeholder="请输入运营图名称"> </el-input>
      <div class="detail-content" v-if="!isFromAddData"> {{form.name}} </div>
    </el-form-item>
    <el-form-item label="运营图" prop="fileList2">
      <el-upload v-if="isFromAddData"
        action="http://sendexmng-sit.alipay-eco.com/api/promotion/upload"
        :on-change="handleImageChange"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success='handleSuccess'
        :on-error='handlerror'
        :file-list="form.fileList2">
        <!--<i class="el-icon-plus"></i>-->
        <el-button size="small" style="width:60px;background:#f1f1f1;"><i class="el-icon-upload2"></i> </el-button>
      </el-upload>
      <img v-if="!isFromAddData" width="100px" style="float:left;" :src="form.fileList2[0].url" alt="">

      <el-popover ref="popover4" placement="right" trigger="click">
        <img :src="form.fileList2[0].url">
      </el-popover>
      <el-button v-if="!isFromAddData" style="float:left;margin-left:20px" size="small" v-popover:popover4>查看原图</el-button>
    </el-form-item>
    <el-form-item label="排序值" prop="Forder">
      <el-input v-if="isFromAddData" v-model.number="form.Forder" placeholder="请输入1-999，排序值越大越靠前"> </el-input>
      <div class="detail-content" v-if="!isFromAddData"> {{form.Forder}} </div>
    </el-form-item>
    <el-form-item label="链接" prop="link">

      <el-select v-if="isFromAddData" v-model="form.linkHeader" style="width:100px;float:left;border-right:0" placeholder="请选择活动区域">
         <el-option label="http://" value="http://"></el-option>
         <el-option label="https://" value="https://"></el-option>
      </el-select>
      <el-input style="float:left;width:600px" v-if="isFromAddData"  v-model="form.link" placeholder="请输入需要跳转的链接，如果调"> </el-input>
      <!-- <el-input  v-if="isFromAddData" placeholder="请输入内容" v-model="form.link"> -->
         <!-- <template slot="prepend">Http://</template>  -->
         <!-- <el-select v-model="form.link" slot="prepend" placeholder="请选择">
             <el-option label="http" value="http"></el-option>
             <el-option label="https" value="https"></el-option>
           </el-select> -->
       <!-- </el-input> -->
      <div class="detail-content" v-if="!isFromAddData"> {{form.link}} </div>
    </el-form-item>
    <el-form-item label="有效时段" prop="date1">
      <el-date-picker v-if="isFromAddData" v-model="form.date1" type="datetimerange" placeholder="选择时间范围">
      </el-date-picker>
      <div class="detail-content" v-if="!isFromAddData"><span>{{form.gmtBegin | formatDate}}</span> ---- <span>{{form.gmtEnd | formatDate}}</span></div>
    </el-form-item>
    <el-form-item label="覆盖地区" prop="coverArea">
      <el-button v-if="isFromAddData" size="mini" @click="dialogConfig">点击配置</el-button>
      <el-button v-if="!isFromAddData"  size="mini" type="text" @click="dialogTable ">查看已配置</el-button>
      <!-- <el-input v-model="form.name" placeholder="点击配置"> </el-input> -->
    </el-form-item>
    <el-form-item label="当前状态"  prop="radio">
      <el-radio-group v-if="isFromAddData" v-model="form.radio">
        <el-radio class="radio" :label="2">上线</el-radio>
        <el-radio class="radio" :label="1">下线</el-radio>
      </el-radio-group>
      <div class="detail-content" v-if="!isFromAddData"> {{currentStateText}} </div>
    </el-form-item>
    <el-col class="line" :span="2"> </el-col>
    <el-button v-if="isFromAddData" type="primary" @click="handleSubmit('form')">提交</el-button>
  </el-form>

  <!--  查看大图对话框 -->
  <el-dialog v-model="dialogVisible" size="tiny">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>

  <!-- 覆盖地区   配置对话框 -->
  <el-dialog title="覆盖地区" :visible.sync="dialogFormVisible" class="dialog-class">
    <el-row :span="24" style="margin-bottom:10px;padding-top:5px;border-top:1px solid grey">
      <el-col :span="4" style="padding-top:10px;">
        <el-checkbox v-model="check" @change="handleCheckAll($event)">全选</el-checkbox>
      </el-col>
      <el-col :span="10" style="height:10px;"></el-col>
      <el-col :span="5" style="font-weight:bold;font-size:16px;margin-top:2px;line-height:40px;height:40px;">
           <span style="float:right;padding-right:10px">按照省搜索:</span>
      </el-col>
      <el-col :span="5" style="font-weight:bold;font-size:16px;margin-top:2px;padding-left:20px;line-height:40px;height:40px;">
        <el-autocomplete class="inline-input" v-model="searchContent" style="float:right;" :fetch-suggestions="querySearch" placeholder="请输入省名" icon="close" :on-icon-click="handleIconClick" @select="handleQuerySelect"></el-autocomplete>
      </el-col>
    </el-row>
    <el-table :data="gridData" border :show-header="showHeader" max-height="400" style="padding-top:0;" :row-style="handleRowStyle">
      <el-table-column property="provinceName" label="省" width="200">
        <template scope="scope">

            <el-checkbox
                  v-model="checkAll[scope.$index]"
                  @change="handleCheckAllChange(scope.$index,$event)"
                  style='padding-right:10px;'
               ></el-checkbox>
               {{scope.row.provinceName}}
                 <!-- <el-tag type="primary" style="float:right;overflow:hidden;font-size:16px;width:120px;margin-right:10px;text-overflow:ellipsis"></el-tag> -->
          </template>
      </el-table-column>
      <el-table-column property="citys" label="市">
        <template scope="scope">
            <el-checkbox-group
                  v-model="checkedCities[scope.$index]"
                  @change="handleCheckedCitiesChange(scope.$index)"
                >
                 <el-checkbox style="margin-left:0;margin-right:15px;" @change="handleCheckedEveryChange(scope.$index,index,$event)"  v-for="(city,index) in scope.row.citys" :label="city.cityName" :key="city.cityName">{{city.cityName}}</el-checkbox>
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
import localEvent from 'src/vuex/function.js';
import coverArea from "./coverArea.vue";
import {
  formatDate
} from 'src/util/date.js';

export default {
  components:{
    coverArea
  },
  data() {
    return {

      url: '', // 待审详情的 url
      id:'',
      tabName:'', // 标签页 名称
      localData:{}, // 上一个页面的数据
      // 即将离开的对话框
      loadingFlag: false,
      dialogVisible: false,
      CoverData:[],
      DialogConfigSaveFlag:false,  // 配置覆盖地区

      // 添加搜索框
      // 搜索框中省名初始化
      searchProvinces:[],
      showProvinces:'',
      searchContent: "",
      provinces: [],
      // 覆盖地区选择
      check: false,
      checkAll: [],
      checkedCities: [],
      isIndeterminate: [],
      // cities: cityOptions,

      // dialogFormVisible 代表是否打开配置地区的对话框
      dialogFormVisible: false,

      // 查看配置地区中的表格数据 和 是否显示的标志
      showHeader: false,
      dialogTableVisible: false,
      gridData: [],
      gridDataCopy: [],
      currentStateText: '',

      form: {
        linkHeader:'http://',    // url的 默认头部
        // radio 代表上下架状态的选择
        radio: "",
        // date1 代表时间段选择的
        date1: [],
        name: '',
        Forder: '',
        link:'',
        imageUrl:'',
        promotionId:'',
        gmtBegin:'',
        gmtEnd:'',
        pageId:'',
        coverArea:'',
        fileList2: [{
          name: '',
          url: ""
        }],
      },
     // 表单验证规则
     rules: {
       name: [{type: "string",
         required: true,
         message: '请输入正确运营图名称',
         trigger: 'blur'
         },
         {  min:1,
            max:10,
            message:'名称长度不大于10'
         }
     ],
       Forder: [
         { required: false, message: '排序值不能为空'},
        //  { type: 'number', message: '排序值必须为数字值'},
         { type: 'number', min:1, max:999,message:'排序值范围1-999'}
       ],
       link: [{
        //  type:'url',
         required: true,
         message: "请输入正确链接",
         trigger: 'blur'
       }],
       date1: [{
         required: true,
         message: '请选择日期',
         trigger: 'change',
         type:'array',
       },{
          validator(rule,value,callback,source,options) {
            var errors = [];
            if(value[0] === null) {
              errors.push(
                new Error('请选择日期')
              )
            }
            callback(errors)
          }
       }],
       status: [{
         required: true,
         message: '请选择状态',
         trigger: 'change'
       }],
       fileList2: [{
         required: true,
         message: '请上传图片',
         type:'array',
         trigger: 'on-change'
       }],
       coverArea: [{
         required: true,
         message: '请选择覆盖地区',
       }]
     }


    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
    }
  },
  mounted() {
    var localData = localEvent.get("localChooseExpress");
    this.localData = localData;
    // console.log(localData);
    // console.log(localData.promotionId);
    this.form.promotionId = localData.promotionId;
    this.id = localData.id;
    var _this =this;
    var httpId = '';
    if(localData.tabName == '配置'){  //配置 修改
        _this.url = "/api/promotion/audit/get";
        httpId = this.id;
        console.log("配置 修改")
    }else if(!localData.tabName){  // 待审核 已生效详情
        _this.url = "/api/promotion/get";
        httpId = this.form.promotionId;``
        console.log("待审核 已生效详情")
    }else{
      alert('错误')
    }

    _this.$http.post(_this.url,{
      "id":httpId
    },(rsp)=>{
      console.log(rsp)
      console.log(rsp.imageUrl)
      this.form.name = rsp.name;
      this.form.Forder = rsp.sortWeight;
      this.form.link = rsp.linkUrl.replace('https://','').replace('http://','');
      this.form.fileList2[0].url = rsp.imageUrl;
      this.form.gmtBegin = rsp.gmtBegin;
      this.form.gmtEnd = rsp.gmtEnd;
      this.form.date1 = [new Date(this.form.gmtBegin), new Date(this.form.gmtEnd)];
      if (rsp.opStatus == "1") {
        this.form.radio = 1;
        this.currentStateText = "已下线"
      } else {
        this.form.radio = 2;
        this.currentStateText = "已上线"
      }

     this.dialogConfig(true)

    },(error)=>{
      console.log(error)
      console.log('failed');
    });


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

  },
  computed: {
    GETEDITFORM() {
      // alert(this.$store.getters.GETEDITFORM)
      return this.$store.getters.GETEDITFORM;
    }
  },
  methods: {
    changeVisible(flag){
      this.dialogTableVisible = flag;
    },
    // 为表格中的行设置样式，
    handleRowStyle(row,index) {

      if(this.showProvinces !== '') {
         if(this.showProvinces === row.provinceName) {
            // return {'display':}
         }else {
             return {'display':'none'}
         }
      }
    },

    //  点击提交
    handleSubmit(formName) {
   this.$refs[formName].validate((valid) => {
     if(valid) {
         var result = {
             "data":{
                 "id":this.id,
                 "pageId":this.localData.pageId,
                 "promotionId":this.localData.promotionId,
                 "name":this.form.name,
                 "imageUrl":this.form.fileList2[0].url,
                 "sortWeight":this.form.Forder,
                 "linkUrl":this.form.linkHeader+this.form.link,
                 "gmtBegin": formatDate(this.form.date1[0], 'yyyy-MM-dd hh:mm:ss'),
                 "gmtEnd":formatDate(this.form.date1[0], 'yyyy-MM-dd hh:mm:ss'),
                 'opStatus':this.form.radio,
               },
             "area":{
                "code":"000000",
                "check":false,
                "provinces":this.gridData,
                "currStatus":this.check
             },
         }
         console.log("result%o ",result);
         var _this = this;
        this.$http.post("/api/promotion/audit/update",result,(result) => {
          _this.$store.dispatch('changeLoadingChange', true);
                  console.log(this);
                  this.$router.go(-1);
                    // alert(result);
        },(error) => {
          if(error.data.meta.code == "0017") {
              this.$message.error('"名称重复！"')
          } else {
            this.$message({
                type: 'error',
                message: error.data.meta.code+"--"+error.data.meta.msg
            });
          }

        });
     } else {

     }
     })
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
    handleSuccess(file){
      console.log(file.result)
      this.form.fileList2[0].url = file.result;
    },
    handlerror(err, file, fileList){
      alert(err);
      alert(file);
      alert(fileList);
    },
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
      if(queryString === '') {
        this.showProvinces = '';
      }
      var searchProvinces = this.searchProvinces;
      var results = queryString ? searchProvinces.filter(this.createFilter(queryString)) : searchProvinces;
      cb(results);
    },
    createFilter(queryString) {
      return (province) => {
        return (province.value.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleQuerySelect(items) {
         this.showProvinces = items.value
      // console.log(items);
      // this.gridData = this.gridDataCopy.filter(function(item) {
      //   return item.value == items.value
      // })
      // console.log(this.gridData);
    },
    handleIconClick(ev) {
      this.showProvinces = ''
      this.searchContent = '';
    },
    // 覆盖地区选择
    dialogConfig(visible) {
      // if(this.gridData.length>0){
      //     if(this.DialogConfigSaveFlag){
      //         this.dialogFormVisible = true;
      //         return;
      //     }else {
      //       this.gridData = this.gridDataCopy.slice(0);
      //       console.log(this.gridDataCopy)
      //
      //       for (var i = 0; i < this.gridData.length; i++) {
      //         // _this.isIndeterminate[i] = true;
      //           this.checkedCities.splice(i, 1, []);
      //            if(this.gridData[i].check){
      //                 this.checkAll.splice(i, 1, true);
      //               for(let j = 0;j<this.gridData[i].citys.length;j++) {
      //                   this.checkedCities[i].push(this.gridData[i].citys[j].cityName)
      //               }
      //            }else {
      //                console.log(this.gridData[i].check);
      //                this.checkAll.splice(i, 1, false);
      //            }
      //
      //       }
      //       this.dialogFormVisible = true;
      //       return;
      //     }
      // }
       this.form.coverArea = "hasClick";
       this.handleIconClick();
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
      var URL = "/api/promotion/audit/areaConf/all";   // 默认是 配置 中的覆盖地区
      if(this.tabName === "已上线") {
          URL = "/api/promotion/areaConf/all";
      }
      _this.$http.post(URL,{id:this.id},
        (rsp) => {
          _this.gridData = rsp.provinces.slice(0);
          for( let i =0;i<_this.gridData.length;i++) {
             _this.searchProvinces[i]={};
             _this.searchProvinces[i].value = _this.gridData[i].provinceName;
          }
            localEvent.set("gridData", rsp);
            if(visible === undefined) {
                _this.initCheckBox(rsp.check);
            }else {
              this.initCheckBox(rsp.check,visible);
            }
          // _this.gridDataCopy = rsp.provinces.slice(0);
          // console.log(_this.gridDataCopy);
          // _this.provinces = _this.gridData;
          // 初始化 配置的多选框操作
          // this.check = rsp.check;
          // for (var i = 0; i < _this.gridData.length; i++) {
          //   // _this.isIndeterminate[i] = true;
          //     _this.checkedCities[i] = [];
          //      if(_this.gridData[i].check){
          //         _this.checkAll[i] = true;
          //         for(let j = 0;j<_this.gridData[i].citys.length;j++) {
          //             _this.checkedCities[i].push(_this.gridData[i].citys[j].cityName)
          //         }
          //      }else {
          //         _this.checkAll[i] = false;
          //      }
          //
          // }
          // console.log(_this.checkAll);
          // _this.dialogFormVisible = true;
          // console.log(_this.gridData);
        })
    },
    initCheckBox(isAllcheck,visible){
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
      if(visible === undefined) {
        this.dialogFormVisible = true;
      }

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
          this.checkedCities.splice(m, 1, event.target.checked ? CityAllCity: [])
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
      // console.log(this.gridData);
      this.checkedCities.splice(index, 1, flag ? CityAllCity : [])
      this.isIndeterminate.splice(index, 1, false);
      this.observeCheckAll();
    },
    handleCheckedCitiesChange(index) {
      let value = this.checkedCities[index];
      let checkedCount = value.length;
       this.gridData[index].check = checkedCount === this.gridData[index].citys.length;
      this.checkAll.splice(index, 1, checkedCount === this.gridData[index].citys.length)
      // console.log(checkedCount + "  " + this.gridData[index].citys.length + " " + this.checkAll[index]);
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
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleImageChange(file,fileList){
         this.form.fileList2 = fileList.slice(-1);
    },

  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.editData-class {
    // label {
    //     font-weight: bold;
    // }
    .dialog-class {
        .el-dialog__body {
            padding-top: 15px !important;
        }
    }
}
</style>
