<template type="html">
<section class="section editData-class">
  <p style="color:#00b7f9;cursor:pointer;margin-top:0;width:100px;" @click="handleBackClick"><i class="el-icon-arrow-left"></i> 返回</p>
  <el-form :model="form" label-width="100px"  style="width:800px;padding-left:100px">
    <el-form-item label="公司名称">
      <el-input v-if="isFromAddData" v-model="form.name" placeholder="请输入公司名称"> </el-input>
      <div class="detail-content" v-if="!isFromAddData"> {{form.name}} </div>
    </el-form-item>
    <el-form-item label="LOGO">
      <el-upload v-if="isFromAddData" list-type="picture" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="form.logo">
        <!--<i class="el-icon-plus"></i>-->
        <el-button size="small" style="width:60px;background:#f1f1f1;"><i class="el-icon-upload2"></i> </el-button>
      </el-upload>
      <img v-if="!isFromAddData" width="150px" style="float:left;" src="https://expressprod.oss-cn-hangzhou.aliyuncs.com/OperativeLogo/f2c570f3-7f84-44ca-afa9-e19a71ba10c5.png" alt="">
      <el-popover ref="popover4" placement="right" trigger="click">
        <img src="https://expressprod.oss-cn-hangzhou.aliyuncs.com/OperativeLogo/f2c570f3-7f84-44ca-afa9-e19a71ba10c5.png">
      </el-popover>
      <el-button v-if="!isFromAddData" style="float:left;margin-left:20px" size="small" v-popover:popover4>查看原图</el-button>
    </el-form-item>
    <el-form-item label="广告语">
      <el-input v-if="isFromAddData" v-model="form.slogan" placeholder="请输入广告语"> </el-input>
      <div class="detail-content" v-if="!isFromAddData"> {{form.slogan}} </div>
    </el-form-item>
    <el-form-item label="标签">
      <div v-if="isFromAddData">
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
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
          maxlength="8"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput" v-show="addTag">+ 添加</el-button>
        <div style="color:#888;">最多添加两个标签，每个标签最多8个字符。</div>
      </div>
      <div class="detail-content" v-if="!isFromAddData">
        <span style="margin:2px;">{{dynamicTags.join(' ')}}</span>
      </div>
    </el-form-item>
    <el-form-item label="排序值" >
      <el-input v-if="isFromAddData" v-model="form.sortWeight" placeholder="请输入1-999，排序值越大越靠前"> </el-input>
      <div class="detail-content" v-if="!isFromAddData"> {{form.sortWeight}} </div>
    </el-form-item>
    <el-form-item label="链接" prop="linkUrl">
      <el-input v-if="isFromAddData"  v-model="form.linkUrl" placeholder="请输入需要跳转的链接，如果调"> </el-input>
      <div class="detail-content" v-if="!isFromAddData"> {{form.linkUrl}} </div>
    </el-form-item>
    <el-form-item label="覆盖地区">
      <el-button v-if="isFromAddData" size="mini" @click="dialogConfig">点击配置</el-button>
      <el-button v-if="!isFromAddData" size="mini" type="text" @click="dialogTable">查看已配置</el-button>
      <!-- <el-input v-model="form.name" placeholder="点击配置"> </el-input> -->
    </el-form-item>
    <el-form-item label="当前状态">
      <el-radio-group v-if="isFromAddData" v-model="form.opStatus">
        <el-radio class="radio" :label="0">上架</el-radio>
        <el-radio class="radio" :label="1">下架</el-radio>
      </el-radio-group>
      <div class="detail-content" v-if="!isFromAddData"> {{currentStateText}} </div>
    </el-form-item>
    <el-form-item label="标价">
      <el-input placeholder="请输入价格" v-if="isFromAddData" v-model="form.markPrice" style="width:200px;">
        <template slot="append">元起</template>
      </el-input>
      <div class="detail-content" v-if="!isFromAddData"> {{form.markPrice}} 元起 </div>
    </el-form-item>
    <el-col class="line" :span="2"> </el-col>
    <el-button v-if="isFromAddData" type="primary" @click="handleSubmit">提交</el-button>
  </el-form>

  <!--大图-->
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
import coverArea from "../chooseExpress/coverArea.vue";
export default {
  components:{
     coverArea
  },
  data() {
    return {
      id:'',
      url:'',
      localData:{}, // 上一个页面的数据
      // 从详情页面
      isDetail: false,
      // 即将离开的对话框
      loadingFlag: false,
      dialogVisible: false,
      // 添加搜索框
      // 搜索框中省名初始化
      searchProvinces:[],
      showProvinces:'',
      searchContent: "",
      provinces: [],
      // 覆盖地区选择
      CoverData:[],
      check: false,
      checkAll: [],
      checkedCities: [],
      isIndeterminate: [],
      // dialogFormVisible 代表是否打开配置地区的对话框
      dialogFormVisible: false,
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
      currentStateText: '',
      dialogImageUrl:'',//logo大图存放
      form: {
        name: '',
        logo: [{
          name: '',
          url: ""
        }],
        slogan:'',
        sortWeight: '',
        linkUrl: '',
        coverArea:'',
        opStatus:'',
        markPrice:'',

      },
    }
  },
  created() {
    if ( this.$route.path == "/oneCitySend/detail") {
      this.isFromAddData = false;
    } else {
      this.isFromAddData = true;
    }
  },
  mounted() {
    var localData = localEvent.get("localOnecitySend");
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
      console.log(rsp.opStatus)
      console.log(this.$route.path)
      if ( this.$route.path == "/oneCitySend/detail") {
        if (rsp.status == "1") {
          this.form.opStatus = 1;
          this.currentStateText = "已下线"
        } else {
          this.form.opStatus = 0;
          this.currentStateText = "已上线"
        }     
      } else {
        if (rsp.opStatus == "1") {
          this.form.opStatus = 1;
          this.currentStateText = "已下线"
        } else {
          this.form.opStatus = 0;
          this.currentStateText = "已上线"
        }
      }
      this.form.name = rsp.name;
      this.form.sortWeight = rsp.sortWeight;
      this.form.slogan = rsp.slogan;
      this.form.linkUrl = rsp.linkUrl;
      this.form.logo[0].url = rsp.logo;
      this.form.logo[0].name = rsp.logo;      
      this.form.markPrice = rsp.markPrice;
      this.dynamicTags = rsp.tag.substr(0,rsp.tag.length-1).split(",");

      
     this.dialogConfig(true)

    },(error)=>{
      console.log(error)
      console.log('failed');
    });



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
      alert(this.$store.getters.GETEDITFORM)
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
         var result = {
             "data":{
                 "id":this.id,
                 "pageId":this.localData.pageId,
                 "sendappId":this.localData.sendappId,
                 "name":this.form.name,
                 "logo":this.form.logo[0].url,
                 slogan:this.form.slogan,
                 "sortWeight":this.form.sortWeight,
                 "linkUrl":this.form.linkUrl,
                 'opStatus':this.form.opStatus,
                 'markPrice':this.form.markPrice,
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
          console.log(result);
          this.$router.go(-1);
          this.$message({
                type: 'success',
                message: '报存成功！'
            });
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

    },
    // 点击返回 对应的事件处理
    handleBackClick() {
      this.$router.go(-1);
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

       this.form.coverArea = "hasClick";
       this.handleIconClick();
      if(this.gridData.length>0){
          if(this.DialogConfigSaveFlag){
              this.dialogFormVisible = true;
              return;
          }else {
              let localResult = localEvent.get("gridDataSend")
              this.gridData = localResult.provinces;
              console.log("12344444444444444%o",this.gridData);
              this.initCheckBox(localResult.check)
            return;
          }
      }
      var _this = this;
      this.listLoading = true;
      var URL = "/api/sendapp/areaConf/all";   // 默认是 已上线 中的覆盖地区
      let id = this.form.noticeId;
      // alert(id)
      // alert(this.form.noticeId)
      if(this.localData.tabName === "配置") {
          URL = "/api/sendapp/audit/areaConf/all";
          id = this.id;
      }
      _this.$http.post(URL,{id:this.id.toString()},
        (rsp) => {
          _this.gridData = rsp.provinces.slice(0);
          for( let i =0;i<_this.gridData.length;i++) {
             _this.searchProvinces[i]={};
             _this.searchProvinces[i].value = _this.gridData[i].provinceName;
          }
            localEvent.set("gridDataSend", rsp);
            if(visible === undefined) {
                _this.initCheckBox(rsp.check);
            }else {
              this.initCheckBox(rsp.check,visible);
            }
        })
    },
    initCheckBox(isAllcheck,visible){
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
      localEvent.set("gridDataSend",{"provinces":this.gridData,"check":this.check,code:"000000"})
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
      let localResult = localEvent.get("gridDataSend")
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
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
        this.form.tag = this.dynamicTags.join(',');
        if(this.dynamicTags.length >= 2){
          this.addTag = false;
        }else{
          this.addTag = true;
        }
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
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
