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
    <el-row :span="24" type="flex" align="middle" v-if="">
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
    <el-table :data="tableData" v-loading.fullscreen.lock="listLoading" style="width: 100%" max-height="450" empty-text="_" align="center" :default-sort="{prop: 'date', order: 'descending'}">
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
             <el-button @click="handleDetails(scope.$index, scope.row)" type="text" size="small">待审查详情</el-button>
             <el-button @click="handleEdit" type="text" size="small">已生效详情</el-button>
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

    <el-dialog title="待审核详情" :visible.sync="dialogFormVisible_details">
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
          <el-button type="primary" @click="dialogFormVisible_details = false">确 定</el-button>        
          <el-button @click="dialogFormVisible_details = false">取 消</el-button>
        </div>
    </el-dialog>


  </section>
</template>

  <script type="text/javascript">
  export default {
      data() {
        return {
          tableData:[],
          listLoading:false,
          radio2:3,
          radio3:1,
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
          console.log(tab, event);
        },
        handleDetails(){
          this.dialogFormVisible_details = true;

        }
      },
      created() {
        var _this = this;
        _this.$http.get("/rest/list2")
          .then(function(rsp) {
            _this.tableData = rsp.data.data
          })
          .catch(function(error) {
            console.log(error);
          })

        console.log(this.$route.matched);
      },
  }
    // import store from 'src/store.js'
    // import $ from 'jquery'
    //
    // export default {
    // name:'sendExpress',
    // data: function () {
    //   return {
    //     isRouter: false,
    //     preview: true,
    //     preStep: false,
    //     nextStep: true,
    //     publish: false,
    //     step: 1
    //   }
    // },
    // methods: {
    //   handlePreview: function () {
    //     console.log('预览');
    //   },
    //   handlePreStep: function () {
    //         this.$router.go(-1);
    //         this.step--;
    //         this.goStep(this.step);
    //       $('html,body').animate({scrollTop:0},500);
    //   },
    //   handleNextStep: function () {
    //       this.$router.push('/sendExpress/step'+(this.step+1));
    //       var _this = this;
    //       setTimeout(function () {
    //           if(_this.isRouter){
    //               _this.step++;
    //               _this.goStep(_this.step);
    //           }
    //       })
    //     $('html,body').animate({scrollTop:0},500);
    //
    //   },
    //   handlePublish: function () {
    //     console.log('发布');
    //   },
    //   goStep: function (n) {
    //     switch (n) {
    //       case 1 :
    //         this.preview = true;this.preStep = false;this.nextStep = true;this.publish = false;
    //         break;
    //       case 2 :
    //         this.preview = false;this.preStep = true;this.nextStep = true;this.publish = false;
    //         break;
    //       case 3 :
    //         this.preview = false;this.preStep = true;this.nextStep = true;this.publish = false;
    //         break;
    //       case 4 :
    //         this.preview = false;this.preStep = true;this.nextStep = false;this.publish = true;
    //         break;
    //     }
    //   }
    // },
    // watch:{
    //     '$route': function (to,from) {
    //         this.isRouter = true;
    //     }
    // }
  // }

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

</style>
