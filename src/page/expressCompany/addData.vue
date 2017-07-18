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
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="180px" label-position="left" style="width:800px;padding-left:100px">
    <el-form-item label="公司名称" prop="photoName">
      <!--<el-input v-model.trim="ruleForm.photoName" placeholder="请输入快递公司名称"> </el-input>-->
        <el-select label="复选框 A" v-model="express" placeholder="请选择" style="width:100%;">
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
    <!--<el-form-item label="角标" prop="cornerMark">
      <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove">
        <el-button size="small" style="width:60px;background:#f1f1f1;"><i class="el-icon-upload2"></i> </el-button>
        <span style="color:red;">（非必填）</span>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过3kb</div>
      </el-upload>
    </el-form-item>-->
    <el-form-item label="广告语" prop="content">
      <el-input v-model.number="ruleForm.content" placeholder="请输入广告语"> </el-input>
    </el-form-item>
    <!--<el-form-item label="标签" prop="content">
      <el-input v-model.number="ruleForm.content" placeholder="请输入描述"> </el-input>
    </el-form-item>-->
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
    <el-form-item label="客服电话" prop="orderNumber">
      <el-input v-model.number="ruleForm.number" placeholder="请输入客服电话"> </el-input>
    </el-form-item>
    <el-form-item label="排序值" prop="number">
      <el-input v-model.number="ruleForm.number" placeholder="请输入1-999，排序值越大越靠前"> </el-input>
    </el-form-item>
    <!--<el-form-item label="链接" prop="link">
      <el-input v-model.trim="ruleForm.link" placeholder="请输入需要跳转的链接，如果调"> </el-input>
    </el-form-item>-->
    <!--<el-form-item label="有效时段" prop="date1">
      <el-date-picker v-model="ruleForm.date1" type="datetimerange" placeholder="选择时间范围">
      </el-date-picker>
    </el-form-item>-->
    <!--<el-form-item label="覆盖地区" prop="coverArea">
      <el-button size="mini" @click="dialogConfig">点击配置</el-button>
      <el-button size="mini" type="text" @click="dialogTable ">查看已配置</el-button>
    </el-form-item>-->
    <el-form-item label="是否由系统发起支付" prop="currentPay">
      <el-radio-group v-model="ruleForm.currentPay">
        <el-radio class="radio" v-model="payRadio" label="1">是</el-radio>
        <el-radio class="radio" v-model="payRadio" label="2">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否允许议价" prop="currentPrice">
      <el-radio-group v-model="ruleForm.currentPrice">
        <el-radio class="radio" v-model="priceRadio" label="1">是</el-radio>
        <el-radio class="radio" v-model="priceRadio" label="2">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否最热" prop="currentHot">
      <el-radio-group v-model="ruleForm.currentHot">
        <el-radio class="radio" v-model="hotRadio" label="1">是</el-radio>
        <el-radio class="radio" v-model="hotRadio" label="2">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否最新" prop="currentNew">
      <el-radio-group v-model="ruleForm.currentNew">
        <el-radio class="radio" v-model="newRadio" label="1">是</el-radio>
        <el-radio class="radio" v-model="newRadio" label="2">否</el-radio>
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

  <!-- 覆盖地区   配置对话框 -->
  <el-dialog title="覆盖地区" :visible.sync="dialogFormVisible" class="dialog-class">
    <!-- <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane v-for="(item,index) in tabPaneData" :label="item" :key="index" :name="item" style="font-size:20px;">{{item}}
      </el-tab-pane>
    </el-tabs> -->
    <el-row :span="24" style="margin-bottom:10px;padding-top:5px;border-top:1px solid grey">
      <el-col :span="4" style="padding-top:10px;">
        <el-checkbox v-model="check" @change="handleCheckAll($event)">全选</el-checkbox>
      </el-col>
      <el-col :span="10" style="height:10px;"></el-col>
      <el-col :span="10" style="font-weight:bold;font-size:16px;margin-top:2px;padding-left:20px;line-height:40px;height:40px;">
        快速搜索:
        <el-autocomplete class="inline-input" v-model="state1" style="float:right;" :fetch-suggestions="querySearch" placeholder="请输入搜索内容" icon="close" :on-icon-click="handleIconClick" @select="handleQuerySelect"></el-autocomplete>
      </el-col>
    </el-row>
    <el-table :data="gridData" border :show-header="showHeader" max-height="400">
      <el-table-column property="value" label="省" width="200">
        <template scope="scope">
            <el-tag type="primary" style="float:left;overflow:hidden;font-size:16px;width:80px;margin-right:10px;text-overflow:ellipsis">{{scope.row.value}}</el-tag>
            <el-checkbox
                  v-model="checkAll[scope.$index]"
                  @change="handleCheckAllChange(scope.$index,$event)"
               >全选</el-checkbox>
          </template>
      </el-table-column>
      <el-table-column property="city" label="市">
        <template scope="scope">
            <el-checkbox-group
                  v-model="checkedCities[scope.$index]"
                  @change="handleCheckedCitiesChange(scope.$index)"
                  >
                 <el-checkbox style="margin-left:0;margin-right:15px;" v-for="city in scope.row.city" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>

      </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
    </div>
  </el-dialog>

  <!--  覆盖地区 查看对话框 -->
  <cover-area
      :visible="dialogTableVisible"
      :gridData="gridData"
      @listenToCoverArea ="changeVisible"
      ></cover-area>
  <!-- <el-dialog title="覆盖地区" :visible.sync="dialogTableVisible">
    <el-table :data="gridData" border :show-header="showHeader" max-height="400">
      <el-table-column property="value" label="省" width="200"></el-table-column>
      <el-table-column property="city" label="市">
        <template scope="scope">
      <el-tag
       style="margin-right:10px;margin-bottom:5px;"
        v-for="(item,index) in scope.row.city"
        >{{item}}</el-tag>
    </template>
      </el-table-column>
    </el-table>
  </el-dialog> -->

  <!-- 即将离开的 对话框  -->
  <!-- <el-dialog title="提示" :visible.sync="loadingFlag" size="tiny">
    <div>
      <i class="el-icon-warning" style="color:#F7BA2A;padding-right:10px;font-size: 36px!important;position: absolute;top: 33%;"></i>
      <span style="padding-left:48px;">还没有保存,确定放弃编辑？</span>
    </div>

    <span slot="footer" class="dialog-footer">
    <el-button @click="loadingFlag = false">编 辑</el-button>
    <el-button type="primary" @click="editSure">放 弃</el-button>
  </span>
  </el-dialog> -->

</section>
</template>
<script type="text/javascript">
 import coverArea from "@/page/chooseExpress/coverArea.vue";
export default {
  components:{
     coverArea
  },
  data() {
    return {
     // 展示警告信息
      showAlert:false,
      // 即将离开的对话框
      loadingFlag: false,
      //标签添加控制
      addTag: true,
      // 添加搜索框
      state1: "",
      provinces: [],
      //标签页
      activeName: 'C',
      tabPaneData: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", 'O', "P", "Q", "R"],
      // 覆盖地区选择
      check: false,
      checkAll: [],
      checkedCities: [],
      isIndeterminate: [],
      // cities: cityOptions,
      // value3 代表时间段选择的
      value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      // radio 代表上下架状态的选择
      payRadio: 1,
      priceRadio: 1,
      hotRadio: 1,
      newRadio: 1,
      statusRadio: 1,

      // dialogFormVisible 代表是否打开配置地区的对话框
      dialogFormVisible: false,
      //标签数据
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      // 查看配置地区中的表格数据 和 是否显示的标志
      showHeader: false,
      dialogTableVisible: false,
      gridData: [],
      gridDataCopy: [],
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
      // 对输入表单进行验证
      ruleForm: {
        photoName: '',
        number: '',
        link: '',
        date1: '',
        currentState: false,
        currentPay: false,
        currentPrice: false,
        currentHot: false,
        currentNew: false,

        content:''
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
        currentPay: [{
          required: true,
          message: '请选择状态',
          trigger: 'change'
        }],
        currentParice: [{
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
    //  loadingFlag:{
    //     handler:(val,old) => {
    //          alert(val),
    //          console.log(old);
    //     }
    //  }
  },
  methods: {
    changeVisible(flag){
      this.dialogTableVisible = flag;
    },
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
    // 即将离开的对话框
    // editSure() {
    //   this.loadingFlag = false;
    //   this.$router.app.$store.state.loadingFlag = true;
    //   console.log(this);
    //   this.$router.go(-1);
    //   //  this.$router.push({ path:this.defaultActive});
    //   //  this.$route.push({ path:this.defaultActive});
    // },
    handlePreview() {},
    handleRemove() {},

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
      // var provinces = this.provinces;
      // var results = queryString ? provinces.filter(this.createFilter(queryString)) : provinces;
      // // 调用 callback 返回建议列表的数据
      // cb(results);
      var provinces = this.provinces;
      var results = queryString ? provinces.filter(this.createFilter(queryString)) : provinces;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      // return (province) => {
      //   return (province.province.indexOf(queryString.toLowerCase()) === 0);
      // };
      return (province) => {
        return (province.value.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleQuerySelect(items) {
      console.log(items);
      this.gridData = this.gridDataCopy.filter(function(item) {
        return item.value == items.value
      })
      console.log(this.gridData);
    },
    handleIconClick(ev) {
      this.gridData = this.gridDataCopy;
      this.state1 = '';
    },
    // 覆盖地区选择
    dialogConfig() {
      var _this = this;
      _this.$http.get("/rest/list3", (rsp) => {
        _this.gridData = rsp.data.data;
        _this.gridDataCopy = _this.gridData;
        _this.provinces = _this.gridData;
        // 初始化 配置的多选框操作
        var tableDataLength = _this.gridData.length;
        for (var i = 0; i < tableDataLength; i++) {
          _this.checkAll[i] = false;
          // _this.isIndeterminate[i] = true;
          _this.checkedCities[i] = [];
        }
        _this.dialogFormVisible = true;
        // console.log(_this.gridData);
      }, (error) => {
        console.log(error);
      })
    },
    handleCheckAll(event) {
      var allCount = this.gridData.length;
      for (var m = 0; m < allCount; m++) {
        this.isIndeterminate.splice(m, 1, !event.target.checked)
        this.checkAll.splice(m, 1, event.target.checked);
        this.checkedCities.splice(m, 1, event.target.checked ? this.gridData[m].city : [])
      }
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
      this.checkedCities.splice(index, 1, event.target.checked ? this.gridData[index].city : [])
      this.isIndeterminate.splice(index, 1, false);
      this.observeCheckAll();
    },
    handleCheckedCitiesChange(index) {
      let value = this.checkedCities[index];
      let checkedCount = value.length;
      this.checkAll.splice(index, 1, checkedCount === this.gridData[index].city.length)
      console.log(checkedCount + "  " + this.gridData[index].city.length + " " + this.checkAll[index]);
      this.isIndeterminate.splice(index, 1, checkedCount > 0 && checkedCount < this.gridData[index].city.length);
      this.observeCheckAll();
    },
    dialogTable() {
      var _this = this;
      _this.$http.get("/rest/list3", (rsp) => {
        _this.gridData = rsp.data.data;
        _this.dialogTableVisible = true;

        console.log(_this.gridData);
      }, (error) => {
        console.log(error);
      })
    },
    onSubmit() {
      console.log('submit!');
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
