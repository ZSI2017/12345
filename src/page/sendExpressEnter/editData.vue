<template type="html">
<section class="section editData-class" v-loading.body.fullscreen.lock="listLoading">
  <p style="color:#00b7f9;cursor:pointer;margin-top:0;width:100px;" @click="handleBackClick"><i class="el-icon-arrow-left"></i> 返回</p>
  <el-form ref="form" :rules="rules" :model="form" label-width="100px"  style="width:800px;padding-left:100px">
    <el-form-item label="入口名称" prop="name">
      <el-input v-if="isFromAddData" v-model="form.name" placeholder="请输入入口名称"> </el-input>
      <div class="detail-content" v-if="!isFromAddData"> {{form.name}} </div>
    </el-form-item>
    <el-form-item label="LOGO" prop="logo">
      <el-upload v-if="isFromAddData"
        action="https://sendexmng-sit.alipay-eco.com/api/sendapp/upload"
        :on-change="handleImageChange"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success='handleSuccess'
        :on-error='handlerror'
        :before-upload="beforeAvatarUpload"
        :file-list="form.logo"
        list-type="picture">
        <el-button size="small" style="width:60px;background:#f1f1f1;"><i class="el-icon-upload2"></i> </el-button>
      </el-upload>
      <img v-if="!isFromAddData" width="100px" style="float:left;" :src="form.logo[0].url" alt="">

      <el-popover ref="popover4" placement="right" trigger="click">
        <img :src="form.logo[0].url">
      </el-popover>
      <el-button v-if="!isFromAddData" style="float:left;margin-left:20px" size="small" v-popover:popover4>查看原图</el-button>
    </el-form-item>
    <el-form-item label="角标">
      <el-upload v-if="isFromAddData"
        action="https://sendexmng-sit.alipay-eco.com/api/sendapp/upload"
        :on-change="handleImageChange2"
        :on-preview="handlePictureCardPreview2"
        :on-remove="handleRemove2"
        :on-success='handleSuccess2'
        :on-error='handlerror2'
        :before-upload="beforeAvatarUpload2"
        list-type="picture"
        :file-list="fileIcon"
        >
        <!--<i class="el-icon-plus"></i>-->
        <el-button size="small" style="width:60px;background:#f1f1f1;"><i class="el-icon-upload2"></i> </el-button>
      </el-upload>
      <img v-if="!isFromAddData&&form.icon[0].url!=''" width="100px" style="float:left;" :src="form.icon[0].url" alt="">
      <el-popover ref="popover4" placement="right" trigger="click">
        <img :src="form.icon[0].url">
      </el-popover>
      <el-button v-if="!isFromAddData&&form.icon[0].url!=''" style="float:left;margin-left:20px" size="small" v-popover:popover4>查看原图</el-button>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input v-if="isFromAddData" v-model="form.description" placeholder="请输入描述内容"> </el-input>
      <div class="detail-content" v-if="!isFromAddData"> {{form.description}} </div>
    </el-form-item>
    <el-form-item label="排序值" prop="sortWeight">
      <el-input v-if="isFromAddData" type='number' v-model.number="form.sortWeight" placeholder="请输入1-999，排序值越大越靠前"> </el-input>
      <div class="detail-content" v-if="!isFromAddData"> {{form.sortWeight}} </div>
    </el-form-item>
    <el-form-item label="链接" prop="linkUrl">
      <el-input v-if="isFromAddData"  v-model="form.linkUrl" placeholder="请输入需要跳转的链接，如果调"> </el-input>
      <div class="detail-content" v-if="!isFromAddData"> {{form.linkUrl}} </div>
    </el-form-item>
    <el-form-item label="覆盖地区" prop="coverArea">
      <el-button v-if="isFromAddData" size="mini" @click="dialogConfig">点击配置</el-button>
      <el-button v-if="!isFromAddData"  size="mini" type="text" @click="dialogTable ">查看已配置</el-button>
      <!-- <el-input v-model="form.name" placeholder="点击配置"> </el-input> -->
    </el-form-item>
    <el-form-item label="当前状态" >
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
  <el-dialog v-model="dialogVisible2" size="tiny">
    <img width="100%" :src="dialogImageUrl2" alt="">
  </el-dialog>

  <!-- 覆盖地区   配置对话框 -->
  <el-dialog title="覆盖地区" :visible.sync="dialogFormVisible"  :before-close='handleDialogConfigCancel' class="dialog-class">
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
import coverArea from "../chooseExpress/coverArea.vue";
import {
  formatDate
} from 'src/util/date.js';

export default {
  components:{
    coverArea
  },
  data() {
    return {
      listLoading:false,
      fileIcon:[],
      url: '', // 待审详情的 url
      id:'',
      tabName:'', // 标签页 名称
      localData:{}, // 上一个页面的数据
      // 即将离开的对话框
      loadingFlag: false,
      dialogVisible: false,
      dialogVisible2: false,
      CoverData:[],
      DialogConfigSaveFlag:false,  // 配置覆盖地区
      dialogImageUrl:'',//logo大图存放
      dialogImageUrl2:'',
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
        name: '',
        logo: [{
          name: '',
          url: ""
        }],
        icon: [{
          name: '',
          url: ""
        }],
        description: '',
        sortWeight: '',
        linkUrl: '',
        radio: "",  // radio 代表上下线状态的选择
        Forder: '',
        promotionId:'',
        gmtBegin:'',
        gmtEnd:'',
        coverArea:'',

      },
     // 表单验证规则
      rules: {
        name: [
          {type: "string",required: true,message: '请输入正确运营图名称',trigger: 'blur'},
          {min:1,max:10,message:'名称长度不大于10'}
        ],
        sortWeight: [
          { required: false, message: '排序值不能为空'},
          // { type: 'number', message: '排序值必须为数字值'}
           { type: 'number', min:1, max:999,message:'排序值范围1-999'}
        ],
        linkUrl: [
          {required: true,message: "请输入正确链接",trigger: 'blur'},
           {min:1, max:200,message:'链接长度不大于200'}
        ],
        logo: [
          {required: true,message: '请上传图片',type:'array',trigger: 'on-change'}
        ],
        description: [
          {required: true,message: '请输入描述',type:'string',trigger: 'blur'},
           {min:1, max:20,message:'描述长度不大于20'}
        ],
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
    this.form.promotionId = localData.sendappId;
    this.id = localData.id;
    var _this =this;
    var httpId = '';
    if(localData.tabName == '配置'){  //配置 修改
        _this.url = "/api/sendapp/audit/get";
        httpId = this.id;
        console.log("配置 修改")
    }else if(!localData.tabName){  // 待审核 已生效详情
        _this.url = "/api/sendapp/get";
        httpId = this.form.promotionId;
        console.log("待审核 已生效详情")
    }else{
      alert('错误')
    }

    _this.$http.post(_this.url,{
      "id":httpId.toString()
    },(rsp)=>{
      console.log(rsp)
      this.form.name = rsp.name;
      this.form.sortWeight = rsp.sortWeight;
      this.form.linkUrl = rsp.linkUrl;
      this.form.logo[0].url = rsp.logo;
      this.form.icon[0].url = rsp.icon;
      this.form.logo[0].name = '点击查看大图';
      this.form.icon[0].name = '点击查看大图';
      if(this.form.icon[0].url == ''){
          this.fileIcon = []
      }else{
          this.fileIcon = this.form.icon
      }

      this.form.description = rsp.description;
      if ( this.$route.path == "/sendExpressEnter/detail") {
        if (rsp.status == "1") {
          this.form.radio = 1;
          this.currentStateText = "已下线"
        } else {
          this.form.radio = 2;
          this.currentStateText = "已上线"
        }
      } else {
        if (rsp.opStatus == "1") {
          this.form.radio = 1;
          this.currentStateText = "已下线"
        } else {
          this.form.radio = 2;
          this.currentStateText = "已上线"
        }
      }

     this.dialogConfig(true)

    },(error)=>{
      console.log(error)
      console.log('failed');
    });


  },
  created() {
    if ( this.$route.path == "/sendExpressEnter/detail") {
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
      this.listLoading = true;
      this.$refs[formName].validate((valid) => {
      if (valid) {
          var result = {
              "data":{
                  "id":this.id,
                  "pageId":this.localData.pageId,
                  "sendappId":this.localData.sendappId,
                  "name":this.form.name,
                  "logo":this.form.logo[0].url,
                  "icon":this.form.icon[0].url,
                  "sortWeight":this.form.sortWeight,
                  "linkUrl":this.form.linkUrl,
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
          this.$http.post("/api/sendapp/audit/update",result,(result) => {
            _this.$store.dispatch('changeLoadingChange', true);
                    console.log(this);
                    this.listLoading = false;
                    this.$router.go(-1);
                      // alert(result);
          },(error) => {
            this.listLoading = false;
            if(error.data.meta.code == "0017") {
                this.$message.error('"名称重复！"')
            } else {
              this.$message({
                  type: 'error',
                  message: error.data.meta.msg
              });
            }

          });
        }else{
          this.listLoading = false;
          return false;
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
    },
    handleIconClick(ev) {
      this.showProvinces = ''
      this.searchContent = '';
    },
    // 覆盖地区选择
    dialogConfig(visible) {
       this.handleIconClick();
       this.form.coverArea = "hasClick";
      if(this.gridData.length>0){
          if(this.DialogConfigSaveFlag){
              this.dialogFormVisible = true;
              return;
          }else {
              let localResult = localEvent.get("gridOnecityData")
              this.gridData = localResult.provinces;
              console.log("12344444444444444%o",this.gridData);
              this.initCheckBox(localResult.check)
            return;
          }
      }
      var _this = this;
        this.listLoading = true;
      var URL = "/api/sendapp/areaConf/all";  // 默认是 配置 中的覆盖地区
      let id = this.form.promotionId;
      if(this.localData.tabName === "配置") {
          URL = "/api/sendapp/audit/areaConf/all";
          id = this.id
      }
      _this.$http.post(URL,{id:id.toString()},
        (rsp) => {
          _this.gridData = rsp.provinces.slice(0);
          for( let i =0;i<_this.gridData.length;i++) {
             _this.searchProvinces[i]={};
             _this.searchProvinces[i].value = _this.gridData[i].provinceName;
          }
            localEvent.set("gridOnecityData", rsp);
            if(visible === undefined) {
                _this.initCheckBox(rsp.check);
            }else {
                this.listLoading = false;
              this.initCheckBox(rsp.check,visible);
            }

        },(error) =>{
             this.$message.error(error.data.meta.msg);
             this.listLoading = false;
             console.log(error);
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
          this.listLoading =false;
        this.dialogFormVisible = true;
      }

    },
    handleCheckAll(event) {
      var allCount = this.gridData.length;
      for (var m = 0; m < allCount; m++) {
          this.isIndeterminate.splice(m, 1, !event.target.checked)
          this.checkAll.splice(m, 1, event.target.checked);
          this.gridData[m].check = event.target.checked;
          let CityAllCity = [];
          for(let i =0;i<this.gridData[m].citys.length;i++) {
            this.gridData[m].citys[i].check = event.target.checked;
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
      if(this.check || this.checkAll.filter(function(value){return value === true }).length>0 || this.checkedCities.filter(function(value){return value.length>0} ).length>0) {
             this.form.coverArea = "hasClick";
      }else {
            this.form.coverArea = "";
      }

      localEvent.set("gridOnecityData",{"provinces":this.gridData,"check":this.check,code:"000000"})
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
      let localResult = localEvent.get("gridOnecityData")
      this.CoverData = localResult.provinces;
      this.dialogTableVisible = true;
    },
    onSubmit() {
      console.log('submit!');
    },
    //对logo图片操作的控制
    handleRemove(file, fileList) {
      this.form.logo[0].name = file.name;
      this.form.logo[0].url = file.url;

      console.log(file);
      console.log(fileList);

    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleImageChange(file,fileList){
         this.form.logo = fileList.slice(-1);
    },
    handleSuccess(file){
      console.log(file.result)
      this.form.logo[0].url = file.result;
    },
    handlerror(err, file, fileList){
      alert(err);
      alert(file);
      alert(fileList);
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 < 10;

      if (!isJPG && !isPNG) {
        this.$message.error('上传LOGO只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传LOGO大小不能超过 10K!');
      }
      if((!isJPG && !isPNG) || !isLt2M) {
        return  Promise.reject("error")
      }
    },

    //对icon图片操作的控制
    handleRemove2(file, fileList) {
      this.form.icon[0].url = '';
      console.log(file, fileList);
    },
    handlePictureCardPreview2(file) {
      this.dialogImageUrl2 = file.url;
      this.dialogVisible2 = true;
    },
    handleImageChange2(file,fileList){
        //  this.form.icon = fileList.slice(-1);
         this.fileIcon = fileList.slice(-1);
    },
    handleSuccess2(file){
      console.log(file.result)
      this.form.icon[0].url = file.result;
    },
    handlerror2(err, file, fileList){
      alert(err);
      alert(file);
      alert(fileList);
    },
    beforeAvatarUpload2(file) {
      console.log(file)
      const isJPG2 = file.type === 'image/jpeg';
      const isPNG2 = file.type === 'image/png';
      const isLt2M2 = file.size / 1024 < 10;

      if (!isJPG2 && !isPNG2) {
        this.$message.error('上传LOGO只能是 JPG/PNG 格式!');
      }
      if (!isLt2M2) {
        this.$message.error('上传LOGO大小不能超过 10K!');
      }
      if((!isJPG2 && !isPNG2) || !isLt2M2) {
        return  Promise.reject("error")
      }
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
