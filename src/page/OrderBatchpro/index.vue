<template>
<div class="section batchMain" element-loading-text="正在处理中..."  v-loading.body.fullscreen="handleLoading">
    <div class="addButton" v-loading.body.fullscreen.lock="listLoading">
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
                <el-button @click="handleUpdown(scope.row)" type="text" size="small">下载处理结果</el-button>
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
        <p style="color:red;margin:0 40px 20px 40px;">请先与快递公司、用户确认所有批处理订单均真实支付，否则可能产生巨额资金损失！！！</p>
        <el-form :model="importForm" ref="importForm" style="margin-left:40px;height:160px;">
            <el-radio-group v-model="radio2" style="padding-bottom:20px;">
                <el-radio :label="1">标记其他渠道支付</el-radio>
                <!--<el-radio :label="2">备选项</el-radio>-->
                <!--  -->
            </el-radio-group>
            <el-form-item label="选择导入文本"  :label-width="120">
                <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="$http.url+'/api/orderbatch/batchOtherPay'"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :on-change="handleFileChange"
                    :on-success='handleSuccess'
                    :auto-upload="false"
                    :disabled="isDisabled"
                    >
                    <el-button  slot="trigger" size="small" style="width:60px;background:#f1f1f1;"><i class="el-icon-upload2"></i> </el-button>
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
    <!--处理结果toast-->
    <el-dialog title="处理结果" :visible.sync="toastFlag" size="tiny" :before-close="handleList">
        <p style="margin:0 40px 20px 40px;"><span>成功处理{{toast.successCnt}}个，失败处理{{toast.failCnt}}个</span><span style="float:right;">{{toast.gmtBegin | formatDate}}</span></p>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleToastUpdown">下载处理结果</el-button>
        <el-button type="primary" @click="handleList">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>

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
            handleLoading:false,
            radio2:1,
            totalCount: 0, //默认数据总数
            // 导入对话框
            fileList: [],
            isDisabled:false, //禁用标记
            element:false, //空文件标记
            toastFlag:false,
            toast:{
                successCnt:'',
                failCnt:'',
                gmtBegin:'',
                fileUrl:''
            }
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
            this.fileList = [];
            this.element = false;
            this.isDisabled = false;
            console.log(this.isDisabled)
            console.log(this.fileList)
            this.dialogImportVisible = true;

        },
        //取消
        handleCanle(){
            this.fileList = [];
            this.dialogImportVisible = false;
        },
         //确定
        handleImportSave(){
            console.log(222)
            console.log(this.$refs.upload)
            console.log(this.fileList)
            if(this.element == false){
                this.$message({
                    message: '请选择导入文本！',
                    type: 'warning'
                });
                return;
            }
            this.dialogImportVisible = false;
            const h = this.$createElement;
            this.$confirm('确认批量标记其他渠道支付？', '确认批量标记其他渠道支付？', {
                message: h('p', null, [
                    h('div', { style: 'color: red;padding-right:20px;' }, '请先与快递公司、用户确认所有批处理订单均真实支付，否则可能产生巨额资金损失！！！')
                ]),
                confirmButtonText: '确定',
                cancelButtonText: '等等，再检查一遍',
                type: 'warning'
            }).then(() => {
                this.$refs.upload.submit();
                this.handleLoading = true;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消批量处理!'
                });
            });
        },
        handlerror(err){
            console.log(err)
        },
        handleSuccess(response, file, fileList){
            console.log(file)
            console.log(fileList)
            console.log(response)
            if(response.meta.code == '0000'){
                console.log('success')
                this.$message({
                    message: '批量处理完成！',
                    type: 'success'
                });
                this.toastFlag = true;

                this.handleToast(response.result.successCnt,response.result.failCnt,response.result.gmtBegin,response.result.fileUrl)
            }else{
                this.$message({
                    type: 'error',
                    message: response.meta.msg
                });
            }
            this.handleLoading = false;
            this.listLoading = false;
        },
        handleRemove(file, fileList) {
            this.isDisabled = false;
            this.element = false;
            console.log(file, fileList);
            console.log(file)
            console.log(fileList)
        },
        handleFileChange(file,fileList){
            console.log(file)
            console.log(file.raw.type)
            console.log(file.type)
            console.log(fileList)
            console.log(5555)
            const isxlsx = file.raw.type=== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'; //xlsx
            if (!isxlsx) {
                this.$message.error('上传文本必须是xlsx格式');
                this.fileList = [];
                return false;
            }
            if(fileList.length == 1){
                 this.isDisabled = true;
                 this.element = true;
            }
            if(fileList.length == 0){
                this.element = false;
            }
        },
        handleToast(successCnt,failCnt,gmtBegin,fileUrl) {
             this.toast.successCnt = successCnt;
             this.toast.failCnt = failCnt;
             this.toast.gmtBegin = gmtBegin;
             this.toast.fileUrl = fileUrl;

        },
        handleList(){
            this.loadData();
            this.toastFlag = false;
        },
        handleDownload(){
            window.location.href="https://expressprod.oss-cn-hangzhou.aliyuncs.com/DemoExcel/template-orderbatch.xlsx"
        },
        //关闭dialog
        handleClose(){
            this.fileList = [];
            this.dialogImportVisible = false;
        },
        //下载详情
        handleUpdown(row){
            console.log(row)
            let downloadLink = row.fileUrl;
            window.location.href = downloadLink;
        },
        handleToastUpdown(){
            window.location.href = this.toast.fileUrl;
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
