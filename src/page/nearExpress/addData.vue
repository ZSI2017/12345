<template type="html">
<section class="section" v-loading.body.fullscreen.lock="listLoading">
  <p style="color:#00b7f9;cursor:pointer;margin-top:0;width:100px;" @click="handleBackClick"><i class="el-icon-arrow-left"></i> 返回</p>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px"  style="width:800px;padding-left:100px">
    <el-form-item label="名称" prop="name">
      <el-input v-model.trim="ruleForm.name" placeholder="请输入运营图名称"> </el-input>
    </el-form-item>
    <el-form-item label="LOGO" prop="logo">
      <el-upload
        class="upload-demo"
        action="https://sendexmng-sit.alipay-eco.com/api/sendapp/upload"
        :on-change="handleImageChange"
        :file-list="ruleForm.logo"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success='handleSuccess'
        :on-error='handlerror'
        list-type="picture"
        :before-upload="beforeAvatarUpload"
        >
        <el-button size="small" style="width:60px;background:#f1f1f1;"><i class="el-icon-upload2"></i> </el-button>
        <div slot="tip" class="el-upload__tip">文件类型限：jpg,png,尺寸40*40, 请保持10kb以内</div>
      </el-upload>
    </el-form-item>
    <el-form-item label="广告语" prop="slogan">
      <el-input v-model.trim="ruleForm.slogan" placeholder="请输入广告语"> </el-input>
    </el-form-item>
    <el-form-item label="标签" prop="tag">
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        :closable="true"
        hit="true"
        :close-transition="false"
        @close="handleClose(tag)"
        type="primary"
        style="margin-right:10px;height:28px;line-height:28px;"
      >
      {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model.trim="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
        maxlength="8"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput" v-show="addTag">+ 添加</el-button>
      <div style="color:#888;">最多添加两个标签，每个标签最多8个字符。</div>
    </el-form-item>
    <el-form-item label="排序值" prop="sortWeight">
      <el-input v-model.number="ruleForm.sortWeight"  type="number" placeholder="请输入1-999，排序值越大越靠前"> </el-input>
    </el-form-item>
    <el-form-item label="链接" prop="linkUrl">
      <el-input v-model.trim="ruleForm.linkUrl" placeholder="请输入需要跳转的链接，如果跳外部链接必须以http://开头"> </el-input>
      <!-- <el-input placeholder="请输入内容" v-model="ruleForm.linkUrl"> <template slot="prepend">Http://</template> </el-input> -->
    </el-form-item>
    <el-form-item label="覆盖地区" prop="coverArea">
      <el-button size="mini" @click="dialogConfig">点击配置</el-button>
    </el-form-item>
    <el-form-item label="当前状态">
      <el-radio-group v-model="ruleForm.opStatus">
        <el-radio class="radio" :label="2">上线</el-radio>
        <el-radio class="radio" :label="1">下线</el-radio>
      </el-radio-group>
    </el-form-item>
    <!--<el-form-item label="标价">
      <el-input placeholder="请输入价格" v-model.number="ruleForm.markPrice"   type="number" style="width:200px;">
        <template slot="append">元起</template>
      </el-input>
    </el-form-item>-->
    <el-col class="line" :span="2"> </el-col>
    <el-button type="primary" @click="handleSubmit('ruleForm')">提交</el-button>
  </el-form>

  <!--图片预览 框  -->
  <el-dialog v-model="dialogVisible" size="tiny">
     <img width="100%" :src="dialogImg" alt="">
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
      <el-col :span="5" style="font-weight:bold;font-size:16px;margin-top:2px;line-height:40px;height:40px;">

        <el-autocomplete class="inline-input" v-model="searchContent" style="float:right;" :fetch-suggestions="querySearch" placeholder="请输入省名" icon="close" :on-icon-click="handleIconClick" @select="handleQuerySelect"></el-autocomplete>
      </el-col>
    </el-row>
    <el-table :data="gridData" border :show-header="showHeader" max-height="400" :row-style="handleRowStyle" >
      <el-table-column property="provinceName" label="省" width="200">
        <template scope="scope" >
          <el-checkbox
                v-model="checkAll[scope.$index]"
                @change="handleCheckAllChange(scope.$index,$event)"
             ></el-checkbox>
             {{scope.row.provinceName}}
            <!-- <el-tag type="primary" style="float:left;overflow:hidden;font-size:16px;width:80px;margin-right:10px;text-overflow:ellipsis">{{scope.row.provinceName}}</el-tag> -->
            <!-- <el-checkbox
                  v-model="checkAll[scope.$index]"
                  @change="handleCheckAllChange(scope.$index,$event)"
               ></el-checkbox> -->
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
 import coverArea from "@/page/chooseExpress/coverArea.vue";
 import localEvent from 'src/vuex/function.js';

export default {
  components:{
     coverArea
  },
  data() {
    return {
      pageId:'',
      state1: "",
      dialogVisible:false,
      // 添加搜索框
      searchContent: "",
      provinces: [],
      // 覆盖地区选择
      check: false,
      checkAll: [],
      checkedCities: [],
      isIndeterminate: [],
      dialogFormVisible: false, // dialogFormVisible 代表是否打开配置地区的对话框
      // 搜索框中省名初始化
      searchProvinces:[],
      showProvinces:'',
      //标签数据
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      addTag:true,
      // 查看配置地区中的表格数据 和 是否显示的标志
      showHeader: false,
      dialogTableVisible: false,
      gridData: [],
      gridDataCopy: [],
      url:'/api/sendapp/audit/save',
      dialogImg:[],
      // 对输入表单进行验证
      ruleForm: {
        name:'',
        logo:[],
        slogan:'',
        tag:'',
        sortWeight: '',
        linkUrl: '',
        opStatus:1,
        coverArea:'',
      },
      rules: {
        name: [
          {type: "string",required: true,message: '请输入正确运营图名称',trigger: 'blur'},
          {min:1,max:10,message:'名称长度不大于10'}
        ],
        logo: [
          {required: true,message: '请上传图片',type:'array',trigger: 'on-change'}
        ],
        slogan:[
          {type: 'string',required: true,message: '请输入广告语',trigger: 'blur'},
          {min:1, max:20,message:'广告语长度不大于20'}
        ],
        sortWeight: [
          { required: true, message: '排序值不能为空'},
          // { type: 'number', message: '排序值必须为数字值'}
           { type: 'number', min:1, max:999,message:'排序值范围1-999'}
        ],
        tag:[
          {type: 'string',required: true,message: '请输入标签'}
        ],
        linkUrl: [
          {required: true,message: "请输入正确链接",trigger: 'blur'},
          {min:1, max:200,message:'链接长度不大于200'}
        ],
        opStatus: [
          {required: true,message: '请选择状态',trigger: 'change'}
        ],
        coverArea: [
          {required: true,message: '请选择覆盖地区'}
        ],
        // markPrice:[
        //   { required: true, message: '标价不能为空'},
        //   // { type: 'number', message: '排序值必须为数字值'}
        //    { type: 'number',message:'标价必须为数字'}
        // ]
      }
    }
  },
  created() {
    this.pageId = localEvent.get('pageId')
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

  },
  methods: {
    handleRowStyle(row,index) {

      if(this.showProvinces !== '') {
         if(this.showProvinces === row.provinceName) {
            // return {'display':}
         }else {
             return {'display':'none'}
         }
      }
    },
    changeVisible(flag){
      this.dialogTableVisible = flag;
    },
    //  点击提交
    handleSubmit(formName) {
      var _this = this;
      _this.listLoading = true;
      console.log("-----------------------");
        console.log(this.$refs[formName]),
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('error submit');
          let httpData = {
                "data": {
                  "pageId": _this.pageId,
                  "name": _this.ruleForm.name,
                  "logo":_this.dialogImg,
                  "slogan": _this.ruleForm.slogan,
                  "tag":_this.ruleForm.tag,
                  "sortWeight":_this.ruleForm.sortWeight,
                  "linkUrl": _this.ruleForm.linkUrl,
                  "opStatus": _this.ruleForm.opStatus,
                },
                "area": {
                  "code": "000000",
                  "check": _this.check,
                  "provinces": _this.gridData,
                }
              };
          _this.$http.post(_this.url,httpData,(result) => {
            _this.$store.dispatch('changeLoadingChange',true);
            _this.listLoading = false;
            _this.$router.go(-1);
            // _this.tableData = result.page_list;
            // _this.totalCount = parseInt(result.pages.cnt);
            this.$message({
                type: 'success',
                message: '保存成功！'
            });
          },(error) => {
            _this.listLoading = false;
            this.$message({
                type: 'error',
                message: error.data.meta.msg
            });
          });

          // console.log(this.$route.matched);

        } else {
          _this.listLoading = false;
          console.log(_this);
          return false;
        }
      })

    },
    // 点击返回 对应的事件处理
    handleBackClick() {
      this.$router.go(-1);
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
      if(queryString === '') {
        this.showProvinces = '';
      }
      var searchProvinces = this.searchProvinces;
      console.log(queryString);
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
      console.log(items);
      // for(let i =0;i<this.gridData.length;i++) {
      //      if(this.gridData[i].provinceName === items.value) {
      //         this.gridData[i].isShow= true;
      //      } else {
      //         this.gridData[i].isShow = false;
      //      }
      // }
      // console.log(this.gridData);
    },
    handleIconClick(ev) {
      this.showProvinces = ''
      // this.gridData = this.gridDataCopy;
      this.searchContent = '';
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
      // 初始化话搜索框
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
      this.listLoading = true
      var URL = "/api/sendapp/areaConf/all";   // 默认是 配置 中的覆盖地区
      _this.$http.post(URL,{id:"0"},
        (rsp) => {
          _this.gridData = rsp.provinces.slice(0);
          for( let i =0;i<_this.gridData.length;i++) {
             _this.searchProvinces[i]={};
             _this.searchProvinces[i].value = _this.gridData[i].provinceName;
          }
          console.log(_this.searchProvinces);
          localEvent.set("gridData", rsp);
          _this.initCheckBox(rsp.check);
          // _this.gridDataCopy123 = _this.gridData.slice(0);

          // console.log(_this.gridData);
        }, (error) => {
            _this.listLoading = false;
            this.$message.error(error.data.meta.msg);
          console.log(error);
        })
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
      this.listLoading = false
      this.dialogFormVisible = true;

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
      if(this.check || this.checkAll.filter(function(value){return value === true }).length>0 || this.checkedCities.filter(function(value){return value.length>0} ).length>0) {
             this.ruleForm.coverArea = "hasClick"
      }else {
              this.ruleForm.coverArea = "";
      }

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
    },
    //tag 控制
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      if(this.dynamicTags.length<=0){
          this.ruleForm.tag = this.dynamicTags.join(',')
      }else{
          this.ruleForm.tag = this.dynamicTags.join(',') + ',';
      }
      if(this.dynamicTags.length >= 2){
        this.addTag = false;
      }else{
        this.addTag = true;
      }
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
        this.ruleForm.tag = this.dynamicTags.join(',') + ',';
        if(this.dynamicTags.length >= 2){
          this.addTag = false;
        }else{
          this.addTag = true;
        }
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    // 对图片操作的控制
    handleImageChange(file,fileList){
        this.ruleForm.logo = fileList.slice(-1);
    },
    handlePreview(file) {
      this.dialogVisible = true;
      console.log(file.response)
    },
    handleSuccess(file){
      console.log(file.result)
      this.dialogImg = file.result;
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
    handleRemove(file,fileList) {
          this.ruleForm.logo = fileList;
    },
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
