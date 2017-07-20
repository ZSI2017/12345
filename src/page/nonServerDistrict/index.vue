<template>
  <div class="section" style="overflow:hidden">
  <el-table
      class="mainTable"
      :data="tableData"
      style="width: 100%;margin-top:10px"
      max-height="500"
      empty-text="暂无数据"
      align="center"
      :default-sort="{prop: 'date', order: 'descending'}"
      >
    <el-table-column prop="name" label="快递公司名称" >
    </el-table-column>
    <el-table-column label="非服务地区" >
       <template scope="scope">
           <el-button @click="handleClick" type="text" size="small">查看</el-button>
         </template>
    </el-table-column>
    <el-table-column prop="createTime"  label="修改时间">
    </el-table-column>
    <el-table-column  label="操作" >
      <template scope="scope">
           <el-button @click="handleEdit" type="text" size="small">编辑</el-button>
         </template>
    </el-table-column>
  </el-table>

    <!-- <check-server
      :visible="dialogCheckVisible"
      :gridData="gridData"
      @listenToCheck ="changeCheckVisible"
    ></check-server> -->

    <config-server
        :visible="dialogConfigVisible"
        :sourceData="result"
        :onlyRead ='isCheckServer'
        @listenToConfig ="changeConfigVisible"
     > </config-server>

</div>
</template>
<script>
import checkServer from "@/page/nonServerDistrict/checkServer";
import configServer from "@/page/nonServerDistrict/configServer"
  export default {
    name:'nonServerDistrict',
    components:{
       checkServer,
       configServer
    },
    data() {
      return {
        tableData:[],
        result:{},
        input: '',
        dialogCheckVisible:false,
        dialogConfigVisible:false,
        isCheckServer:false,
      }
    },
    methods:{
        handleClick(){
          this.isCheckServer = true;
          // this.dialogCheckVisible= true;
          let url = "/rest/list7";
          var _this = this;
          _this.$http.get(url, (data) => {
            _this.result = data.data.data
            _this.dialogConfigVisible = true;
          }, (error) => {
            console.log("error");
            console.log(error);
          });
        },
        handleEdit() {
          this.isCheckServer = false;
          let url = "/rest/list7";
          var _this = this;
          _this.$http.get(url, (data) => {
            _this.result = data.data.data
            _this.dialogConfigVisible = true;
          }, (error) => {
            console.log("error");
            console.log(error);
          });

        },
        changeCheckVisible(flag) {
                this.dialogCheckVisible= flag;
        },
        changeConfigVisible(flag) {
              this.dialogConfigVisible = flag;
        }
    },
    created() {
      let url = "/rest/list2";
      var _this = this;
      _this.$http.get(url, (data) => {
        console.log("success");
        console.log(data);
        _this.tableData = data.data.data
      }, (error) => {
        console.log("error");
        console.log(error);
      });
    }
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
