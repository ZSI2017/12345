<template>
<div class="section" style="overflow:hidden">
  <el-row :span="24" type="flex" align="middle" style="margin-bottom:10px;">
    <el-col>
      <span>快递公司:</span>
      <el-select filterable label="快递公司" @change='handleSelect("typeOfService")' :loading="expressLoading" v-model="expressName" @visible-change="handleExpressChange" placeholder="请选择">
        <el-option v-for="item in expressOptions" :disabled="item.disabled" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col>
      <span>发货省:</span>
      <el-select filterable label="发货省" :loading="sendProvinceLoading" @visible-change="handleSendProvinceChange" @change='handleSelect("sendCity")' v-model="sendProvince" placeholder="请选择">
        <el-option v-for="item in sendProvinceOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col>
      <span>收货省:</span>
      <el-select filterable :loading="recProvinceLoading" @visible-change="handleRecProvinceChange" @change='handleSelect("recCity")' label="收货省" v-model="recProvince" placeholder="请选择">
        <el-option v-for="item in recProvinceOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
  <el-row :span="24" type="flex" align="middle" style="margin-bottom:10px;">
    <el-col>
      <span>服务类型:</span>
      <el-select filterable label="服务类型" v-model="typeOfService" :loading="typeOfServiceLoading" @visible-change="handleServiceChange" placeholder="请选择">
        <el-option v-for="item in typeOfServiceOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col>
      <span>发货市:</span>
      <el-select filterable label="发货市" v-model="sendCity" :loading="sendCityLoading" @visible-change="handleSendCityChange" placeholder="请选择">
        <el-option v-for="item in sendCityOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col>
      <span>收货市:</span>
      <el-select filterable :loading="recCityLoading" @visible-change="handlerecCityChange" label="收货市" v-model="recCity" placeholder="请选择">
        <el-option v-for="item in recCityOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
  <el-button @click="handleQuery(true)" size="large" type="primary">查询</el-button>
  <el-row :span="24" style="height:1px;width:100%;background-color:rgb(211, 220, 230);margin:10px 0;"></el-row>
  <el-button @click="handleAddLine" type="primary">新增运线</el-button>
  <el-button @click="handleLeadLine" type="primary">导入运线</el-button>
  <el-button @click="handleExportLine" type="primary">导出运线</el-button>
  <el-table
      class="mainTable"
      :data="tableData"
      v-loading.body.lock="halfListLoading"
      style="width: 100%;margin-top:10px"
      max-height="3000"
      empty-text="暂无数据"
      align="center"
      :default-sort="{prop: 'date', order: 'descending'}">
    <el-table-column prop="logMerchantName" label="快递公司">
    </el-table-column>
    <el-table-column prop="productName" label="服务类型">
    </el-table-column>
    <el-table-column prop="frmProvinceName" label="发货省">
    </el-table-column>
    <el-table-column prop="frmCityName" label="发货市">
    </el-table-column>
    <el-table-column prop="toProvinceName" label="收货省">
    </el-table-column>
    <el-table-column prop="toCityName" label="收货市">
    </el-table-column>
    <el-table-column prop="presetWeightPrice" label="首重价格">
      <template scope="scope">
          ¥{{scope.row.presetWeightPrice}}
      </template>
    </el-table-column>
    <el-table-column prop="presetWeight" label="首重重量">
      <template scope="scope">
          {{scope.row.presetWeight}}公斤
      </template>
    </el-table-column>
    <el-table-column prop="extraWeightUnit" label="续重重量">
      <template scope="scope">
          {{scope.row.extraWeightUnit}}公斤
      </template>
    </el-table-column>
    <el-table-column prop="extraWeightPrice" label="续重价格">
      <template scope="scope">
          ¥{{scope.row.extraWeightPrice}}
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template scope="scope">
           <el-button @click="handleEdit(scope.row,'form')" type="text" size="small">修改</el-button>
           <el-button @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
         </template>
    </el-table-column>
  </el-table>
  <div class="block pagination" style="margin-top:30px;float:right;">
    <el-pagination
     @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
     :page-sizes="[5,10,20,50]"
     :page-size="pageSize"
     layout="total,sizes,prev, pager, next,jumper" :total="totalCount">
    </el-pagination>
  </div>

  <el-dialog title="导入运线" :visible.sync="dialogImportVisible" size="tiny" :before-close="handleImportClose">
  <el-form  ref="importForm" :model="importForm" :rules="importRules" >
    <el-form-item label="快递公司" prop ="expressName" :label-width="importLabelWidth">
      <el-select  filterable label="快递公司" :loading="expressLoading" v-model="importForm.expressName" @visible-change="handleExpressChange" placeholder="请选择">
        <el-option v-for="item in expressOptions" :disabled="item.label == '全部'" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="服务类型" prop="typeOfService"  :label-width="importLabelWidth">
      <el-select  filterable label="服务类型" v-model="importForm.typeOfService" :loading="typeOfServiceLoading" @visible-change="handleServiceChange" placeholder="请选择">
        <el-option v-for="item in typeOfServiceOptions" :disabled="item.label == '全部'" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="选择导入文本" prop="fileList" :inline="true"  :label-width="importLabelWidth">
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
        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>

      <!-- <a href="http://sendexmng-sit.alipay-eco.com/api/freightPriceRule/download">下载模板</a> -->
    </el-form-item>

  </el-form>
    <el-button style="margin-left:40px" type="text"  @click="handleDownload">下载模板</el-button>
  <div slot="footer" class="dialog-footer">
    <el-button @click="handleImportCancel">取 消</el-button>
    <el-button type="primary" @click="handleImportSave">确 定</el-button>
  </div>
</el-dialog>

<!-- 导入错误提示  -->
<!-- <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  size="tiny"
  :before-close="handleClose">
  <span>导入文件错误，是否查看错误内容</span>
  <a href="http://sendexmng-sit.alipay-eco.com/api/freightPriceRule/findFile">点击下载错误内容</a>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog> -->


<!-- 新增运线快递费  -->
  <el-dialog :title="dialogTitle"  :visible.sync="dialogFormVisible" custom-class="dialogWidthPrice"   size="small"  :before-close="handleClose">
  <el-form  ref="form" :model="form" :rules="rules" :inline="true">
    <el-form-item label="快递公司" prop ="expressName" :label-width="formLabelWidth">
      <el-select v-if="!handleEditFlag" filterable label="快递公司" :loading="expressLoading" v-model="form.expressName" @visible-change="handleExpressChange"  @change ="handleAddSelect('typeOfService')" placeholder="请选择">
        <el-option v-for="item in expressOptions" :disabled="item.label == '全部'" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <div style="width:200px;" v-if="handleEditFlag">{{form.expressName}}</div>
    </el-form-item>
    <el-form-item label="服务类型" prop="typeOfService"  :label-width="formLabelWidth">
      <el-select  v-if="!handleEditFlag" filterable label="服务类型" v-model="form.typeOfService" :loading="typeOfServiceLoading" @visible-change="handleServiceChange" placeholder="请选择">
        <el-option v-for="item in typeOfServiceOptions" :disabled="item.label == '全部'" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
        <div style="width:200px;" v-if="handleEditFlag">{{form.typeOfService}}</div>
    </el-form-item>

    <el-form-item label="发货省" prop="sendProvince"  :label-width="formLabelWidth">
      <el-select  v-if="!handleEditFlag" filterable label="发货省" :loading="sendProvinceLoading" @visible-change="handleSendProvinceChange"   @change ="handleAddSelect('sendCity')" v-model="form.sendProvince" placeholder="请选择">
        <el-option v-for="item in sendProvinceOptions" :disabled="item.label == '全部'" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
        <div style="width:200px;" v-if="handleEditFlag">{{form.sendProvince}}</div>
    </el-form-item>

    <el-form-item label="发货市" prop="sendCity"  :label-width="formLabelWidth">
      <el-select  v-if="!handleEditFlag" filterable label="发货市" v-model="form.sendCity" :loading="sendCityLoading" @visible-change="handleSendCityChange" placeholder="请选择">
        <el-option v-for="item in sendCityOptions" :disabled="item.label == '全部'" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
        <div v-if="handleEditFlag" style="width:200px;">{{form.sendCity}}</div>
    </el-form-item>

    <el-form-item label="收货省 " prop="recProvince"  :label-width="formLabelWidth">
      <el-select  v-if="!handleEditFlag" filterable :loading="recProvinceLoading" @visible-change="handleRecProvinceChange"   @change ="handleAddSelect('recCity')" label="收货省" v-model="form.recProvince" placeholder="请选择">
        <el-option v-for="item in recProvinceOptions" :disabled="item.label == '全部'" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
        <div style="width:200px;" v-if="handleEditFlag">{{form.recProvince}}</div>
    </el-form-item>

    <el-form-item label="收货市 " prop="recCity" :label-width="formLabelWidth">
      <el-select v-if="!handleEditFlag" filterable :loading="recCityLoading" @visible-change="handlerecCityChange" label="收货市" v-model="form.recCity" placeholder="请选择">
        <el-option v-for="item in recCityOptions" :disabled="item.label == '全部'" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
        <div style="width:200px;" v-if="handleEditFlag">{{form.recCity}}</div>
    </el-form-item>
    <el-form-item label="首重价格" prop="presetWeightPrice" :label-width="formLabelWidth">
      <el-input placeholder="请输入内容" v-model.number="form.presetWeightPrice" type="number">
              <template slot="append">元</template>
      </el-input>
    </el-form-item>
    <el-form-item label="首重重量" prop="presetWeight" :label-width="formLabelWidth">
      <el-input placeholder="请输入内容" v-model.number="form.presetWeight"  type="number">
              <template slot="append">公斤</template>
      </el-input>
    </el-form-item>
    <el-form-item label="续重价格" prop="extraWeightPrice" :label-width="formLabelWidth">
      <el-input placeholder="请输入内容" v-model.number="form.extraWeightPrice"  type="number">
              <template slot="append">元</template>
      </el-input>
    </el-form-item>
    <el-form-item label="续重重量" prop="extraWeightUnit" :label-width="formLabelWidth">
      <el-input placeholder="请输入内容" v-model.number="form.extraWeightUnit"  type="number">
              <template slot="append">公斤</template>
      </el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="handleCancel">取 消</el-button>
    <el-button type="primary" @click="handleAddSave('form')">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>
<script>
export default {
  name: 'nonServerDistrict',
  data() {
    return {
      dialogVisible:false,
      // 所选框 loading
      currentPage: 1,
      totalCount: 1000,
      dialogFormVisible: false,
      dialogTitle:"新增运线快递费",
      formLabelWidth:"100px",
      importLabelWidth:'120px',
      dialogImportVisible:false,  //导入对话框
      id:'',  // 保存当前运线id;
      form: {
        region: ''
      },
      halfListLoading: false,
      tableData: [],
      pageSize: 5,
      handleCurrentChangeFlag:true,
      options: [{
        value: ['选项1', '选项2'],
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
      // 导入对话框
      importForm:{
        expressName:'',
        typeOfService:'',
        fileList: [],
      },
      importRules:{
        expressName: [
          {required: true, message: '公司名不能为空'},
        ],
        typeOfService: [
          {required: true, message: '服务类型不能为空'},
        ],
        fileList: [{
          required: true,
          message: '请上传文件',
          type:'array',
          trigger: 'on-change'
        }],
      },
      // 新增表单验证
      form:{
         expressName:'',
         typeOfService:'',
         sendProvince:'',
         sendCity:'',
         recProvince:'',
         recCity:'',
         presetWeightPrice:'',
         presetWeight:'',
         extraWeightPrice:'',
         extraWeightUnit:''
      },
     rules:{
       expressName: [
         { required: true, message: '公司名不能为空'},
       ],
       typeOfService: [
         { required: true, message: '服务类型不能为空'},
       ],
       sendProvince: [
         { required: true, message: '发货省不能为空'},
       ],
       sendCity: [
         { required: false, message: '发货市不能为空'},
       ],
       recProvince: [
         { required: true, message: '收货省不能为空'},
       ],
       recCity: [
         { required: false, message: '收货市不能为空'},
       ],
       presetWeightPrice: [
         { required: true, message: '首重价格不能为空'},
         { type: 'number', min:0, max:1000,message:'首重价格范围0-1000'},
         { pattern: /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,message:'最多两位小数'}
       ],
       presetWeight: [
         { required: true, message: '首重重量不能为空'},
         { type: 'number', min:0, max:10,message:'首重重量范围0-10'},
         { pattern: /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,message:'最多两位小数'}

       ],
       extraWeightPrice: [
         { required: true, message: '续重价格不能为空'},
         { type: 'number', min:0, max:1000,message:'续重价格范围0-1000'},
         { pattern: /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,message:'最多两位小数'}
       ],
       extraWeightUnit: [
         { required: true, message: '续重重量不能为空'},
          { type: 'number', min:0, max:10,message:'续重重量范围0-10'},
          { pattern: /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,message:'最多两位小数'}
       ],
      },
      // 选择快递公司
      expressName: '全部', // 快递公司名
      expressOptions: [], // 所有的快递公司列表
      expressLoading: false,
      // logisMerchId:'',     // 快递公司id
      //选择服务类型
      typeOfService: '全部', //服务类型
      typeOfServiceOptions: [], // 所有的快递公司列表
      typeOfServiceLoading: false,
      // typeOfServiceId:'',     // 快递公司id

      // 发货省
      sendProvince: '全部',
      sendProvinceOptions: [], // 所有的发货省列表
      sendProvinceLoading: false,
      // sendProvinceCode:'',     // 发货省code

      // 发货市
      sendCity: '全部',
      sendCityOptions: [], // 所有的发货省列表
      sendCityLoading: false,
      // sendCityCode:'',     // 发货省code

      // 收货省
      recProvince: '全部',
      recProvinceOptions: [], // 所有的收货省列表
      recProvinceLoading: false,

      // 收货市
      recCity: '全部',
      recCityOptions: [], // 所有的收货省列表
      recCityLoading: false,
    }
  },
  created() {
    // var _this = this;
    // _this.$http.get("/rest/list6", (data) => {
    //   console.log("success");
    //   console.log(data);
    //   _this.tableData = data.data.data;
    //   _this.totalCount = data.data.data.length;
    // }, (error) => {
    //   console.log("error");
    //   console.log(error);
    // });
  },
  mounted(){
     // 初始化页面
    //  let showNull = true
      this.handleQuery();
  },
  methods: {

  // 导入文件

  // :on-change="handleFileChange"
  // :file-list="importForm.fileList"
  // :on-remove="handleRemove"
  // :on-success='handleSuccess'
  // :on-error='handlerror'
  handleDownload(){
    window.location.href="http://sendexmng-sit.alipay-eco.com/api/freightPriceRule/download"
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
    console.log(this.importForm.expressName)
    this.$refs["importForm"].validate((valid) => {
        if(valid) {
          //
           let data = {
             "logMerchantId":this.importForm.expressName[1].toString(),
             "logMerchantName":this.importForm.expressName[0],
             "productTypeId":this.importForm.typeOfService[1].toString(),
             "productTypeName":this.importForm.typeOfService[0]
           }
          this.$http.post("/api/freightPriceRule/import",data,(result)=>{

                  this.dialogImportVisible = false;
                  this.$message({
                    type: 'success',
                    message: '导入成功'
                  });
                    this.handleQuery(true);
                  // http://192.168.12.54:8080
           },(error)=>{
              this.$refs["importForm"].resetFields();
               if(error.data.meta.code == '0012'){
                //  this.dialogVisible = true;
                 this.$confirm('导入文件失败，是否下载查看失败内容?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                       window.location.href="http://sendexmng-sit.alipay-eco.com/api/freightPriceRule/findFile"
                    }).catch(() => {
                      // this.$message({
                      //   type: 'info',
                      //   message: '已取消删除'
                      // });
                    });
               };
           });
     }else {
          return false;
     }
    })
  },
  // 导入对话框 关闭提示
  handleImportClose(){
     this.dialogImportVisible = false;
  },
  handleExpressChange(visible) {
      if (visible) {
        if (this.expressOptions.length > 0) {
           this.expressLoading = false;
        } else {
          this.$http.post("/api/freightPriceRule/express", {}, (result) => {
            console.log(result);
            for (let i = 0; i < result.length; i++) {
              result[i].value = [result[i].name, result[i].id];
              result[i].label = result[i].name;
            }
            result.unshift({
               value:['全部',''],
               label:'全部',
            })
            this.expressOptions = result.slice(0);
            this.expressLoading = false;
          })
        }
      }
    },

    // 选择服务类型
    handleServiceChange(visible) {
      let logisMerchId = this.expressName[1];

      if(this.dialogFormVisible){
          logisMerchId = this.form.expressName[1];
      } else if (this.dialogImportVisible) {
          logisMerchId = this.importForm.expressName[1];
      }
      if(logisMerchId === "部" || typeof logisMerchId === 'undefined') {this.typeOfServiceOptions = [];  return;}

      if (visible) {
        this.$http.post("/api/freightPriceRule/productType", {
          "logisMerchId": logisMerchId.toString()
        }, (result) => {
          console.log(result);
          for (let i = 0; i < result.length; i++) {
            result[i].value = [result[i].name, result[i].id];
            result[i].label = result[i].name;
          }
          result.unshift({
             value:['全部',''],
             label:'全部',
          })
          this.typeOfServiceOptions = result.slice(0);
          this.typeOfServiceLoading = false;
        })

      }

    },
    handleSendProvinceChange(visible) {
      if (visible) {
        if (this.sendProvinceOptions.length > 0) {
          this.sendProvinceLoading = false
        } else {
          this.$http.post("/api/freightPriceRule/province", {}, (result) => {
            console.log(result);
            for (let i = 0; i < result.length; i++) {
              result[i].value = [result[i].provinceName, result[i].provinceNo];
              result[i].label = result[i].provinceName;
            }
            result.unshift({
               value:['全部',''],
               label:'全部',
            })
            this.sendProvinceOptions = result.slice(0);
            this.sendProvinceLoading = false;
          })
        }
      }
    },
    handleSendCityChange(visible) {
      let provinceName = this.sendProvince[0];
      if(this.dialogFormVisible){
          provinceName = this.form.sendProvince[0];
      }
     if(provinceName === "全" || typeof provinceName === 'undefined')   {  this.sendCityOptions = []; return; }
      if(visible){
        this.$http.post("/api/freightPriceRule/city", {
          "provinceName": provinceName
        }, (result) => {
          console.log(result);
          for (let i = 0; i < result.length; i++) {
            result[i].value = [result[i].cityName, result[i].cityNo];
            result[i].label = result[i].cityName;
          }
          result.unshift({
             value:['全部',''],
             label:'全部',
          })
          this.sendCityOptions = result.slice(0);
          this.sendCityLoading = false;
        })
      }
    },
    handleRecProvinceChange(visible) {
      if (visible) {
        if (this.recProvinceOptions.length > 0) {
          this.recProvinceLoading = false
        } else {
          this.$http.post("/api/freightPriceRule/province", {}, (result) => {
            console.log(result);
            for (let i = 0; i < result.length; i++) {
              result[i].value = [result[i].provinceName, result[i].provinceNo];
              result[i].label = result[i].provinceName;
            }
            result.unshift({
               value:['全部',''],
               label:'全部',
            })
            this.recProvinceOptions = result.slice(0);
            this.recProvinceLoading = false;
          })
        }
      }
    },
    handlerecCityChange(visible){
      let provinceName = this.recProvince[0]
      if(this.dialogFormVisible){
          provinceName = this.form.recProvince[0]
      }
     if(provinceName === "全" || typeof provinceName === 'undefined')  {this.recCityOptions=[];  return;}
      if (visible) {
        this.$http.post("/api/freightPriceRule/city", {
          "provinceName": provinceName
        }, (result) => {
          console.log(result);
          for (let i = 0; i < result.length; i++) {
            result[i].value = [result[i].cityName, result[i].cityNo];
            result[i].label = result[i].cityName;
          }
          result.unshift({
             value:['全部',''],
             label:'全部',
          })
          this.recCityOptions = result.slice(0);
          this.recCityLoading = false;
        })

      }

    },
    handleSelect(type){
      if(type === "sendCity") {
        this.sendCity = "全部";
      }else if( type === "recCity") {
          this.recCity = "全部"
      }else if( type = 'typeOfService') {
           this.typeOfService = '全部'
      }
      // alert(city)
    },
    handleAddSelect(type){
      if(type === "typeOfService") {
          this.form.typeOfService = '';
      }else if(type === 'sendCity') {
          this.form.sendCity = '';
      }else if(type === 'recCity') {
          this.form.recCity = '';
      }
    },
    handleQuery(showNull,pageChange) {
      // alert(showNull)
     if(showNull) {
        this.currentPage = 0;
        this.handleCurrentChangeFlag = false;
      //  this.handleCurrentChange(0,true)
    }
    let data = {
         "pages":{
              "page_size":(this.pageSize).toString(),
              "page_num":showNull?'0':(this.currentPage-1).toString(),
          },
         "con":{
            "logisMerchId":this.expressName[1] ==="部"||(!showNull&&!pageChange)?'':this.expressName[1],
            "productTypeId":this.typeOfService[1] ==="部"||(!showNull&&!pageChange)?'':this.typeOfService[1],
            "fromPrvnCode":this.sendProvince[1] ==="部"||(!showNull&&!pageChange)?'':this.sendProvince[1],
            "fromCityCode":this.sendCity[1]  ==="部"||(!showNull&&!pageChange)?'':this.sendCity[1] ,
            "toPrvnCode":this.recProvince[1] ==="部"||(!showNull&&!pageChange)?'':this.recProvince[1] ,
            "toCityCode":this.recCity[1] ==="部"||(!showNull&&!pageChange)?'':this.recCity[1],
          }
      }
      this.$http.post('/api/freightPriceRule/list',data,(result) =>{
             //  alert(result.page_list.length)
              if(showNull && result.page_list.length === 0) {
                 this.$message('未查询到内容，请重新选择！');
              }
              if(showNull) {  this.handleCurrentChangeFlag = true;}
                this.tableData = result.page_list;
                this.totalCount = parseInt(result.pages.cnt);
      },(error) =>{
        if(showNull) {  this.handleCurrentChangeFlag = true;}
        this.$message.error(error.data.meta.msg);
         console.log(error);
      })
    },
    //  删除
    handleDelete(id){
      this.$confirm('删除操作不可逆，请仔细核对', '确认删除此条运线？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
          this.$http.post("/api/freightPriceRule/del",{id:id},(result)=>{
                  if(result.meta.code === "0000") {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.handleQuery(true);
                  }
          },(error)=>{
              this.$message({
                  type: 'error',
                  message: error.data.meta.msg
              });
          });
          }).catch(() => {
              // this.$message({
              //     type: 'info',
              //     message: '已取消删除'
              // });
          });

    },

    handleAddLine() {
      // const h = this.$createElement;
      // this.$notify({
      //   title: '新增运线',
      //   message: h('i', {
      //     style: 'color: teal'
      //   }, '点击了新增运线')
      // });
      // 添加验证
      this.changeRules(true)
      this.dialogTitle="新增运线快递费",
      this.form={
         expressName:'',
         typeOfService:'',
         sendProvince:'',
         sendCity:'',
         recProvince:'',
         recCity:'',
         presetWeightPrice:'',
         presetWeight:'',
         extraWeightPrice:'',
         extraWeightUnit:''
      },
      this.handleEditFlag = false;
      this.dialogFormVisible = true;
      if(this.$refs['form']) {
        this.$refs['form'].resetFields();
      }
    },
  handleAddSave(formName){
    this.$refs[formName].validate((valid) => {
        if(valid) {
      // 是否为编辑运线快递费
            if(this.handleEditFlag){
              let data = {
                 "id":this.id,
                 "presetWeight":this.form.presetWeight,
                 "presetWeightPrice":this.form.presetWeightPrice,
                 "extraWeightUnit":this.form.extraWeightUnit,
                 "extraWeightPrice":this.form.extraWeightPrice
              }
              this.$http.post('/api/freightPriceRule/update',data,(result)=>{
                if(result.meta.code == "0000") {
                  this.dialogFormVisible = false;
                  this.$message({
                      type: 'success',
                      message: '修改成功'
                  });
                    this.handleQuery(false,true);
                }
              },(error) => {
                  // _this.listLoading = false
                  this.$message({
                      type: 'error',
                      message: error.data.meta.msg
                  });
              })
            }else {
              // 新增

                let data = {
                  "logMerchantId":this.form.expressName[1],
                  "productTypeId":this.form.typeOfService[1] ,
                  "frmProvinceCode":this.form.sendProvince[1],
                  "frmCityCode":this.form.sendCity==''?'':this.form.sendCity[1],
                  "toProvinceCode":this.form.recProvince[1],
                  "toCityCode":this.form.recCity == ''?'':this.form.recCity[1],
                  "presetWeight":this.form.presetWeight,
                  "presetWeightPrice":this.form.presetWeightPrice,
                  "extraWeightUnit":this.form.extraWeightUnit,
                  "extraWeightPrice":this.form.extraWeightPrice
                }
                this.$http.post('/api/freightPriceRule/save',data,(result) => {
                     if(result.meta.code == "0000") {
                       this.$refs['form'].resetFields();
                       this.dialogFormVisible = false;
                       this.$message({
                           type: 'success',
                           message: '保存成功'
                       });
                       this.handleQuery();
                     }
                       console.log(result)
                },(error) => {
                    // _this.listLoading = false
                    this.$message({
                        type: 'error',
                        message: error.data.meta.msg
                    });
                })
            }
           } else {
            return false;
         }
       })
  },
  //修改运线
  handleEdit(scope,formName){
      // 去除验证
      this.changeRules(false)


      this.dialogTitle="编辑运线快递费",
      this.handleEditFlag = true;
      this.dialogFormVisible = true;
      if(this.$refs[formName]){
        this.$refs[formName].resetFields();
      }
      console.log(scope);
      this.id = scope.id;
      this.form.expressName = scope.logMerchantName;
      this.form.typeOfService = scope.productName;
      this.form.sendProvince = scope.frmProvinceName;
      this.form.sendCity = scope.frmCityName;
      this.form.recProvince = scope.toProvinceName;
      this.form.recCity = scope.toCityName;
      this.form.presetWeight = Number(scope.presetWeight);
      this.form.presetWeightPrice = Number(scope.presetWeightPrice);
      this.form.extraWeightPrice = Number(scope.extraWeightPrice);
      this.form.extraWeightUnit = Number(scope.extraWeightUnit);
      //
      //      expressName:'',
      //      typeOfService:'',
      //      sendProvince:'',
      //      sendCity:'',
      //      recProvince:'',
      //      recCity:'',
      //      presetWeightPrice:'',
      //      presetWeight:'',
      //      extraWeightPrice:'',
      //      extraWeightUnit:''
      //   },

  },
  changeRules(flag){
    this.rules.expressName[0].required = flag;
    this.rules.typeOfService[0].required = flag;
    this.rules.sendProvince[0].required = flag;
    this.rules.sendCity[0].required = false;
    this.rules.recProvince[0].required = flag;
    this.rules.recCity[0].required = false;
  },
  // 对话框关闭
  handleClose(){
      this.$refs['form'].resetFields();
      this.dialogFormVisible= false;
  },
  handleCancel(){
    // this.$refs['form'].resetFields();
    // alert()
    this.dialogFormVisible= false;
  },
  handleImportCancel(){
    this.$refs['importForm'].resetFields();
    this.importForm.fileList=  [],
    this.dialogImportVisible= false;
  },
    handleExportLine() {
      const h = this.$createElement;
      const _this = this;
      // this.$notify({
      //   title: '导出运线',
      //   message: h('i', {
      //     style: 'color: teal'
      //   }, '点击了导出运线')
      // });
      this.$confirm('确认批量导出?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'info'
         }).then(() => {
            window.location.href="http://sendexmng-sit.alipay-eco.com/api/freightPriceRule/export"
         }).catch(() => {
           // this.$message({
           //   type: 'info',
           //   message: '已取消删除'
           // });
         });

      // require.ensure([], () => {
      //   const {
      //     export_json_to_excel
      //   } = require('@/util/ExportExcel');
      //   const tHeader = ['快递公司', '服务类型', '发货省', '发货市', '收货省', '收货市', '首重价格', '首重重量', '续重重量', '续重价格'];
      //   const filterVal = ['tableExpress', 'tableTypeOfService', 'tableSendProvince', 'tableSendCity', 'tableRecProvince', 'tableRecCity', 'tablePresetWeightPrice', 'tablePresetWeight', 'tableExtraWeight', 'tableExtraWeightPrice'];
      //   const list = _this.tableData;
      //   const data = _this.formatJson(filterVal, list);
      //   export_json_to_excel(tHeader, data, '运线快递费列表');
      // })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    handleLeadLine() {
      this.dialogImportVisible = true;
      this.importForm={
        expressName:'',
        typeOfService:'',
        fileList: [],
      };
      if(this.$refs["importForm"]) {
          this.$refs["importForm"].resetFields();
        }
      // this.$notify({
      //   title: '导入运线',
      //   message: h('i', {
      //     style: 'color: teal'
      //   }, '点击了导入运线')
      // });

    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.handleQuery(false,true);
    },
    handleCurrentChange(val,noFresh) {
      // alert(noFresh)
      this.currentPage = val;
      // if(noFresh) return
      if(this.handleCurrentChangeFlag) {
         this.handleQuery(false,true);
      }
      // setTimeout(() => {
      //   _this.halfListLoading = false;
      // }, 600);
      // console.log(`当前页: ${val}`);
    },

  },
};
</script>

<style lang="scss">
.dialogWidthPrice{
   width:750px !important
}
.el-tabs .el-tabs__content {
    display: none;
}
.mainTable {
    .cell {
        text-align: center;
    }
}
.el-tabs__item {
    width: 90px;
    height: 30px;
    line-height: 30px;
    text-align: center;
}

.el-table .cell,
.el-table th > .cell {
    padding: 0 7px;
}
.link_button {
    border: 0;
}
.link_button:hover {
    background-color: no;
}
</style>
