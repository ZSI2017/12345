<template>
  <div class="section" style="overflow:hidden">
  <el-table
      class="mainTable"
      :data="tableData"
      style="width: 100%;margin-top:10px"
      max-height="500"
      empty-text="_"
      align="center"
      :default-sort="{prop: 'date', order: 'descending'}"
      >
    <el-table-column prop="operationsMapName" label="快递公司名称" >
    </el-table-column>
    <el-table-column prop="name" label="非服务地区" >
        <template scope="scope">
         
        </template>
    </el-table-column>
    <el-table-column prop="link"  label="修改时间">
    </el-table-column>
    <el-table-column  label="操作" >
      <template scope="scope">
           <el-button @click="handleClick" type="text" size="small">查看</el-button>
           <el-button @click="handleEdit" type="text" size="small">编辑</el-button>
         </template>
    </el-table-column>
  </el-table>
</div>
</template>
<script>
  export default {
    name:'nonServerDistrict',
    data() {
      return {
        input: ''
      }
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
