<template type="html">
<section class="section" v-loading.body.fullscreen.lock="listLoading">
  <p style="color:#00b7f9;cursor:pointer;margin-top:0;width:100px;" @click="handleBackClick"><i class="el-icon-arrow-left"></i> 返回</p>

  <el-form ref="ruleForm" :model="ruleForm" label-width="180px" label-position="left" style="width:800px;padding-left:100px">
    <el-form-item label="公司名称">
        <el-select v-model="value" filterable placeholder="请选择公司名称" style="width:100%;" @change="handleMerchant">
            <el-option
              v-for="item in options"
              :key="item.merchantLogo"
              :merchantLogo="item.merchantLogo"
              :label="item.merchantName"
              :value="item">
            </el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="LOGO">
      <!--<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove">
        <el-button size="small" style="width:60px;background:#f1f1f1;"><i class="el-icon-upload2"></i> </el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5kb</div>
      </el-upload>-->
      <img width="150px" @click="handlePreview" style="float:left;cursor:pointer;" :src="merchantLogo" alt="">
      <!--<el-popover ref="popover4" placement="right" trigger="click">
        <img :src="merchantLogo">
      </el-popover>-->
      <!--<el-button style="float:left;margin-left:20px" size="small" v-popover:popover4>查看原图</el-button>-->
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
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput" v-show="addTag">+ 添加</el-button>
        <div style="color:#888;">最多添加两个标签</div>
      </div>  
      <div class="detail-content" v-if="!isFromAddData">
        <span style="margin:2px;">{{dynamicTags.join(' ')}}</span>
      </div>   
    </el-form-item>
    <el-form-item label="客服电话">
      <el-input v-model.number="ruleForm.custServiceTel" v-if="isFromAddData" placeholder="请输入客服电话"> </el-input>
      <div class="detail-content" v-if="!isFromAddData"> {{ruleForm.custServiceTel}} </div>      
    </el-form-item>
    <el-form-item label="排序值">
      <el-input v-model.number="ruleForm.sortWeight" v-if="isFromAddData" placeholder="请输入1-999，排序值越大越靠前"> </el-input>
      <div class="detail-content" v-if="!isFromAddData"> {{ruleForm.sortWeight}} </div>            
    </el-form-item>
    <el-form-item label="是否由系统发起支付">
      <el-radio-group :disabled='!disabled'  v-model="ruleForm.isManualPrice">
        <el-radio class="radio" :label="0">是</el-radio>
        <el-radio class="radio" :label="1">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否允许议价">
      <el-radio-group :disabled='!disabled' v-model="ruleForm.pricingMode">
        <el-radio class="radio" :label="0">是</el-radio>
        <el-radio class="radio" :label="1">否</el-radio>
      </el-radio-group>
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
    <el-button v-if="!isFromAddData" type="primary" @click="handleSubmit('ruleForm')">提交</el-button>
  </el-form>

    <!--图片预览 框  -->
  <el-dialog v-model="dialogVisible" size="tiny">
     <img width="100%" :src="merchantLogo" alt="">
  </el-dialog>

</section>
</template>
<script type="text/javascript">
//  import coverArea from "@/page/chooseExpress/coverArea.vue";
import localEvent from 'src/vuex/function.js';

export default {
  data() {
    return {
      dialogVisible:false,//大图显示
      listLoading:false,//loading框
      //标签添加控制
      addTag: true,
      url:'/api/expresscompany/audit/save',
      pageId: '',
      //标签数据
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      dialogTableVisible: false,
      //select 快递公司选项
      options: [],
      value:'',
      merchantLogo:'',
      merchantName:'',
      // 对输入表单进行验证
      ruleForm: {
        slogan: '',
        tag: '',
        custServiceTel:'',
        sortWeight:'',
        isManualPrice: 1,
        pricingMode:1,
        hotStatus: 1,
        newStatus: 1,
        opStatus:1
      },
      disabled:true,
      isFromAddData:false
    }
  },
  created() {
    if ( this.$route.path == "/expressCompany/detail") {
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
    let promotionId = localData.pageMenuConfId;
    this.id = localData.id;
    this.pageId = localData.pageId;
    let _this =this;
    let httpId = '';
    let httpUrl = '';
    if(localData.tabName == '配置'){  //配置 修改
        httpUrl = "/api/expresscompany/audit/get";
        httpId = this.id;
        console.log("配置 修改")
    }else if(!localData.tabName){  // 待审核 已生效详情
        httpUrl = "/api/expresscompany/get";
        httpId = promotionId;
        console.log("待审核 已生效详情")
    }else{
      alert('错误')
    }

    _this.$http.post(httpUrl,{
      "id":httpId
    },(rsp)=>{
      console.log(rsp)

      this.ruleForm.slogan = rsp.slogan;
      this.ruleForm.custServiceTel = rsp.custServiceTel;
      this.ruleForm.sortWeight = rsp.sortWeight;
      this.ruleForm.isManualPrice = Number(rsp.isManualPrice);
      this.ruleForm.hotStatus =  Number(rsp.hotStatus);
      this.ruleForm.newStatus =  Number(rsp.newStatus);
      this.ruleForm.pricingMode =  Number(rsp.pricingMode);
      this.ruleForm.opStatus =  rsp.opStatus=='1'?0:1;
      this.dynamicTags = rsp.tag.substr(0,rsp.tag.length-1).split(",");
      console.log(this.dynamicTags)
      this.dialogConfig(true)

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
          // router.app.$store.state.loadingChange = true
          // _this.$router.app.$store.state.loadingChange = true;
          // _this.$store.dispatch('changeLoadingChange',true);
          // _this.$router.go(-1);
          //开始/结束 日期转换为  yyyy-MM-dd hh:mm:ss 格式
          // let submitDate = _this.ruleForm.date1;
          // console.log(submitDate)
          // this.ruleForm.gmtBegin = formatDate(submitDate[0], 'yyyy-MM-dd hh:mm:ss');
          // this.ruleForm.gmtEnd = formatDate(submitDate[1], 'yyyy-MM-dd hh:mm:ss');
          // console.log(this.ruleForm.gmtBegin)
          // console.log(this.ruleForm.gmtEnd)

          let httpData = {
                "data": {
                  "pageId": _this.pageId,
                  // "businessType":_this.ruleForm.businessType,
                  "isvMerchantId": '1',
                  "slogan": _this.ruleForm.slogan,
                  "tag":_this.ruleForm.tag,
                  "custServiceTel":_this.ruleForm.custServiceTel,                                    
                  "sortWeight":_this.ruleForm.sortWeight,  
                  "isManualPrice":_this.ruleForm.isManualPrice,                                  
                  "pricingMode":_this.ruleForm.pricingMode,
                  "hotStatus":_this.ruleForm.hotStatus,                  
                  "newStatus":_this.ruleForm.newStatus,
                  "opStatus":_this.ruleForm.opStatus,
                }
              };
          _this.$http.post(_this.url,httpData,(result) => {
              _this.$store.dispatch('changeLoadingChange',true);
              _this.$router.go(-1);
              _this.listLoading = false;
            // _this.tableData = result.page_list;
            // _this.totalCount = parseInt(result.pages.cnt);
             this.$message({
                  type: 'success',
                  message: "报存成功！"
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
    handleMerchant(){
      this.merchantLogo = this.value.merchantLogo;
      this.merchantName = this.value.merchantName;
      this.ruleForm.isvMerchantId = this.value.id;
    },
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
