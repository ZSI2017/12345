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
  <el-form ref="ruleForm" label-width="240px"  style="width:800px;padding-left:100px">
    <el-form-item label='物流机构编码'>
      <el-input v-model="ruleForm.merchantCode" placeholder="请输入物流机构编码"> </el-input>
    </el-form-item>
    <el-form-item label="机构名称">
      <el-input v-model="ruleForm.merchantName" placeholder="请输入机构名称"> </el-input>
    </el-form-item>
    <el-form-item label="物流机构类型">
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
    <el-form-item label="物流机构LOGO的URL">
        <!--<el-input v-model="ruleForm.merchantLogo" placeholder="请输入物流机构LOGO的URL"> </el-input>      -->
        <el-upload
            class="upload-demo"
            :action="$http.url+'/api/promotion/upload'"
            :on-change="handleImageChange"
            :file-list="ruleForm.merchantLogo"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success='handleSuccess'
            :on-error='handlerror'
            list-type="picture"
            >
            <el-button size="small" style="width:60px;background:#f1f1f1;"><i class="el-icon-upload2"></i> </el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过200kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item label="物流机构LOGO_CARD的URL">
        <el-upload
            class="upload-demo"
            :action="$http.url+'/api/promotion/upload'"
            :on-change="handleImageChange2"
            :file-list="fileIcon"
            :on-preview="handlePreview2"
            :on-remove="handleRemove2"
            :on-success='handleSuccess2'
            :on-error='handlerror2'
            list-type="picture"
            >
            <el-button size="small" style="width:60px;background:#f1f1f1;"><i class="el-icon-upload2"></i> </el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过200kb</div>
        </el-upload>
    </el-form-item>
    <el-form-item label="收款人支付宝PID">
      <el-input v-model="ruleForm.payeePid" placeholder="请输入收款人支付宝PID"> </el-input>
    </el-form-item>
    <el-form-item label="收款人支付宝账号">
      <el-input v-model="ruleForm.payeeAccount" placeholder="请输入收款人支付宝账号"> </el-input>
    </el-form-item>
    <el-form-item label="机构联系人姓名">
      <el-input v-model="ruleForm.contactName" placeholder="请输入机构联系人姓名"> </el-input>
    </el-form-item>
    <el-form-item label="机构联系人手机号码">
      <el-input v-model="ruleForm.contactMobile" placeholder="请输入机构联系人手机号"> </el-input>
    </el-form-item>
    <el-form-item label="营业执照代码">
      <el-input v-model="ruleForm.businessLicenceCode" placeholder="请输入营业执照代码"> </el-input>
    </el-form-item>
    <el-form-item label="营业执照照片URL">
      <el-input v-model="ruleForm.businessLicencePic" placeholder="请输入营业执照照片URL"> </el-input>
    </el-form-item>
    <el-form-item label="物流行业许可证代码">
      <el-input v-model="ruleForm.logisLicenceCode" placeholder="请输入物流许可证代码"> </el-input>
    </el-form-item>
    <el-form-item label="物流行业许可证照片的URL">
      <el-input v-model="ruleForm.logisLicencePic" placeholder="请输入物流行业许可证照片的URL"> </el-input>
    </el-form-item>
    <el-form-item label="省代码">
      <el-input v-model="ruleForm.provinceCode" placeholder="请输入省代码"> </el-input>
    </el-form-item>
    <el-form-item label="市代码">
      <el-input v-model="ruleForm.cityCode" placeholder="请输入市代码"> </el-input>
    </el-form-item>
    <el-form-item label="区县代码">
      <el-input v-model="ruleForm.districtCode" placeholder="请输入区县代码"> </el-input>
    </el-form-item>
    <el-form-item label="详细地址">
      <el-input v-model="ruleForm.address" placeholder="请输入详细地址"> </el-input>
    </el-form-item>
    <el-form-item label="邮编">
      <el-input v-model="ruleForm.zip" placeholder="请输入邮编"> </el-input>
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model="ruleForm.email" placeholder="请输入Email"> </el-input>
    </el-form-item>
    <el-form-item label="机构联系电话">
      <el-input v-model="ruleForm.merchantTel" placeholder="请输入机构联系电话"> </el-input>
    </el-form-item>
    <el-form-item label="ISVID">
      <el-input v-model="ruleForm.isvMerchantId" placeholder="请输入ISVID"> </el-input>
    </el-form-item>
    <el-form-item label="外部ISV系统名">
      <el-input v-model="ruleForm.outSysName" placeholder="请输入外部ISV系统名"> </el-input>
    </el-form-item>
    <el-form-item label="接入方式">
        <el-select v-model="ruleForm.accessType" placeholder="请选择接入方式" style="width:100%;">
            <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="接入状态">
        <el-select v-model="ruleForm.accessStatus" placeholder="请选择接入状态" style="width:100%;">
            <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="服务区域获取方式">
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
            placeholder="请输入接单结束时间"
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
    <el-form-item label="服务时间段间隔">
        <el-input
        placeholder="请选择服务时间段间隔"
        style='width:100%;'
        v-model="ruleForm.serviceTimeInterval">
          <template slot="append">小时</template>
        </el-input>
    </el-form-item>
    <el-form-item label="授权状态">
        <el-select v-model="ruleForm.alipayAuthStatus" placeholder="请选择授权状态" style="width:100%;">
            <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="授权商户PID">
      <el-input v-model="ruleForm.alipayPid" placeholder="请输入授权商户PID"> </el-input>
    </el-form-item>
    <el-form-item label="授权商户APPID">
      <el-input v-model="ruleForm.alipayAppid" placeholder="请输入授权商户APPID"> </el-input>
    </el-form-item>
    <el-form-item label="商户授权令牌">
      <el-input v-model="ruleForm.alipayAuthToken" disabled placeholder="请输入商户授权令牌"> </el-input>
    </el-form-item>
    <el-form-item label="刷新令牌">
      <el-input v-model="ruleForm.refreshToken" disabled placeholder="请输入刷新令牌"> </el-input>
    </el-form-item>
    <el-form-item label="商户有权令牌有效期">
        <el-date-picker
          disabled
          v-model="ruleForm.authTokenExpried"
          type="datetime"
          style='width:100%;'
          placeholder="请选择商户有权令牌有效期">
        </el-date-picker>
    </el-form-item>
    <el-form-item label="刷新令牌有效期">
        <el-date-picker
          disabled
          v-model="ruleForm.rtExpried"
          type="datetime"
          style='width:100%;'
          placeholder="请选择刷新令牌有效期">
        </el-date-picker>
    </el-form-item>
    <el-form-item label="后台操作用户ID">
      <el-input disabled v-model="ruleForm.mngUid" placeholder="请输入后台操作用户ID"> </el-input>
    </el-form-item>
    <el-form-item label="后台操作用户名称">
      <el-input disabled v-model="ruleForm.mngUname" placeholder="请输入后台操作用户名称"> </el-input>
    </el-form-item>
    <el-form-item label="创建时间">
      <el-input disabled v-model="ruleForm.gmtCreate" placeholder="请输入创建时间"> </el-input>
    </el-form-item>
    <el-form-item label="修改时间">
      <el-input disabled v-model="ruleForm.gmtModified" placeholder="请输入创建时间"> </el-input>
    </el-form-item>

    <el-button type="primary" size="large" @click="handleSubmit('ruleForm')">提 交</el-button>
  </el-form>
  <el-dialog v-model="dialogVisible" size="tiny">
    <img width="100%" :src="ruleForm.merchantLogo[0].url" alt="">
  </el-dialog>
  <el-dialog v-model="dialogVisible2" size="tiny">
    <img width="100%" :src="ruleForm.merchantLogo_card[0].url" alt="">
  </el-dialog>
</section>
</template>
<script type="text/javascript">
  import {
    formatDate
  } from 'src/util/date.js';
  import localEvent from 'src/vuex/function.js';
export default {
  data() {
    return {
      showAlert:false, // 展示警告信息
      dialogVisible:false,
      dialogVisible2:false,
      url:'/api/logisMerchant/update',
      value:'',
      value1:'',
      localDeleteId:'',
      fileIcon:[],
      // 对输入表单进行验证
      ruleForm: {
        merchantCode:'',
        merchantType:'',
        merchantName:'',
        merchantLogo:[{
          name: '',
          url: ""
        }],
        merchantLogo_card:[{
          name: '',
          url: ""
        }],
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

    this.localDeleteId = localEvent.get('localDelete')
    console.log(this.localDeleteId)
    var _this = this;
    var httpUrl = '/api/logisMerchant/get'
    _this.$http.post(httpUrl,{id:this.localDeleteId.toString()},(result) => {
        console.log(result)
        console.log(result.merchantLogo)
        _this.$store.dispatch('changeLoadingChange',true);
        let newDate3 = new Date(result.gmtCreate);
        let newDate4 = new Date(result.gmtModified);
        console.log(newDate3)

        // this.$router.go(-1);
        _this.ruleForm.merchantCode = result.merchantCode;
        _this.ruleForm.merchantType = result.merchantType;
        _this.ruleForm.merchantName = result.merchantName;
        _this.ruleForm.merchantLogo[0].url = result.merchantLogo;
        _this.ruleForm.merchantLogo[0].name = '点击查看大图';
        _this.ruleForm.merchantLogo_card[0].url = result.merchantLogo_card;
        _this.ruleForm.merchantLogo_card[0].name = '点击查看大图';
        _this.ruleForm.payeePid = result.payeePid;
        _this.ruleForm.payeeAccount = result.payeeAccount;
        _this.ruleForm.contactName = result.contactName;
        _this.ruleForm.contactMobile = result.contactMobile;
        _this.ruleForm.businessLicenceCode = result.businessLicenceCode;
        _this.ruleForm.businessLicencePic = result.businessLicencePic;
        _this.ruleForm.logisLicenceCode = result.logisLicenceCode;
        _this.ruleForm.logisLicencePic = result.logisLicencePic;
        _this.ruleForm.provinceCode = result.provinceCode;
        _this.ruleForm.cityCode = result.cityCode;
        _this.ruleForm.districtCode = result.districtCode;
        _this.ruleForm.address = result.address;
        _this.ruleForm.zip = result.zip;
        _this.ruleForm.email = result.email;
        _this.ruleForm.merchantTel = result.merchantTel;
        _this.ruleForm.isvMerchantId = result.isvMerchantId;
        _this.ruleForm.outSysName = result.outSysName;
        _this.ruleForm.accessType = result.accessType;
        _this.ruleForm.accessStatus = result.accessStatus;
        _this.ruleForm.acceptOrderFrom = result.acceptOrderFrom;
        _this.ruleForm.acceptOrderTo = result.acceptOrderTo;
        _this.ruleForm.alipayAuthStatus = result.alipayAuthStatus;
        _this.ruleForm.alipayPid = result.alipayPid;
        _this.ruleForm.alipayAppid = result.alipayAppid;
        _this.ruleForm.alipayAppid = result.alipayAppid;
        _this.ruleForm.alipayAuthToken = result.alipayAuthToken;
        _this.ruleForm.refreshToken = result.refreshToken;
        _this.ruleForm.authTokenExpried = result.authTokenExpried;
        _this.ruleForm.rtExpried = result.rtExpried;
        _this.ruleForm.mngUid = result.mngUid;
        _this.ruleForm.mngUname = result.mngUname;
        _this.ruleForm.serviceAreaAcqMethod = result.serviceAreaAcqMethod;
        _this.ruleForm.serviceTimeInterval = result.serviceTimeInterval;
        _this.ruleForm.gmtCreate = formatDate(newDate3, 'yyyy-MM-dd hh:mm:ss');
        _this.ruleForm.gmtModified = formatDate(newDate4, 'yyyy-MM-dd hh:mm:ss');
        console.log(_this.ruleForm.merchantLogo_card[0].url)
        if(_this.ruleForm.merchantLogo_card[0].url == ''){
            this.fileIcon = []
        }else{
            this.fileIcon = this.ruleForm.merchantLogo_card
        }

    },(error) => {
        this.$message({
            type: 'error',
            message: error.data.meta.msg
        });
    });


  },
  beforeDestory() {
    alert("beforeDestory")
  },
  watch: {

  },
  methods: {
      //  点击提交
    handleSubmit(formName) {
      var _this = this;
      console.log("-----------------------");
      console.log(this.$refs[formName]);
      console.log(this.ruleForm.accessType)
      let newData1 = new Date(this.ruleForm.authTokenExpried);
      let newData2 = new Date(this.ruleForm.rtExpried);
      console.log(newData1)
      console.log(this.ruleForm.accessStatus)
      let httpData = {
            "data": {
              'id':this.localDeleteId,
              'merchantCode':this.ruleForm.merchantCode,
              'merchantType':this.ruleForm.merchantType,
              'merchantName':this.ruleForm.merchantName,
              'merchantLogo':this.ruleForm.merchantLogo[0].url,
              'merchantLogo_card':this.ruleForm.merchantLogo_card[0].url,
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
              // 'alipayAuthToken':this.ruleForm.alipayAuthToken,
              // 'refreshToken':this.ruleForm.refreshToken,
              // 'authTokenExpried':formatDate(newData1, 'yyyy-MM-dd hh:mm:ss'),
              // 'rtExpried':formatDate(newData2, 'yyyy-MM-dd hh:mm:ss'),
              // 'mngUid':this.ruleForm.mngUid,
              // 'mngUname':this.ruleForm.mngUname,
              'serviceAreaAcqMethod':this.ruleForm.serviceAreaAcqMethod,
              'serviceTimeInterval':this.ruleForm.serviceTimeInterval
              // 'gmtCreate':this.ruleForm.gmtCreate,
              // 'gmtModified':this.ruleForm.gmtModified
            }
          };
        _this.$http.post(_this.url,httpData,(result) => {
            this.$message({
                type: 'success',
                message: '提交成功'
            });
            console.log(result)
            // _this.$store.dispatch('changeLoadingChange',true);
            _this.$router.go(-1);



        },(error) => {
            this.$message({
                type: 'error',
                message: error.data.meta.msg
            });
        });

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
      console.log(file.result)
      this.ruleForm.merchantLogo[0].url = file.result;
    },
    handlerror(err, file, fileList){
      alert(err);
      alert(file);
      alert(fileList);
    },
    //对logo图片操作的控制
    handleRemove(file, fileList) {
      this.ruleForm.merchantLogo[0].url = '';
      console.log(file, fileList);
    },
    // 对 物流机构LOGO_CARD的URL 图片操作的控制
    handleImageChange2(file,fileList){
        // this.ruleForm.merchantLogo_card = fileList.slice(-1);
        this.fileIcon = fileList.slice(-1);
    },
    handlePreview2(file) {
      this.dialogVisible2 = true;
      console.log(file.response)
    },
    handleSuccess2(file){
      console.log(file.result)
      this.ruleForm.merchantLogo_card[0].url = file.result;
    },
    handlerror2(err, file, fileList){
      alert(err);
      alert(file);
      alert(fileList);
    },
    //对icon图片操作的控制
    handleRemove2(file, fileList) {
      this.ruleForm.merchantLogo_card[0].url = '';
      console.log(file, fileList);
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
/*// 去掉input[type=number]默认的加减号*/
// input[type=‘number‘] {
//     -moz-appearance:textfield;
// }
// input[type=number]::-webkit-inner-spin-button,
// input[type=number]::-webkit-outer-spin-button {
// -webkit-appearance: none;
// margin: 0;
// }

</style>
