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
                  <col width="25%"/>
                  <col width="25%"/>
                  <col width="25%"/>
                  <col width="25%"/>
              </colgroup>
                <tr>
                    <th colspan="1" > 快递公司名称</th>
                    <th colspan="1" >非服务地区</th>
                    <th colspan="1" > 修改时间</th>
                    <th colspan="1" >操作</th>

                </tr>
          </table>
     </section>
</template>
<script type="text/javascript">
     name:"tableHeader"
     export default {
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
