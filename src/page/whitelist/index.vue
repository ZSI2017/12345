<template>
<div class="section">
    <div class="keyword-input">
        <el-row :span="10">
            <el-col :span="4" class="import-font">UID：</el-col>
            <el-col :span="10">
                <el-input :span="10" v-model="keyword" type="text" size="large" @keyup.enter.native="loadData" placeholder="请输入用户ID"></el-input>
            </el-col>
            <el-col :span="4" class="import-search">
                <el-button type="primary" @click="loadData" style="width:100px;">搜 索</el-button>           
            </el-col>
        </el-row>
         <el-row>
            <el-col :span="2" class="import-search" style="float:right;">
                <el-button type="primary" @click="loadData" style="width:100px;float:right;"><i class="el-icon-plus"></i> 添加</el-button>                
            </el-col>
        </el-row>
    </div>

    <!-- 表格  -->
    <el-table
        :data="tableData"
        stripe v-loading.body="listLoading"
        lement-loading-text="拼命加载中"
        style="width: 100%"
        max-height="3000"
    >
        <el-table-column prop="id" align="center" label="用户ID">
        </el-table-column>
        <el-table-column align="center" label="名称">
        </el-table-column>
        <el-table-column align="center" label="时间">
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template scope="scope">
                <!--<el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>-->
                <el-button ref='allIfo' @click="handleEdit(scope.$index,scope.row)" type="text" size="small">删除</el-button>
                <!--<el-button ref='allIfo' @click="handleEdit(scope.$index,scope.row)" type="text" size="small">生产二维码</el-button>-->
                
            </template>
        </el-table-column>
    </el-table>

    <div class="block pagination" style="margin-top:30px;float:right;">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10,20,30]"
        :page-size="pageSize"
        layout="total,sizes,prev, pager, next,jumper" :total="totalCount">
        </el-pagination>
    </div>

</div>
</template>

<script>
import localEvent from 'src/vuex/function.js';


export default {
  data() {
    return {
        keyword:'',
        tableData:[],

    }
  },
  created() {
    // this.loadData();
  },
  methods: {
    loadData(){

    },
  }
}
</script>

<style lang="scss">
            
.keyword-input{
  margin: 20px 0 10px;
}
.import-font{
  height:42px;
  line-height: 42px;
  text-align: right;
  padding-right: 20px;
  font-weight: 700;
}       
.import-search{
  margin-left: 20px;
}     

</style>
