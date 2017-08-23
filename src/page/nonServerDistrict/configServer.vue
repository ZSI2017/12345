<template type="html">
<el-dialog class="dialogNoServer" title="非覆盖地区" :visible.sync="visible" @close="dialogClose"  v-loading.body.fullscreen.lock="fullscreenLoading">
  <el-row :span="24" style="border:1px solid #d1dbe5;border-radius:2px;box-shadow:0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);">
    <el-col :span="8">
      <li class="commonli-class li-title">省份</li>
      <ul class="ul-block">
        <li v-if='(item.check)&&onlyRead||!onlyRead' class="commonli-class" :class="[index ==li0 ?activeClass:'',commonliClass]" @click="li1Click($event,index,item)" v-for="(item,index) in sourceData.noProvinces">{{item.provinceName}}</li>
      </ul>
    </el-col>
    <el-col :span="8">
      <li class="commonli-class li-title">城市</li>
      <ul class="ul-block">
        <el-collapse-transition>
          <div v-if="showLi">
            <checkbox-group v-model="checkCity">
              <li v-if='(item.check&&onlyRead)||!onlyRead' :class="[index==li1?activeClass:'', commonliClass]" @click="li1Click2($event,item,index)" v-for="(item,index) in list2" :key="index" style="position:relative">
                <span style="margin-right:0px;display:inline-block;margin-top:3px;">{{item.cityName}}</span>
                <checkbox v-if="!onlyRead" style="position:absolute;left:10px;top:9px;" :label="item.cityName" :key="item.cityName" @change="handleCheckAllChange(index,item,$event)" ></checkbox>
              </li>
            </checkbox-group>
          </div>
        </el-collapse-transition>
      </ul>
    </el-col>
    <el-col :span="8">
      <li class="commonli-class li-title">未覆盖区县</li>
      <ul class="ul-block">
        <el-collapse-transition>
          <div v-if="showLi2">
            <checkbox-group v-model="checkedDistric" @change="handleDistricChange">
              <li  v-if='(item.check&&onlyRead)||!onlyRead' class="commonli-class" :style="{'text-align':onlyRead?'center':'left'}" v-for="(item,index) in list3">
                <checkbox v-if="!onlyRead" :label="item.districtName" @change="handleCheckbox(index,$event)"  :key="item.districtName">{{item.districtName}}</checkbox>
                <span v-if="onlyRead">{{item.districtName}}</span>
              </li>
            </checkbox-group>
          </div>
        </el-collapse-transition>
      </ul>
    </el-col>
  </el-row>
  <div v-if="!onlyRead" slot="footer" class="dialog-footer">
    <el-button @click="visible = false">取 消</el-button>
    <el-button type="primary" @click="handleSave">保 存</el-button>
  </div>

</el-dialog>
</template>

<script type="text/javascript">
import checkbox from "@/page/nonServerDistrict/checkbox";
import checkboxGroup from "@/page/nonServerDistrict/checkboxGroup"
export default {
  name: 'checkServer',
  components: {
      checkbox,
      checkboxGroup
  },
  data() {
    return {
      fullscreenLoading:false,
      activeClass: 'activeClass',
      commonliClass: 'commonli-class',
      li0: '-1',
      li1: '-1',
      showLi: false,
      showLi2: false,
      lists1: [],
      list2: [],
      list3: [],
      checkedDistric: [],
      checkedData: [],
      checkCity: [],
      checkAll: [],
      districChecked: false,
      isIndeterminate: [] // 表示 城市全选框的 不确定状态;
    }
  },
  props: {
    visible: Boolean,
    sourceData: Object,
    onlyRead: Boolean,
    logisMerchId:Number
  },
  created(){


  },
  watch: {
    onlyRead: function(newData, oldData) {
        this.li0='-1';
        this.li1='-1';
        this.showLi=false;
        this.showLi2=false;
      // console.log("sourceData");
      // for(var i =0;i<newData.noProvinces.length;i++) {
      //
      // }
      // this.lists1 =
      // console.log(newData);
      // console.log(oldData);
    },
    sourceData:function(newData,oldData) {
       console.log(newData);
       console.log(newData+"++++++++++++++++"+oldData);
       console.log(oldData);
        this.checkedData = newData.noProvinces;
       if(!this.onlyRead) {
         this.li1Click('event',0,newData.noProvinces[0]);
         this.li1Click2('event', newData.noProvinces[0].noServiceCitys&&newData.noProvinces[0].noServiceCitys[0],0)
       } else {
          let index1,index2;
          for(let i =0;i<newData.noProvinces.length;i++) {
                  if(newData.noProvinces[i].check){
                     index1 = i;
                     break;
                  }
          }
          this.li1Click('event',index1,newData.noProvinces[index1]);
        if(typeof newData.noProvinces[index1] !== "undefined"){
            for(let k =0;k<newData.noProvinces[index1].noServiceCitys.length;k++) {
                    if(newData.noProvinces[index1].noServiceCitys[k].check) {
                         index2 = k;
                         break;
                    }
            }
            this.li1Click2('event',newData.noProvinces[index1].noServiceCitys[index2],index2);
          }
       }

    }

  },
  methods: {
    // 点击全选
    handleCheckAllChange(index, item, event) {
      if(this.onlyRead) return;
      // alert(index);
      // this.checkedData[this.li0].citys = this.checkCity;
      // console.log(this.checkCitysData);
      // let tempCitysArr = [];
      //    for(let k =0;k<this.checkCity.length;k++) {
      //        let tempCitysObj = {};
      //        tempCitysObj.cityName = this.checkCity[k];
      //        tempCitysObj.districtName = this.sourceData.noProvinces[this.li0].noServiceCitys[this.li1].noServiceDistricts,
      //        tempCitysArr.push(tempCitysObj);
      //    }
      // this.checkedData[this.li0] = tempCitysArr;
      //   console.log(this.checkedData);
      if (event.target.checked) {
        // this.checkedData[this.li0]
        this.checkedData[this.li0].noServiceCitys[index].check = 1
        //  = Object.assign({
        //   check: true
        // }, item)
        //  {provinceName:'',Checked:true,noServiceCitys:item}
      } else {
        this.checkedData[this.li0].noServiceCitys[index].check = 0;
        // this.checkedData[this.li0].noServiceCitys[index].noServiceDistricts = [];
        // this.checkedData[this.li0].noServiceCitys[index]=Object.assign({},{cityName:item.cityName,Checked:false})
      }
      //  console.log(this.checkedData);
      // this.sourceData.no
      let tempArr = [];
      for (let i = 0; i < item.noServiceDistricts.length; i++) {
        this.checkedData[this.li0].noServiceCitys[index].noServiceDistricts[i].check = event.target.checked?1:0;
        tempArr.push(item.noServiceDistricts[i].districtName);
      }
      this.checkedDistric = event.target.checked ?
        tempArr :
        [];
      // this.checkedDistric.splice(index, 1, event.target.checked ? this.gridData[index].city : [])
      // this.isIndeterminate.splice(index, 1, false);
      // this.observeCheckAll();

      // this.checkedData=   [
      // {provinceName:" ",
      //   noServiceCitys:[ {cityName:' ',Checked:true,noServiceDistricts:[{districtName:'云霄县'}]  }      ]}
      // {provinceName:" ",
      //   noServiceCitys:[ {cityName:' ',Checked:true,noServiceDistricts:[{districtName:'云霄县'}]  }      ]}
      // {provinceName:" ",
      //   noServiceCitys:[ {cityName:' ',Checked:true,noServiceDistricts:[{districtName:'云霄县'}]  }      ]}
      //     [{cityName:' ',districtName:[]},{cityName:' ',districtName:[]},{cityName:' ',districtName:[]} ],
      //     [{cityName:' ',districtName:[]},{cityName:' ',districtName:[]},{cityName:' ',districtName:[]} ],
      //     [{cityName:' ',districtName:[]},{cityName:' ',districtName:[]},{cityName:' ',districtName:[]} ],
      //   ]
    },
    handleCheckbox(index,event) {

      if(this.onlyRead) return;

      this.checkedData[this.li0].noServiceCitys[this.li1].noServiceDistricts[index].check = event.target.checked?1:0
    },
    // 区县选择 多选框
    handleDistricChange() {
      if(this.onlyRead) return;
      //  记录对应的数据到指定的数据结构当中
      let tempCityName = this.sourceData.noProvinces[this.li0].noServiceCitys[this.li1].cityName;
      // // console.log(tempCityName
      // // 如果在 对应的 数组对象还没有生成的情况下，先指定期 cityName：值
      // this.checkedData[this.li0].noServiceCitys[this.li1].cityName = tempCityName;
      // //  生成对应的 noServiceDistricts 数组，保持跟当前 this.checkedDistric 里面的内容一致;
      // let tempdistrictName = [];
      // for (let j = 0; j <  j++) {
      //   tempdistrictName.push({
      //     districtName: this.checkedDistric[j],
      //     check:1,
      //   })
      // }
      // this.checkedData[this.li0].noServiceCitys[this.li1].noServiceDistricts = tempdistrictName;
      // 将原始数据和 动态生成的已勾选数据    noServiceDistricts 长度 的 进行比较
      let checkedDataDistrictNameLength = this.checkedDistric.length;
      let sourceDataDistrictNameLength = this.sourceData.noProvinces[this.li0].noServiceCitys[this.li1].noServiceDistricts.length
      if (checkedDataDistrictNameLength >= sourceDataDistrictNameLength) {
        // 代表已经把未覆盖区县中的数据手动全选了
        this.checkedData[this.li0].noServiceCitys[this.li1].check = 1;
        if (this.checkCity.indexOf(tempCityName) < 0) this.checkCity.push(tempCityName);
      } else {
        this.checkedData[this.li0].noServiceCitys[this.li1].check= 0;
        if (this.checkCity.indexOf(tempCityName) >= 0) this.checkCity.splice(this.checkCity.indexOf(tempCityName), 1);
      }
      // console.log(tempdistrictName.length);
      // console.log(this.sourceData.noProvinces[this.li0].noServiceCitys[this.li1].noServiceDistricts.length);
      //   let targetPlace = this.checkedData[this.li0].length;
      //  for(let m =0;m<this.checkedData[this.li0].length;m++) {
      //       if(this.checkedData[this.li0][m].cityName == tempCityName){
      //            targetPlace = m;
      //       }
      //  }
      //   let tempdistrictName = [];
      //    for(let j =0 ;j<this.checkedDistric.length;j++) {
      //            tempdistrictName.push({districtName: this.checkedDistric[j]})
      //    }
      //    if(Object.prototype.toString.call(this.checkedData[this.li0][targetPlace]) !== "[object Object]") {
      //       this.checkedData[this.li0][targetPlace] = {cityName:tempCityName};
      //    }
      //     this.checkedData[this.li0][targetPlace].noServiceDistricts = tempdistrictName;
      // console.log(this.checkedData);
    },
    li1Click(event, index, item) {
      this.li0 = index;
      // console.log(this.checkedData);
      if(!this.onlyRead){
          this.checkedData[this.li0] = this.checkedData[this.li0] ?
            this.checkedData[this.li0] :
            {
              provinceName: item.provinceName,
              noServiceCitys: []
            };
            console.log("li1li1li1li1li1li1li1li1li1lil1li1li1l.");

          // console.log(event);
          // this.sourceData.noProvinces[index].noServiceCitys;
          var noServiceCitysArr = this.checkedData[index].noServiceCitys
              console.log(this.checkedData[index].noServiceCitys[0].check);
          if (noServiceCitysArr.length > 0) {
            let tempArr = [];
            for (let k = 0; k < noServiceCitysArr.length; k++) {
              if (typeof noServiceCitysArr[k] === "object") {

                if (noServiceCitysArr[k].check) tempArr.push(noServiceCitysArr[k].cityName);
                // else
                // toDo  增加不确定状态的标记
              }
            }
            this.checkCity = tempArr;
            // console.log(this.checkCity);
          } else {
            this.checkCity = [];
            //  this.checkedData[index] =[];
            //  this.checkedData[index].citys= [];
          }
    }
      // console.log(this.checkedData);
      this.list2 = this.sourceData.noProvinces[index].noServiceCitys;
      this.showLi = true;
      this.showLi2 = false;

    },
    li1Click2(event, item, index) {
      this.checkedDistric = [];
      this.li1 = index;
      this.list3 = item.noServiceDistricts;
      //  console.log(this.checkedData);
      if(!this.onlyRead) {
          if (Object.prototype.toString.call(this.checkedData[this.li0].noServiceCitys[index]) === "[object Object]") {
            var noServiceDistrictsArr = this.checkedData[this.li0].noServiceCitys[index].noServiceDistricts;
            if (noServiceDistrictsArr && noServiceDistrictsArr.length > 0) {
              //  let noServiceArr = this.checkedData[this.li0][m].noServiceDistricts
              //  console.log(noServiceArr);
              let tempArr = [];
              // this.sourceData.no
              for (let i = 0; i < noServiceDistrictsArr.length; i++) {
                if(noServiceDistrictsArr[i].check)  tempArr.push(noServiceDistrictsArr[i].districtName);
              }
              this.checkedDistric = tempArr;

            } else {
              this.checkedData[this.li0].noServiceCitys[index].noServiceDistricts = [];
              this.checkedDistric = [];
            }
          } else {
            this.checkedData[this.li0].noServiceCitys[index] = {};
          }
   }
      this.showLi2 = true;
    },
    dialogClose() {
      this.showLi = false;
      this.showLi2 = false;
      this.$emit("listenToConfig", false)

    },
    handleSave() {
        this.visible = false;
        this.fullscreenLoading = true;
        let url = "/api/noService/update"
        console.log(this.checkedData);
        this.$http.post(url,{"noService":{noProvinces:this.checkedData},"data":{"logisMerchId":this.logisMerchId}},(result) =>{
              this.fullscreenLoading = false;
              this.$emit('listenToConfigFresh');
        this.$message({
              message: '保存成功',
              type: 'success'
            });
        },(error) => {
            this.fullscreenLoading = false;
             this.$message({
                message:'保存失败',
                type:'warning'
             })
        })
    },
    handleCancel() {
        this.visible = false;
    }
  }
}
</script>

<style lang="scss">
.dialogNoServer {
    .ul-block {
        width: 100%;
        height: 330px;
        overflow-y: auto;
        background-color: white;
        padding-left: 0;
        margin: 0;
        border-right: 1px solid #d1dbe5;
        box-sizing: border-box;
    }
    .li-title {
        border-bottom: 1px solid #d1dbe5;
        font-weight: bold;
    }
    .commonli-class {
        text-align: center;
        list-style: none;
        font-size: 14px;
        padding: 8px 30px 8px 10px;
        white-space: nowrap;
        overflow: hiddne;
        text-overflow: ellipsis;
        color: #48576a;
        height: 20px;
        line-height: 1;
        cursor: pointer;
    }
    .commonli-class:hover {
        background-color: #e4e8f1;
    }
    .activeClass {
        background-color: #58B7FF !important;
    }
    //////////////// 自定义滑块样式////////////////
    ::-webkit-scrollbar {
        width: 3px;
        height: 3px;
        background-color: #58B7FF;
    }
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
        background-color: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #58B7FF;
    }
}
</style>
