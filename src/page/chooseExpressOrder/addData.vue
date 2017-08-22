<template type="html">
<section class="section" v-loading.body.fullscreen.lock="listLoading">
  <p style="color:#00b7f9;cursor:pointer;margin-top:0;width:100px;" @click="handleBackClick"><i class="el-icon-arrow-left"></i> 返回</p>

  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="180px"  style="width:800px;padding-left:100px">
    <el-form-item label="公司名称" prop="merchantName">
        <el-select v-model="value" filterable placeholder="请选择公司名称" style="width:100%;" @change="handleMerchant">
            <el-option
              v-for="item in options"
              :key="item.value"
              :merchantLogo="item.value[1]"
              :label="item.lable"
              :value="item.value">
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
    <el-form-item label="广告语" prop="slogan">
      <el-input v-model="ruleForm.slogan" placeholder="请输入广告语"> </el-input>
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
    </el-form-item>
    <el-form-item label="排序值" prop="sortWeight">
      <el-input v-model.number="ruleForm.sortWeight" type="number" placeholder="请输入1-999，排序值越大越靠前"> </el-input>
    </el-form-item>
    <el-form-item label="链接" prop="linkUrl" v-if='linkUrlShow'>
      <el-input v-model.trim="ruleForm.linkUrl" placeholder="请输入需要跳转的链接，如果跳外部链接必须以http://开头"> </el-input>
      <!-- <el-input placeholder="请输入内容" v-model="ruleForm.linkUrl"> <template slot="prepend">Http://</template> </el-input> -->
    </el-form-item>
    <el-form-item label="是否最热">
      <el-radio-group v-model="ruleForm.hotStatus">
        <el-radio class="radio" :label="1">是</el-radio>
        <el-radio class="radio" :label="0">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否最新">
      <el-radio-group v-model="ruleForm.newStatus">
        <el-radio class="radio" :label="1">是</el-radio>
        <el-radio class="radio" :label="0">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="当前状态">
      <el-radio-group v-model="ruleForm.opStatus">
        <el-radio class="radio" :label="2">上线</el-radio>
        <el-radio class="radio" :label="1">下线</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-col class="line" :span="2"> </el-col>
    <el-button type="primary" @click="handleSubmit('ruleForm')">提交</el-button>
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
      pageId:'',
      dialogVisible:false,//大图显示
      listLoading: false,//loading框
      //标签添加控制
      addTag: true,
      url:'/api/chooseorder/audit/save',
      //标签数据
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      dialogTableVisible: false,
      //select 快递公司选项
      options: [],
      value:'',
      merchantLogo:'',
      linkUrlShow:true,
      // 对输入表单进行验证
      ruleForm: {
        merchantName:'',
        isvMerchantId:'',
        accessStatus:'',
        slogan: '',
        tag: '',
        linkUrl: '',
        sortWeight:'',
        hotStatus: 0,
        newStatus: 0,
        opStatus:1
      },
      rules: {
        merchantName: [
          {required: true,message: '请选择公司名称',trigger: 'change'}
        ],
        sortWeight: [
          { required: true, message: '排序值不能为空'},
          { required: true,type: 'number', min:1, max:999,message:'排序值范围1-999'}
        ],
        slogan:[
          {required: true,message: '请输入广告语'},
          {min:1, max:20,message:'广告语长度不大于20'}                    
        ],
        // tag:[
        //   {required: true,message: '请输入标签',type: 'string',trigger: 'blur'},
        //   {type: 'string', min:1, max:9,message:'标签范围1-8个字'}
        // ],
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
    let _this = this;
    let AccessHttp = '/api/logisMerchant/getListByAccessStatus';
    _this.$http.post(AccessHttp,{'moduleType':2},(result) => {
        console.log(result)
        // this.options = result;
        // if(options.length === 0 ){
          for(let i =0;i<result.length;i++) {
             this.options.push({
                   lable:result[i].merchantName,
                   value:[result[i].merchantLogo,result[i].merchantName,result[i].id,result[i].accessStatus]
             })
          }
        // }

        // this.$message({
        //     type: 'success',
        //     message: '快递公司列表获取成功'
        // });

    },(error) => {
        this.$message({
            type: 'error',
            message: error.data.meta.code+"--"+error.data.meta.msg
        });
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('error submit');
          console.log(_this.ruleForm.linkUrl)
          let httpData = {
                "data": {
                  "pageId": _this.pageId,
                  // "businessType":_this.ruleForm.businessType,
                  "logisMerchId": this.ruleForm.isvMerchantId,
                  "slogan": _this.ruleForm.slogan,
                  "tag":_this.ruleForm.tag,
                  "sortWeight":_this.ruleForm.sortWeight,
                  "hotStatus":_this.ruleForm.hotStatus,
                  "newStatus":_this.ruleForm.newStatus,
                  "opStatus":_this.ruleForm.opStatus,
                  "url": _this.ruleForm.linkUrl,
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
                message: error.data.meta.code+"--"+error.data.meta.msg
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
    handleMerchant(){
      console.log(this.value)
      this.merchantLogo = this.value[0];
      this.ruleForm.merchantName = this.value[1];
      this.ruleForm.isvMerchantId = this.value[2];
      this.ruleForm.accessStatus = this.value[3]; 
      console.log(this.ruleForm.accessStatus)
      if(this.ruleForm.accessStatus == '1'){
          this.linkUrlShow = false;
      }else{
          this.linkUrlShow = true;
      }     

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
