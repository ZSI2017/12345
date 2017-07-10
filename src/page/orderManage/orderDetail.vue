<<template>
  <div class="section">
    <el-row>
        <el-col :span="24"><h1 class="grid-content bg-purple-dark orderTitle">订单号：123456789</h1></el-col>
    </el-row>
    <el-row>
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="基本信息" name="0">
                <el-row class="basic-table">
                    <el-col :md="12" :lg="6" v-for="item in items">
                        <div class="grid-content bg-purple">
                            <el-col :span="12" class="cell-left">{{item.name}}</el-col >
                            <el-col :span="12" class="cell-right">{{item.message}}</el-col>
                        </div>
                    </el-col>            
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
        <el-collapse-item title="揽收员信息" name="4">
            <el-row class="courier-table">
                <el-col :span="24" v-for="courier in couriers"><div class="grid-content bg-purple"><el-col :span="3">{{courier.name}}：</el-col ><el-col :span="18">{{courier.message}}</el-col></div></el-col>      
            </el-row>
        </el-collapse-item>
        <el-collapse-item title="快递费用" name="5">
            <el-row class="expressPay-table">
                <el-col :span="24" v-for="expressPay in expressPays"><div class="grid-content bg-purple"><el-col :span="3">{{expressPay.name}}：</el-col ><el-col :span="18">{{expressPay.message}}</el-col></div></el-col>           
            </el-row>
        </el-collapse-item>
        <el-row class="footer">
            <el-button class="return" type="primary" @click="$router.go(-1)">返回</el-button>
            <el-button class="complateInfo" type="primary">查看完整信息</el-button>
            <el-button class="serverRecord" type="primary">查看信息服务</el-button>
        </el-row>

    </el-collapse>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeNames: ['0','1','2','3','4',"5"],
        items:[{
            name: "快递公司",
            message: '德邦快递',
          },
          {
            name: "实际承运公司",
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
            name: "类型",
            message: '日用品',
        },
        {
            name: "物品重量",
            message: '18T',
        },{
            name: "额外服务",
            message: '北京市朝阳区几乎几乎没有这个服务',
        },{
            name: "备注",
            message: '北京市朝阳区几乎几乎没有这个备注',
        }],
        couriers:[{
            name: "揽件员信息",
            message: '暂无',
        },
        {
            name: "联系电话",
            message: '暂无',
        }],
        expressPays:[{
            name: "支付方式",
            message: '支付宝在线支付',
        },
        {
            name: "预计费用",
            message: "￥11.00",
        },
        {
            name: "实际费用",
            message: '未支付',
        }],
      }

    },
     methods: {


     }

  }
</script>

<style>
    .orderTitle{
        height: 60px;
        line-height: 60px;
    }
    @media screen and (min-width: 1201px) { 
        .cell-left{
            border-top: 1px solid #333;
            text-align: left;
            background: #e1e1e1;
            box-sizing:border-box;
            white-space:nowrap;
            text-indent: 5px;
        }
        .cell-right{
            background: #fff;
            border: 1px solid #333;
            border-bottom:0;
            text-align: left;
            white-space:nowrap;
            text-indent: 5px;
        }
        .basic-table .el-col:nth-child(n+9){
            border-bottom: 1px solid #333;
        }
        .basic-table .el-col:nth-child(4n+1) .cell-left{
            border-left:1px solid #333;
        }
    } 
    @media screen and (max-width: 1201px) { 
        .cell-left{
            border-left: 1px solid #333;
            border-top: 1px solid #333;
            text-align: left;
            background: #e1e1e1;
            box-sizing:border-box;
            white-space:nowrap;
            text-indent: 5px;
        }
        .cell-right{
            overflow: hidden;
            background: #fff;
            border-left: 1px solid #333;
            border-top: 1px solid #333;
            text-align: left;
            white-space:nowrap;
            text-indent: 5px;
        }
        .basic-table .el-col:nth-child(2n) .cell-right{
            border-right: 1px solid #333;
        }
        .basic-table .el-col:nth-child(11),.basic-table .el-col:nth-child(12){
            border-bottom:1px solid #333;
        }
    } 

    @media screen and (max-width: 901px) { 
        .cell-left{
            /*border-top: 1px solid #333;*/
            text-align: left;
            background: #e1e1e1;
            box-sizing:border-box;
            white-space:nowrap;
        }
       .cell-right{
           /*border-top: 1px solid #333;*/
            background: #fff;
            /*border: 1px solid #333;*/
            /*border-bottom:0;*/
            text-align: center;
            white-space:nowrap;
        }
        .basic-table .el-col:nth-child(2n+1) .cell-right{
            border-right: 1px solid #333;
        }
        .basic-table .el-col:nth-child(11){
            border-bottom: 0;
        }
         /*
        .basic-table .el-col:nth-child(n+9){
            border-bottom: 1px solid #333;
        }
        .basic-table .el-col:nth-child(4n+1) .cell-left{
            border-left:1px solid #333;
        }*/
    } 
    .footer{
        padding:20px 0;
    }



 
</style>

