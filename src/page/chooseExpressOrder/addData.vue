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
    <el-form-item label="公司名称" prop="photoName">
        <el-select label="复选框 A" v-model="express" placeholder="请选择快递公司" style="width:100%;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="LOGO" prop="opMap">
      <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove">
        <el-button size="small" style="width:60px;background:#f1f1f1;"><i class="el-icon-upload2"></i> </el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item label="描述" prop="content">
      <el-input v-model.number="ruleForm.content" placeholder="请输入描述"> </el-input>
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
        style="width:100px;"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput" v-show="addTag">+ 添加</el-button>
      <div style="color:#888;">最多添加两个标签</div>
    </el-form-item>
    <el-form-item label="排序值" prop="number">
      <el-input v-model.number="ruleForm.number" placeholder="请输入1-999，排序值越大越靠前"> </el-input>
    </el-form-item>
    <el-form-item label="是否最热" prop="currentHot">
      <el-radio-group v-model="ruleForm.currentHot">
        <el-radio class="radio" v-model="hotRadio" label="1">上架</el-radio>
        <el-radio class="radio" v-model="hotRadio" label="2">下架</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否最新" prop="currentNew">
      <el-radio-group v-model="ruleForm.currentNew">
        <el-radio class="radio" v-model="newRadio" label="1">上架</el-radio>
        <el-radio class="radio" v-model="newRadio" label="2">下架</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="当前状态" prop="currentState">
      <el-radio-group v-model="ruleForm.currentState">
        <el-radio class="radio" v-model="statusRadio" label="1">上架</el-radio>
        <el-radio class="radio" v-model="statusRadio" label="2">下架</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-col class="line" :span="2"> </el-col>
    <el-button type="primary" @click="handleSubmit('ruleForm')">提交</el-button>
  </el-form>


</section>
</template>
<script type="text/javascript">
//  import coverArea from "@/page/chooseExpress/coverArea.vue";
export default {
  // components:{
  //    coverArea
  // },
  data() {
    return {
     // 展示警告信息
      showAlert:false,
      // 即将离开的对话框
      loadingFlag: false,
      // radio 代表上下架状态的选择
      hotRadio: 1,
      newRadio: 1,
      statusRadio: 1,
      // dialogFormVisible 代表是否打开配置地区的对话框
      dialogFormVisible: false,
      //快递公司下拉框选择
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      express: '',  
       //标签数据
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      // 对输入表单进行验证
      ruleForm: {
        photoName: '',
        number: '',
        link: '',
        date1: '',
        currentState: false,
        currentHot: false,
        currentNew: false,
      },
      rules: {
        photoName: [{
          type: "string",
          required: true,
          message: '请输入运营图名称',
          trigger: 'blur'
        }, ],
        number: [{
          type: 'number',
          required: true,
          message: '请输入排序值',
          trigger: 'blur'
        }],
        link: [{
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
        currentState: [{
          required: true,
          message: '请选择状态',
          trigger: 'change'
        }],
        currentHot: [{
          required: true,
          message: '请选择状态',
          trigger: 'change'
        }],
        currentNew: [{
          required: true,
          message: '请选择状态',
          trigger: 'change'
        }],
        opMap: [{
          required: true,
          message: '请上传图片'
        }],
        cornerMark: [{
          required: false
        }],
        content:[{
          required: true,
          message: '请上传图片'
        }],
        coverArea: [{
          required: true,
          message: '请选择覆盖地区'
        }]
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

  },
  methods: {
    //  点击提交
    handleSubmit(formName) {
      var _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('error submit');
          _this.$store.dispatch('changeLoadingChange',true);
          _this.$router.go(-1);
          alert('sumbit');
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
label {
    font-weight: bold;
}
.dialog-class {
    .el-dialog__body{
       padding-top:15px !important;

    }
}

</style>
