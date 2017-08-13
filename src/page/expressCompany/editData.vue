<template type="html">
<section class="section editData-class">
  <p style="color:#00b7f9;cursor:pointer;margin-top:0;width:100px;" @click="handleBackClick"><i class="el-icon-arrow-left"></i> 返回</p>
  <el-form ref="form" :model="form" label-width="180px" label-position="left" style="width:800px;padding-left:100px">
    <el-form-item label="公司名称">
      <div class="detail-content"> {{form.name}} </div>
    </el-form-item>

    <el-form-item label="LOGO" prop="opMap">
      <img width="150px" style="float:left;" src="https://expressprod.oss-cn-hangzhou.aliyuncs.com/OperativeLogo/f2c570f3-7f84-44ca-afa9-e19a71ba10c5.png" alt="">
      <el-dialog v-model="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <el-popover ref="popover4" placement="right" trigger="click">
        <img src="https://expressprod.oss-cn-hangzhou.aliyuncs.com/OperativeLogo/f2c570f3-7f84-44ca-afa9-e19a71ba10c5.png">
      </el-popover>
      <el-button style="float:left;margin-left:20px" size="small" v-popover:popover4>查看原图</el-button>
    </el-form-item>
    <el-form-item label="广告语">
      <el-input v-if="isFromAddData" v-model="form.content" placeholder="请输入广告语"> </el-input>
      <div class="detail-content" v-if="!isFromAddData"> {{form.content}} </div>
    </el-form-item>
    <el-form-item label="标签">
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        :closable="true"
        hit="true"
        :close-transition="false"
        @close="handleClose(tag)"
        type="gray"
        style="margin-right:10px;"
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
    </el-form-item>
    <el-form-item label="客服电话">
      <el-input v-if="isFromAddData" v-model="form.orderNumber" placeholder="请输入客服电话"> </el-input>
      <div class="detail-content" v-if="!isFromAddData"> {{form.orderNumber}} </div>
    </el-form-item>
    <el-form-item label="排序值">
      <el-input v-if="isFromAddData" v-model="form.Forder" placeholder="请输入1-999，排序值越大越靠前"> </el-input>
      <div class="detail-content" v-if="!isFromAddData"> {{form.Forder}} </div>
    </el-form-item>
    <el-form-item label="是否由系统发起支付">
      <el-radio-group v-if="isFromAddData" v-model="payRadio">
        <el-radio class="radio" :label="0">是</el-radio>
        <el-radio class="radio" :label="1">否</el-radio>
      </el-radio-group>
      <div class="detail-content" v-if="!isFromAddData"> {{currentStateText}} </div>      
    </el-form-item>
    <el-form-item label="是否允许议价">
      <el-radio-group v-if="isFromAddData" v-model="priceRadio">
        <el-radio class="radio" :label="0">是</el-radio>
        <el-radio class="radio" :label="1">否</el-radio>
      </el-radio-group>
      <div class="detail-content" v-if="!isFromAddData"> {{currentStateText}} </div>      
    </el-form-item>
    <el-form-item label="是否最热">
      <el-radio-group v-if="isFromAddData" v-model="hotRadio">
        <el-radio class="radio" :label="0">是</el-radio>
        <el-radio class="radio" :label="1">否</el-radio>
      </el-radio-group>
      <div class="detail-content" v-if="!isFromAddData"> {{currentStateText}} </div>      
    </el-form-item>
    <el-form-item label="是否最新">
      <el-radio-group v-if="isFromAddData" v-model="newRadio">
        <el-radio class="radio" :label="0">是</el-radio>
        <el-radio class="radio" :label="1">否</el-radio>
      </el-radio-group>
      <div class="detail-content" v-if="!isFromAddData"> {{currentStateText}} </div>      
    </el-form-item>
    <el-form-item label="当前状态">
      <el-radio-group v-if="isFromAddData" v-model="statusRadio">
        <el-radio class="radio" :label="0">上架</el-radio>
        <el-radio class="radio" :label="1">下架</el-radio>
      </el-radio-group>
      <div class="detail-content" v-if="!isFromAddData"> {{currentStateText}} </div>
    </el-form-item>
    <el-col class="line" :span="2"> </el-col>
    <el-button v-if="isFromAddData" type="primary" @click="handleSubmit">提交</el-button>
  </el-form>

</section>
</template>
<script type="text/javascript">
import localEvent from 'src/vuex/function.js';
// import coverArea from "../chooseExpress/coverArea.vue";
export default {
  // components:{
  //    coverArea
  // },
  data() {
    return {
      // 从详情页面
      isDetail: false,
      currentStateText: '',
      // 即将离开的对话框
      loadingFlag: false,
      dialogVisible: false,
      fileList2: [{
        name: 'food.jpeg',
        url: "https://expressprod.oss-cn-hangzhou.aliyuncs.com/OperativeLogo/f2c570f3-7f84-44ca-afa9-e19a71ba10c5.png"
      }],
      // radio 代表上下架状态的选择
      payRadio: 1,
      priceRadio: 1,
      hotRadio: 1,
      newRadio: 1,
      statusRadio: 1,
      //标签数据
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      addTag:"true",
      form: {
        name: '',
        type: [],
        Forder: '',
        content:'',
        orderNumber:'',
      }
    }
  },
  mounted() {
    var localData = localEvent.get("localExpressCompany");
    console.log(localData);
    // console.log(localData.activeTime1);
    // this.form.name = localData.operationsMapName;
    // this.form.Forder = localData.Forder;
    // this.form.orderNumber = localData.ordernumber;    
    // this.form.link = localData.link;
    // this.form.content = localData.content;
    // this.currentStateText = localData.currentState;

    // if (localData.currentState = "上架") {
    //   this.statusRadio = 1;
    // } else {
    //   this.statusRadio = 2;
    // }
  },
  created() {
    if ( this.$route.path == "/expressCompany/detail") {
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
      alert(this.$store.getters.GETEDITFORM)
      return this.$store.getters.GETEDITFORM;
    }
  },
  methods: {
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
        if(this.dynamicTags.length >= 2){
          this.addTag = false;
        }else{
          this.addTag = true;
        }      
      }
      this.inputVisible = false;
      this.inputValue = '';
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
