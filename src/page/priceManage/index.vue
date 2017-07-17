<template>
  <div class="section" style="overflow:hidden">
    <el-row :span="24" type="flex" align="middle" style="margin-bottom:10px;">
       <el-col>
         <span>快递公司:</span>
         <el-select label="复选框 A" v-model="express" placeholder="请选择">
             <el-option
               v-for="item in options"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
         </el-select>
       </el-col>
       <el-col>
         <span>发货省:</span>
         <el-select label="复选框 A" v-model="sendProvince" placeholder="请选择">
             <el-option
               v-for="item in options"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
         </el-select>
       </el-col>
       <el-col>
         <span>收货省:</span>
         <el-select label="复选框 A" v-model="RecProvince" placeholder="请选择">
             <el-option
               v-for="item in options"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
         </el-select>
       </el-col>
    </el-row>
    <el-row :span="24" type="flex" align="middle" style="margin-bottom:10px;">
       <el-col>
         <span>服务类型:</span>
         <el-select label="复选框 A" v-model="typeOfService" placeholder="请选择">
             <el-option
               v-for="item in options"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
         </el-select>
       </el-col>
       <el-col>
         <span>发货市:</span>
         <el-select label="复选框 A" v-model="sendCity" placeholder="请选择">
             <el-option
               v-for="item in options"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
         </el-select>
       </el-col>
       <el-col>
         <span>收货市:</span>
         <el-select label="复选框 A" v-model="recCity" placeholder="请选择">
             <el-option
               v-for="item in options"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
         </el-select>
       </el-col>
    </el-row>
    <el-button @click="handleQuery" size="large" type="primary">查询</el-button>
    <el-row :span="24" style="height:1px;width:100%;background-color:rgb(211, 220, 230);margin:10px 0;"></el-row>
    <el-button @click="handleAddLine" type="primary">新增运线</el-button>
    <el-button @click="handleLeadLine" type="primary">导入运线</el-button>
    <el-button @click="handleExportLine" type="primary">导出运线</el-button>
  <el-table
      class="mainTable"
      :data="tableData"
      v-loading.body.lock="halfListLoading"
      style="width: 100%;margin-top:10px"
      max-height="400"
      empty-text="暂无数据 (╯︵╰)"
      align="center"
      :default-sort="{prop: 'date', order: 'descending'}"
      >
    <el-table-column prop="tableExpress" label="快递公司" >
    </el-table-column>
    <el-table-column prop="tableTypeOfService" label="服务类型" >
    </el-table-column>
    <el-table-column prop="tableSendProvince"  label="发货省">
    </el-table-column>
    <el-table-column prop="tableSendCity"  label="发货市">
    </el-table-column>
    <el-table-column prop="tableRecProvince"  label="收货省">
    </el-table-column>
    <el-table-column prop="tableRecCity"  label="收货市">
    </el-table-column>
    <el-table-column prop="tablePresetWeightPrice"  label="首重价格">
    </el-table-column>
    <el-table-column prop="tablePresetWeight"  label="首重重量">
    </el-table-column>
    <el-table-column prop="tableExtraWeight"  label="续重重量">
    </el-table-column>
    <el-table-column prop="tableExtraWeightPrice"  label="续重价格">
    </el-table-column>
    <el-table-column  label="操作" >
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
</div>
</template>
<script>
  export default {
    name:'nonServerDistrict',
    data() {
      return {
        halfListLoading:false,
        tableData:[],
        pageSize: 5,
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
            sendProvince: '',
            RecProvince: '',
            typeOfService: '',
            sendCity: '',
            recCity: '',
      }
    },
    created(){
      var _this =this;
      _this.$http.get("/rest/list6", (data) => {
        console.log("success");
        console.log(data);
        _this.tableData = data.data.data
      }, (error) => {
        console.log("error");
        console.log(error);
      });
    },
    methods:{
      handleQuery() {
         const h = this.$createElement;
        this.$notify({
         title: '查询',
         message: h('i', { style: 'color: teal'}, '点击了查询')
       });
      },
      handleAddLine() {
         const h = this.$createElement;
        this.$notify({
         title: '新增运线',
         message: h('i', { style: 'color: teal'}, '点击了新增运线')
       });
      },
      handleLeadLine() {
         const h = this.$createElement;
        this.$notify({
         title: '导出运线',
         message: h('i', { style: 'color: teal'}, '点击了导出运线')
       });

      },
      handleExportLine() {
         const h = this.$createElement;
        this.$notify({
         title: '导入运线',
         message: h('i', { style: 'color: teal'}, '点击了导入运线')
       });

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
        this.halfListLoading = true;
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
          _this.halfListLoading = false;
        }, 600);
        console.log(`当前页: ${val}`);
      },
    },
  };
</script>

<style lang="scss">
.el-tabs .el-tabs__content {
  display: none;
}
  .mainTable {
     .cell{
        text-align: center;
      }
    }
      .el-tabs__item{
        width:90px;
        height:30px;
        line-height:30px;
        text-align: center;
      }

      .el-table .cell,
      .el-table th>.cell {
        padding: 0 7px;
      }
      .link_button{
        border:0;
      }
      .link_button:hover{
        background-color: no;
      }

</style>
