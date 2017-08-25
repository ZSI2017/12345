<template type="html">
   <section class="">
     <div class="hidden-columns">
         <slot></slot>
     </div>
      <div class="my_header">
          <table-header
             :store="storeData"
             :tableData = "sourceData"
             :scrollY= "scrollY"
             :bodyWarpper= "bodyWarpper"
          >
          </table-header>
      </div>
      <div
          class="my_body"
          ref="mybody"
         >
           <table-body
             :store="storeData"
             :tableData="sourceData"
             :scrollY= "scrollY"
           >
           </table-body>
      </div>
   </section>
</template>
<script type="text/javascript">
   import tableBody from "@/page/nonServerDistrict/tableBody";
   import tableHeader from "@/page/nonServerDistrict/tableHeader";
   import {bus}  from "@/page/nonServerDistrict/bus"
   export default {
    name:'table',
    components: {
        tableBody,
        tableHeader
    },
     props:{
        data:Array,
      },
      data() {
          return {
            sourceData:[],
             tableId:"myTable",
             ColumnData:[],
             scrollY:false
          }
       },
       created() {
         this.ColumnData=[];
         bus.$data.bodyWrapper = this.$refs.mybody;
         bus.$on("fromColumn",(columnConfig) => {
              // alert("my table");
              // console.log("%c this is from MyTable.vue","background-color:black");
              this.ColumnData.push(columnConfig);
              let _self = this;
              setTimeout(function(){
                  // alert(_self.$refs.mybody.querySelector("table").offsetHeight> _self.$refs.mybody.offsetHeight);
               },10000);
            //
            //  this.$nextTick(()=> {alert(this.scrollY)});
           })
           ()
         console.log(" %cthis is from MyTable:%o ","color:green",this.ColumnData);
       },
       mounted(){

       },
       watch:{
             data(newVal){
                  this.sourceData = newVal;
                  console.log("%cthis is from MyTable:%o ","color:blue",newVal)
                  let _this = this;
                  setTimeout(function(){
                    //  alert(_this.$refs.mybody.querySelector("table").offsetHeight);
                    //  alert(_this.$refs.mybody.offsetHeight)
                     _this.scrollY = _this.$refs.mybody.querySelector("table").offsetHeight<=_this.$refs.mybody.offsetHeight;
                   },10)
                  // console.log(this.$refs.mybody);
                  //  alert();

                  //  if (this.storeData) {
                  //    this.data = newVal;
                  //  }
             }
       },
       computed:{
           storeData() {
               return this.ColumnData
           },
           bodyWarpper(){
                return this.$refs.mybody
           }
          //  sourceData(){
          //         console.log("%cthis is from MyTable:%o ","color:yellow",this.data)
          //       return this.data
          //  }
       }

  }
</script>
<style lang="scss">
    .hidden-columns {
        visibility: hidden;
        position: absolute;
        z-index: -1;
    }


</style>
