<<template>
  <div class="section">
    <el-row>
        <el-col :span="24"><h1 class="grid-content bg-purple-dark orderTitle">订单号：123456789</h1></el-col>
    </el-row>
    <el-row>
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="基本信息" name="0">
                
                <el-row class="basic-table">
                    <el-col :span="6" v-for="item in items"><div class="grid-content bg-purple"><el-col :span="9" class="cell-left">{{item.name}}</el-col ><el-col :span="15" class="cell-right">{{item.message}}</el-col></div></el-col>            
                </el-row>
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
        activeNames: ['0','1','2','3','4'],
        items:[{
            name: "快递公司",
            message: '德邦快递',
          },
          {
            name: "实际承运物流公司",
            message: '暂无',
          },
          {
            name: "运单号",
            message: '暂无',
          },
          {
            name: "取件码",
            message: '暂无',
          },
          {
            name: "期望上门时间",
            message: '2017-06-20 10:00:00-6:00:00',
          },
          {
            name: "下单时间",
            message: '2017-06-20 10:00:00-6:00:00',
          },
          {
            name: "接单时间",
            message: '暂无',
          },
          {
            name: "运单回传时间",
            message: '暂无',
          },
          {
            name: "物流公司订单号",
            message: '暂无',
          },
          {
            name: "是否转快递",
            message: 'fou',
          },
          {
            name: "账单回传时间",
            message: '暂无',
          },
          {
            name: "订单状态",
            message: '订单已取消',
          }
        ],
        senderItems:[{
            name: "寄件人",
            message: '尼古拉是凯奇',
        },
        {
            name: "联系电话",
            message: '1888888888',
        },{
            name: "寄件地址",
            message: '北京市朝阳区几乎几乎没有这个地址',
        }],
        goodsItems:[{
            type: "寄件人",
            weight: '尼古拉是凯奇',
            server:""
        }]
      };
    }
  }
</script>

<style>
    .orderTitle{
        height: 60px;
        line-height: 60px;
    }
    .cell-left{
        border-top: 1px solid #333;
        text-align: center;
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

