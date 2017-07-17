<template type="html">
  <!--  覆盖地区 查看对话框 -->
  <el-dialog title="覆盖地区" :visible.sync="visible" @close="dialogClose">
    <el-table :data="gridData" border :show-header="showHeader" max-height="400">
      <el-table-column property="value" label="省" width="200"></el-table-column>
      <el-table-column property="city" label="市">
        <template scope="scope">
       <el-tag
        style="margin-right:10px;margin-bottom:5px;"
         v-for="(item,index) in scope.row.city"
         :key="index"
         >{{item}}</el-tag>
     </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script type="text/javascript">
      export default {
            data(){
                return {
                  showHeader:false,
                }
            },
            props:{
               visible:Boolean,
               gridData:Array
            },
            methods:{
              dialogClose(event){
                 this.$emit("listenToCoverArea",false)
              }

            },
            created(){

            },
            mounted(){

            },
      }

</script>

<style lang="scss">

</style>
