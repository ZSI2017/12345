<template type="html">
  <section class="tableBody">
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
            <td> 1</td>
            <td>2</td>
            <td> 1</td>
            <td>2</td>
          </tr>
          <tr>
            <td> 1</td>
            <td>2</td>
            <td> 1</td>
            <td>2</td>
          </tr>
          <tr>
            <td> 1</td>
            <td>2</td>
            <td> 1</td>
            <td>2</td>
          </tr>
          <tr>
            <td> 1</td>
            <td>2</td>
            <td> 1</td>
            <td>2</td>
          </tr>
          <tr>
            <td> 1</td>
            <td>2</td>
            <td> 1</td>
            <td>2</td>
          </tr>
    </table>

  </section>
</template>
<script type="text/javascript">
    name:"tableBody";
    export default {
        data(){
            return {

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
