<template type="html">
     <section class="tableHeader">
          <table
              border="0"
              cellspacing="0"
              bgcolor="white"
              width="100%"
              align="center"
              >
              <colgroup>
                  <col width="48"  v-for="(item,index) in store"  :key="index"/>
              </colgroup>
                <tr>
                    <th colspan="1" v-for="(item,index) in store" :key="index"> {{item.headerName}}</th>
                </tr>
          </table>
     </section>
</template>
<script type="text/javascript">
     name:"tableHeader"
     export default {
           props:{
             store:Array,
             tableData:Array,
           },
           data(){
               return {

               }
           },
           methods:{

           },

     }
</script>
<style lang="scss">
    .tableHeader {
        table {
             border:1px solid #dfe6ec;
             text-align:center;
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
