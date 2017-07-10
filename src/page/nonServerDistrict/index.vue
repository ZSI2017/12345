<template>
  <el-table  :data="tableData"  style="width: 100%;margin-top:10px" max-height="550" empty-text="_" align="center" :default-sort="{prop: 'date', order: 'descending'}">
    <el-table-column prop="operationsMapName" label="运营图称" sortable min-width="120">
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
    <el-table-column v-if="showConfig" prop="auditState" label="审核状态">
    </el-table-column>
    <el-table-column v-if="showConfig" label="操作" width="200">
      <template scope="scope">
           <el-button @click="handleClick" type="text" size="small">查看</el-button>
           <el-button @click="handleEdit" type="text" size="small">编辑</el-button>
         </template>
    </el-table-column>
  </el-table>

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

<style>
.import-font{
  height:42px;
  line-height: 42px;
}
.order-input{
  width: 500px;
}
.import-search{
  margin-left: 20px;
}

</style>
