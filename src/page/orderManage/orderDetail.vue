<template>
  <div class="section">
    <el-row>
        <el-col :span="24"><h1 class="grid-content bg-purple-dark orderTitle">订单号：123456789</h1></el-col>
    </el-row>
    <el-row>
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="基本信息" name="0">

                <el-table border :show-header="showHeader" :data="items" v-loading.fullscreen.lock="listLoading" style="width: 100%" max-height="550" empty-text="_" align="center" :default-sort="{prop: 'date', order: 'descending'}">
                  <el-table-column prop="1" label="1" >
                  </el-table-column>
                  <el-table-column prop="2" label="2" >
                  </el-table-column>
                  <el-table-column prop="3"  label="3">
                  </el-table-column>
                  <el-table-column prop="4"  label="4">
                  </el-table-column>
                  <el-table-column prop="5" label="5">
                  </el-table-column>
                  <el-table-column prop="6" label="6">
                  </el-table-column>
                  <el-table-column prop="7" label="7">
                  </el-table-column>
                  <el-table-column prop="8" label="8">
                  </el-table-column>
                </el-table>
            </el-collapse-item>
        </el-collapse>
    </el-row>
    <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="寄件人信息" name="1">
            <el-row class="sender-table">
                <el-col :span="24" v-for="senderItem in senderItems"><div class="grid-content bg-purple"><el-col :span="3">{{senderItem.name}}：</el-col ><el-col :span="18">{{senderItem.message}}</el-col></div></el-col>
            </el-row>
        </el-collapse-item>
        <el-collapse-item title="收件人信息" name="2">
            <el-row class="sender-table">
                <el-col :span="24" v-for="senderItem in senderItems"><div class="grid-content bg-purple"><el-col :span="3">{{senderItem.name}}：</el-col ><el-col :span="18">{{senderItem.message}}</el-col></div></el-col>
            </el-row>
        </el-collapse-item>
        <el-collapse-item title="物品信息" name="3">
            <el-row class="goods-table">
                <el-col :span="24" v-for="goodsItem in goodsItems"><div class="grid-content bg-purple"><el-col :span="3">{{goodsItem.name}}：</el-col ><el-col :span="18">{{goodsItem.message}}</el-col></div></el-col>
            </el-row>
        </el-collapse-item>
        <el-collapse-item title="可控 Controllability" name="4">
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
        </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        showHeader:false,
        activeNames: ['0','1','2','3','4'],
        items:[],
        goodsItems:[{
            type: "寄件人",
            weight: '尼古拉是凯奇',
            server:""
        }]
      };
    },
    created(){
        var _this = this;
        var tableList=[];
        _this.$http.get("/rest/list4")
          .then(function(rsp) {
              let data = rsp.data.data;
              let lastData = [];
              for(var k =0;k<3;k++){
                  var obj = {};
                  var count = 1;
                  for(var i =k*4;i<(k*4+4);i++) {
                    obj[count]=data[i]["name"];
                    count ++ ;
                    obj[count]=data[i]["message"];
                    count ++ ;
                  }
                  lastData.push(obj);
            }
            // console.log(lastData);
            _this.items = lastData;

          })
          .catch(function(error) {
            console.log(error);
          })

        console.log(this.$route.matched);

    }
  }
</script>

<style>
.el-table__row td:nth-child(2n+1){
    background-color:#f5f5f5;
}
    .orderTitle{
        height: 60px;
        line-height: 60px;
    }
    .cell-left{
        border-top: 1px solid #333;
        text-align: left;
        background: #e1e1e1;
        box-sizing:border-box;
    }
    .cell-right{
        background: #fff;
        border: 1px solid #333;
        border-bottom:0;
        text-align: center;
    }
    .basic-table .el-col:nth-child(n+9){
        border-bottom: 1px solid #333;
    }
    .basic-table .el-col:nth-child(4n+1) .cell-left{
        border-left:1px solid #333;
    }


</style>
