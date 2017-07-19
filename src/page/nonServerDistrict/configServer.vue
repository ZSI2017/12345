<template type="html">
  <el-dialog class="dialogNoServer" title="非覆盖地区" :visible.sync="visible"  @close="dialogClose">
    <el-row :span="24"  style="border:1px solid #d1dbe5;border-radius:2px;box-shadow:0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);">
    <el-col :span="8">
      <li class="commonli-class li-title">省份</li>
      <ul class="ul-block">
           <li class="commonli-class"
                :class="[index ==li0 ?activeClass:'',commonliClass]"
                @click="li1Click($event,index)"
                v-for="(item,index) in lists1"
              >{{index}}</li>
      </ul>
   </el-col>
   <el-col :span="8" >
     <li class="commonli-class li-title">城市</li>
     <ul  class="ul-block">
          <li
             v-if="showLi"
             :class="[index==li1?activeClass:'', commonliClass]"
             @click="li1Click2($event,item,index)"
             v-for="(item,index) in list2"
             :key="index"
             style="position:relative"
             >
             <span style="margin-right:20px;">{{item}}</span>
             <el-checkbox style="position:absolute;right:10px" v-model="checked">全选</el-checkbox>
           </li>
       </ul>
     </el-col>
     <el-col :span="8">
       <li class="commonli-class li-title">未覆盖区县</li>
       <ul  class="ul-block">
           <li class="commonli-class"
               v-if="showLi2"
               v-for="(item,index) in list3"
             ><el-checkbox :label="item" :key="item">{{item}}</el-checkbox>
           </li>
         </ul>
       </el-col>
     </el-row>
</el-dialog>
</template>

<script type="text/javascript">
 export default {
    name:'checkServer',
    data(){
        return {
          activeClass:'activeClass',
          commonliClass:'commonli-class',
          li0:'-1',
          li1:'-1',
          showLi:false,
          showLi2:false,
          lists1:[
            "1",'2',"1",'2','3','4','5','6','7','8','9'
          ],
          list2:[],
          list3:[],
        }
    },
    props:{
       visible:Boolean,
    },
    methods:{
      li1Click(event,index) {
        this.li0 = index;
        console.log(event);
        let templist2=[];
        for(let i=0;i<20;i++) {
            templist2.push(index+'list2');
        }
        this.list2 = templist2;
        this.showLi=true;
        this.showLi2 = false;
      },
      li1Click2(event,item,index) {
          this.li1= index;
           let templist3 = [];
           for(let i =0;i<24;i++) {
               templist3 .push(item+'list3');
           };
           this.list3 = templist3;
           this.showLi2 = true;
      },
      dialogClose() {
         this.$emit("listenToConfig",false)
      }
    }
 }
</script>

<style lang="scss">
 .dialogNoServer {
    .ul-block{
       width:100%;
       height:330px;
       overflow-y:auto;
       background-color:white;
       padding-left:0;
       margin:0;
       border-right:1px solid #d1dbe5;
       box-sizing:border-box;
    }
   .li-title {
        border-bottom:1px solid #d1dbe5;
        font-weight:bold
   }
   .commonli-class {
     text-align:center;
     list-style: none;
      font-size:14px;
      padding:8px 30px 8px 10px;
      white-space: nowrap;
      overflow:hiddne;
      text-overflow: ellipsis;
      color:#48576a;
      height:20px;
      line-height:1;
      cursor:pointer;
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
        background-color:#58B7FF;
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
