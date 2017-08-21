<template type="html">
<section class="section" v-loading.body.fullscreen.lock="listLoading">
  <p style="color:#00b7f9;cursor:pointer;margin-top:0;width:100px;" @click="handleBackClick"><i class="el-icon-arrow-left"></i> 返回</p>

  <el-form ref="ruleForm" :model="ruleForm" labelPosition="left" label-width="180px" style="width:800px;padding-left:100px;">
    <el-form-item label="公司名称">
        <el-input disabled :value="merchantName"> </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="LOGO">
      <img width="150px" @click="handlePreview" style="float:left;cursor:pointer;" :src="merchantLogo" alt="">
    </el-form-item>
    <el-form-item label="广告语">
      <el-input v-if="isFromAddData" v-model="ruleForm.slogan" placeholder="请输入广告语"> </el-input>
      <div class="detail-content" v-if="!isFromAddData"> {{ruleForm.slogan}} </div>
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
    <el-form-item label="排序值">
      <el-input v-model.number="ruleForm.sortWeight"  type="number" v-if="isFromAddData" placeholder="请输入1-999，排序值越大越靠前"> </el-input>
      <div class="detail-content" v-if="!isFromAddData"> {{ruleForm.sortWeight}} </div>
    </el-form-item>
    <el-form-item label="链接" prop="url">
      <el-input v-if="isFromAddData"  v-model="ruleForm.url" placeholder="请输入需要跳转的链接，如果调"> </el-input>
      <div class="detail-content" v-if="!isFromAddData"> {{ruleForm.url}} </div>
    </el-form-item>
    <el-form-item label="是否最热">
      <el-radio-group :disabled='!disabled' v-model="ruleForm.hotStatus">
        <el-radio class="radio" :label="0">是</el-radio>
        <el-radio class="radio" :label="1">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否最新">
      <el-radio-group :disabled='!disabled' v-model="ruleForm.newStatus">
        <el-radio class="radio" :label="0">是</el-radio>
        <el-radio class="radio" :label="1">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="当前状态">
      <el-radio-group :disabled='!disabled' v-model="ruleForm.opStatus">
        <el-radio class="radio" :label="0">上架</el-radio>
        <el-radio class="radio" :label="1">下架</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-col class="line" :span="2"> </el-col>
    <el-button v-if="isFromAddData" type="primary" @click="handleSubmit('ruleForm')">提交</el-button>
  </el-form>

    <!--图片预览 框  -->
  <el-dialog v-model="dialogVisible" size="tiny">
     <img width="100%" :src="merchantLogo" alt="">
  </el-dialog>

</section>
</template>
<script type="text/javascript">
import localEvent from 'src/vuex/function.js';

export default {
  data() {
    return {
      dialogVisible:false,//大图显示
      listLoading:false,//loading框
      //标签添加控制
      addTag: true,
      url:'/api/chooseorder/audit/update',
      pageId: '',
      //标签数据
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      dialogTableVisible: false,
      //select 快递公司选项
      merchantLogo:'',
      merchantName:'',
      // 对输入表单进行验证
      ruleForm: {
        logisMerchId: '',
        slogan: '',
        tag: '',
        sortWeight:'',
        url:'',
        hotStatus: 1,
        newStatus: 1,
        opStatus:1
      },
      disabled:true,
      isFromAddData:false
    }
  },
  created() {
    if ( this.$route.path == "/chooseExpressOrder/detail") {
      this.isFromAddData = false;
      this.disabled = false;
    } else {
      this.isFromAddData = true;
    }

  },
  beforeMount() {

  },
  mounted() {
    let localData = localEvent.get("localExpressCompany");
    console.log(localData);
    // console.log(localData.promotionId);
    let promotionId = localData.pageExpConfId;
    this.ruleForm.logisMerchId = localData.logisMerchId;
    this.id = localData.id;
    this.pageId = localData.pageId;
    let _this =this;
    let httpId = '';
    let httpUrl = '';
    if(localData.tabName == '配置'){  //配置 修改
        httpUrl = "/api/chooseorder/audit/get";
        httpId = this.id;
        console.log("配置 修改")
    }else if(!localData.tabName){  // 待审核 已生效详情
        httpUrl = "/api/chooseorder/get";
        httpId = promotionId;
        console.log("待审核 已生效详情")
    }else{
      alert('错误')
    }
    //快递公司接口数据
    _this.$http.post('/api/logisMerchant/get',{
      "id":this.ruleForm.logisMerchId.toString()
    },(rsp)=>{
      console.log(rsp)
      this.merchantLogo = rsp.merchantLogo;
      this.merchantName = rsp.merchantName;
    },(error)=>{
      console.log(error)
      console.log('failed');
    });
    //其余数据接口
    _this.$http.post(httpUrl,{
      "id":httpId.toString()
    },(rsp)=>{
      console.log(rsp)
      this.ruleForm.slogan = rsp.slogan;
      this.ruleForm.sortWeight = rsp.sortWeight;
      this.ruleForm.hotStatus =  Number(rsp.hotStatus);
      this.ruleForm.newStatus =  Number(rsp.newStatus);
      this.dynamicTags = rsp.tag.substr(0,rsp.tag.length-1).split(",");
      this.ruleForm.url = rsp.url;
      console.log(this.dynamicTags)
      console.log(rsp.tag)
      // this.dialogConfig(true)
      if ( this.$route.path == "/chooseExpressOrder/detail") {
        this.ruleForm.opStatus =  rsp.status=='1'?1:0;
      } else {
        this.ruleForm.opStatus =  rsp.opStatus=='1'?1:0;
      }

    },(error)=>{
      console.log(error)
      console.log('failed');
    });


  },
  beforeDestory() {
    alert("beforeDestory")
  },
  watch: {

  },
  methods: {
    changeVisible(flag){
      this.dialogTableVisible = flag;
    },
    //  点击提交
    handleSubmit(formName) {
      var _this = this;
      _this.listLoading = true;
      console.log("-----------------------");
        console.log(this.$refs[formName]),
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
          console.log('error submit');
          this.ruleForm.tag = this.dynamicTags.join(',') + ',';
          let httpData = {
                "data": {
                  "id": this.id,
                  "pageId": _this.pageId,
                  // "businessType":_this.ruleForm.businessType,
                  "logisMerchId": _this.ruleForm.logisMerchId,
                  "slogan": _this.ruleForm.slogan,
                  "tag":_this.ruleForm.tag,
                  "sortWeight":_this.ruleForm.sortWeight,
                  "hotStatus":_this.ruleForm.hotStatus,
                  "newStatus":_this.ruleForm.newStatus,
                  "opStatus":_this.ruleForm.opStatus,
                  "url":this.ruleForm.url,
                }
              };
          _this.$http.post(_this.url,httpData,(result) => {
              _this.$store.dispatch('changeLoadingChange',true);
              _this.$router.go(-1);
              _this.listLoading = false;
             this.$message({
                  type: 'success',
                  message: "保存成功！"
              });
          },(error) => {
              _this.listLoading = false;
              this.$message({
                  type: 'error',
                  message: error.data.meta.code+"--"+error.data.meta.msg
              });
          });

          // console.log(this.$route.matched);

      //   } else {
      //     console.log(_this);

      //     return false;
      //   }
      // })

    },
    // 点击返回 对应的事件处理
    handleBackClick() {
      this.$router.go(-1);
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
        this.ruleForm.tag = this.dynamicTags.join(',');
        if(this.dynamicTags.length >= 2){
          this.addTag = false;
        }else{
          this.addTag = true;
        }
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    // handleMerchant(){
      // this.merchantLogo = this.value.merchantLogo;
      // this.merchantName = this.value.merchantName;
    //   this.ruleForm.isvMerchantId = this.value.id;
    // },
    handlePreview(file) {
      this.dialogVisible = true;
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
