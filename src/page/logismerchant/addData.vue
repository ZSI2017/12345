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
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="240px"  style="width:800px;padding-left:100px">
    <el-form-item label='物流机构编码' prop="merchantCode">
      <el-input v-model.number="ruleForm.merchantCode" placeholder="请输入物流机构编码"> </el-input>
    </el-form-item>
    <el-form-item label="机构名称" prop="merchantName">
      <el-input v-model="ruleForm.merchantName" placeholder="请输入机构名称"> </el-input>
    </el-form-item>
    <el-form-item label="物流机构类型" prop="merchantType">
      <!--<el-input v-model="ruleForm.merchantType" placeholder="请输入物流机构类型"> </el-input>-->
      <el-select v-model="ruleForm.merchantType" @change="handleAccessType" placeholder="请选择物流机构类型" style="width:100%;">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="物流机构LOGO的URL" prop="merchantLogo">
        <!--<el-input v-model="ruleForm.merchantLogo" placeholder="请输入物流机构LOGO的URL"> </el-input>      -->
        <el-upload
            class="upload-demo"
            action="http://sendexmng-sit.alipay-eco.com/api/promotion/upload"
            :on-change="handleImageChange"
            :file-list="ruleForm.merchantLogo"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success='handleSuccess'
            :on-error='handlerror'
            >
            <el-button size="small" style="width:60px;background:#f1f1f1;"><i class="el-icon-upload2"></i> </el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item label="物流机构LOGO_CARD的URL" prop="merchantLogo_card">
        <el-upload
            class="upload-demo"
            action="http://sendexmng-sit.alipay-eco.com/api/promotion/upload"
            :on-change="handleImageChange2"
            :file-list="ruleForm.merchantLogo_card"
            :on-preview="handlePreview2"
            :on-remove="handleRemove2"
            :on-success='handleSuccess2'
            :on-error='handlerror2'
            >
            <el-button size="small" style="width:60px;background:#f1f1f1;"><i class="el-icon-upload2"></i> </el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </el-form-item>
    <el-form-item label="收款人支付宝PID" prop="payeePid">
      <el-input v-model.number="ruleForm.payeePid" placeholder="请输入收款人支付宝PID"> </el-input>
    </el-form-item>
    <el-form-item label="收款人支付宝账号" prop="payeeAccount">
      <el-input v-model="ruleForm.payeeAccount" placeholder="请输入收款人支付宝账号"> </el-input>
    </el-form-item>
    <el-form-item label="机构联系人姓名" prop="contactName">
      <el-input v-model="ruleForm.contactName" placeholder="请输入机构联系人姓名"> </el-input>
    </el-form-item>
    <el-form-item label="机构联系人手机号码" prop="contactMobile">
      <el-input v-model.number="ruleForm.contactMobile" placeholder="请输入机构联系人手机号"> </el-input>
    </el-form-item>
    <el-form-item label="营业执照代码" prop="businessLicenceCode">
      <el-input v-model.number="ruleForm.businessLicenceCode" placeholder="请输入营业执照代码"> </el-input>
    </el-form-item>
    <el-form-item label="营业执照照片URL" prop="businessLicencePic">
      <el-input v-model="ruleForm.businessLicencePic" placeholder="请输入营业执照照片URL"> </el-input>
    </el-form-item>
    <el-form-item label="物流行业许可证代码" prop="logisLicenceCode">
      <el-input v-model.number="ruleForm.logisLicenceCode" placeholder="请输入物流许可证代码"> </el-input>
    </el-form-item>
    <el-form-item label="物流行业许可证照片的URL" prop="logisLicencePic">
      <el-input v-model="ruleForm.logisLicencePic" placeholder="请输入物流行业许可证照片的URL"> </el-input>
    </el-form-item>
    <el-form-item label="省代码" prop="provinceCode">
      <el-input v-model.number="ruleForm.provinceCode" placeholder="请输入省代码"> </el-input>
    </el-form-item>
    <el-form-item label="市代码" prop="cityCode">
      <el-input v-model.number="ruleForm.cityCode" placeholder="请输入市代码"> </el-input>
    </el-form-item>
    <el-form-item label="区县代码" prop="districtCode">
      <el-input v-model.number="ruleForm.districtCode" placeholder="请输入区县代码"> </el-input>
    </el-form-item>
    <el-form-item label="详细地址" prop="address">
      <el-input v-model="ruleForm.address" placeholder="请输入详细地址"> </el-input>
    </el-form-item>
    <el-form-item label="邮编" prop="zip">
      <el-input v-model.number="ruleForm.zip" placeholder="请输入邮编"> </el-input>
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input v-model="ruleForm.email" placeholder="请输入Email"> </el-input>
    </el-form-item>
    <el-form-item label="机构联系电话" prop="merchantTel">
      <el-input v-model.number="ruleForm.merchantTel" placeholder="请输入机构联系电话"> </el-input>
    </el-form-item>
    <el-form-item label="ISVID" prop="isvMerchantId">
      <el-input v-model.number="ruleForm.isvMerchantId" placeholder="请输入ISVID"> </el-input>
    </el-form-item>
    <el-form-item label="外部ISV系统名" prop="outSysName">
      <el-input v-model="ruleForm.outSysName" placeholder="请输入外部ISV系统名"> </el-input>
    </el-form-item>
    <el-form-item label="接入方式" prop="accessType">
        <el-select v-model="ruleForm.accessType" @change="handleAccessType" placeholder="请选择接入方式" style="width:100%;">
            <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="接入状态" prop="accessStatus">
        <el-select v-model="ruleForm.accessStatus" placeholder="请选择接入状态" style="width:100%;">
            <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="服务区域获取方式" prop="serviceAreaAcqMethod">
        <el-select v-model="ruleForm.serviceAreaAcqMethod" placeholder="请选择服务区域获取方式" style="width:100%;">
            <el-option
            v-for="item in options4"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="接单开始时间">
        <el-time-select
            placeholder="请选择接单开始时间"
            v-model="ruleForm.acceptOrderFrom"
            style="width:100%;"
            :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30'
            }">
        </el-time-select>
    </el-form-item>
    <el-form-item label="接单结束时间">
        <el-time-select
            placeholder="请选择接单结束时间"
            v-model="ruleForm.acceptOrderTo"
            style="width:100%;"
            :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
            minTime: ruleForm.acceptOrderFrom
            }">
        </el-time-select>

    </el-form-item>
    <el-form-item label="服务时间段间隔" prop="serviceTimeInterval">
        <el-input
        placeholder="请输入服务时间段间隔"
        style='width:100%;'
        v-model.number="ruleForm.serviceTimeInterval">
          <template slot="append">小时</template>
        </el-input>
    </el-form-item>
    <el-form-item label="授权状态" prop="alipayAuthStatus">
        <el-select v-model="ruleForm.alipayAuthStatus" placeholder="请选择授权状态" style="width:100%;">
            <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="授权商户PID" prop="alipayPid">
      <el-input v-model.number="ruleForm.alipayPid" placeholder="请输入授权商户PID"> </el-input>
    </el-form-item>
    <el-form-item label="授权商户APPID" prop="alipayAppid">
      <el-input v-model.number="ruleForm.alipayAppid" placeholder="请输入授权商户APPID"> </el-input>
    </el-form-item>
    <el-form-item label="商户授权令牌" prop="alipayAuthToken">
      <el-input v-model="ruleForm.alipayAuthToken" placeholder="请输入商户授权令牌"> </el-input>
    </el-form-item>
    <el-form-item label="刷新令牌" prop="refreshToken">
      <el-input v-model="ruleForm.refreshToken" placeholder="请输入刷新令牌"> </el-input>
    </el-form-item>
    <!--<el-form-item label="商户有权令牌有效期">
        <el-date-picker
          v-model="ruleForm.authTokenExpried"
          type="datetime"
          style='width:100%;'
          placeholder="请选择商户有权令牌有效期">
        </el-date-picker>
    </el-form-item>
    <el-form-item label="刷新令牌有效期">
        <el-date-picker
          v-model="ruleForm.rtExpried"
          type="datetime"
          style='width:100%;'
          placeholder="请选择刷新令牌有效期">
        </el-date-picker>
    </el-form-item>
    <el-form-item label="后台操作用户ID">
      <el-input v-model="ruleForm.mngUid" placeholder="请输入后台操作用户ID"> </el-input>
    </el-form-item>
    <el-form-item label="后台操作用户名称">
      <el-input v-model="ruleForm.mngUname" placeholder="请输入后台操作用户名称"> </el-input>
    </el-form-item>-->
    <el-button type="primary" size="large" @click="handleSubmit('ruleForm')">提 交</el-button>
  </el-form>
  <!--//图片预览、-->
  <el-dialog v-model="dialogVisible" size="tiny">
    <img width="100%" :src="dialogImg" alt="">
  </el-dialog>
  <el-dialog v-model="dialogVisible2" size="tiny">
    <img width="100%" :src="dialogImg2" alt="">
  </el-dialog>

</section>
</template>
<script type="text/javascript">
  import {
    formatDate
  } from 'src/util/date.js';

export default {
  data() {
    return {
      showAlert:false, // 展示警告信息
      dialogVisible:false,
      dialogVisible2:false,
      url:'/api/logisMerchant/save',
      value:'',
      value1:'',
      dialogImg:[],
      dialogImg2:[],
      // 对输入表单进行验证
      ruleForm: {
        merchantCode:'',
        merchantType:'',
        merchantName:'',
        merchantLogo:[],
        merchantLogo_card:[],
        payeePid:'',
        payeeAccount:'',
        contactName:'',
        contactMobile:'',
        businessLicenceCode:'',
        businessLicencePic:'',
        logisLicenceCode:'',
        logisLicencePic:'',
        provinceCode:'',
        cityCode:'',
        districtCode:'',
        address:'',
        zip:'',
        email:'',
        merchantTel:'',
        isvMerchantId:'',
        outSysName:'',
        accessType:'',
        accessStatus:'',
        acceptOrderFrom:'',
        acceptOrderTo:'',
        alipayAuthStatus:'',
        alipayPid:'',
        alipayAppid:'',
        alipayAuthToken:'',
        refreshToken:'',
        authTokenExpried:'',
        rtExpried:'',
        mngUid:'',
        mngUname:'',
        serviceAreaAcqMethod:'',
        serviceTimeInterval:'',
        gmtCreate:'',
        gmtModified:''
      },
      rules: {
        merchantCode: [
          {required: true,message:'请输入物流机构编码'},
          {required: true,message:'请输入数字',type: "number"}
        ],
        merchantName: [
          {type: "string",required: true,message: '请输入正确运营图名称',trigger: 'blur'},
          {min:1,max:10,message:'名称长度不大于10'}
        ],
        merchantType: [
          { required: true, message: '请选择物流机构类型', trigger: 'change' }
        ],
        merchantLogo: [
          { required: true, message: '请上传物流机构LOGO', trigger: 'on-change',type:"array"}
        ],
        merchantLogo_card: [
          { required: true, message: '物流机构LOGO_CARD', trigger: 'on-change',type:"array"}
        ],
        payeePid: [
          {required: true, message: '请输入收款人支付宝PID'},
          {required: true, message:'请输入数字',type: "number"}                       
        ],
        payeeAccount: [
          { required: true, message: '请输入收款人支付宝账号',type:"string"}                 
        ],
        contactName: [
          { required: true, message: '请输入机构联系人姓名', trigger: 'blur',type:"string"}
        ],
        contactMobile: [
          { required: true, message: '请输入机构联系人手机号码'},
          {required: true, message:'请输入数字',type: "number"} 
        ],
        businessLicenceCode: [
          { required: true, message: '请输入营业执照代码',},
          {required: true, message:'请输入数字',type: "number"} 
        ],
        businessLicencePic: [
          { required: true, message: '请输入营业执照照片URL', trigger: 'blur',type:"string"}
        ],
        logisLicenceCode: [
          { required: true, message: '请输入物流行业许可证代码'},
          {required: true, message:'请输入数字',type: "number"} 
        ],
        logisLicencePic: [
          { required: true, message: '请输入物流行业许可证照片的URL', trigger: 'blur',type:"string"}
        ],
        provinceCode: [
          { required: true, message: '请输入省代码'},
          {required: true, message:'请输入数字',type: "number"} 
        ],
        cityCode: [
          { required: true, message: '请输入市代码'},
          {required: true, message:'请输入数字',type: "number"} 
        ],
        districtCode: [
          { required: true, message: '请输入区县代码'},
          {required: true, message:'请输入数字',type: "number"} 
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur',type:"string"}
        ],
        zip: [
          { required: true, message: '请输入邮编'},
          {required: true, message:'请输入数字',type: "number"} 
        ],
        email: [
          { required: true, message: '请输入Email', trigger: 'blur',type:"string"}
        ],
        merchantTel: [
          { required: true, message: '请输入机构联系电话'},
          {required: true, message:'请输入数字',type: "number"} 
        ],
        isvMerchantId: [
          { required: true, message: '请输入ISVID'},
          {required: true, message:'请输入数字',type: "number"} 
        ],
        outSysName: [
          { required: true, message: '请输入外部ISV系统名', trigger: 'blur',type:"string"}
        ],
        accessType: [
          { required: true, message: '请选择接入方式', trigger: 'change' }
        ],
        accessStatus: [
          { required: true, message: '请选择接入状态', trigger: 'change' }
        ],
        serviceAreaAcqMethod: [
          { required: true, message: '请选择服务区域获取方式', trigger: 'change' }
        ],
        acceptOrderFrom: [
          { type: 'date', required: true, message: '请选择接单开始时间', trigger: 'change' }
        ],
        acceptOrderTo: [
          { type: 'date', required: true, message: '请选择接单结束时间', trigger: 'change' }
        ],
        serviceTimeInterval: [
          { required: true, message: '请输入服务时间段间隔'},
          {required: true, message:'请输入数字',type: "number"} 
        ],
        alipayAuthStatus: [
          { required: true, message: '请选择授权状态', trigger: 'change' }
        ],
        alipayPid: [
          { required: true, message: '请输入授权商户PID'},
          {required: true, message:'请输入数字',type: "number"} 
        ],
        alipayAppid: [
          { required: true, message: '请输入授权商户APPID'},
          {required: true, message:'请输入数字',type: "number"} 
        ],
        alipayAuthToken: [
          { type: 'string', required: true, message: '请输入商户授权令牌', trigger: 'blur' }
        ],
        refreshToken: [
          { type: 'string', required: true, message: '请输入刷新令牌', trigger: 'blur' }
        ]
      },
      options:[{
          value: '1',
          label: '物流公司'
        }, {
          value: '0',
          label: 'ISV'
        }, {
          value: '3',
          label: '物流平台'
        }],
        //授权状态
       options1: [{
          value: '1',
          label: '已授权'
        }, {
          value: '0',
          label: '未授权'
        }],
        //接入方式
        options2:[{
          value: '1',
          label: '物流公司直接接入'
        }, {
          value: '2',
          label: '通过isv接入'
        }],
        //接入方式
        options3:[{
          value: '0',
          label: '未接入'
        }, {
          value: '1',
          label: '已接入'
        }],
        //接入方式
        options4:[{
          value: '1',
          label: '内部数据'
        }, {
          value: '2',
          label: '外部接口'
        }],

    }
  },
  created() {

  },
  beforeMount() {

  },
  mounted() {
    console.log("router params %c %o","fontSize:20px",this.$route.params);

  },
  beforeDestory() {
    alert("beforeDestory")
  },
  watch: {

  },
  methods: {
    //  点击提交
    handleSubmit(formName) {
      // var _this = this;
      console.log("-----------------------");
      console.log(this.$refs[formName]);
      console.log(this.ruleForm.accessType)
      console.log(this.ruleForm.alipayAuthStatus)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let httpData = {
            "data": {
              'merchantCode':this.ruleForm.merchantCode,
              'merchantType':this.ruleForm.merchantType,
              'merchantName':this.ruleForm.merchantName,
              'merchantLogo':this.dialogImg,
              'merchantLogo_card':this.dialogImg2,
              'payeePid':this.ruleForm.payeePid,
              'payeeAccount':this.ruleForm.payeeAccount,
              'contactName':this.ruleForm.contactName,
              'contactMobile':this.ruleForm.contactMobile,
              'businessLicenceCode':this.ruleForm.businessLicenceCode,
              'businessLicencePic':this.ruleForm.businessLicencePic,
              'logisLicenceCode':this.ruleForm.logisLicenceCode,
              'logisLicencePic':this.ruleForm.logisLicencePic,
              'provinceCode':this.ruleForm.provinceCode,
              'cityCode':this.ruleForm.cityCode,
              'districtCode':this.ruleForm.districtCode,
              'address':this.ruleForm.address,
              'zip':this.ruleForm.zip,
              'email':this.ruleForm.email,
              'merchantTel':this.ruleForm.merchantTel,
              'isvMerchantId':this.ruleForm.isvMerchantId,
              'outSysName':this.ruleForm.outSysName,
              'accessType':this.ruleForm.accessType,
              'accessStatus':this.ruleForm.accessStatus,
              'acceptOrderFrom':this.ruleForm.acceptOrderFrom,
              'acceptOrderTo':this.ruleForm.acceptOrderTo,
              'alipayAuthStatus':this.ruleForm.alipayAuthStatus,
              'alipayPid':this.ruleForm.alipayPid,
              'alipayAppid':this.ruleForm.alipayAppid,
              'alipayAuthToken':this.ruleForm.alipayAuthToken,
              'refreshToken':this.ruleForm.refreshToken,
              // 'authTokenExpried':formatDate(this.ruleForm.authTokenExpried, 'yyyy-MM-dd hh:mm:ss'),
              // 'rtExpried':formatDate(this.ruleForm.rtExpried, 'yyyy-MM-dd hh:mm:ss'),
              // 'mngUid':this.ruleForm.mngUid,
              // 'mngUname':this.ruleForm.mngUname,
              'serviceAreaAcqMethod':this.ruleForm.serviceAreaAcqMethod,
              'serviceTimeInterval':this.ruleForm.serviceTimeInterval,
              // 'gmtCreate':this.ruleForm.gmtCreate,
              // 'gmtModified':this.ruleForm.gmtModified
            }
          };
          this.$http.post(this.url,httpData,(result) => {
              _this.$store.dispatch('changeLoadingChange',true);
              this.$message({
                  type: 'success',
                  message: '提交成功'
              });
              console.log(result)
              // _this.$store.dispatch('changeLoadingChange',true);
              this.$router.go(-1);



          },(error) => {
              this.$message({
                  type: 'error',
                  message: error.data.meta.code+"--"+error.data.meta.msg
              });
          });


        } else {
          console.log(this);

          return false;
        }
      })
      

    },
    // 点击返回 对应的事件处理
    handleBackClick() {
        this.$router.go(-1);
      // this.loadingFlag = true;
    },
    // 对 物流机构LOGO的URL 图片操作的控制
    handleImageChange(file,fileList){
        this.ruleForm.merchantLogo= fileList.slice(-1);
    },
    handlePreview(file) {
      this.dialogVisible = true;
      console.log(file.response)
    },
    handleSuccess(file){
      console.log(file)
      console.log(file.result)
      this.dialogImg = file.result;
      console.log(this.dialogImg)

    },
    handlerror(err, file, fileList){
      alert(err);
      alert(file);
      alert(fileList);
    },
    handleRemove() {},
    // 对 物流机构LOGO_CARD的URL 图片操作的控制
    handleImageChange2(file,fileList){
        this.ruleForm.merchantLogo_card = fileList.slice(-1);
    },
    handlePreview2(file) {
      this.dialogVisible2 = true;
      console.log(file.response)
    },
    handleSuccess2(file){
      console.log(file.result)
      this.dialogImg2 = file.result;
      console.log(this.dialogImg2)
    },
    handlerror2(err, file, fileList){
      alert(err);
      alert(file);
      alert(fileList);
    },
    handleRemove() {},
    //接入方式 change
    handleAccessType(){
      console.log(this.ruleForm.accessType)
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
