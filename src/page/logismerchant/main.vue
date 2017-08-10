<template>
<div class="section">
    <div class="keyword-input">
        <el-row>
            <el-col :span="6" class="import-font">物流机构名称：</el-col>
            <el-col :span="10">
                <el-input :span="10" v-model="keyword" type="text" size="large" @keyup.enter.native="loadData" placeholder="请输入物流机构名称"></el-input>
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
        <el-table-column align="center" label="ID" prop="id">
        </el-table-column>
        <el-table-column align="center" label="LOGO" prop="merchantLogo">
            <template scope="scope">
                <img width="50px" style="cursor:pointer;" :src="scope.row.merchantLogo" trigger="click" placement="right" @click="showImg(scope.row.merchantLogo)">
                <el-dialog v-model="dialogVisible" size="tiny">
                    <img width="100%" :src="bigImageUrl" alt="">
                </el-dialog>
            </template>
        </el-table-column>
        <el-table-column align="center" label="机构码" prop="merchantCode">
        </el-table-column>
        <el-table-column align="center" label="机构名称" prop="merchantName">
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template scope="scope">
                <el-button @click="handleEdit(scope.row)" type="text" size="small">修改</el-button>
                <el-button ref='allIfo' @click="handleDelete(scope.$index,scope.row)" type="text" size="small">删除</el-button>
                <el-button ref='allIfo' @click='useqrcode(scope.row)' type="text" size="small" v-popover:popover2>生产二维码</el-button>
                <el-popover
                    ref="popover2"
                    trigger="click"
                    >
                    <div id='code'></div>
                    <canvas id="canvas"></canvas>
                </el-popover>             
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
import Vue from 'vue'
import QRCode from 'qrcode'
Vue.use(QRCode)

export default {
  data() {
    return {
        keyword:'',
        tableData:[],
        pageSize: 5,
        currentPage: 1,
        totalCount:0,//默认数据总数
        listLoading: false, //loading框
        bigImageUrl:'',
        dialogVisible:false,
        url:'/api/logisMerchant/list/get',
        codes:''

    }
  },
  created() {
    this.loadData();
  },
  methods: {
      //从服务器读取数据
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
    handleAddData(){
        this.$router.push({path:'/dev/logismerchant/addData'});
    },
    handleEdit(row){
        this.$router.push({path:'/dev/logismerchant/editData'});
        localEvent.set("localDelete", row.id);
    },
    //点击图片显示大图
    showImg(row){
      this.dialogVisible = true;
      this.bigImageUrl = row || '11';
    },
    //删除
    handleDelete(index,row){
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            console.log(row);
            var _this = this;
            var deleteUrl = '/api/logisMerchant/del';
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
    useqrcode(row){
        console.log(row.id)
        var canvas = document.getElementById('canvas');
        // let codeHttp = 'www.baidu.com';
        let codeHttp = 'alipays://platformapi/startapp?appId=60000146&url=https%3A%2F%2Fsendex.alipay-eco.com%2Fh5%2Forder-grey-test.html?id=' + row.id;
        QRCode.toCanvas(canvas, codeHttp, function (error) {
            if (error) console.error(error)
            console.log('success!');
        })
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
#canvas{width:200px!important;height:200px!important;}

</style>
