<template type="html">
    <div class="table-cell">
       <slot text="hello from child"></slot>
    </div>
</template>

<script type="text/javascript">
import {bus} from "@/page/nonServerDistrict/bus.js";
  export default {
     name: "tableColumn",
     props:{
        headerName:String,
        myProps:String
     },
     data() {
        return {
           defParent:this.$parent,
           columnConfig:''
        }
     },
     methods() {

     },
     created(){
       this.columnConfig = {
           headerName:this.headerName,
           myProps:this.myProps
       }
         let parent = this.$parent;

         while(parent && !parent.tableId) {
             parent = parent.$parent;
         }
         this.defParent =  parent;
       // 先等到 table 父类的引用
        // console.log("%oadsfasdfsd",this);
        // console.log("%o from tableColumn from tableColumn from tableColumn from tableColumn from tableColumn from tableColumn from tableColumn  from tableColumn",this);
     },
     mounted(){
         //  alert("dsafsd");
        console.log("headerName:  %o +++  myProps:  %o ++++=",this.columnConfig,this);
         bus.$emit('fromColumn',this.columnConfig);
     }
  }
</script>

<style lang="scss">

</style>
