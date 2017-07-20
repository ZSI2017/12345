<template type="html">
<el-dialog class="dialogNoServer" title="非覆盖地区" :visible.sync="visible" @close="dialogClose">
  <el-row :span="24" style="border:1px solid #d1dbe5;border-radius:2px;box-shadow:0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);">
    <el-col :span="8">
      <li class="commonli-class li-title">省份</li>
      <ul class="ul-block">
        <li class="commonli-class" :class="[index ==li0 ?activeClass:'',commonliClass]" @click="li1Click($event,index,item)" v-for="(item,index) in sourceData.noProvinces">{{item.provinceName}}</li>
      </ul>
    </el-col>
    <el-col :span="8">
      <li class="commonli-class li-title">城市</li>
      <ul class="ul-block">
        <el-collapse-transition>
          <div v-if="showLi">
            <el-checkbox-group v-model="checkCity">
              <li :class="[index==li1?activeClass:'', commonliClass]" @click="li1Click2($event,item,index)" v-for="(item,index) in list2" :key="index" style="position:relative">
                <span style="margin-right:20px">{{item.cityName}}</span>
                <el-checkbox v-if="!onlyRead" style="position:absolute;left:10px" :label="item.cityName" :key="item.cityName" @change="handleCheckAllChange(index,item,$event)" :indeterminate="isIndeterminate[index]" v-model="checkAll[index]">全选</el-checkbox>
              </li>
            </el-checkbox-group>
          </div>
        </el-collapse-transition>
      </ul>
    </el-col>
    <el-col :span="8">
      <li class="commonli-class li-title">未覆盖区县</li>
      <ul class="ul-block">
        <el-collapse-transition>
          <div v-if="showLi2">
            <el-checkbox-group v-model="checkedDistric" @change="handleDistricChange">
              <li class="commonli-class" :style="{'text-align':onlyRead?'center':'left'}" v-for="(item,index) in list3">
                <el-checkbox v-if="!onlyRead" :label="item.districName" v-model="districChecked" :key="item.districName">{{item.districName}}</el-checkbox>
                <span v-if="onlyRead">{{item.districName}}</span>
              </li>
            </el-checkbox-group>
          </div>
        </el-collapse-transition>
      </ul>
    </el-col>
  </el-row>
  <div v-if="!onlyRead" slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
  </div>

</el-dialog>
</template>

<script type="text/javascript">
export default {
  name: 'checkServer',
  data() {
    return {
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
    onlyRead: Boolean
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
      //        tempCitysObj.districName = this.sourceData.noProvinces[this.li0].noServiceCitys[this.li1].noServiceDistricts,
      //        tempCitysArr.push(tempCitysObj);
      //    }
      // this.checkedData[this.li0] = tempCitysArr;
      //   console.log(this.checkedData);
      if (event.target.checked) {
        // this.checkedData[this.li0]
        this.checkedData[this.li0].noServiceCitys[index] = Object.assign({
          Checked: true
        }, item)
        //  {provinceName:'',Checked:true,noServiceCitys:item}
      } else {
        this.checkedData[this.li0].noServiceCitys[index].Checked = false;
        this.checkedData[this.li0].noServiceCitys[index].noServiceDistricts = [];
        // this.checkedData[this.li0].noServiceCitys[index]=Object.assign({},{cityName:item.cityName,Checked:false})
      }
      //  console.log(this.checkedData);
      // this.sourceData.no
      let tempArr = [];
      for (let i = 0; i < item.noServiceDistricts.length; i++) {
        tempArr.push(item.noServiceDistricts[i].districName);
      }

      this.checkedDistric = event.target.checked ?
        tempArr :
        [];
      // this.checkedDistric.splice(index, 1, event.target.checked ? this.gridData[index].city : [])
      // this.isIndeterminate.splice(index, 1, false);
      // this.observeCheckAll();

      // this.checkedData=   [
      // {provinceName:" ",
      //   noServiceCitys:[ {cityName:' ',Checked:true,noServiceDistricts:[{districName:'云霄县'}]  }      ]}
      // {provinceName:" ",
      //   noServiceCitys:[ {cityName:' ',Checked:true,noServiceDistricts:[{districName:'云霄县'}]  }      ]}
      // {provinceName:" ",
      //   noServiceCitys:[ {cityName:' ',Checked:true,noServiceDistricts:[{districName:'云霄县'}]  }      ]}
      //     [{cityName:' ',districName:[]},{cityName:' ',districName:[]},{cityName:' ',districName:[]} ],
      //     [{cityName:' ',districName:[]},{cityName:' ',districName:[]},{cityName:' ',districName:[]} ],
      //     [{cityName:' ',districName:[]},{cityName:' ',districName:[]},{cityName:' ',districName:[]} ],
      //   ]
    },
    // 区县选择 多选框
    handleDistricChange() {
      if(this.onlyRead) return;
      //  记录对应的数据到指定的数据结构当中
      let tempCityName = this.sourceData.noProvinces[this.li0].noServiceCitys[this.li1].cityName;
      // console.log(tempCityName
      // 如果在 对应的 数组对象还没有生成的情况下，先指定期 cityName：值
      this.checkedData[this.li0].noServiceCitys[this.li1].cityName = tempCityName;
      //  生成对应的 noServiceDistricts 数组，保持跟当前 this.checkedDistric 里面的内容一致;
      let tempdistricName = [];
      for (let j = 0; j < this.checkedDistric.length; j++) {
        tempdistricName.push({
          districName: this.checkedDistric[j]
        })
      }
      this.checkedData[this.li0].noServiceCitys[this.li1].noServiceDistricts = tempdistricName;
      // 将原始数据和 动态生成的已勾选数据    noServiceDistricts 长度 的 进行比较
      let checkedDataDistricNameLength = tempdistricName.length;
      let sourceDataDistricNameLength = this.sourceData.noProvinces[this.li0].noServiceCitys[this.li1].noServiceDistricts.length
      if (checkedDataDistricNameLength >= sourceDataDistricNameLength) {
        // 代表已经把未覆盖区县中的数据手动全选了
        this.checkedData[this.li0].noServiceCitys[this.li1].Checked = true;
        if (this.checkCity.indexOf(tempCityName) < 0) this.checkCity.push(tempCityName);
      } else {
        this.checkedData[this.li0].noServiceCitys[this.li1].Checked = false;
        if (this.checkCity.indexOf(tempCityName) >= 0) this.checkCity.splice(this.checkCity.indexOf(tempCityName), 1);
      }
      console.log(tempdistricName.length);
      console.log(this.sourceData.noProvinces[this.li0].noServiceCitys[this.li1].noServiceDistricts.length);
      //   let targetPlace = this.checkedData[this.li0].length;
      //  for(let m =0;m<this.checkedData[this.li0].length;m++) {
      //       if(this.checkedData[this.li0][m].cityName == tempCityName){
      //            targetPlace = m;
      //       }
      //  }
      //   let tempdistricName = [];
      //    for(let j =0 ;j<this.checkedDistric.length;j++) {
      //            tempdistricName.push({districName: this.checkedDistric[j]})
      //    }
      //    if(Object.prototype.toString.call(this.checkedData[this.li0][targetPlace]) !== "[object Object]") {
      //       this.checkedData[this.li0][targetPlace] = {cityName:tempCityName};
      //    }
      //     this.checkedData[this.li0][targetPlace].noServiceDistricts = tempdistricName;
      console.log(this.checkedData);
    },
    li1Click(event, index, item) {
      this.li0 = index;
      if(!this.onlyRead){
          this.checkedData[this.li0] = this.checkedData[this.li0] ?
            this.checkedData[this.li0] :
            {
              provinceName: item.provinceName,
              noServiceCitys: []
            };
          // console.log(event);
          // this.sourceData.noProvinces[index].noServiceCitys;
          var noServiceCitysArr = this.checkedData[index].noServiceCitys;
          if (noServiceCitysArr.length > 0) {
            let tempArr = [];
            for (let k = 0; k < noServiceCitysArr.length; k++) {
              if (typeof noServiceCitysArr[k] === "object") {
                if (noServiceCitysArr[k].Checked) tempArr.push(noServiceCitysArr[k].cityName);
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
                tempArr.push(noServiceDistrictsArr[i].districName);
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

      //  if( Object.prototype.toString.call(this.checkedData[this.li0]) === "[object Array]" && this.checkedData[this.li0].length>0) {
      //  if(this.checkedData[this.li0][this.li1].districName === "all") {
      //    let tempArr = [];
      //    // this.sourceData.no
      //    for(let i =0;i<item.noServiceDistricts.length;i++) {
      //       tempArr.push(item.noServiceDistricts[i].districName);
      //    }
      //
      //    this.checkedDistric =tempArr
      //       // this.districChecked = true;
      //
      //  }
      // alert(item.cityName)
      //   console.log();
      //     for(let m =0;m<this.checkedData[this.li0].length;m++) {
      //          if(this.checkedData[this.li0][m].cityName == item.cityName && this.checkedData[this.li0][m].noServiceDistricts.length>0){
      //              let noServiceArr = this.checkedData[this.li0][m].noServiceDistricts
      //             //  console.log(noServiceArr);
      //              let tempArr = [];
      //               // this.sourceData.no
      //               for(let i =0;i<noServiceArr.length;i++) {
      //                  tempArr.push(noServiceArr[i].districName);
      //               }
      //               this.checkedDistric =tempArr;
      //          }
      //     }
      //  }else {
      //        this.checkedDistric =[];
      //       //  this.districChecked = false;
      //  }

      //  console.log(this.checkedDistric);
      this.showLi2 = true;
    },
    dialogClose() {
      this.$emit("listenToConfig", false)
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
