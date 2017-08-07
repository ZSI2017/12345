<template type="html">
  <!--  覆盖地区 查看对话框 -->
  <el-dialog title="覆盖地区" :visible.sync="visible" @close="dialogClose">
    <el-table :data="transformGridData" border :show-header="showHeader" max-height="400">
      <el-table-column property="provinceName" label="省" width="200"></el-table-column>
      <el-table-column property="cityss" label="市">
        <template scope="scope">
       <el-tag
        style="margin-right:10px;margin-bottom:5px;"
         v-for="(item,index) in scope.row.cityss"
         :key="index"
         type="primary"
         >{{item.cityName}}</el-tag>
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
               coverGridData:Array,
            },
            methods:{
              dialogClose(event){
                 this.$emit("listenToCoverArea",false)
              },
              filterProvinces(list){
                if(typeof list === 'undefined') return;
                var tempArr = list.slice(0);
                 for(let i =0;i<tempArr.length;i++) {
                     console.log(!tempArr[i].check);
                      if(!tempArr[i].check){
                          console.log(tempArr[i]);
                          tempArr[i].cityss = tempArr[i].citys.filter(function(val){return val.check == true})
                      }else {
                         tempArr[i].cityss = tempArr[i].citys
                      }
                      if(tempArr[i].cityss.length === 0) {
                           tempArr.splice(i,1)
                            i--;
                      }
                 }
                //  for(let j =0;j<tempArr.length;j++) {
                //     if(tempArr[j].citys.length === 0) {
                //          tempArr.splice(j,1)
                //     }
                //  }
                 console.log("temparr %o",tempArr);
                 return tempArr;
              }
            },
            created(){

            },
            computed:{
               transformGridData(){
                  return this.filterProvinces(this.coverGridData)
               }
            },
            mounted(){

            },
      }

</script>

<style lang="scss">

</style>
