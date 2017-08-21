<template>
<div class="section main" style="overflow:hidden" v-loading.body.fullscreen.lock="listLoading">
  <el-tabs v-model="activeName2" type="card" @tab-click="handleTabClick">
    <el-tab-pane v-if ="(Authority == '配置'||Authority == '开发者')" label="配置" name="配置">配置</el-tab-pane>
    <el-tab-pane label="已上线" name="已上线">已上线</el-tab-pane>
    <el-tab-pane  v-if ="(Authority == '审核'||Authority == '开发者')" label="待审核" name="待审核">待审核</el-tab-pane>
  </el-tabs>
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
    align="center"
    :default-sort="{prop: 'date', order: 'descending'}">
    <el-table-column prop="name" label="运营图称">
    </el-table-column>
    <el-table-column prop="imageUrl" label="运营图">
       <template scope="scope">
            <img width="50px" style="cursor:pointer;" :src="scope.row.imageUrl" trigger="click" placement="right" @click="showImg(scope.row.imageUrl)">
            <el-dialog v-model="dialogVisible" size="tiny">
              <img width="100%" :src="bigImageUrl" alt="">
            </el-dialog>
        </template>
    </el-table-column>
    <el-table-column label="链接">
      <template scope="scope">
        <el-popover ref="popover4" width="300" trigger="click">
            <span style="word-break:break-all;">{{scope.row.linkUrl}}</span>
        </el-popover>
        <el-button v-popover:popover4 style="font-size:12px;" size="small">查看链接</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="覆盖地区">
       <template scope="scope">
         <el-button @click="checkArea(scope.row.id)" type="text" size="small">查看</el-button>
       </template>
    </el-table-column>
    <el-table-column prop="gmtCreate" label="创建时间" width="160">
      <template scope="scope">
          {{scope.row.gmtCreate | formatDate}}
      </template>
    </el-table-column>
    <el-table-column prop="gmtModified" label="修改时间" width="160" :sortable="showSortable">
      <template scope="scope">
          {{scope.row.gmtModified | formatDate}}
      </template>
    </el-table-column>
    <el-table-column prop="activeTime" label="有效时段" width="220">
      <template scope="scope">
          <p style="padding:0;margin:0;text-align:center">{{scope.row.gmtBegin | formatDate}}</p>
          <p style="padding:0;margin:0;text-align:center">至</p>
          <p style="padding:0;margin:0;text-align:center">{{scope.row.gmtEnd | formatDate}}</p>
       </template>
    </el-table-column>
    <el-table-column prop="sortWeight" width="70" align="center" label="排序值">
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
  <!-- <el-dialog title="覆盖地区" :visible.sync="dialogTableVisible">
    <el-table :data="gridData" border :show-header="showHeader" max-height="400">
      <el-table-column property="value" label="省" width="200"></el-table-column>
      <el-table-column property="city" label="市">
        <template scope="scope">
       <el-tag
        style="margin-right:10px;margin-bottom:5px;"
         v-for="(item,index) in scope.row.city"
         >{{item}}</el-tag>
     </template>
      </el-table-column>
    </el-table>
  </el-dialog> -->

  <!-- 置为下线 对话框  -->

  <el-dialog title="提示" :visible.sync="loadingTakeOffFlag" size="tiny" custom-class="dialogWidth">
    <i class="el-icon-warning" style="color:#F7BA2A;padding-right:10px;font-size: 36px!important;position: absolute;top: 34%;"></i>
    <p style="font-weight:bold;padding-left:44px;">{{myDialogTitle}}</p>
    <span style="padding-left:44px;">{{myDiglogContent}}</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="loadingTakeOffFlag = false">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </span>
  </el-dialog>

</div>
</template>

<script>
import store from 'src/vuex/store.js'
import localEvent from 'src/vuex/function.js';
import coverArea from "./coverArea.vue";
// import PageStore from "@/page/chooseExpress/table-store.js"
import {
  formatDate
} from 'src/util/date.js';

export default {
  components: {
    coverArea
  },
  data() {
    return {
      pageId: '', // 当前页的id
      url: '', // 当前页面的url
      // 排序是否显示
      showSortable: 'custom',
      totalCount: 0, //默认数据总数
      myDialogTitle: "确认置为下线？",
      myDiglogContent: "确认后，该内容将提交审核，通过后变为'已下线'",
      //配置中--状态、、待审核中--待审核状态
      auditState: "审核状态",
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
      promotionID: '', // id
      promotionURL: '', // url
      promotionMessage: '', // message
      promotionType: '', // message
      dialogVisible:false,
      bigImageUrl:'',
      tabFlag:'' //标记tab切换
    }
  },
  computed: {
      Authority() {
        // this.activeName2 = this.$store.getters.getAuthority== "审核"?"已上线":'配置';
      //  return "开发者"
        return this.$store.getters.getAuthority;
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
    // alert(this.Authority)

    //  alert(this.$store.state.loadingFlag)
    // 在页面初始化时，获取pageName,标签页，单选框 的记录值

    this.pageId = "SD1010"; // 寄快递首页
    ((this.$route.path == "/promotion/chooseExpress" &&
        (this.pageId = "BM1010")) ||
      (this.$route.path == "/promotion/expressOrder" &&
        (this.pageId = "SS1010")))


    // if(this.Authority){}
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
   '$store.getters.getAuthority':function(){
      // alert("5555555555555555555")
   },
    '$route': function(to, from) {
    //  alert("$router")
      ((this.$route.path == "/promotion/sendExpress" &&
          (this.pageId = "SD1010")) ||
        (this.$route.path == "/promotion/chooseExpress" &&
          (this.pageId = "BM1010")) ||
        (this.$route.path == "/promotion/expressOrder" &&
          (this.pageId = "SS1010")))
      // this.pageId = "SD1010"; // 寄快递首页
      this.activeName2 = this.initActiveName;
      this.handleTabClick({label:this.activeName2},null,undefined,true);
      // alert(this.auditStatusFlage)
      // 默认状态是 运营位管理的 寄快递首页

      // if(this.activeName2 == "配置") {
      //   this.url = "/api/promotion/audit/list"; // 默认展开 配置
      // } else {
      //   this.url = "/api/promotion/onlineList"
      // }
      // this.currentPage = 1;
      // this.radio2 = 1;
      // this.auditStatusFlage = true;
      // this.showConfig = true;
      // this.showflag = true;
      this.PageStore.commit("setPage",1);
      this.PageStore.commit("setRadio",1);
      this.PageStore.commit("setTabName",this.initActiveName);

      //
      // var _this = this;
      // _this.$http.post(this.url, {
      //   "pages": {
      //     "page_size": this.pageSize,
      //     "page_num": _this.currentPage - 1
      //   },
      //   "con": {
      //     "pageId": this.pageId,
      //     "status":this.radio2
      //   }
      // }, (rsp) => {
      //   _this.tableData = rsp.page_list
      //   _this.totalCount =  parseInt(rsp.pages.cnt);
      //   //  console.log("success");
      //   //  console.log(data);
      // })
    }
  },
  methods: {
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
            "page_size": this.pageSize,
            "page_num": _this.currentPage - 1
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
      this.$http.post(this.promotionURL, {
          "id": this.promotionID.toString(),
      }, (rsp) => {
        console.log(rsp);
          this.listLoading = false;
        this.$message({
          message: this.promotionMessage,
          type: this.promotionType
        });
        this.handleTabClick({label:this.activeName2})

        // this.pageId = "SD1010"; // 寄快递首页
        // ((this.$route.path == "/chooseExpress" &&
        //     (this.pageId = "BM1010")) ||
        //   (this.$route.path == "/expressOrder" &&
        //     (this.pageId = "SS1010")))
        // var _this = this;
        // _this.$http.post(_this.url,{
        //   "pages": {
        //     "page_size": this.pageSize,
        //     "page_num": this.currentPage - 1
        //   },
        //   "con": {
        //     "pageId": this.pageId,
        //     "status":this.radio2
        //   }
        // }, (result) => {
        //
        //   _this.tableData = result.page_list;
        //   _this.totalCount = parseInt(result.pages.cnt);
        // });

        // console.log(this.$route.matched);
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
        this.promotionMessage = '已置为下线待审核';
      }else{
        this.myDialogTitle = "确认置为上线？";
        this.myDiglogContent = "确认后，该内容将提交审核，通过后变为'已上线'";
        this.promotionMessage = '已置为上线待审核';
      }
      this.promotionID = row.promotionId || row.id;
      this.promotionURL = '/api/promotion/status/update';
      this.promotionType = 'success';
      this.url = "/api/promotion/audit/list"; // 刷新列表 url
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
      this.promotionID = row.id;
      this.promotionURL = '/api/promotion/audit/approve';
      this.promotionMessage = '已通过申请';
      this.promotionType = 'success';
      this.url = "/api/promotion/audit/list"; //  刷新列表 url
    },
    OperationApprovedFail(row) {
      this.loadingTakeOffFlag = true;
      this.myDialogTitle = "申请驳回？";
      this.myDiglogContent = "确认后，该内容将申请驳回";
      this.promotionID = row.id;
      this.promotionURL = '/api/promotion/audit/reject';
      this.promotionMessage = '申请已驳回！';
      this.promotionType = 'success';
      this.url = "/api/promotion/audit/list"; // 默认展开 配置
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
      this.tabFlag =  tab.label;
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
        if(this.radio2 == 3){
            this.showOperation = false;
            this.showOperation3 = false;
        }
        // _this.radio2 = 1;
        _this.auditState = "审核状态";
        _this.auditStatusFlage = true;
        _this.url = "/api/promotion/audit/list"
        _this.$http.post(_this.url, {
          "pages": {
            "page_size": this.pageSize,
            "page_num": _this.currentPage - 1
          },
          "con": {
            "pageId": _this.pageId,
            "status":this.radio2
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
        // _this.radio2 = '';
        _this.auditState = "状态";
        _this.auditStatusFlage = false;
        _this.url = "/api/promotion/onlineList";
        _this.$http.post(_this.url, {
          "pages": {
            "page_size": _this.pageSize,
            "page_num": _this.currentPage - 1
          },
          "con": {
            "pageId": _this.pageId,
            "status":""
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
        // _this.radio2 = '';
        _this.auditState = "待审核状态";
        _this.auditStatusFlage = true;
        _this.url = "/api/promotion/audit/list";
        _this.$http.post(_this.url, {
          "pages": {
            "page_size": _this.pageSize,
            "page_num": _this.currentPage - 1
          },
          "con": {
            "pageId": _this.pageId
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
      let URL= "/api/promotion/audit/areaConf/all";
      if(this.activeName2 === "已上线") {
          URL =  "/api/promotion/areaConf/all";
      }
      this.$http.post(URL,{id:id.toString()},(rsp) => {
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
      var _this = this;
      console.log(this.pageId);
      // alert("asdfadsf");
      // alert();
      localEvent.set("pageId",_this.pageId);
      this.$router.push({
        path: _this.$route.path + '/addData'
      });
    },
    handleClose() {
      // alert("asdfsd");
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
          "status": status
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
          "status": status
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
    handleEdit(row) {
      row.tabName = this.activeName2;
      var _this = this;
      row.pageId = _this.pageId
      localEvent.set("localChooseExpress", row);
      this.$router.push({
        path: _this.$route.path + '/editData'
      });
    },
    effectiveDetails(row) {
      var _this = this;
      row.pageId = _this.pageId
      localEvent.set("localChooseExpress", row);

      this.$router.push({
        path: _this.$route.path + '/detail'
      });

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
      _this.url = "/api/promotion/audit/list"
        _this.$http.post(_this.url, {
          "pages": {
            "page_size": this.pageSize,
            "page_num": _this.currentPage - 1
          },
          "con": {
            "pageId": this.pageId,
            "status":this.radio2
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
.dialogWidth{
   width:22% !important
}
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
