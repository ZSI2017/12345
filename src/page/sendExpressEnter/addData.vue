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
    <el-form-item label="入口名称" prop="photoName">
      <el-input v-model.trim="ruleForm.photoName" placeholder="请输入入口名称"> </el-input>
    </el-form-item>
    <el-form-item label="运营图" prop="opMap">
      <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove">
        <el-button size="small" style="width:60px;background:#f1f1f1;"><i class="el-icon-upload2"></i> </el-button>
        <div slot="tip" class="el-upload__tip">文件类型限jpg,png,尺寸40*40，请保持5kb以内</div>
      </el-upload>
    </el-form-item>
    <el-form-item label="角标" prop="cornerMark">
      <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove">
        <el-button size="small" style="width:60px;background:#f1f1f1;"><i class="el-icon-upload2"></i> </el-button>
        <span style="color:red;">（非必填）</span>
        <div slot="tip" class="el-upload__tip">文件类型限jpg,png,尺寸40*40， 请保持3kb以内</div>
      </el-upload>
    </el-form-item>
    <el-form-item label="描述" prop="content">
      <el-input v-model.number="ruleForm.content" placeholder="请输入描述"> </el-input>
    </el-form-item>
    <el-form-item label="排序值" prop="number">
      <el-input v-model.number="ruleForm.number" placeholder="请输入1-999，排序值越大越靠前"> </el-input>
    </el-form-item>
    <el-form-item label="链接" prop="link">
      <el-input v-model.trim="ruleForm.link" placeholder="请输入需要跳转的链接，如果跳外部链接必须以http://开头"> </el-input>
    </el-form-item>
    <!--<el-form-item label="有效时段" prop="date1">
      <el-date-picker v-model="ruleForm.date1" type="datetimerange" placeholder="选择时间范围">
      </el-date-picker>
    </el-form-item>-->
    <el-form-item label="覆盖地区" prop="formCoverArea">
      <el-button size="mini" @click="dialogConfig">点击配置</el-button>
      <el-button size="mini" type="text" @click="dialogTable ">查看已配置</el-button>
    </el-form-item>
    <el-form-item label="当前状态" prop="currentState">
      <el-radio-group v-model="ruleForm.currentState">
        <el-radio class="radio" v-model="radio" label="1">上架</el-radio>
        <el-radio class="radio" v-model="radio" label="2">下架</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-col class="line" :span="2"> </el-col>
    <el-button type="primary" @click="handleSubmit('ruleForm')">提交</el-button>
  </el-form>

  <!-- 覆盖地区   配置对话框 -->
  <el-dialog title="覆盖地区" :visible.sync="dialogFormVisible" class="dialog-class">
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
      @listenToCoverArea ="changeVisible"
      :gridData="gridData"
      ></cover-area>
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
      radio: 1,
      // dialogFormVisible 代表是否打开配置地区的对话框
      dialogFormVisible: false,

      // 查看配置地区中的表格数据 和 是否显示的标志
      showHeader: false,
      dialogTableVisible: false,
      gridData: [],
      gridDataCopy: [],
      // 对输入表单进行验证
      ruleForm: {
        photoName: '',
        number: '',
        link: '',
        content: '',
        currentState: false
      },
      rules: {
        photoName: [{
          type: "string",
          required: true,
          message: '请输入运营图名称',
          trigger: 'blur'
        }, ],
        number: [
          { required: true, message: '排序值不能为空'},
          { type: 'number', message: '排序值必须为数字值'}
        ],
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
        opMap: [{
          required: true,
          message: '请上传图片'
        }],
        cornerMark: [{
          required: false
        }],
        content:[{
          required: true,
          message: '请输入描述文字'
        }],
        formCoverArea: [{
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
