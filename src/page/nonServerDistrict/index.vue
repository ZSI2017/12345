<style lang="scss">

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
.el-table th>.cell {
    padding: 0 7px;
}

.link_button {
    border: 0;
}

.link_button:hover {
    background-color: no;
}

</style>

<template>

<div class="section" v-loading.body.fullscreen.lock="fullscreenLoading" style="overflow:hidden">
     <!-- <child :level="3">
            hello child
     </child>
       <mysolt>
              <template  scope="scope">
                 <div> 44444444444444433 </div>
                 <div>{{scope.msg.aaa}}</div>
              </template>
       </mysolt> -->
<el-row :span="24" style="background-color:white;margin-bottom:10px;">
  <el-col  style="width:170px;height:40px;line-height:40px;">
      <span style="float:left;">按照快递公司名搜索:</span>
  </el-col>
   <el-col :span="5" style="height:40px">
    <el-autocomplete class="inline-input" v-model="searchContent" style="float:left;" :fetch-suggestions="querySearch" placeholder="请输入快递公司名" icon="close" :on-icon-click="handleIconClick"  @keyup.enter.native="enterSelect" @select="handleQuerySelect"></el-autocomplete>
  </el-col>
</el-row>

    <my-table
       :data ="tableData"
    >
      <table-column
           headerName="快递公司名称"
           myProps = "logisMerchName"
           >
      </table-column>
      <table-column
           headerName="非服务地区"
           >
           <template scope="scope">
               <el-button @click="handleClick(scope)" type="text" size="small">查看</el-button>
           </template>
      </table-column>
      <table-column
           headerName="修改时间"
           myProps = "gmtModified"
           >
      </table-column>
      <table-column
           headerName="操作"
           >
           <template scope="scope">
                <el-button @click="handleEdit(scope)" type="text" size="small">编辑</el-button>
           </template>
      </table-column>
    </my-table>
    <!-- <el-table class="mainTable" :data="tableData" style="width: 100%;margin-top:10px" max-height="500" empty-text="暂无数据" align="center" :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column prop="name" label="快递公司名称">
        </el-table-column>
        <el-table-column label="非服务地区" >
            <template scope="scope">
                <el-button @click="handleClick" type="text" size="small">查看</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="createTime" label="修改时间" />
        <el-table-column label="操作">
            <template scope="scope">
                <el-button @click="handleEdit" type="text" size="small">编辑</el-button>
            </template>
        </el-table-column>
    </el-table> -->

    <!-- <check-server
      :visible="dialogCheckVisible"
      :gridData="gridData"
      @listenToCheck ="changeCheckVisible"
    ></check-server> -->

    <config-server
      :visible="dialogConfigVisible"
      :sourceData="result"
      :logisMerchId = 'logisMerchId'
      :onlyRead='isCheckServer'
      @listenToConfig="changeConfigVisible"
      @listenToConfigFresh = 'initList'
      > </config-server>
</div>

</template>
<script>
  import configServer from "@/page/nonServerDistrict/configServer";
  import checkbox from "@/page/nonServerDistrict/checkbox";
  import checkboxGroup from "@/page/nonServerDistrict/checkboxGroup"
  import myTable from "@/page/nonServerDistrict/myTable";
  import tableColumn from "@/page/nonServerDistrict/tableColumn";
  // import mysolt from "@/page/nonServerDistrict/mysolt";
  // import  child from "@/page/nonServerDistrict/render2.vue"
export default {
    name: 'nonServerDistrict',
    components: {
        configServer,
        checkbox,
        checkboxGroup,
        myTable,
        tableColumn,
    },
    data() {
        return {
            searchContent:'',  // 搜索内容
            checkboxArr: ["A1", "B1", "C1"],
            checkedNames1: [],
            myCheckedNames: ["A1", "B1"],
            checkedNames: [],
            myChecked: true,
            myMessage: true,
            tableData: [],
            result: {},
            logisMerchId:'',
            input: '',
            dialogCheckVisible: false,
            dialogConfigVisible: false,
            isCheckServer: false,
            fullscreenLoading: false,
            // searchCompanyName:[],
            searchCompanyName: []
        }
    },
    methods: {

    // 搜索框 相关事件
    // 搜索框
    querySearch(queryString, cb) {
      if(queryString === '') {
        // this.showProvinces = '';
        this.tableData= this.searchCompanyName;
      }
      var searchCompanyName = this.searchCompanyName;
      var results = queryString ? searchCompanyName.filter(this.createFilter(queryString)) : searchCompanyName;
      cb(results);
    },
    createFilter(queryString) {
      return (companyName) => {
        return (companyName.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    enterSelect(item){
      let value = item.srcElement.value;
      let items =  this.searchCompanyName.filter(function(company){
          console.log(company.value + value);
           return company.value == value;
       })
       if(item){
         if(items.length <=0 ){
           this.$message({
             message: '未查询到快递公司，请重新输入！',
             type: 'warning'
           });
         } else {
            this.tableData = items;
         }
       }
     },
    handleQuerySelect(items) {
      //  this.showProvinces = items.value
      var _this = this;
       this.tableData=[items];
       console.log(items);
      //  setTimeout(function(){
      //      _this.tableData= items
      //  },3000)
      // console.log(items);
      // for(let i =0;i<this.gridData.length;i++) {
      //      if(this.gridData[i].provinceName === items.value) {
      //         this.gridData[i].isShow= true;
      //      } else {
      //         this.gridData[i].isShow = false;
      //      }
      // }
      // console.log(this.gridData);
    },
    handleIconClick(ev) {
       this.tableData= this.searchCompanyName;

      // this.gridData = this.gridDataCopy;
      this.searchContent = '';
    },
      CheckAllChange(ev) {
           console.log("handleCheckAllChange");
           console.log(ev);
      },
      mockInput(val) {
                //  console.log("mockInput");
                //  console.log(arguments);
                this.myCheckedNames = arguments[0]
                console.log(this.myCheckedNames);
            },
            groupEvent(value) {
                console.log("____________event__________");
                console.log(value);
            },
            handleClick(scope) {
                console.log(scope);
                this.isCheckServer = true;
                // this.dialogCheckVisible= true;
                let url = "/api/noService/areaConf/all";
                var _this = this;
                _this.$http.post(url,{"logisMerchId":scope.logisMerchId},(data) => {
                    console.log(data);
                    _this.result = data;
                    _this.dialogConfigVisible = true;
                }, (error) => {
                    console.log("error");
                    console.log(error);
                });
            },
            handleEdit(scope) {
               this.logisMerchId = scope.logisMerchId;
                this.isCheckServer = false;
                let url = "/api/noService/areaConf/all";
                var _this = this;
                _this.$http.post(url,{"logisMerchId":scope.logisMerchId},(data) => {
                    _this.result = data;
                    _this.dialogConfigVisible = true;
                }, (error) => {
                    console.log("error");
                    console.log(error);
                });

            },
            changeCheckVisible(flag) {
                this.dialogCheckVisible = flag;
            },
            changeConfigVisible(flag) {
                this.dialogConfigVisible = flag;
            },
            initList(){
              let url = "/api/noService/list";
              var _this = this;
              // _this.fullscreenLoading = true;
              _this.$http.post(url,{}, (data) => {
                  // console.log("successadsafasdf");
                  this.searchCompanyName = data.slice(0)
                  // console.log(data);
                  for(let i =0;i<data.length;i++) {
                    this.searchCompanyName[i].value= data[i].logisMerchName;
                    this.searchCompanyName[i].label= data[i].logisMerchName;
                    this.searchCompanyName[i].index = i;
                    // console.log(data[i].logisMerchName)
                  }

                  console.log("sdfasddasdfasdfasdfasdf");
                  console.log(this.searchContent);
              if(this.searchContent) {
                      let searchContent = this.searchContent
                     let filterData = data.filter(function(item){
                         return item.logisMerchName == searchContent;
                     })
                     setTimeout(() => {
                         _this.tableData = filterData.slice(0);
                     }, 0);
                } else {
                   setTimeout(() => {
                        _this.tableData = data.slice(0);
                   }, 0);
                 }

              }, (error) => {
                  console.log("errorasdfawefasdfaweasdfew");
                  console.log(error);
              });
            }
    },
    created() {
        this.initList();
    }
};

</script>
