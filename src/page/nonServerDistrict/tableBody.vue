<template type="html">
  <section class="tableBody">
      <!-- <table-column /> -->
    <table
        border="0"
        cellspacing="0"
        bgcolor="white"
        width="100%"
        align="center"
        >
        <colgroup>
            <col  v-for="(item,index) in store"  :key="index"/>
        </colgroup>
          <tr v-for="(items,indexs) in sourceData">
            <td v-for="(item,index) in store ">
                {{items[item.myProps]}}
                <!-- <table-column /> -->
             </td>
          </tr>
    </table>

  </section>
</template>
<script type="text/javascript">
import tableColumn from "@/page/nonServerDistrict/tableColumn"
    name:"tableBody";
    export default {
        components: {
          tableColumn
        },
        props:{
          store:Array,
          tableData:Array
        },
        data(){
            return {
               sourceData:[],
            }
         },
         mounted(){
            console.log("%c from tableBody： %o","color:pink",this.store);
         },
         watch:{
             tableData(newValue) {
                 this.sourceData = newValue;
                  console.log("%c from tableBody： %o","color:red",newValue);
             }
         },
         methods(){

         },

    }
</script>
<style lang ="scss">
     .tableBody {
         table {
              border:1px solid #dfe6ec;
              text-align:center;
              height:100px;
           },
          th {
            line-height: 30px;
             background-color:#eef1f6;
          },
         th+th {
            border-left:1px solid #dfe6ec
         }
         tr:hover{
            background-color: #eef1f6;
         }
         tr+tr {
           td {
                  border-top:1px solid #dfe6ec;
           }
         }
     }
</style>
