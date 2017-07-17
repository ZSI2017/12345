<template type="html">
<section>
  <p style="color:#00b7f9;cursor:pointer" @click="$router.go(-1)">&lt; 返回</p>
  <el-form ref="form" :model="form" label-width="100px" label-position="right" style="padding: 0px 160px 0px 100px;">
    <el-form-item label="资源名称" required>
      <el-input v-model="form.name" placeholder="请输入资源名称"> </el-input>
    </el-form-item>
    <el-form-item label="运营图">
      <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList">
        <el-button size="small" type="primary">上传文件</el-button>
        <div slot="tip" class="el-upload__tip">文件类型限：jpg,png,尺寸40*40, 请保持5kb以内</div>
      </el-upload>
    </el-form-item>
    <el-form-item label="广告语">
      <el-input v-model="form.name" placeholder="请输入广告语"> </el-input>
    </el-form-item>
    <el-form-item label="标签">
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        :closable="true"
        :close-transition="false"
        @close="handleClose(tag)"
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
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
    </el-form-item>
    <el-form-item label="排序值">
      <el-input v-model="form.name" placeholder="请输入1-999，排序值越大越靠前"> </el-input>
    </el-form-item>
    <el-form-item label="链接">
      <el-input v-model="form.name" placeholder="请输入需要跳转的链接，如果调"> </el-input>
    </el-form-item>
    <!--<el-form-item label="有效时段">
      <el-date-picker v-model="value3" type="datetimerange" placeholder="选择时间范围">
      </el-date-picker>
    </el-form-item>-->
    <el-form-item label="覆盖地区">
      <el-button size="mini" @click="dialogConfig">点击配置</el-button>
      <el-button size="mini" type="text" @click="dialogTable ">查看已配置</el-button>
      <!-- <el-input v-model="form.name" placeholder="点击配置"> </el-input> -->
    </el-form-item>
    <el-form-item label="当前状态">
      <el-radio class="radio" v-model="radio" label="1">上架</el-radio>
      <el-radio class="radio" v-model="radio" label="2">下架</el-radio>
    </el-form-item>
    <el-col class="line" :span="2">-</el-col>
    <el-row>
          <el-col :span="2" :offset="10"><el-button type="primary" class="grid-content">立即提交</el-button></el-col>
    </el-row>
  </el-form>

  <!-- 覆盖地区配置对话框      -->
  <el-dialog title="覆盖地区" :visible.sync="dialogFormVisible">
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
    <el-table :data="gridData" border :show-header="showHeader" max-height="400">
      <el-table-column property="province" label="省" width="200">
          <template scope="scope">
            <el-tag type="primary" style="float:left;overflow:hidden;font-size:16px;width:80px;margin-right:10px;text-overflow:ellipsis">{{scope.row.province}}</el-tag>
            <el-checkbox
                  :indeterminate="isIndeterminate[scope.$index]"
                  v-model="checkAll[scope.$index]"
                  @change="handleCheckAllChange(scope.$index,$event)"
               >全选</el-checkbox>
          </template>
      </el-table-column>
      <el-table-column property="city" label="市">
        <template scope="scope">
       <!-- <el-tag
        style="margin-right:10px;"
         v-for="(item,index) in scope.row.city"
         >{{item}}</el-tag> -->

  <!-- <div style="margin: 15px 0;"></div> -->
  <el-checkbox-group
        v-model="checkedCities[scope.$index]"
        @change="handleCheckedCitiesChange(scope.$index)"
        >
       <el-checkbox v-for="city in scope.row.city" :label="city" :key="city">{{city}}</el-checkbox>
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
  <el-dialog title="覆盖地区" :visible.sync="dialogTableVisible">
    <el-table :data="gridData" border :show-header="showHeader" max-height="400">
      <el-table-column property="province" label="省" width="200"></el-table-column>
      <el-table-column property="city" label="市">
        <template scope="scope">
       <el-tag
        style="margin-right:10px;"
         v-for="(item,index) in scope.row.city"
         :key="index"
         >{{item}}</el-tag>
     </template>
      </el-table-column>
    </el-table>
  </el-dialog>


</section>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      //标签页
      activeName: 'second',
      // 覆盖地区选择
      checkAll:[],
      checkedCities: [],
      isIndeterminate: [],
      // cities: cityOptions,
      // value3 代表时间段选择的
      // value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      // radio 代表上下架状态的选择
      radio: 1,
      // dialogFormVisible 代表是否打开配置地区的对话框
      dialogFormVisible: false,

      // 查看配置地区中的表格数据 和 是否显示的标志
      showHeader: false,
      dialogTableVisible: false,
      gridData: [],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      dynamicTags: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    // 标签页选择
    handleClick(tab, event) {
        console.log(tab, event);
      },
    // 覆盖地区选择
    dialogConfig() {
      var _this = this;
      _this.$http.get("/rest/list3")
        .then(function(rsp) {
              _this.gridData = rsp.data.data;
              // 初始化 配置的多选框操作
              var tableDataLength = _this.gridData.length;
                 for(var i =0;i<tableDataLength;i++) {
                     _this.checkAll[i] = true;
                     _this.isIndeterminate[i] = true;
                     _this.checkedCities[i]=[];
                   }
              //  _this.dialogTableVisible= true
              _this.dialogFormVisible = true;
              console.log(_this.gridData);
        })
        .catch(function(error) {
          console.log(error);
        })
    },
    handleCheckAllChange(index, event) {
      // console.log(index);
      // console.log(event.lenth);
      this.checkedCities[index] = event.target.checked ? this.gridData[index].city : [];
      console.log(event.target.checked);
      console.log(this.checkedCities[index] );
      this.isIndeterminate[index] = false;
    },
    handleCheckedCitiesChange(index) {
      // console.log(value);
      let value = this.checkedCities[index];
      let checkedCount = value.length;
      this.checkAll[index] = checkedCount === this.gridData[index].city.length;
      this.isIndeterminate[index] = checkedCount > 0 && checkedCount < this.gridData[index].city.length;
    },
    dialogTable() {
      var _this = this;
      _this.$http.get("/rest/list3")
        .then(function(rsp) {
          _this.gridData = rsp.data.data;

          _this.dialogTableVisible = true
          console.log(_this.gridData);
        })
        .catch(function(error) {
          console.log(error);
        })
    },
    onSubmit() {
      console.log('submit!');
    },
    handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
section {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    border: 1px solid #D3DCE6;
    border-radius: 4px;
    padding: 20px;
    background-color: white;
}

label {
    font-weight: bold;
}
</style>
