<template>
<div class="section main" style="overflow:hidden" v-loading.body.fullscreen.lock="listLoading">

<el-row :span="24" style="position: relative;">
   <el-col :span="24">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleTabClick">
      <el-tab-pane v-if ="(Authority == '配置'||Authority == '开发者')" label="配置" name="配置">配置</el-tab-pane>
      <el-tab-pane label="已上线" name="已上线">已上线</el-tab-pane>
      <el-tab-pane  v-if ="(Authority == '审核'||Authority == '开发者')" label="待审核" name="待审核">待审核</el-tab-pane>
    </el-tabs>
  </el-col>
  <el-col :span="8" style="position: absolute;top:-13px;right:0;">
     <el-form style="width:80%;float:right;">
       <el-form-item label-position="right" label-width="160px" label="快递公司">
         <el-select filterable label="快递公司" :loading="expressLoading" v-model="expressName"  @change="handleExpressSelect" @visible-change="handExpressChange" placeholder="请选择">
           <el-option v-for="item in expressOptions" :key="item.value" :label="item.label" :value="item.value">
           </el-option>
         </el-select>
       </el-form-item>
     </el-form>
  </el-col>
</el-row>
  <!--  单选框   -->
  <el-row :span="24" type="flex" align="middle" v-if="showConfig" style="padding-left:5px;">
    <el-col :span="22">
          <el-radio-group v-model="radio2" @change="handleRadio">
            <el-radio :label="1">审核通过</el-radio>
            <el-radio :label="2">驳回</el-radio>
            <el-radio :label="3">待审核</el-radio>
            <el-radio :label="4">草稿</el-radio>
          </el-radio-group>
    </el-col>
    <el-col :span="2">
      <el-button type="primary" @click="setNewData" style="float:right;"><i class="el-icon-plus"></i> 添加</el-button>
    </el-col>
  </el-row>

  <!--<div class="block pagination" style="margin: 5px 0 5px 0;float:right;">
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10,20,50]"
        :page-size="pageSize"
        layout="total,sizes,prev, pager, next,jumper"
        :total="totalCount">
    </el-pagination>
  </div>-->

  <!-- 表格  -->
  <el-table v-if="tableFalg"
    class="mainTable"
    @sort-change="handleSortChange"
    :data="tableData"
    ref="tableDom"
    style="width: 100%;margin-top:10px;"
    max-height="3000"
    empty-text="暂无数据"
    align="center">
    <el-table-column prop="logisMerchantName" label="快递公司"  min-width="100">
    </el-table-column>
    <el-table-column prop="productName" min-width="100" label="服务类型">
    </el-table-column>
    <el-table-column prop="productTypeCode" label="类型码">
    </el-table-column>
    <el-table-column prop="description" label="描述">
    </el-table-column>
    <el-table-column prop="sortWeight" label="排序值">
    </el-table-column>
    <el-table-column prop="discount" label="结算折扣">
    </el-table-column>
    <el-table-column prop="status" width="110" label="状态" :sortable="showSortable">>
       <template scope="scope">
            {{ scope.row.status==0? "草稿":(scope.row.status==1?"已下线":(scope.row.status==2?"已上线":(scope.row.status==3?"待下线":"待上线")))}}
        </template>
    </el-table-column>
    <el-table-column prop="auditStatus" width="110" v-if="showflag" :label="auditState">
      <template scope="scope">
            <div v-if="!auditStatusFlage">
              {{ scope.row.opStatus==1? "已下线":(scope.row.opStatus==2?"已上线":(scope.row.opStatus==3?"待下线":"待上线"))}}
            </div>
            <div v-else>
              {{scope.row.auditStatus==7? "已驳回":(scope.row.auditStatus==1?"已通过":(scope.row.auditStatus==2?"上线待审核":(scope.row.auditStatus==3?"下线待审核":"草稿")))}}
            </div>
      </template>
    </el-table-column>
    <el-table-column v-if="showOperation||showOperation2||showOperation3||showOperation4" label="操作" width="130">
      <template scope="scope">
        <div>
          <div v-if="showOperation">
            <el-button  @click="OperationTakeOff(scope.row)" type="text" size="small">
              {{scope.row.status==2? "置为下线":"置为上线"}}
            </el-button>
            <br/>
          </div>
          <div v-if="showOperation3">
            <el-button  @click="handleEdit(scope.row)" type="text" size="small">修改</el-button>
            <br/>
          </div>
          <div v-if="showOperation2">
           <el-button @click="OperationApproved(scope.row)" type="text" size="small">通过申请</el-button>
           <br/>
          </div>
          <div v-if="showOperation2">
            <el-button @click="OperationApprovedFail(scope.row)" type="text" size="small">申请驳回</el-button>
            <br/>
          </div>
          <div v-if="showOperation2 && scope.row.status != '0'">
           <el-button @click="effectiveDetails(scope.row)" type="text" size="small">已生效详情</el-button>
           <br/>
          </div>
          <!--<div v-if="showOperation2 || showOperation3">
            <el-button @click="effectiveDetails(scope.row)" type="text" size="small">待审详情</el-button>
            <br/>
          </div>-->
        </div>

        </template>
    </el-table-column>
  </el-table>

  <div class="block pagination" style="margin-top:5px;float:right;">
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10,20,50]"
        :page-size="pageSize"
         layout="total,sizes,prev, pager, next,jumper"
        :total="totalCount">
    </el-pagination>
  </div>
  <!--  覆盖地区 查看对话框 -->
  <cover-area :visible="dialogTableVisible" :coverGridData="gridData" @listenToCoverArea="changeVisible"></cover-area>

  <!-- 置为下线 对话框  -->

  <el-dialog title="提示" :visible.sync="loadingTakeOffFlag" size="tiny"  custom-class="dialogWidth">
    <i class="el-icon-warning" style="color:#F7BA2A;padding-right:10px;font-size: 36px!important;position: absolute;top: 34%;"></i>
    <p style="font-weight:bold;padding-left:44px;">{{myDialogTitle}}</p>
    <span style="padding-left:44px;">{{myDiglogContent}}</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="loadingTakeOffFlag = false">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </span>
  </el-dialog>

  <!--新增内容-->
  <el-dialog :title="dialogFlag" :visible.sync="dialogFormVisible" size="tiny"  :before-close="handleClose">
    <el-form class='newAddedForm' :rules="rules" ref="formAdd" label-position="right" label-width="160px" :model="formAdd">
      <el-form-item label="快递公司" prop="logisMerchantName">
        <el-select  v-if="this.dialogFlag != '详情'" v-model="formAdd.logisMerchantName" @visible-change="handExpressChange" placeholder="请选择快递公司" style="width:100%;">
          <el-option
            v-for="item in expressOptions"
            :disabled="item.label == '全部'"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      <div v-if="this.dialogFlag == '详情'">{{formAdd.logisMerchantName}}</div>
      </el-form-item>
      <el-form-item label="服务类型名称" prop="productName">
        <el-input  v-if="this.dialogFlag != '详情'"  v-model="formAdd.productName" placeholder="请输入服务类型"></el-input>
        <div v-if="this.dialogFlag == '详情'">{{formAdd.productName}}</div>
      </el-form-item>
      <el-form-item label="类型码（接口识别）" prop="productTypeCode">
        <el-input v-if="this.dialogFlag != '详情'"  v-model="formAdd.productTypeCode"  placeholder="请输入类型码"></el-input>
          <div v-if="this.dialogFlag == '详情'">{{formAdd.productTypeCode}}</div>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-if="this.dialogFlag != '详情'"  v-model="formAdd.description" placeholder="请输入描述"></el-input>
        <div v-if="this.dialogFlag == '详情'">{{formAdd.description}}</div>
      </el-form-item>
      <el-form-item label="排序值"
        prop="sortWeight"
        >
        <el-input v-if="this.dialogFlag != '详情'"  v-model.number="formAdd.sortWeight" type="number" auto-complete="off" placeholder="请输入1-999，排序值越大越优先">
        </el-input>
        <div v-if="this.dialogFlag == '详情'">{{formAdd.sortWeight}}</div>
      </el-form-item>
      <el-form-item label="结算折扣" prop="discountNum">
        <el-row v-if="this.dialogFlag != '详情'" >
          <el-col :span="6" style="width: 187px; height: 42.5px;line-height:42.5px;">
            <el-radio class="radio" v-model="formAdd.discount" label="有折扣">有折扣</el-radio>
            <el-radio class="radio" v-model="formAdd.discount" label="无折扣">无折扣</el-radio>
          </el-col>
          <el-col :span="6" style="width: 100px;">
            <el-input
              placeholder="0"
              :number="true"
              size="large"
              v-model.number="formAdd.discountNum"
              :disabled=" formAdd.discount == '无折扣' "
            ><template slot="append">折</template></el-input>
          </el-col>
        </el-row>
        <div v-if="this.dialogFlag == '详情'">{{formAdd.discountNum == "100"?"无折扣":formAdd.discountNum/100+"折"}}</div>
      </el-form-item>
      <el-form-item label="当前状态"  prop="status">
        <el-radio-group v-if="this.dialogFlag != '详情'" v-model="formAdd.status">
          <el-radio v-model="formAdd.status" label="2">上架</el-radio>
          <el-radio v-model="formAdd.status" label="1">下架</el-radio>
        </el-radio-group>
          <div v-if="this.dialogFlag == '详情'">{{formAdd.status == 1?'下架':'上架'}}</div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleAddConfirm">确 定</el-button>
      <el-button  v-if="this.dialogFlag != '详情'" @click="handleCancle">取 消</el-button>
    </div>
  </el-dialog>
  <!--待审核详情弹框-->



</div>
</template>

<script>
import store from 'src/vuex/store.js'
import localEvent from 'src/vuex/function.js';
import coverArea from "@/page/chooseExpress/coverArea.vue";
import {
  formatDate
} from 'src/util/date.js';

export default {
  components: {
    coverArea
  },
  data() {
    return {
      expressLoading:false,   // 选择 下拉框
      expressName:'全部',    // 选择后快递公司名
      expressOptions:[],  // 下拉快递公司列表数据
      pageId: '', // 当前页的id
      url: '', // 当前页面的url
      searchStr:'',   // 筛选的快递公司
      id:'',  // 被选中列表的id
      logisMerchId:'',  // 当前物流机构id

      dialogFormVisible:false,  // 对话框
      // 排序是否显示
      showSortable: 'custom',
      totalCount: 0, //默认数据总数
      myDialogTitle: "确认置为下线？",
      myDiglogContent: "确认后，该内容将提交审核，通过后变为'已下线'",
      //配置中--状态、、待审核中--待审核状态
      auditState: "审核状态",

      dialogFlag:'新增' ,  // 对话框的当前状态
      // 置为下线对话框
      showOperation: true,
      showOperation2: false,
      showOperation3: true,
      showOperation4: true,
      loadingTakeOffFlag: false,
      tableFalg: true,
      showConfig: true,
      showflag:true,
      gridData: [],
      radio2: 1,
      activeName2: '配置',
      initActiveName:'',
      showHeader: false,
      dialogTableVisible: false,
      //审核状态分类显示
      auditStatusFlage:true,
      value: '',
      //遮罩层loading
      listLoading: false,
      halfListLoading: false,
      orderColumn : "",//需要排序的字段，默认修改时间
      orderStatus : "",//需要排序的状态，默认降序
      pageSize: 5,
      currentPage: 1,
      tableData: [],
      //dialog 确认框 变量
      producttypeID: '', // id
      producttypeURL: '', // url
      producttypeMessage: '', // message
      producttypeType: '', // message
      dialogVisible:false,
      bigImageUrl:'',

      // 快递公司名
      companyName:'',
      searchContent:'',
      searchCompanyName: [],
        formAdd:{
          logisMerchantName:[],  // 快递公司名
          productName:'',
          productTypeCode:'',
          description:'',
          sortWeight: '',
          discount:'无折扣',
          discountNum:"0",
          status:'1'
        },
        form: {
          productName:'',
          productTypeCode:'',
          description:'',
          sortWeight: '',
          discount:'',
          discountNum:"",
          status:''
        },
        rules: {
          productName: [
            { required: true, message: '请输入服务类型', trigger: 'blur'},
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
          ],
          description:[
              {min:1, max:20,message:'描述最大长度20'}
          ],
          sortWeight:[
             { required: true, message: '排序值不能为空'},
             { type: 'integer', message: '排序值必须为整数'},
            // { type: 'number', message: '排序值必须为数字值'}
             { type: 'number', min:1, max:999,message:'排序值范围1-999'}
          ],
          discountNum:[
             { type: 'number', min:0, max:9.9,message:'请输入正确的折扣值'},
             { pattern: /^(([0-9][0-9]*)|(([0]\.\d{1}|[1-9][0-9]*\.\d{1})))$/,message:'最多1位小数'}
          ],
          status: [{
            required: true,
            message: '请选择状态',
            trigger: 'change'
          }],
        }
    }
  },
  computed: {
      Authority() {
        // this.activeName2 = this.$store.getters.getAuthority== "审核"?"已上线":'配置';
        return this.$store.getters.getAuthority;
        // return "开发者"
      }
      // table2:function(){
      //     return this.tableData[0]
      // }
  },
  activated(){

  },
  deactivated(){

  },
  created() {
    var _this = this;
    // var interval = setInterval(function(){
    //      console.log(_this.Authority);
    // },100);
    setTimeout(function(){
      _this.initActiveName = _this.Authority == "审核"?"已上线":'配置'
      // alert(this.PageStore.tabName);
      _this.activeName2 = _this.PageStore.tabName ||   _this.initActiveName;

      _this.currentPage = _this.PageStore.pageCount;
      _this.radio2= Number(_this.PageStore.radio);
      console.log("$router: %o",_this.$route);
      _this.handleTabClick({label:_this.activeName2},null,_this.currentPage)
    },600)


  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
    }
  },
  watch: {
  },
  methods: {
    //下拉搜索框
    handExpressChange(visible) {
      if (visible) {
        if (this.expressOptions.length > 0) {
          this.expressLoading = false
        } else {
          this.$http.post("/api/logisMerchant/all", {"logis_merch_id":''}, (result) => {
            console.log(result);
            for (let i = 0; i < result.length; i++) {
              result[i].value = [result[i].merchantName, result[i].id];
              result[i].label = result[i].merchantName;
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
    // 选中了快递公司后
    handleExpressSelect(){
      this.searchStr = this.expressName[1];
     this.handleTabClick({label:this.activeName2},null,1)
      // console.log(this.expressName);
    },
    //添加内容取消事件
    handleCancle(){
      this.dialogFormVisible = false;
      this.$refs['formAdd'].resetFields();
      this.valueAdd = '';
      this.formAdd.discount = "";
      this.formAdd.status = "";
    },
    handleClose(){
       this.$refs['formAdd'].resetFields();
         this.dialogFormVisible = false;
    },
    //添加按钮确定事件
    handleAddConfirm(){
      if(this.dialogFlag == "详情"){ this.dialogFormVisible = false; return;}
      this.$refs['formAdd'].validate((valid) => {
          if(valid) {
            //this.formAdd.logisMerchantName,
            let logisMerchId =this.formAdd.logisMerchantName[1];
            let id = '';
            let url = "/api/producttype/audit/save";
            if(this.dialogFlag == "修改") {
                id =  this.id;
                logisMerchId = this.logisMerchId;;
                url = "/api/producttype/audit/update";
                 //  'logisMerchId':logisMerchId,
            };
              let data = {
                "id":id,
                "logisMerchId":logisMerchId,
                'productName':this.formAdd.productName,
                'productTypeCode':this.formAdd.productTypeCode,
                'description':this.formAdd.description,
                'sortWeight':this.formAdd.sortWeight,
                "discount":this.formAdd.discount == "无折扣"?100:this.formAdd.discountNum*10,
                "opStatus":this.formAdd.status,
              };
              this.$http.post(url,{data},(result) =>{
                   console.log(result);
                   this.dialogFormVisible = false;
                   this.$refs['formAdd'].resetFields();
                   this.handleTabClick({label:this.activeName2},null,this.currentPage)
              })

          }else {
              return false;
          }

    })
},

    // 搜索框
    enterSelect(){

    },
    querySearch(queryString, cb) {
      if(queryString === '') {
        this.companyName = '';
      }
      var searchCompanyName = this.searchCompanyName;
      var results = queryString ? searchCompanyName.filter(this.createFilter(queryString)) : searchCompanyName;
      cb(results);
    },
    createFilter(queryString) {
      return (companyName) => {
        return (companyName.value.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleQuerySelect(items) {
         this.showProvinces = items.value

          this.$http.post('',data,(result) => {

          })
    },
    handleIconClick(ev) {
      this.showProvinces = ''
      this.searchContent = '';
    },
    //点击图片显示大图
    showImg(row){
      this.dialogVisible = true;
      this.bigImageUrl = row || '11';
    },
    // 监听 子组件覆盖对话框 的回调函数
    changeVisible(flag) {
      this.dialogTableVisible = flag;
    },
    // 操作排序值改变
    handleSortChange(column) {
        console.log(column.prop)
        console.log(column.order)
        // 创建时间进行排序
        var _this = this;
        _this.$http.post(this.url, {
          "pages": {
            "page_size": this.pageSize.toString(),
            "page_num": (_this.currentPage - 1).toString()
          },
          "con": {
            "pageId": this.pageId,
            "sortBy":column.prop,
            "sortType":column.order == 'ascending'?'asc':'desc',
            "status":this.radio2
          }
        }, (rsp) => {
          _this.tableData = rsp.page_list
          _this.totalCount = parseInt(rsp.pages.cnt);
        })
    },
    //dialog 确认按钮
    handleConfirm(){
      this.loadingTakeOffFlag = false;
      this.listLoading = true;
      this.$http.post(this.producttypeURL, {
          "id": this.producttypeID.toString(),
      }, (rsp) => {
        this.listLoading = false;
        console.log(rsp);
        this.$message({
          message: this.producttypeMessage,
          type: this.producttypeType
        });

        this.handleTabClick({label:this.activeName2})
      },(error) => {
           this.$message.error(error.data.meta.code+"--"+error.data.meta.msg);
           this.listLoading = false;
           console.log(error);

      })

    },
    // 操作栏对应的事件响应
    OperationTakeOff(row) {
      this.loadingTakeOffFlag = true;
      if(row.status == '2'){
        this.myDialogTitle = "确认置为下线？";
        this.myDiglogContent = "确认后，该内容将提交审核，通过后变为'已下线'";
        this.producttypeMessage = '已置为下线待审核';
      }else{
        this.myDialogTitle = "确认置为上线？";
        this.myDiglogContent = "确认后，该内容将提交审核，通过后变为'已上线'";
        this.producttypeMessage = '已置为上线待审核';
      }
      this.producttypeID = row.producttypeId || row.id;
      this.producttypeURL = '/api/producttype/status/update';
      this.producttypeType = 'success';
      this.url = "/api/producttype/audit/list"; // 刷新列表 url
    },
    Operationchange() {
      this.loadingTakeOffFlag = true;
      this.myDialogTitle = "修改？";
      this.myDiglogContent = "确认后，该内容将修改";
    },
    OperationApproved(row) {
      this.loadingTakeOffFlag = true;
      this.myDialogTitle = "通过申请？";
      this.myDiglogContent = "确认后，该内容将通过申请";
      this.producttypeID = row.id;
      this.producttypeURL = '/api/producttype/audit/approve';
      this.producttypeMessage = '已通过申请';
      this.producttypeType = 'success';
      this.url = "/api/producttype/audit/list"; //  刷新列表 url
    },
    OperationApprovedFail(row) {
      this.loadingTakeOffFlag = true;
      this.myDialogTitle = "申请驳回？";
      this.myDiglogContent = "确认后，该内容将申请驳回";
      this.producttypeID = row.id;
      this.producttypeURL = '/api/producttype/audit/reject';
      this.producttypeMessage = '申请已驳回！';
      this.producttypeType = 'success';
      this.url = "/api/producttype/audit/list"; // 默认展开 配置
    },
    OperationEffectDetail() {
      this.loadingTakeOffFlag = true;
      this.myDialogTitle = "已生效详情？";
      this.myDiglogContent = "确认后，该内容将已生效";
    },
    OperationwaitDetail() {
      this.loadingTakeOffFlag = true;
      this.myDialogTitle = "确认置为下线？";
      this.myDiglogContent = "确认后，该内容将待审详情";
    },
    // 标签页导航
    handleTabClick(tab, event,countPage,loadingFlag) {
      var _this = this;
      if(loadingFlag === undefined){
        _this.listLoading = true;
      }
      _this.tableFalg = false
      _this.showConfig = false;
      _this.showflag = false;
      if(countPage !== undefined) {
        _this.currentPage = countPage;
      } else {
        _this.currentPage = 1;    //跳转标签页 页码归 1
      };
      console.log(tab.label);
      this.PageStore.commit("setTabName",tab.label);   // 记录当前标签页
      var tableDataCopy = _this.tableData;
      if (tab.label == "配置") {
        // 配置排序
        _this.showSortable = "custom";
        _this.tableData = [];
        _this.showConfig = true;
        _this.showflag = true;
        _this.showOperation = true;
        _this.showOperation2 = false;
        _this.showOperation3 = true;
        // _this.radio2 = 1;
        _this.auditState = "审核状态";
        _this.auditStatusFlage = true;
        _this.url = "/api/producttype/audit/list"
        _this.$http.post(_this.url, {
          "pages": {
            "page_size": this.pageSize.toString(),
            "page_num": (_this.currentPage - 1).toString()
          },
          "con": {
            "pageId": _this.pageId,
            "status":this.radio2,
            "searchStr":this.searchStr

          }
        }, (rsp) => {
          _this.tableData = rsp.page_list;
          _this.totalCount =  parseInt(rsp.pages.cnt);
          //  console.log("success");
          //  console.log(data);
        })
      } else if (tab.label == "已上线") {
        // 配置排序
        _this.showSortable = false;
        _this.tableData = [];
        // window.location.reload();
        _this.showConfig = false;
        _this.showflag = false;
        _this.showOperation = true;
        _this.showOperation2 = false;
        _this.showOperation3 = false;
        // _this.radio2 = 1;
        _this.auditState = "状态";
        _this.auditStatusFlage = false;
        _this.url = "/api/producttype/onlineList";
        _this.$http.post(_this.url, {
          "pages": {
            "page_size": (_this.pageSize).toString(),
            "page_num": (_this.currentPage - 1).toString()
          },
          "con": {
            "pageId": _this.pageId,
            "status":'',
            "searchStr":this.searchStr
          }
        }, (rsp) => {
          _this.tableData = rsp.page_list
            _this.totalCount =  parseInt(rsp.pages.cnt);
          //  console.log("success");
          //  console.log(data);
        })
      } else {
        // 配置排序
        _this.showSortable = false;
        _this.showOperation = false;
        _this.tableData = [];
        // window.location.reload();
        _this.showConfig = false;
        _this.showflag = true;
        _this.showOperation2 = true;
        _this.showOperation3 = false;
        // _this.radio2 = 1;
        _this.auditState = "待审核状态";
        _this.auditStatusFlage = true;
        _this.url = "/api/producttype/audit/list"
        _this.$http.post(_this.url, {
          "pages": {
            "page_size": _this.pageSize.toString(),
            "page_num": (_this.currentPage - 1).toString()
          },
          "con": {
            "pageId": _this.pageId,
            "status":'',
            "searchStr":this.searchStr
          }
        }, (rsp) => {
          _this.tableData = rsp.page_list;
          _this.totalCount =  parseInt(rsp.pages.cnt);
          //  console.log("success");
          //  console.log(data);
        })
      }
      setTimeout(() => {
        _this.listLoading = false;
        _this.tableFalg = true;
      }, 300);

    },
    // 查看覆盖地区
    checkArea(id) {
      // var _this = this;
      this.listLoading = true;
      let URL= "/api/producttype/audit/areaConf/all";
      if(this.activeName2 === "已上线") {
          URL =  "/api/producttype/areaConf/all";
      }
      this.$http.post(URL,{id},(rsp) => {
        console.log(rsp.provinces);
        this.gridData = this.filterProvinces(rsp.provinces);
        // console.log(_this.gridData);
        this.listLoading = false;
        this.dialogTableVisible = true
      })
    },
    filterProvinces(list){
      console.log("list %o",list);
      var tempArr = list.slice(0);
       for(let i =0;i<tempArr.length;i++) {
            if(!tempArr[i].check){
                tempArr[i].citys = tempArr[i].citys.filter(function(val){return val.check})
            }
            if(tempArr[i].citys.length === 0) {
                 tempArr.splice(i,1)
                 i--
            }
       }
       return tempArr;
    },
    setNewData(){
        this.dialogFlag = "新增";
        this.dialogFormVisible = true
        if(this.$refs['formAdd']) {
           this.$refs['formAdd'].resetFields();
        }

    },
    handleChange(value) {
      console.log(value);
    },
    getAddPage(e) {
      //  let router = new VueRouter();
      console.log(e);
      this.$router.push({
        path: "table3",
        query: {
          plan: 'private'
        }
      });
      this.addFlag = true;
    },
    //切换页条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.PageStore.commit("setPage",1);
      let status = this.radio2;
      if(this.activeName2 == "待审核") {
          status = "";
      }
      this.$http.post(this.url, {
        "pages": {
          "page_size": this.pageSize,
          "page_num": this.currentPage - 1
        },
        "con": {
          "pageId": this.pageId,
          "status": status,
          'searchStr':this.searchStr
        }
      }, (rsp) => {
        this.tableData = rsp.page_list;
        this.totalCount =  parseInt(rsp.pages.cnt);
        //  console.log("success");
        //  console.log(data);
      })
    },
    //切换分页
    handleCurrentChange(val) {
      this.halfListLoading = true;
      this.currentPage = val;
      this.PageStore.commit("setPage",val);
      let status = this.radio2;
      if(this.activeName2 == "待审核") {
          status = "";
      }
      this.$http.post(this.url, {
        "pages": {
          "page_size": this.pageSize,
          "page_num": this.currentPage - 1
        },
        "con": {
          "pageId": this.pageId,
          "status": status,
          'searchStr':this.searchStr
        }
      }, (rsp) => {
        this.halfListLoading = false;
        this.tableData = rsp.page_list;
        this.totalCount =  parseInt(rsp.pages.cnt);
      },(error)=>{
        console.log(error)
        _this.listLoading = false;
      })
      var _this = this;
      this.halfListLoading = true;
      this.$message(`当前页${val}`);
      console.log(`当前页: ${val}`);
    },
    handleClick() {
      this.$notify({
        title: '点击了查看',
        message: '即将跳转到查看界面',
        duration: 6000
      })
    },
    handleEdit(scope) {
      if( this.$refs['formAdd']){
        this.$refs['formAdd'].resetFields();
      }
      this.dialogFlag = "修改";
      this.formAdd={
        logisMerchantName:scope.logisMerchantName,  // 快递公司名 scope.logisMerchantName
        company:'',
        productName:scope.productName,
        productTypeCode:scope.productTypeCode,
        description:scope.description,
        sortWeight:scope.sortWeight,
        discount:scope.discount == "100"?'无折扣':'有折扣',
        discountNum:scope.discount == "100"?'0':scope.discount/10 ,
      };
      // alert(scope.opStatus)
      if (scope.opStatus == "1") {
         this.formAdd.status = "1";
        //  this.currentStateText = "已下线"
      } else {
         this.formAdd.status = "2";
        // this.currentStateText = "已上线"
      }
      this.id = scope.id;
      this.logisMerchId = scope.logisMerchId;
      this.dialogFormVisible = true;
      // row.tabName = this.activeName2;
      // var _this = this;
      // row.pageId = _this.pageId
      // localEvent.set("localChooseExpress", row);
      // this.$router.push({
      //   path: _this.$route.path + '/editData'
      // });
    },


    effectiveDetails(scope) {
      this.dialogFlag = '详情';
      // this.form.promotionId = localData.promotionId;
      // this.id = localData.id;
      //  let URL,Id;
      // var httpId = '';
      // if(this.activeName2 == '配置'){  //配置 修改
      //     URL = "/api/producttype/audit/get";
      //     Id = this.id;
      //     console.log("配置 修改")
      // }else{  // 待审核 已生效详情

      //     Id = this.form.promotionId;``
      //     console.log("待审核 已生效详情")
      // }
      //


      let  URL = "/api/producttype/get";
      this.$http.post(URL,{
        "id":scope.id.toString()
      },(result)=>{
        // console.log(result);
        this.formAdd={
          logisMerchantName:result.logisMerchantName||scope.logisMerchantName,  // 快递公司名 scope.logisMerchantName
          productName:result.productName,
          productTypeCode:result.productTypeCode,
          description:result.description,
          sortWeight:result.sortWeight,
          discount:'无折扣',
          discountNum:result.discount,
          status:result.status.toString()
        }
      })

      this.$http.post('/api/logisMerchant/get',{
          'id':scope.logisMerchId.toString()
      },(result) => {
         this.formAdd.logisMerchantName =  result.merchantName;
      })
      // alert(scope.opStatus.toString())
      // alert(scope.status.toString());

      //   console.log(rsp.imageUrl)
      //   this.form.name = rsp.name;
      //   this.form.Forder = rsp.sortWeight;
      //   this.form.link = rsp.linkUrl.replace('https://','').replace('http://','');
      //   this.form.fileList2[0].url = rsp.imageUrl;
      //   this.form.gmtBegin = rsp.gmtBegin;
      //   this.form.gmtEnd = rsp.gmtEnd;
      //   this.form.date1 = [new Date(this.form.gmtBegin), new Date(this.form.gmtEnd)];
      //   if (rsp.opStatus == "1") {
      //     this.form.radio = 1;
      //     this.currentStateText = "已下线"
      //   } else {
      //     this.form.radio = 2;
      //     this.currentStateText = "已上线"
      //   }
      //
      //  this.dialogConfig(true)
      //
      // },(error)=>{
      //   console.log(error)
      //   console.log('failed');
      // });
     this.dialogFormVisible = true;
    },
    handleRadio(){
      var _this = this;
      this.PageStore.commit('setRadio',this.radio2);
      if(this.radio2 == 3){
          this.showOperation = false;
          this.showOperation3 = false;
      }else{
          this.showOperation = true;
          this.showOperation3 = true;
      }
      // if(this.radio2 == 1){
      //     this.auditStatusFlage = false;
      // }else{
          this.auditStatusFlage = true;
      // }
      _this.currentPage = 1;
          this.PageStore.commit("setPage",1);
      _this.url = "/api/producttype/audit/list"
        _this.$http.post(_this.url, {
          "pages": {
            "page_size": this.pageSize,
            "page_num": _this.currentPage - 1
          },
          "con": {
            "pageId": this.pageId,
            "status":this.radio2,
            'searchStr':this.searchStr
          }
        }, (rsp) => {
          _this.tableData = rsp.page_list;
          _this.totalCount = parseInt(rsp.pages.cnt);
          //  console.log("success");
          //  console.log(data);
        })
    }
  }
}
</script>
<style lang="scss">
.el-tabs .el-tabs__content {
    display: none;
}

.main {
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

    /*.el-table__body .el-table__row .cell {
        max-height: 150px !important;
        overflow-y: auto;
      }*/

    .link_button {
        border: 0;
    }
    .link_button:hover {
        background-color: no;
    }
}

/*.el-table__body .el-table__row .el-table_1_column_14 .cell {
       max-height: 150px !important;
       overflow-y:auto;
   }*/
</style>
