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
                <el-button type="primary" @click="handleAddData" style="width:100px;float:right;"><i class="el-icon-plus"></i> 添加</el-button>                
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
        <el-table-column prop="alipayUid" align="center" label="用户ID">
        </el-table-column>
        <el-table-column prop="userName" align="center" label="名称">
        </el-table-column>
        <el-table-column prop="gmtCreate" align="center" label="时间">
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template scope="scope">
                <!--<el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>-->
                <el-button ref='allIfo' @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
                <!--<el-button ref='allIfo' @click="handleEdit(scope.$index,scope.row)" type="text" size="small">生产二维码</el-button>-->

            </template>
        </el-table-column>
    </el-table>

    <el-dialog title="添加白名单" :visible.sync="dialogFormVisible" size="tiny">
        <el-form :model="form" ref="form"  label-width="80px">
            <el-form-item label="用户名称" :label-width="formLabelWidth">
                <el-input v-model="form.userName" placeholder="请填写用户名称" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户ID" :label-width="formLabelWidth">
                <el-input v-model="form.alipayUid" type='number' placeholder="请填写用户ID" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">取 消</el-button>
            <el-button type="primary" @click="handleConfirm">确 定</el-button>
        </div>
    </el-dialog>


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
        pageSize: 5,
        currentPage: 1,
        totalCount:0,//默认数据总数
        listLoading: false, //loading框
        url:'/api/whitelist/list/get',
        dialogFormVisible:false,
        form:{
            userName:'',
            alipayUid:''
        }

    }
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData: function(){
      var _this =this;
      _this.$http.post(this.url,{
        "pages": {
          "page_size": this.pageSize,
          "page_num": this.currentPage - 1
        },
        "con": {
          "searchStr": this.keyword
        }
      },(rsp)=>{
        // _this.listLoading = false;
        console.log(rsp)
        _this.tableData = rsp.page_list;
        _this.totalCount = parseInt(rsp.pages.cnt);
        if(_this.totalCount == "0"){
          this.$message({
            message: '未查询到内容，请重新输入！',
            type: 'warning'
          });
        }
      },(error)=>{
        console.log(error)
        _this.listLoading = false;
        this.$message({
            message: '未查询到内容，请重新输入！',
            type: 'warning'
          });
        console.log('failed');
      });
    },  
    //切换页条数
    handleSizeChange(val) {  
        this.currentPage = 1;
        this.pageSize = val;
        this.loadData();
    },
    //切换分页
    handleCurrentChange(val) {
        this.$message(`当前页${val}`);
        this.currentPage = val;
        this.loadData();
    },
    handleDelete(row){
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            console.log(row);
            var _this = this;
            var deleteUrl = '/api/whitelist/del';
            _this.$http.post(deleteUrl,{
            "id": row.id
            },(rsp)=>{
                // _this.listLoading = false;
                console.log(rsp)
                this.loadData();
                this.$message({
                message: '删除成功！',
                type: 'success'
                });
            },(error)=>{
                console.log(error)
                // _this.listLoading = false;
                this.$message({
                    message: '删除失败！',
                    type: 'error'
                });
            });
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
        });
    },
    handleAddData(){
        this.dialogFormVisible = true;
    },
    handleConfirm(){
        // this.dialogFormVisible = false; 
        var _this =this;
        var saveHttp = '/api/whitelist/save';
         _this.$http.post(saveHttp,{
            "data": {
            "alipayUid": this.form.alipayUid,
            "userName": this.form.userName
            }

        },(rsp)=>{
            this.dialogFormVisible = false;  
            console.log(rsp)
            this.pageSize =  5;
            this.currentPage = 1;
            this.loadData();
            this.form.userName = '';
            this.form.alipayUid = '';   
            this.$message({
                message: '添加成功！',
                type: 'success'
            });
            
        },(error)=>{
            console.log(error)
            _this.listLoading = false;
            this.$message({
                message: '添加失败！',
                type: 'warning'
            });
            console.log('failed');
        });

    },
    handleCancel(){
        this.form.userName = '';
        this.form.alipayUid = '';          
        this.dialogFormVisible = false;                      
    }
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
/*// 去掉input[type=number]默认的加减号*/
input[type=‘number‘] {
    -moz-appearance:textfield;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
-webkit-appearance: none;
margin: 0;

}

</style>
