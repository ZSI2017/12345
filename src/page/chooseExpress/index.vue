<template>
<div>
  <div class="btn" style="background-color:#EFF2F7;margin-bottom:20px;">
      <el-tooltip class="item" effect="light" content="添加数据" placement="right">
        <el-button type="primary" @click="setNewData" size="large">添加</el-button>
      </el-tooltip>
    <!-- <el-input style="width:100px;" v-model="input" placeholder="请输入内容"></el-input>
        <el-button type="primary">修改</el-button>
         <el-button type="text">删除</el-button> -->
  </div>

  <!-- 表格  -->
  <el-table :data="table2" stripe v-loading="listLoading" style="width: 100%" max-height="600" :default-sort="{prop: 'date', order: 'descending'}">
    <el-table-column prop="date" label="日期" sortable width="180">
    </el-table-column>
    <el-table-column prop="name" label="姓名" sortable width="180">
    </el-table-column>
    <el-table-column prop="address" label="地址">
    </el-table-column>
    <el-table-column label="操作" width="200">
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
export default {
  data() {
    return {
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
    this.table2 = this.tableData[0]
    console.log(this.$route.matched);
  },
  methods: {
    setNewData() {
       this.$router.push({path:"./addData"});
    },
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
