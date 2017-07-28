<template type="html">
   <section class="">
      <div class="my_header">
          <table-header
             :store="storeData"
             :tableData = "sourceData"
          >
          </table-header>
      </div>
      <div class="my_body">
           <table-body
             :store="storeData"
             :tableData="sourceData"
           >
           </table-body>
      </div>
      <slot>
      </slot>
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
          }
       },
       created() {
         this.ColumnData=[];

         bus.$on("fromColumn",(columnConfig) => {
              // alert("my table");
              console.log("%c this is from MyTable.vue","background-color:black");
              this.ColumnData.push(columnConfig)

         })
         console.log(" %cthis is from MyTable:%o ","color:green",this.ColumnData);
       },
       mounted(){

       },
       watch:{
             data(newVal){
                  this.sourceData = newVal;
                  console.log("%cthis is from MyTable:%o ","color:blue",newVal)
                  //  if (this.storeData) {
                  //    this.data = newVal;
                  //  }
             }
       },
       computed:{
           storeData() {
               return this.ColumnData
           }
          //  sourceData(){
          //         console.log("%cthis is from MyTable:%o ","color:yellow",this.data)
          //       return this.data
          //  }
       }

  }
</script>
<style lang="scss">

</style>
