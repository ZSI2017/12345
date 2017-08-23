<template type="html">
  <el-dialog title="覆盖地区" :visible.sync="dialogFormVisible"  :before-close='handleDialogConfigCancel' class="dialog-class">
    <el-row :span="24" style="margin-bottom:10px;padding-top:5px;border-top:1px solid grey">
      <el-col :span="4" style="padding-top:10px;">
        <el-checkbox v-model="check" @change="handleCheckAll($event)">全选</el-checkbox>
      </el-col>
      <el-col :span="10" style="height:10px;"></el-col>
      <el-col :span="5" style="font-weight:bold;font-size:16px;margin-top:2px;line-height:40px;height:40px;">
           <span style="float:right;padding-right:10px">按照省搜索:</span>
      </el-col>
      <el-col :span="5" style="font-weight:bold;font-size:16px;margin-top:2px;line-height:40px;height:40px;">

        <el-autocomplete class="inline-input" v-model="searchContent" style="float:right;" :fetch-suggestions="querySearch" placeholder="请输入省名" icon="close" :on-icon-click="handleIconClick" @select="handleQuerySelect"></el-autocomplete>
      </el-col>
    </el-row>
    <el-table :data="gridData" border :show-header="showHeader" max-height="400" :row-style="handleRowStyle" >
      <el-table-column property="provinceName" label="省" width="200">
        <template scope="scope" >
          <el-checkbox
                v-model="checkAll[scope.$index]"
                @change="handleCheckAllChange(scope.$index,$event)"
             ></el-checkbox>
             {{scope.row.provinceName}}
            <!-- <el-tag type="primary" style="float:left;overflow:hidden;font-size:16px;width:80px;margin-right:10px;text-overflow:ellipsis">{{scope.row.provinceName}}</el-tag> -->
            <!-- <el-checkbox
                  v-model="checkAll[scope.$index]"
                  @change="handleCheckAllChange(scope.$index,$event)"
               ></el-checkbox> -->
          </template>
      </el-table-column>
      <el-table-column property="citys" label="市">
        <template scope="scope">
            <el-checkbox-group
                  v-model="checkedCities[scope.$index]"
                  @change="handleCheckedCitiesChange(scope.$index)"
                  >
                 <el-checkbox style="margin-left:0;margin-right:15px;"
                   @change="handleCheckedEveryChange(scope.$index,index,$event)"
                  v-for="(city,index) in scope.row.citys" :label="city.cityName" :key="city.cityName">{{city.cityName}}</el-checkbox>
            </el-checkbox-group>

     </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleDialogConfigCancel">取 消</el-button>
      <el-button type="primary" @click="handleDialogConfigSave">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script type="text/javascript">
   export default {
     {
       components:{
          coverArea
       },
       data() {
         return {
           // loading 框
           listLoading:false,
          // 展示警告信息
           showAlert:false,
           dialogVisible:false,
           // 添加搜索框
           searchContent: "",
           provinces: [],
           // 覆盖地区选择
           check: false,
           checkAll: [],
           checkedCities: [],
           isIndeterminate: [],
           // 搜索框中省名初始化
           searchProvinces:[],
           showProvinces:'',
           // radio 代表上下线状态的选择
           radio: "1",
           url:'/api/promotion/audit/save',
           // dialogFormVisible 代表是否打开配置地区的对话框
           dialogFormVisible: false,
           // 查看配置地区中的表格数据 和 是否显示的标志
           showHeader: false,
           dialogTableVisible: false,
           gridData: [],
           gridDataCopy: [],
           // 对输入表单进行验证

         }
       },
       created() {
         this.pageId = localEvent.get('pageId')
         console.log(this);

       },
       beforeMount() {

       },
       mounted() {
          console.log("router params %c %o","fontSize:20px",this.$route.params);

       },
       beforeDestory() {
         alert("beforeDestory")
       },
       watch: {
         //  loadingFlag:{
         //     handler:(val,old) => {
         //          alert(val),
         //          console.log(old);
         //     }
         //  }
       },
       methods: {
         //
         dataChagne(value) {
           console.log(value);
           console.log(this.ruleForm.date1);
         },
         // 为表格中的行设置样式，
         handleRowStyle(row,index) {

           if(this.showProvinces !== '') {
              if(this.showProvinces === row.provinceName) {
                 // return {'display':}
              }else {
                  return {'display':'none'}
              }
           }
         },
         changeVisible(flag){
           this.dialogTableVisible = flag;
         },
         // 搜索框
         querySearch(queryString, cb) {
           if(queryString === '') {
             this.showProvinces = '';
           }
           var searchProvinces = this.searchProvinces;
           var results = queryString ? searchProvinces.filter(this.createFilter(queryString)) : searchProvinces;
           cb(results);
         },
         createFilter(queryString) {
           return (province) => {
             return (province.value.indexOf(queryString.toLowerCase()) === 0);
           };
         },
         handleQuerySelect(items) {
            this.showProvinces = items.value
           console.log(items);
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
           this.showProvinces = ''
           // this.gridData = this.gridDataCopy;
           this.searchContent = '';
         },
         // 覆盖地区选择
         dialogConfig() {
           // 初始化话搜索框
           this.handleIconClick();
           if(this.gridData.length>0){
               if(this.DialogConfigSaveFlag){
                   this.dialogFormVisible = true;
                   return;
               }else {
                   let localResult = localEvent.get("gridData")
                   this.gridData = localResult.provinces;
                   console.log("12344444444444444%o",this.gridData);
                   this.initCheckBox(localResult.check)
                 return;
               }
           }
           var _this = this;
           this.listLoading = true
           var URL = "/api/promotion/areaConf/all";   // 默认是 配置 中的覆盖地区
           _this.$http.post(URL,{id:"0"},
             (rsp) => {
               _this.gridData = rsp.provinces.slice(0);
               for( let i =0;i<_this.gridData.length;i++) {
                  _this.searchProvinces[i]={};
                  _this.searchProvinces[i].value = _this.gridData[i].provinceName;
               }
               console.log(_this.searchProvinces);
               localEvent.set("gridData", rsp);
               _this.initCheckBox(rsp.check);
               // _this.gridDataCopy123 = _this.gridData.slice(0);

               // console.log(_this.gridData);
             }, (error) => {
                 _this.listLoading = false;
                 this.$message.error(error.data.meta.code+"--"+error.data.meta.msg);
               console.log(error);
             })
         },
         initCheckBox(isAllcheck){
           // console.log(_this.gridDataCopy);

           this.provinces = this.gridData;
           // 初始化 配置的多选框操作
           for (var i = 0; i < this.gridData.length; i++) {
             // _this.isIndeterminate[i] = true;
               this.checkedCities[i] = [];
                if(this.gridData[i].check){
                   this.checkAll[i] = true;
                   for(let j = 0;j<this.gridData[i].citys.length;j++) {
                       this.checkedCities[i].push(this.gridData[i].citys[j].cityName)
                   }
                }else {
                   this.checkAll[i] = false;
                   for(let j = 0;j<this.gridData[i].citys.length;j++) {
                       if(this.gridData[i].citys[j].check) {

                         this.checkedCities[i].push(this.gridData[i].citys[j].cityName)
                       }
                   }
                }
           }
           console.log(this.checkAll);
           // 检查是否 全选
           this.check = isAllcheck;
           if(this.check){
             this.handleCheckAll({target:{checked:true}})
           }
           this.listLoading = false
           this.dialogFormVisible = true;

         },
         handleCheckAll(event) {
           var allCount = this.gridData.length;
           for (var m = 0; m < allCount; m++) {
             this.isIndeterminate.splice(m, 1, !event.target.checked)
             this.checkAll.splice(m, 1, event.target.checked);
             this.gridData[m].check = event.target.checked;
             let CityAllCity = [];
             for(let i =0;i<this.gridData[m].citys.length;i++) {
                this.gridData[m].citys[i].check = event.target.checked;
                CityAllCity.push(this.gridData[m].citys[i].cityName)
             };
             this.checkedCities.splice(m, 1, event.target.checked ? CityAllCity : [])
           }
         },
         // 配置覆盖地区 取消
         handleDialogConfigCancel(){
             this.dialogFormVisible = false
             this.DialogConfigSaveFlag = false;
         },
         // 配置覆盖地区 保存
         handleDialogConfigSave(){
           if(this.check || this.checkAll.filter(function(value){return value === true }).length>0 || this.checkedCities.filter(function(value){return value.length>0} ).length>0) {
                  this.ruleForm.coverArea = "hasClick"
           }else {
                   this.ruleForm.coverArea = "";
           }

             localEvent.set("gridData",{"provinces":this.gridData,"check":this.check,code:"000000"})
             this.dialogFormVisible = false;
             this.DialogConfigSaveFlag = true;

         },
         observeCheckAll() {
           let checkall = this.checkAll.filter(function(value) {
             return value === false;
           });
           let Indeterminateall = this.isIndeterminate.filter(function(value) {
             return value === true;
           })
           console.log(checkall);
           if (checkall.length === 0 && Indeterminateall.length === 0) {
             this.check = true;
             console.log(this.check);
           } else {
             this.check = false;
           }
         },
         handleCheckAllChange(index, event) {
           // 改变数据状态
           let flag = event.target.checked
           this.gridData[index].check = flag;
           for(let j =0 ;j<this.gridData[index].citys.length;j++) {
                  this.gridData[index].citys[j].check = flag;
                 //  console.log(this.gridData[index].citys[j]);
           }
           let CityAllCity = [];
           for(let i =0;i<this.gridData[index].citys.length;i++) {
              CityAllCity.push(this.gridData[index].citys[i].cityName)
           };
           this.checkedCities.splice(index, 1, event.target.checked ? CityAllCity : [])
           this.isIndeterminate.splice(index, 1, false);
           // console.log("%c handleCheckAllChange &o","font-size:20px",this.gridDataCopy123);
           this.observeCheckAll();
         },
         handleCheckedCitiesChange(index) {
           let value = this.checkedCities[index];
           let checkedCount = value.length;
           // if(checkedCount === this.gridData[index].citys.length) {
              this.gridData[index].check = checkedCount === this.gridData[index].citys.length;
           // }else {
           //    this.gridData[index].check = false;
           // }
           this.checkAll.splice(index, 1, checkedCount === this.gridData[index].citys.length)
           // console.log(checkedCount + "  " + this.gridData[index].city.length + " " + this.checkAll[index]);
           // this.isIndeterminate.splice(index, 1, checkedCount > 0 && checkedCount < this.gridData[index].citys.length);
           this.observeCheckAll();
         },
         handleCheckedEveryChange(outIndex,index,event) {
             this.gridData[outIndex].citys[index].check = event.target.checked;
         },
         dialogTable() {
           let localResult = localEvent.get("gridData")
           this.CoverData = localResult.provinces;
           this.dialogTableVisible = true;
         },
       }
   }
</script>

<style>
.dialog-class {
    .el-dialog__body{
       padding-top:15px !important;

    }
}
</style>
