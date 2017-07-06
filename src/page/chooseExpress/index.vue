<template>
<div class="section" style="overflow:hidden">
  <el-row type="flex" justify="space-around" class="btn" style="margin-bottom:20px;">
    <el-col>
      <el-tooltip class="item" effect="light" content="添加数据" placement="right">
        <el-button type="primary" @click="setNewData" size="large">+添加</el-button>
      </el-tooltip>
    </el-col>
    <el-col>
      <span>当前状态:</span>
      <el-select v-model="value" placeholder="请选择">

        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
  </el-row>

  <!-- 表格  -->
  <el-table :data="tableData" stripe v-loading.fullscreen.lock="listLoading" style="width: 100%" max-height="550" empty-text="_" align="center" :default-sort="{prop: 'date', order: 'descending'}">
    <el-table-column prop="operationsMapName" label="运营图名称" sortable min-width="120">
    </el-table-column>
    <el-table-column prop="name" label="运营图" sortable min-width="100">
      <template scope="scope">
            <img width="50px" src="https://expressprod.oss-cn-hangzhou.aliyuncs.com/OperativeLogo/f2c570f3-7f84-44ca-afa9-e19a71ba10c5.png">
        </template>
    </el-table-column>
    <el-table-column prop="link" min-width="200" label="链接">
    </el-table-column>
    <el-table-column prop="address" label="覆盖地区">
      <template scope="scope">
         <el-button @click="checkArea" type="text" size="small">查看</el-button>
       </template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间">
    </el-table-column>
    <el-table-column prop="modifyTime" label="修改时间">
    </el-table-column>
    <el-table-column prop="activeTime" min-width="200" label="有效时段">
    </el-table-column>
    <el-table-column prop="Forder" label="排序值">
    </el-table-column>
    <el-table-column prop="currentState" label="当前状态">

    </el-table-column>
    <el-table-column prop="auditState" label="审核状态">
    </el-table-column>
    <el-table-column label="操作" width="200">
      <template scope="scope">
           <el-button @click="handleClick" type="text" size="small">查看</el-button>
           <el-button @click="handleEdit" type="text" size="small">编辑</el-button>
         </template>
    </el-table-column>
  </el-table>

  <div class="block pagination" style="margin-top:30px;float:right;">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[5,10,15,20]" :page-size="pageSize" layout="total,sizes,prev, pager, next,jumper" :total="20">
    </el-pagination>
  </div>

  <!--  覆盖地区 查看对话框 -->
  <el-dialog title="覆盖地区" :visible.sync="dialogTableVisible">
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
</div>
</template>

<script>
export default {
  data() {
    return {
      gridData:[],
      showHeader:false,
      dialogTableVisible:false,
    // 下拉选择
    options: [{
         value: '选项1',
         label: '已上架 + 待审核'
       }, {
         value: '选项2',
         label: '已下架'
       }, {
         value: '选项3',
         label: '全部'
       }],
       value: '',
      pageSize: 5,
      listLoading: false,
      value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
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
      tableData: [{
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
        },
        {
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
        },
        {
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
        },
        {
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
        }
      ],
      formLabelWidth: '120px',
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
    var _this = this;
    _this.$http.get("/rest/list2")
      .then(function(rsp) {
        _this.tableData = rsp.data.data
      })
      .catch(function(error) {
        console.log(error);
      })

    console.log(this.$route.matched);
  },
  methods: {
    // 查看覆盖地区
    checkArea() {
      var _this = this;
      _this.$http.get("/rest/list3")
        .then(function(rsp) {
          _this.gridData = rsp.data.data;
          console.log(_this.gridData);
          _this.dialogTableVisible = true
        })
        .catch(function(error) {
          console.log(error);
        })

    },
    setNewData() {
      this.$router.push({
        path: "./addData"
      });
    },
    handleClose() {
      alert("asdfsd");
    },
    handleChange(value) {
      console.log(value);
    },
    getAddPage(e) {
      -
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
      this.$notify({
        title: "点击了编辑",
        message: "即将跳转到编辑界面"
      })
    }
  }
}
</script>
<style>

</style>
