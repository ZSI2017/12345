<template>
   <section class="section sendExpress main">
    <!--  标签页导航  -->
    <el-row :span="24" style="position: relative;">
       <el-col :span="24">
          <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
              <el-tab-pane label="配置" name="first">配置</el-tab-pane>
              <el-tab-pane label="已上线" name="second">已上线</el-tab-pane>
              <el-tab-pane label="待审核" name="third">待审核</el-tab-pane>              
          </el-tabs>
       </el-col>
       <el-col :span="16" style="position: absolute;top:-13px;right:0;"> 
          <el-form style="width:80%;float:right;">
            <el-form-item label-position="right" label-width="160px" label="快递公司">
              <el-select v-model="value" placeholder="请选择快递公司" style="width:100%;" @change="handleCommand">
                <el-option
                  v-for="(item,index) in options"
                  :key="item.value"
                  :label="item.label"
                  :value="index"
                  >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>     
       </el-col>
    </el-row>
    <!--  单选框   -->
    <el-row :span="24" type="flex" align="middle" v-if="showConfig" style="padding-left:5px;">
      <el-col :span="22">
        <el-radio-group v-model="radio2">
          <el-radio :label="3">审核通过</el-radio>
          <el-radio :label="6">驳回</el-radio>
          <el-radio :label="9">待审核</el-radio>
          <el-radio :label="12">草稿</el-radio>
        </el-radio-group>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="dialogFormVisible = true" style="float:right;"><i class="el-icon-plus"></i> 添加</el-button>
      </el-col>
    </el-row>
    <!--  下面的表格   -->
    <el-table 
      :data="tableData" 
      v-loading.fullscreen.lock="listLoading" 
      style="width: 100%;margin-top:10px;" 
      max-height="450" 
      empty-text="_" 
      class="mainTable"
      :default-sort="{prop: 'date', order: 'descending'}">
      <el-table-column prop="name" label="快递公司" sortable min-width="100">
      </el-table-column>
      <el-table-column prop="name" min-width="100" label="服务类型">
      </el-table-column>
      <el-table-column prop="name" label="类型码">
      </el-table-column>
      <el-table-column prop="name" label="描述">
      </el-table-column>
      <el-table-column prop="Forder" label="排序值">
      </el-table-column>
      <el-table-column prop="Forder" label="结算折扣">
      </el-table-column>
      <el-table-column prop="currentState" label="当前状态">

      </el-table-column>
      <el-table-column prop="reviewState" label="审核状态">
      </el-table-column>
      <el-table-column label="操作" min-width="140" v-if="showOperation||showOperation2">
        <!--<template scope="scope">
          <el-button @click="handleCheckDetails(scope.$index, scope.row)" type="text" size="small">待审查详情</el-button>
          <el-button @click="handleEffectDetails(scope.$index, scope.row)" type="text" size="small">已生效详情</el-button>
        </template>-->

        <template scope="scope">
          <div>
            <div v-if="showOperation">
              <el-button  @click="OperationTakeOff" type="text" size="small">置为下架</el-button>
              <br/>
            </div>
            <div v-if="showOperation">
              <el-button  @click="handleEdit(scope.row)" type="text" size="small">修改</el-button>
              <br/>
            </div>
            <div v-if="showOperation2">
            <el-button @click="OperationApproved" type="text" size="small">通过申请</el-button>
            <br/>
            </div>
            <div v-if="showOperation2">
              <el-button @click="OperationApprovedFail" type="text" size="small">申请驳回</el-button>
              <br/>
            </div>
            <div v-if="showOperation2">
            <el-button @click="handleEffectDetails(scope.row)" type="text" size="small">已生效详情</el-button>
            <br/>
            </div>
            <div v-if="showOperation2">
              <el-button @click="handleCheckDetails(scope.row)" type="text" size="small">待审查详情</el-button>
              <br/>
            </div>
          </div>
          </template>   
      </el-table-column>
    </el-table>
    <div class="block pagination" style="margin-top:30px;float:right;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[5,10,15,20]" :page-size="pageSize" layout="total,sizes,prev, pager, next,jumper" :total="20">
      </el-pagination>
    </div>

      <!-- 置为下架 对话框  -->
    <el-dialog title="提示" :visible.sync="loadingTakeOffFlag" size="tiny">
      <i class="el-icon-warning" style="color:#F7BA2A;padding-right:10px;font-size: 36px!important;position: absolute;top: 34%;"></i>
      <p style="font-weight:bold;padding-left:44px;">{{myDialogTitle}}</p>
      <span style="padding-left:44px;">{{myDiglogContent}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="loadingTakeOffFlag = false">取 消</el-button>
        <el-button type="primary" @click="loadingTakeOffFlag = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--新增内容-->
    <el-dialog title="新增" :visible.sync="dialogFormVisible">
      <el-form class='newAddedForm' :rules="rules" ref="formLabelAdding" label-position="right" label-width="160px" :model="formLabelAdding">
        <el-form-item label="快递公司" required>
          <el-select v-model="value" placeholder="请选择快递公司" style="width:100%;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务类型名称" prop="serverType">
          <el-input v-model="formLabelAdding.serverType" placeholder="请输入服务类型"></el-input>
        </el-form-item>
        <el-form-item label="类型码（接口识别）" prop="typeCode">
          <el-input v-model="formLabelAdding.typeCode" placeholder="请输入类型码"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="describe">
          <el-input v-model="formLabelAdding.describe" placeholder="请输入描述"></el-input>
        </el-form-item>
        <el-form-item label="排序值" 
          prop="sorting"
          >
          <el-input v-model.number="formLabelAdding.sorting" auto-complete="off" placeholder="请输入1-999，排序值越大越优先">
          </el-input>
        </el-form-item>
        <el-form-item label="结算折扣">
          <el-row>
            <el-col :span="6" style="width: 187px; height: 42.5px;line-height:42.5px;">
              <el-radio class="radio" v-model="formLabelAdding.discount" label="有折扣">有折扣</el-radio>
              <el-radio class="radio" v-model="formLabelAdding.discount" label="无折扣">无折扣</el-radio>
            </el-col>
            <el-col :span="6">
              <el-input placeholder="0" :number="true" size="large" v-model="formLabelAdding.discountNum" :disabled=" formLabelAdding.discount == '无折扣' "><template slot="append">折</template></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="当前状态">
          <el-radio-group v-model="formLabelAdding.status">
            <el-radio label="上架"></el-radio>
            <el-radio label="下架"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>        
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!--待审核详情弹框-->
    <el-dialog :title="dialogDetails" :visible.sync="dialogFormVisible_details">
        
        <el-form class='newAddedForm' label-position="right" label-width="160px" :model="formLabelAlign" style="position: relative;">
          <div class="mark" v-if="showMarkVisible"></div>
          <el-form-item label="快递公司">
              <el-input :value="formLabelAlign.company"></el-input>
          </el-form-item>
          <el-form-item label="服务类型名称">
            <el-input :value="formLabelAlign.serverType"></el-input>
          </el-form-item>
          <el-form-item label="类型码（接口识别）">
            <el-input :value="formLabelAlign.typeCode"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input :value="formLabelAlign.describe"></el-input>
          </el-form-item>
          <el-form-item label="排序值">
            <el-input :value="formLabelAlign.sorting"></el-input>
          </el-form-item>
          <!--<el-form-item label="结算折扣">
            <el-row>
              <el-col :span="6" style="width: 187px; height: 42.5px;line-height:42.5px;">
                <el-radio class="radio" v-model="formLabelAlign.discount" label="有折扣">有折扣</el-radio>
                <el-radio class="radio" v-model="formLabelAlign.discount" label="无折扣">无折扣</el-radio>
              </el-col>
              <el-col :span="6">
                <el-input placeholder="0" :number="true" size="large" v-model="formLabelAlign.discountNum" :disabled=" formLabelAlign.discount == '无折扣' "><template slot="append">折</template></el-input>
              </el-col>
            </el-row>
          </el-form-item>-->
          <el-form-item label="当前状态">
              <el-radio-group v-model="radio3">
                <el-radio :label="1">上架</el-radio>
                <el-radio :label="2">下架</el-radio>
              </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" v-if="showMarkVisible">
          <el-button type="primary" @click="dialogFormVisible_details = false">关 闭</el-button>  
        </div>
        <div slot="footer" class="dialog-footer" v-if="!showMarkVisible">
          <el-button type="primary" @click="dialogFormVisible_details = false">保 存</el-button>  
          <el-button @click="dialogFormVisible_details = false">取 消</el-button>            
        </div>
    </el-dialog>


  </section>
</template>

  <script type="text/javascript">
  export default {
      data() {
        return {
          //置为下架 通过申请 申请驳回
          loadingTakeOffFlag:false,
          tableData:[],
          showConfig: true,
          listLoading:false,
          dialogDetails:"",
          radio2:3,
          radio3:"",
          activeName2: 'first',
          dialogFormVisible: false,
          dialogFormVisible_details:false,
          showMarkVisible:true,
          //操作栏显示
          showOperation: true,
          showOperation2: false,
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }],
          value: '',
          label:'',
          formLabelAdding:{
            company:'',
            serverType:'',
            typeCode:'',
            describe:'',
            sorting: '',
            discount:'',
            discountNum:"",
            status:''
          },
          formLabelAlign: {
            company:'',
            serverType:'',
            typeCode:'',
            describe:'',
            sorting: '',
            discount:'',
            discountNum:"",
            status:''
          },
          rules: {
            serverType: [
              { required: true, message: '请输入服务类型', trigger: 'blur'},
              { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
            ],
            typeCode:[
              { required: true, message: '请输入接口类型码'}
            ],
            sorting:[
                { required: true, message: '排序值不能为空'},
                { type: 'number', message: '排序值必须为数字值'}
            ]
          }  
        };
      },
      methods: {
               //快递公司下拉选择
        handleCommand(index) {
          console.log(index)
          this.$message('click on item ' + this.options[index].label);

        },
        // 操作栏对应的事件响应
        OperationTakeOff() {
            this.loadingTakeOffFlag = true;
            this.myDialogTitle="确认置为下架？";
            this.myDiglogContent="确认后，该内容将提交审核，通过后变为'已下架'";
        },
        Operationchange() {
          this.loadingTakeOffFlag = true;
          this.myDialogTitle="修改？";
          this.myDiglogContent="确认后，该内容将修改";
        },
        OperationApproved() {
                this.loadingTakeOffFlag = true;
                this.myDialogTitle="通过申请？";
                this.myDiglogContent="确认后，该内容将通过申请";
        },
        OperationApprovedFail() {
              this.loadingTakeOffFlag = true;
              this.myDialogTitle="申请驳回？";
              this.myDiglogContent="确认后，该内容将申请驳回";
        },
        OperationEffectDetail() {
              this.loadingTakeOffFlag = true;
              this.myDialogTitle="已生效详情？";
              this.myDiglogContent="确认后，该内容将已生效";
        },
        OperationwaitDetail() {
              this.loadingTakeOffFlag = true;
              this.myDialogTitle="确认置为下架？";
              this.myDiglogContent="确认后，该内容将待审详情";
        },
                // 标签页导航
        handleClick(tab, event) {

          var _this = this;
          _this.listLoading = true;
          _this.tableFalg = false
          _this.showConfig = false;
          console.log(tab.label);
          var tableDataCopy = _this.tableData;
          if (tab.label == "配置") {
            // 配置排序
            _this.showSortable = true;
            _this.tableData = [];
            // window.location.reload();
            _this.showConfig = true;
            _this.showOperation = true;
            _this.showOperation2 = false;
            _this.tableData = tableDataCopy;
          } else if (tab.label == "已上线") {
            // 配置排序
            _this.showSortable = false;
            _this.tableData = [];
            // window.location.reload();
            _this.showConfig = false;
            _this.showOperation = true;
            _this.showOperation2 = false;
            _this.tableData = tableDataCopy;
          } else {
            // 配置排序
            _this.showSortable = false;
            _this.showOperation = false;
            _this.tableData = [];
            // window.location.reload();
            _this.showConfig = false;
            _this.showOperation2 = true;
            _this.tableData = tableDataCopy;
          }
          setTimeout(() => {
            _this.listLoading = false;
            _this.tableFalg = true;
          }, 300);

        },
        handleEdit(row){
          // var _this = this;
          this.showMarkVisible = false;
          this.dialogDetails = "待审核详情";
          this.dialogFormVisible_details = true;
          this.formLabelAlign.company = row.name;
          this.formLabelAlign.serverType = row.name;
          this.formLabelAlign.typeCode = row.name;
          this.formLabelAlign.describe = row.name;          
          this.formLabelAlign.sorting = row.Forder;
          if(row.currentState = "已上架"){
                this.radio3 = 1;
            }else{
              this.radio3 = 2;
            }
        },
        handleCheckDetails(row){
          // var _this = this;
          this.showMarkVisible = true;
          this.dialogDetails = "待审核详情";
          this.dialogFormVisible_details = true;
          this.formLabelAlign.company = row.name;
          this.formLabelAlign.serverType = row.name;
          this.formLabelAlign.typeCode = row.name;
          this.formLabelAlign.describe = row.name;          
          this.formLabelAlign.sorting = row.Forder;
          if(row.currentState = "已上架"){
                this.radio3 = 1;
            }else{
              this.radio3 = 2;
            }
        },
        handleEffectDetails(row){
          // var _this = this;
          this.showMarkVisible = true;          
          this.dialogDetails = "已生效详情";
          this.dialogFormVisible_details = true;
          this.formLabelAlign.company = row.name;
          this.formLabelAlign.serverType = row.name;
          this.formLabelAlign.typeCode = row.name;
          this.formLabelAlign.describe = row.name;          
          this.formLabelAlign.sorting = row.Forder;
          if(row.currentState = "已上架"){
                this.radio3 = 1;
            }else{
              this.radio3 = 2;
            }
        },
      },  
      created() {
        var _this = this;
        _this.$http.get("/rest/list2",(rsp)=> {
            _this.tableData = rsp.data.data
          },(error)=>{
            console.log(error);
          })

        console.log(this.$route.matched);
      },
  }
   

</script>
<style lang="scss">

 .sendExpress {
     .el-tabs .el-tabs__content {
         display:none;
     }
 }
 .el-radio {
   margin-right: 10px;
 }
 .newAddedForm{
   padding: 0 60px 0 20px;
 }
 .el-dialog__header .el-dialog__title{
   font-size: 20px;
   padding-left: 20px;
 }
 .dialog-footer{
  display: flex;
  justify-content: center;
  align-items: center;
 }
 .mark{
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height:100%;
   opacity: 0.2;
   background: #f1f1f1;
   z-index: 999;
 }

.el-tabs .el-tabs__content {
  display: none;
}
.main {
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
}



</style>
