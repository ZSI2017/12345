<template>
   <section class="section sendExpress">
    <!-- <div class="sendExpress">
      <el-steps :space="200" :active="step" class="step">
        <el-step title="活动信息" description=""></el-step>
        <el-step title="报名签到" description=""></el-step>
        <el-step title="分享设置" description=""></el-step>
        <el-step title="个性设置" description=""></el-step>
      </el-steps>

      <transition name="fade">
        <router-view class="view"></router-view>
      </transition>

        <div class="but-group">
          <el-button @click.native.prevent="handlePreview" v-show="preview">预览</el-button>
          <el-button @click.native.prevent="handlePreStep" v-show="preStep">上一步</el-button>
          <el-button @click.native.prevent="handleNextStep" v-show="nextStep" type="primary">下一步</el-button>
          <el-button @click.native.prevent="handlePublish" v-show="publish" type="primary">发布活动</el-button>
        </div>
    </div> -->
    <!--  标签页导航  -->
    <el-row :span="24" style="position: relative;">
       <el-col :span="24">
          <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
              <el-tab-pane label="配置" name="first">配置</el-tab-pane>
              <el-tab-pane label="已上线" name="second">已上线</el-tab-pane>
              <el-tab-pane label="待审核" name="third">待审核</el-tab-pane>
          </el-tabs>
       </el-col>
       <el-col :span="10" style="position: absolute;top:0;right:0;">
          <el-form>
            <el-form-item label-position="right" label-width="160px" label="快递公司">
              <el-select v-model="value" placeholder="请选择快递公司" style="width:100%;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
       </el-col>
    </el-row>
    <!--  单选框   -->
    <el-row :span="24" type="flex" align="middle" v-if="showConfig">
        <el-col :span="8">
              <el-radio-group v-model="radio2">
                  <el-radio :label="3">审核通过</el-radio>
                  <el-radio :label="6">驳回</el-radio>
                  <el-radio :label="9">待审核</el-radio>
                  <el-radio :label="12">草稿</el-radio>
              </el-radio-group>
        </el-col>
        <el-col :span="14" style="height:40px">

        </el-col>
       <el-col :span="2">
          <el-button type="primary" @click="dialogFormVisible = true" size="large">+新增</el-button>
       </el-col>
    </el-row>
    <!--  下面的表格   -->
    <el-table :data="tableData" v-loading.fullscreen.lock="listLoading" style="width: 98%;margin-top:10px;" max-height="450" empty-text="_" align="center" :default-sort="{prop: 'date', order: 'descending'}">
      <el-table-column prop="name" label="快递公司" sortable min-width="100">
        <!--<template scope="scope">
              <img width="50px" src="https://expressprod.oss-cn-hangzhou.aliyuncs.com/OperativeLogo/f2c570f3-7f84-44ca-afa9-e19a71ba10c5.png">
          </template>-->
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
      <el-table-column label="操作" min-width="140">
        <template scope="scope">
             <el-button @click="handleCheckDetails(scope.$index, scope.row)" type="text" size="small">待审查详情</el-button>
             <el-button @click="handleEffectDetails(scope.$index, scope.row)" type="text" size="small">已生效详情</el-button>
           </template>
      </el-table-column>
    </el-table>
    <div class="block pagination" style="margin-top:30px;float:right;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[5,10,15,20]" :page-size="pageSize" layout="total,sizes,prev, pager, next,jumper" :total="20">
      </el-pagination>
    </div>

    <!--新增内容-->
    <el-dialog title="新增" :visible.sync="dialogFormVisible">
      <el-form class='newAddedForm' :rules="rules" ref="formLabelAlign" label-position="right" label-width="160px" :model="formLabelAlign">
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
          <el-input v-model="formLabelAlign.serverType" placeholder="请输入服务类型"></el-input>
        </el-form-item>
        <el-form-item label="类型码（接口识别）" prop="typeCode">
          <el-input v-model="formLabelAlign.typeCode" placeholder="请输入类型码"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="describe">
          <el-input v-model="formLabelAlign.describe" placeholder="请输入描述"></el-input>
        </el-form-item>
        <el-form-item label="排序值"
          prop="sorting"
          >
          <el-input v-model.number="formLabelAlign.sorting" auto-complete="off" placeholder="请输入1-999，排序值越大越优先">
          </el-input>
        </el-form-item>
        <el-form-item label="结算折扣">
          <el-row>
            <el-col :span="6" style="width: 187px; height: 42.5px;line-height:42.5px;">
              <el-radio class="radio" v-model="formLabelAlign.discount" label="有折扣">有折扣</el-radio>
              <el-radio class="radio" v-model="formLabelAlign.discount" label="无折扣">无折扣</el-radio>
            </el-col>
            <el-col :span="6">
              <el-input placeholder="0" :number="true" size="large" v-model="formLabelAlign.discountNum" :disabled=" formLabelAlign.discount == '无折扣' "><template slot="append">折</template></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="当前状态">
          <el-radio-group v-model="formLabelAlign.status">
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
          <div class="mark"></div>
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
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible_details = false">关 闭</el-button>
        </div>
    </el-dialog>


  </section>
</template>

  <script type="text/javascript">
  export default {
      data() {
        return {
          tableData:[],
          showConfig: true,
          listLoading:false,
          dialogDetails:"",
          radio2:3,
          radio3:"",
          activeName2: 'first',
          dialogFormVisible: false,
          dialogFormVisible_details:false,
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
        handleClick(tab, event) {

          var _this = this;
          _this.listLoading = true;
          _this.tableFalg = false
          _this.showConfig = false;
          console.log(tab.label);
          var tableDataCopy = _this.tableData;
          if (tab.label == "配置") {

            _this.tableData = [];
            // window.location.reload();
            _this.showConfig = true;
            _this.showOperation = true;
            _this.showOperation2 = false;
            _this.tableData = tableDataCopy;
          } else if(tab.label == "已上线") {
            _this.showOperation = false;
            _this.tableData = [];
            // window.location.reload();
            _this.showConfig = false;
            _this.tableData = tableDataCopy;
          } else {
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
        handleCheckDetails(index,row){
          // var _this = this;
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
        handleEffectDetails(index,row){
          // var _this = this;
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

 /*.sendExpress .router-link{color:#fff;}
 .sendExpress .but-group .el-button{margin-right: 20px;}*/
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


</style>
