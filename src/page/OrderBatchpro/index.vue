<template>
<div class="section">
    <div class="addButton">
        <el-row :span="24">
            <el-col :span="22" style="height:48px;">
            </el-col>
            <el-col :span="2" style="height:48px;">
                <el-button type="primary" @click="setNewData" style="float:right;"><i class="el-icon-plus"></i> 添加</el-button>
            </el-col>
        </el-row>
    </div>
    <el-table
        class="mainTable"
        :data="tableData"
        style="width: 100%;margin-top:1px;"
        max-height="3000"
        align="center"
        >
        <el-table-column prop="gmtBegin" label="创建时间" align="center">
        </el-table-column>
        <el-table-column prop="logo" label="处理结果" align="center">
            <template scope="scope">
                `成功处理${scope.row.successCnt},失败处理${scope.row.failCnt}`
            </template>
        </el-table-column>
        <el-table-column prop="tag" label="处理时间" align="center">
            <template scope="scope">
                <p style="padding:0;margin:0;text-align:center">{{scope.row.gmtBegin | formatDate}}</p>
                <p style="padding:0;margin:0;text-align:center">至</p>
                <p style="padding:0;margin:0;text-align:center">{{scope.row.gmtEnd | formatDate}}</p>
            </template>
        </el-table-column>
        <el-table-column prop="tag" label="操作" align="center">
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
    <el-dialog title="批量导入" :visible.sync="dialogImportVisible" size="tiny" :before-close="handleImportClose">
        <el-form :model="importForm" style="margin-left:40px">
            <el-radio-group v-model="radio2" style="padding-bottom:20px;">
                <el-radio :label="1">标记其他渠道支付</el-radio>
                <el-radio :label="2">备选项</el-radio>
            </el-radio-group>
            <el-form-item label="选择导入文本" prop="fileList" :inline="true"  :label-width="120">
            <!-- http://sendexmng-sit.alipay-eco.com -->
            <el-upload
                class="upload-demo"
                action="http://sendexmng-sit.alipay-eco.com/api/freightPriceRule/upload"
                :on-change="handleFileChange"
                :file-list="importForm.fileList"
                :on-remove="handleRemove"
                :on-success='handleSuccess'
                :on-error='handlerror'
                >
                <el-button size="small" style="width:60px;background:#f1f1f1;"><i class="el-icon-upload2"></i> </el-button>
                <div slot="tip" class="el-upload__tip">仅支持xls格式的文件</div>
            </el-upload>
            <!-- <a href="http://sendexmng-sit.alipay-eco.com/api/freightPriceRule/download">下载模板</a> -->
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogImportVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleImportSave">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
// import localEvent from 'src/vuex/function.js';
import {
  formatDate
} from 'src/util/date.js';

export default {
    data() {
        return {
            url:'',
            tableData: [],
            pageSize: 5,
            currentPage: 1,
            dialogImportVisible:false,
            dialogVisible:false,
            radio2:1,
            totalCount: 0, //默认数据总数
            // 导入对话框
            importForm:{
                // expressName:'',
                // typeOfService:'',
                fileList: []
            }

        }
    },
    mounted() {


    },
    created() {
            
    },
        filters: {
        formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        }
    },
    methods: {
        loadData: function(){
            var _this =this;
            _this.currentPage = 1;
            _this.listLoading = true;
            _this.url = ""; // 默认展开
            _this.$http.post(this.url,{},
            (rsp)=>{
                _this.listLoading = false;
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
        setNewData(){
            this.dialogImportVisible = true;
        },
        handlerror(err){
            // alert(err)
        },
        handleSuccess(response){
            // alert(response)
        },
        handleFileChange(file,fileList){
                this.importForm.fileList = fileList.slice(-1);
        },
        handleImportSave(){
            // this.$refs["importForm"].validate((valid) => {
            //     if(valid) {
                //
                // let data = {
                //     "logMerchantId":this.importForm.expressName[1].toString(),
                //     "logMerchantName":this.importForm.expressName[0],
                //     "productTypeId":this.importForm.typeOfService[1].toString(),
                //     "productTypeName":this.importForm.typeOfService[0]
                // }
                // this.$http.post("/api/freightPriceRule/import",data,(result)=>{
                //         this.$refs["importForm"].resetFields();
                //         this.dialogImportVisible = false;
                //         this.$message({
                //             type: 'success',
                //             message: '导入成功'
                //         });
                // },(error)=>{
                //     this.$refs["importForm"].resetFields();
                //     if(error.data.meta.code == '0012'){
                //         //  this.dialogVisible = true;
                //         this.$confirm('导入文件失败，是否下载查看失败内容?', '提示', {
                //             confirmButtonText: '确定',
                //             cancelButtonText: '取消',
                //             type: 'warning'
                //             }).then(() => {
                //             window.location.href="http://sendexmng-sit.alipay-eco.com/api/freightPriceRule/findFile"
                //             }).catch(() => {
                //             // this.$message({
                //             //   type: 'info',
                //             //   message: '已取消删除'
                //             // });
                //             });
                //         };
                //     });
                // }else {
                //     return false;
                // }
            // })
        }
    }    
}
</script>

<style>


</style>
