<template>
<div>
  <div class="btn" style="background-color:#EFF2F7;margin-bottom:20px;">
    <el-tooltip class="item" effect="light" content="添加数据" placement="right">
      <!--<el-button type="primary" @click="dialogFormVisible = true" size="large">添加</el-button>-->
      <el-button type="primary" @click.native="addType" size="large">添加</el-button>
    </el-tooltip>
    <!-- <el-input style="width:100px;" v-model="input" placeholder="请输入内容"></el-input>
        <el-button type="primary">修改</el-button>
         <el-button type="text">删除</el-button> -->

    <el-row type="flex" align="middle" :gutter="20" style="float:right;">
      <el-col :span="5" style="width: 100px;text-align: center;">
        当前状态
      </el-col>
      <el-col :span="16">
        <el-select v-model="value" placeholder="请选择查询状态"  @change="changeState(value)">
          <el-option
            v-for="type in types"
            :key="type"
            :label="type"
            :value="type">
          </el-option>
        </el-select>
      </el-col>   
    </el-row>  
  </div>

  <!-- 表格  -->
  <el-table :data="table2" stripe v-loading="listLoading" style="width: 100%" max-height="500" :default-sort="{prop: 'date', order: 'descending'}">
    <el-table-column prop="date" label="公告名称" sortable width="120">
    </el-table-column>
    <el-table-column prop="name" label="内容" sortable width="160">
    </el-table-column>
    <el-table-column prop="address" label="覆盖地区">
    </el-table-column>
    <el-table-column prop="address" label="创建时间">
    </el-table-column>
    <el-table-column prop="address" label="有效时段">
    </el-table-column>
    <el-table-column prop="address" label="当前状态" width="100">
    </el-table-column>
    <el-table-column prop="address" label="审查状态" width="100">
    </el-table-column>
    <el-table-column label="操作" width="100">
      <template scope="scope">
           <el-button @click="handleClick" type="text" size="small">查看</el-button>
           <el-button @click="handleEdit" type="text" size="small">编辑</el-button>
         </template>
    </el-table-column>
  </el-table>

  <div class="block pagination" style="margin-top:30px;float:right;">
    <el-pagination
       @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :current-page="currentPage4"
       :page-sizes="[5,10,15,20]"
       :page-size="pageSize"
       layout="total,sizes,prev, pager, next,jumper" :total="20">
    </el-pagination>
  </div>
</div>
</template>

<script>
  import store from 'src/store.js'
  import $ from 'jquery'
export default {
  data() {
    return {
      pageSize: 5,
      listLoading: false,
      value: '',
      value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      types: ['全部','已下架','已上架待审核'],
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
      currentPage4: 1,
      tableData: [
        [{
          date: '2016-05-01',
          name: 'liqi',
          address: '北京朝阳区百子湾路12345'
        }, {
          date: '2016-05-02',
          name: 'liqi',
          address: '北京朝阳区百子湾路12345'
        }, {
          date: '2016-05-03',
          name: 'liqi',
          address: '北京朝阳区百子湾路12345'
        }, {
          date: '2016-05-04',
          name: 'liqi',
          address: '北京朝阳区百子湾路12345'
        }, {
          date: '2016-05-05',
          name: 'liqi',
          address: '北京朝阳区百子湾路12345'
        }],
        [{
          date: '2016-06-01',
          name: 'liqi',
          address: '北京朝阳区百子湾路12345'
        }, {
          date: '2016-06-02',
          name: 'liqi',
          address: '北京朝阳区百子湾路12345'
        }, {
          date: '2016-06-03',
          name: 'liqi',
          address: '北京朝阳区百子湾路12345'
        }, {
          date: '2016-06-04',
          name: 'liqi',
          address: '北京朝阳区百子湾路12345'
        }, {
          date: '2016-06-05',
          name: 'liqi',
          address: '北京朝阳区百子湾路12345'
        }],
        [{
            date: '2016-07-01',
            name: 'liqi',
            address: '北京朝阳区百子湾路12345'
          }, {
            date: '2016-07-02',
            name: 'liqi',
            address: '北京朝阳区百子湾路12345'
          },
          {
            date: '2016-07-03',
            name: 'liqi',
            address: '北京朝阳区百子湾路12345'
          },
          {
            date: '2016-07-04',
            name: 'liqi',
            address: '北京朝阳区百子湾路12345'
          },
          {
            date: '2016-07-05',
            name: 'liqi',
            address: '北京朝阳区百子湾路12345'
          }
        ],
        [{
          date: '2016-08-01',
          name: 'liqi',
          address: '北京朝阳区百子湾路12345'
        }, {
          date: '2016-08-02',
          name: 'liqi',
          address: '北京朝阳区百子湾路12345'
        }, {
          date: '2016-08-03',
          name: 'liqi',
          address: '北京朝阳区百子湾路12345'
        }, {
          date: '2016-08-04',
          name: 'liqi',
          address: '北京朝阳区百子湾路12345'
        }, {
          date: '2016-08-05',
          name: 'liqi',
          address: '北京朝阳区百子湾路12345'
        }]
      ],
      dialogFormVisible: false,
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [{
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
        ],
        region: [{
          required: true,
          message: '请选择活动区域',
          trigger: 'change'
        }],
        date1: [{
          type: 'date',
          required: true,
          message: '请选择日期',
          trigger: 'change'
        }],
        date2: [{
          type: 'date',
          required: true,
          message: '请选择时间',
          trigger: 'change'
        }],
        type: [{
          type: 'array',
          required: true,
          message: '请至少选择一个活动性质',
          trigger: 'change'
        }],
        resource: [{
          required: true,
          message: '请选择活动资源',
          trigger: 'change'
        }],
        desc: [{
          required: true,
          message: '请填写活动形式',
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
  created() {
    this.table2 = this.tableData[0]
    console.log(this.$route.matched);
  },
  methods: {
    handleClose(){
        alert("asdfsd");
    },
    handleChange(value) {
      console.log(value);
    },
    getAddPage(e) {-
      //  let router = new VueRouter();
      console.log(e);
      this.$router.push({
        path: "table3",
        query: {
          plan: 'private'
        }
      });
      this.addFlag = true;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.$message(`每页${val}`);
      var count = this.pageSize / 5;
      if (this.pageSize > 5) {
        if (this.currentPage4 <= 1) {
          var count = this.pageSize / 5;
          var temp = [];
          for (var i = 0; i < count; i++) {
            temp = temp.concat(this.tableData[i]);
          }
          this.table2 = temp;
        }

      } else {
        this.table2 = this.tableData[this.currentPage4 - 1];
      }
      // this.currentPage4 = 1;

      //  console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage4 = val;
      var _this = this;
      this.listLoading = true;
      this.$message(`当前页${val}`);
      var count = this.pageSize / 5;
      if (count == 1) {
        this.table2 = this.tableData[val - 1];
      } else {
        if (val == 1) {
          var temp = [];
          for (var i = 0; i < count; i++) {
            temp = temp.concat(this.tableData[i]);
          }
          this.table2 = temp;
        } else {
          var temp = [];
          for (var i = count; i < 4; i++) {
            temp = temp.concat(this.tableData[i]);
          }
          this.table2 = temp;
        }
      }


      setTimeout(() => {
        _this.listLoading = false;
      }, 600);
      console.log(`当前页: ${val}`);
    },
    handleClick() {
      this.$notify({
        title: '点击了查看',
        message: '即将跳转到查看界面',
        duration: 6000
      })
    },
    handleEdit() {
      alert(this.value)
      this.$notify({
        title: "点击了编辑",
        message: "即将跳转到编辑界面"
      })
    },
    // changeType(){
    //     this.$notify({
    //       title: "333",
    //       message: '即将查询列表'
    //     })
    // },
    changeState() {
      alert(this.value)
    },
    addType: function () {
      this.$router.push({path:'./addType'});
      // $('html,body').animate({scrollTop:0},500);

    },
  }
}
</script>
<style>

</style>

