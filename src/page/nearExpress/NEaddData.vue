<template>
  <section>
      <p style="color:#00b7f9;cursor:pointer;margin-left:20px;margin-bottom:20px;"><span @click="$router.go(-1)">&lt; 返回</span></p>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="padding:0 160px 0 100px;">
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入公告名称"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc" placeholder="请输入公告内容"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" required>
          <el-col :span="24">
            <el-form-item>
              <el-date-picker v-model="value3" type="datetimerange" placeholder="请选择时间范围">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <!--<el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>-->
        </el-form-item>
        <!--<el-form-item label="覆盖地区" required>
          <el-cascader expand-trigger="hover" :options="options" v-model="selectedOptions2" @change="handleChange">
          </el-cascader>
        </el-form-item>-->
        <el-form-item label="覆盖地区" required>
          <el-button size="mini" @click="dialogConfig">点击配置</el-button>
          <el-button size="mini" type="text" @click="dialogTable ">查看已配置</el-button>
          <!-- <el-input v-model="form.name" placeholder="点击配置"> </el-input> -->
        </el-form-item>
        <el-form-item label="当前状态" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="上架"></el-radio>
            <el-radio label="下架"></el-radio>
          </el-radio-group>
        </el-form-item>       
      </el-form>
      <el-row>
          <el-col :span="2" :offset="10"><el-button type="primary" class="grid-content">立即提交</el-button></el-col>
      </el-row>

      <!-- 覆盖地区配置对话框      -->
  <el-dialog title="覆盖地区" :visible.sync="dialogFormVisible">
    <el-table :data="gridData" border :show-header="showHeader" max-height="400">
      <el-table-column property="province" label="省" width="200"></el-table-column>
      <el-table-column property="city" label="市">
        <template scope="scope">
      <!-- <el-tag
        style="margin-right:10px;"
        v-for="(item,index) in scope.row.city"
        >{{item}}</el-tag> -->
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
  <div style="margin: 15px 0;"></div>
  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
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
  <el-dialog title="覆盖地区" :visible.sync="dialogTableVisible" >
    <el-table :data="gridData" border :show-header="showHeader" max-height="400">
      <el-table-column property="province" label="省" width="200"></el-table-column>
      <el-table-column property="city" label="市">
        <template scope="scope">
      <el-tag
        style="margin-right:10px;"
        v-for="(item,index) in scope.row.city"
        >{{item}}</el-tag>
    </template>
      </el-table-column>
    </el-table>
  </el-dialog>
 
     
  </section>
</template>

<script>
export default {
  data() {
    return {
      listLoading: false,
      value3: [new Date(2000, 10, 10, 10, 10), new Date(2200, 10, 10, 10, 10)],
      // 覆盖地区选择
      checkAll: true,
      checkedCities: [],
      // cities: cityOptions,
      isIndeterminate: true,
      dialogFormVisible: false,
      dialogTableVisible:false,
      gridData: [],
      showHeader:false,
      options2: [{
        label: '江苏',
        cities: []
      }, {
        label: '浙江',
        cities: []
      }],
      props: {
        value: 'label',
        children: 'cities'
      },
      ruleForm: {
        name: '',
        date1: '',
        // date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [{
            required: true,
            message: '请输入公告名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 15,
            message: '长度在 3 到 15 个字符',
            trigger: 'blur'
          }
        ],
        date1: [{
          type: 'date',
          required: true,
          message: '请选择日期与时间',
          trigger: 'change'
        }],
        // date2: [{
        //   type: 'date',
        //   required: true,
        //   message: '请选择时间',
        //   trigger: 'change'
        // }],
        // type: [{
        //   type: 'array',
        //   required: true,
        //   message: '请至少选择一个活动性质',
        //   trigger: 'change'
        // }],
        // resource: [{
        //   required: true,
        //   message: '请选择活动资源',
        //   trigger: 'change'
        // }],
        desc: [{
          required: true,
          message: '请输入公告内容',
          trigger: 'blur'
        }]
      },
      formLabelWidth: '120px',
      options: [{
        value: 'zhinan',
        label: '北京',
        children: [{
          value: 'shejiyuanze',
          label: '朝阳区',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '顺义区',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      selectedOptions: [],
      selectedOptions2: []
    }
  },
  computed() {
    return {
      // table2:function(){
      //     return this.tableData[0]
      // }
    }

  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    // 覆盖地区选择
    dialogConfig(){
      var _this =this;
      _this.$http.get("/rest/list3")
             .then(function(rsp){
                 _this.gridData  = rsp.data.data;
                //  _this.dialogTableVisible= true
                 _this.dialogFormVisible = true;
                 console.log(_this.gridData);
             })
             .catch(function(error){
                  console.log(error);
             })
    },
    handleCheckAllChange(event) {
      this.checkedCities = event.target.checked ? 10 : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === 10;
      this.isIndeterminate = checkedCount > 0 && checkedCount < 10;
    },
     dialogTable(){
      var _this =this;
      _this.$http.get("/rest/list3")
             .then(function(rsp){
                 _this.gridData  = rsp.data.data;

                 _this.dialogTableVisible= true
                 console.log(_this.gridData);
             })
             .catch(function(error){
                  console.log(error);
             })
    }
  }  
}
</script>
<style>

  section {
      box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
      border:1px solid #D3DCE6;
      border-radius: 4px;
      padding:20px;
      background-color: white;
  }      

</style>
