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
            <template scope="scope">
                <p>{{scope.row.gmtBegin | formatDate}}</p>
            </template>
        </el-table-column>
        <el-table-column prop="logo" label="处理结果" align="center">
            <template scope="scope">
                {{`成功处理${scope.row.successCnt}个，失败处理${scope.row.failCnt}个`}}
            </template>
        </el-table-column>
        <el-table-column label="处理时间" align="center">
            <template scope="scope">
                <p style="padding:0;margin:0;text-align:center">{{scope.row.gmtBegin | formatDate}}</p>
                <p style="padding:0;margin:0;text-align:center">至</p>
                <p style="padding:0;margin:0;text-align:center">{{scope.row.gmtEnd | formatDate}}</p>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template scope="scope">
                <el-button @click="handleUpdown(scope.$index,scope.row)" type="text" size="small">下载处理结果</el-button>
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
    <el-dialog title="批量导入" :visible.sync="dialogImportVisible" size="tiny" :before-close="handleClose">
        <el-form :model="importForm" ref="importForm" style="margin-left:40px;height:160px;">
            <el-radio-group v-model="radio2" style="padding-bottom:20px;">
                <el-radio :label="1">标记其他渠道支付</el-radio>
                <!--<el-radio :label="2">备选项</el-radio>-->
            </el-radio-group>
            <el-form-item label="选择导入文本"  :label-width="120">
                <!--<el-upload
                    class="upload-demo"
                    ref="upload"
                    action="http://192.168.12.54:8080/api/orderbatch/batchOtherPay"
                    :on-change="handleFileChange"
                    :file-list="importForm.fileList"
                    :on-remove="handleRemove"
                    :auto-upload="false"
                    >
                    <el-button slot="trigger" size="small" style="width:60px;background:#f1f1f1;"><i class="el-icon-upload2"></i> </el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="handleImportSave">上传到服务器</el-button>
                    <div slot="tip" class="el-upload__tip">仅支持xlsx格式的文件</div>
                </el-upload>-->

                <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="http://192.168.12.54:8080/api/orderbatch/batchOtherPay"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :on-change="handleFileChange"
                    :on-success='handleSuccess'
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" style="width:60px;background:#f1f1f1;"><i class="el-icon-upload2"></i> </el-button>
                    <div slot="tip" class="el-upload__tip">仅支持xlsx格式的文件</div>
                </el-upload>
            </el-form-item>
        </el-form>
        <el-button style="margin-left:40px" type="text"  @click="handleDownload">下载模板</el-button>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleCanle">取 消</el-button>
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
            fileList: [],

        }
    },
    mounted() {
        this.loadData();
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
            _this.listLoading = true;
            let listUrl = "/api/orderbatch/list"; // 默认展开
            _this.$http.post(listUrl,{
                "pages": {
                    "page_size": this.pageSize,
                    "page_num": _this.currentPage - 1
                },
                "con": {
                    "searchStr":''
                }
            },
            (rsp)=>{
                console.log(rsp);
                _this.listLoading = false;
                _this.tableData = rsp.page_list;
                _this.totalCount = parseInt(rsp.pages.cnt);
                if(_this.totalCount == "0"){
                this.$message({
                    message: '成功！',
                    type: 'success'
                });
                }
            },(error)=>{
                console.log(error)
                _this.listLoading = false;
                this.$message({
                    message: '失败！',
                    type: 'error'
                });
                console.log('failed');
            });
        },
        setNewData(){
            // this.fileList = [];
            console.log(this.fileList)
            this.dialogImportVisible = true;
        },
        //取消
        handleCanle(){
            this.dialogImportVisible = false;
        },
         //确定
        handleImportSave(q){
            console.log(222)
            console.log(this.$refs.upload)
            // if(this.$refs.upload.fileList.length == '0'){
            //     this.$message({
            //         message: '请选择导入文本！',
            //         type: 'warning'
            //     });
            //     return;
            // }
            this.$refs.upload.submit();
            this.dialogImportVisible = false;
            this.listLoading = true;



        },
        handlerror(err){
            console.log(err)
        },
        handleSuccess(response, file, fileList){



            console.log(this.fileList)
            console.log('success')
            this.loadData();
            this.listLoading = false;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
            console.log(file)
            console.log(fileList)
        },
        handleFileChange(file,fileList){
            // this.fileList = fileList.slice(-1);
            console.log(file)
            console.log(fileList)

        },

        handleDownload(){
            window.location.href="http://expressprod.oss-cn-hangzhou.aliyuncs.com/DemoExcel/template-orderbatch.xlsx"
        },
        //关闭dialog
        handleClose(){
            this.dialogImportVisible = false;
        },
        //下载详情
        handleUpdown(index,row){
            console.log(index)
            console.log(row)
            let downloadLink = row.fileUrl;
            window.location.href = downloadLink;
        },
        //处理分页
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1;
            this.loadData();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.listLoading = true;
            this.$message(`当前页${val}`);
            var _this = this;
            this.loadData();
            console.log(`当前页: ${val}`);
        },

    }
}
</script>

<style>


</style>
