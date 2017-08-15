<template>
<div class="section" style="overflow:hidden">
  <el-row :span="24" type="flex" align="middle" style="margin-bottom:10px;">
    <el-col>
      <span>快递公司:</span>
      <el-select filterable label="快递公司" :loading="expressLoading" v-model="expressName" @visible-change="handExpressChange" placeholder="请选择">
        <el-option v-for="item in expressOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col>
      <span>发货省:</span>
      <el-select filterable label="发货省" :loading="sendProvinceLoading" @visible-change="handSendProvinceChange" v-model="sendProvince" placeholder="请选择">
        <el-option v-for="item in sendProvinceOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col>
      <span>收货省:</span>
      <el-select filterable :loading="recProvinceLoading" @visible-change="handRecProvinceChange" label="收货省" v-model="recProvince" placeholder="请选择">
        <el-option v-for="item in recProvinceOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
  <el-row :span="24" type="flex" align="middle" style="margin-bottom:10px;">
    <el-col>
      <span>服务类型:</span>
      <el-select filterable label="服务类型" v-model="typeOfService" :loading="typeOfServiceLoading" @visible-change="handServiceChange" placeholder="请选择">
        <el-option v-for="item in typeOfServiceOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col>
      <span>发货市:</span>
      <el-select filterable label="发货市" v-model="sendCity" :loading="sendCityLoading" @visible-change="handSendCityChange" placeholder="请选择">
        <el-option v-for="item in sendCityOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col>
      <span>收货市:</span>
      <el-select filterable :loading="recCityLoading" @visible-change="handrecCityChange" label="收货市" v-model="recCity" placeholder="请选择">
        <el-option v-for="item in recCityOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
  <el-button @click="handleQuery" size="large" type="primary">查询</el-button>
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
           <el-button @click="handleClick" type="text" size="small">修改</el-button>
           <el-button @click="handleEdit(scope.row.id)" type="text" size="small">删除</el-button>
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

  <el-dialog title="新增运线快递费" :visible.sync="dialogTableVisible">
    <el-form :model="form">
      <el-form-item label="活动区域" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

  </el-dialog>
</div>
</template>
<script>
export default {
  name: 'nonServerDistrict',
  data() {
    return {
      // 所选框 loading

      totalCount: 1000,
      dialogTableVisible: false,
      form: {
        region: ''
      },
      halfListLoading: false,
      tableData: [],
      pageSize: 5,
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
    var _this = this;
    _this.$http.get("/rest/list6", (data) => {
      console.log("success");
      console.log(data);
      _this.tableData = data.data.data;
      _this.totalCount = data.data.data.length;
    }, (error) => {
      console.log("error");
      console.log(error);
    });
  },
  mounted(){
     // 初始化页面
      this.handleQuery();
  },
  methods: {
    handExpressChange(visible) {
      if (visible) {
        if (this.expressOptions.length > 0) {
          this.expressLoading = false
        } else {
          this.$http.post("/api/freightPriceRule/express", {}, (result) => {
            console.log(result);
            for (let i = 0; i < result.length; i++) {
              result[i].value = [result[i].name, result[i].id];
              result[i].label = result[i].name;
            }
            this.expressOptions = result.slice(0);
            this.expressLoading = false;
          })
        }
      }
    },

    // 选择服务类型
    handServiceChange(visible) {
      if (visible) {
        this.$http.post("/api/freightPriceRule/productType", {
          "logisMerchId": this.expressName[1]
        }, (result) => {
          console.log(result);
          for (let i = 0; i < result.length; i++) {
            result[i].value = [result[i].name, result[i].id];
            result[i].label = result[i].name;
          }
          this.typeOfServiceOptions = result.slice(0);
          this.typeOfServiceLoading = false;
        })

      }
    },
    handSendProvinceChange(visible) {
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
            this.sendProvinceOptions = result.slice(0);
            this.sendProvinceLoading = false;
          })
        }
      }
    },
    handSendCityChange(visible) {
      this.$http.post("/api/freightPriceRule/city", {
        "provinceName": this.sendProvince[0]
      }, (result) => {
        console.log(result);
        for (let i = 0; i < result.length; i++) {
          result[i].value = [result[i].cityName, result[i].cityNo];
          result[i].label = result[i].cityName;
        }
        this.sendCityOptions = result.slice(0);
        this.sendCityLoading = false;
      })
    },
    handRecProvinceChange(visible) {
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
            this.recProvinceOptions = result.slice(0);
            this.recProvinceLoading = false;
          })
        }
      }
    },
    handrecCityChange(visible){
      if (visible) {
        this.$http.post("/api/freightPriceRule/city", {
          "provinceName": this.recProvince[0]
        }, (result) => {
          console.log(result);
          for (let i = 0; i < result.length; i++) {
            result[i].value = [result[i].cityName, result[i].cityNo];
            result[i].label = result[i].cityName;
          }
          this.recCityOptions = result.slice(0);
          this.recCityLoading = false;
        })

      }

    },
    handleQuery() {
      // const h = this.$createElement;
      // this.$notify({
      //   title: '查询',
      //   message: h('i', {
      //     style: 'color: teal'
      //   }, '点击了查询')
      // });
    let data = {
         "pages":{
              "page_size":this.pageSize,
              "page_num":this.currentPage,
         },
         "con":{
            "logisMerchId":this.expressName[1] ==="部"?'':this.expressName[1],
            "productTypeId":this.typeOfService[1] ==="部"?'':this.typeOfService[1],
            "fromPrvnCode":this.sendProvince[1] ==="部"?'':this.sendProvince[1],
            "fromCityCode":this.sendCity[1]  ==="部"?'':this.sendCity[1] ,
            "toPrvnCode":this.recProvince[1] ==="部"?'':this.recProvince[1] ,
            "toCityCode":this.recCity[1] ==="部"?'':this.recCity[1],
         }
      }
      this.$http.post('/api/freightPriceRule/list',data,(result) =>{
                this.tableData = result.page_list;
                this.totalCount = parseInt(result.pages.cnt);
      },(error) =>{
        this.$message.error(error.data.meta.code+"--"+error.data.meta.msg);
         console.log(error);
      })
    },
    //  删除
    handleEdit(id){
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
                    this.handleQuery();
                  }
          },(error)=>{
              this.$message({
                  type: 'error',
                  message: error.data.meta.code+"--"+error.data.meta.msg
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
      const h = this.$createElement;
      this.$notify({
        title: '新增运线',
        message: h('i', {
          style: 'color: teal'
        }, '点击了新增运线')
      });
    },
    handleExportLine() {
      const h = this.$createElement;
      const _this = this;
      this.$notify({
        title: '导出运线',
        message: h('i', {
          style: 'color: teal'
        }, '点击了导出运线')
      });
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require('@/util/ExportExcel');
        const tHeader = ['快递公司', '服务类型', '发货省', '发货市', '收货省', '收货市', '首重价格', '首重重量', '续重重量', '续重价格'];
        const filterVal = ['tableExpress', 'tableTypeOfService', 'tableSendProvince', 'tableSendCity', 'tableRecProvince', 'tableRecCity', 'tablePresetWeightPrice', 'tablePresetWeight', 'tableExtraWeight', 'tableExtraWeightPrice'];
        const list = _this.tableData;
        const data = _this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '运线快递费列表');
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    handleLeadLine() {
      const h = this.$createElement;
      this.$notify({
        title: '导入运线',
        message: h('i', {
          style: 'color: teal'
        }, '点击了导入运线')
      });

    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.handleQuery();


    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.handleQuery();



      // setTimeout(() => {
      //   _this.halfListLoading = false;
      // }, 600);
      // console.log(`当前页: ${val}`);
    },

  },
};
</script>

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
