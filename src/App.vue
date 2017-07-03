<template>

  <!--<div id="app">
    <header class="header" :class="{ 'header-fixed' : headerFixed }">
    <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple" style="float:left;width:200px;height:50px;text-align:center;line-height:50px;background-color:#324057;color:#fff;">我的快递</div>
          <div class="header-right" style="float:right;width:200px;height:50px;text-align:center;line-height:50px;background-color:#eee;color:#fff;">123456789</div>
        </el-col>
    </el-row>
    </header>
    <div v-show="headerFixed" style="position: relative;height: 54px;width: 100%;"></div>

    <main>
        <div class="main-left" style="background-color:#324057;">
          <el-menu default-active="/orderManage" @open="handleOpen" @close="handleClose" class="el-menu-vertical-demo" :router="true" theme="dark" :unique-opened="uniqueOpened">
            <el-menu-item index="/orderManage">定单管理</el-menu-item>
            <el-submenu index="/sendExpress">
              <template slot="title">运营位管理</template>
              <el-menu-item index="/sendExpress">寄快递首页</el-menu-item>
              <el-menu-item index="/chooseExpress">选择快递页</el-menu-item>
              <el-menu-item index="/expressOrder">选快递下单</el-menu-item>              
            </el-submenu>
            <el-menu-item index="/sendExpressEnter">寄快递入口管理</el-menu-item>
            <el-menu-item index="/expressCompany">快递公司管理</el-menu-item>
            <el-menu-item index="/chooseExpressOrder">选快递下单管理</el-menu-item>
            <el-menu-item index="/serverTypeDiscount">服务类型及折扣管理</el-menu-item>
            <el-menu-item index="/nonServerDistrict">非服务地区管理</el-menu-item>
            <el-submenu index="2">
              <template slot="title">价格管理</template>
              <el-menu-item index="/priceManage">运线快递费管理</el-menu-item>
            </el-submenu> 
            <el-menu-item index="/oneCitySend">同城直送管理</el-menu-item>
            <el-menu-item index="/table">附近快递资源管理</el-menu-item>
            <el-menu-item index="/noticeManage">公告管理</el-menu-item>
            <el-submenu index="5">
              <template slot="title">用户管理</template>
              <el-menu-item index="/orderCancle">订单取消频次管理</el-menu-item>
              <el-menu-item index="/blankList">黑名单管理</el-menu-item>
            </el-submenu>  
            <el-menu-item index="退出登录">退出登录</el-menu-item>            
          </el-menu>
        </div>


          <div  class="main-right" >
            <el-breadcrumb separator=">">
              <div class="main-title"> 
                <el-breadcrumb-item>{{ topTitle }}</el-breadcrumb-item>
              </div>

            </el-breadcrumb>
            <transition name="fade" mode="out-in">
              <router-view class="view"></router-view>
            </transition>
          </div>
    </main>
  </div>-->


    <div id="app">
       <router-view></router-view>
    </div>

</template>

<script>
  export default {
        data() {
            return {}
        },
        ready(){

        },
        methods(){


// export default {
//   name: 'app',
//   data: function (){
//     return {
//       headerFixed : true,
//       uniqueOpened : true,
//       topTitle : ""
//     }
//   },
//   created: function(){
//     this.$router.push('/orderManage');
//   },
//   methods: {
//     handleOpen(key, keyPath) {
//       console.log(key, keyPath);
//     },
//     handleClose(key, keyPath) {
//       console.log(key, keyPath);
//     }
//   },
//   watch: {
//      '$route': function (to,from) {
//          if(to.path == '/orderManage'){
//              this.topTitle = "订单管理";
//          }else if(to.path == '/priceManage'){
//              this.topTitle = "价格管理 > 运营线快递费管理";
//          }else if(to.path == '/sendExpress'){
//              this.topTitle = "运营单位管理>寄快递首页";
//          }else if(to.path == '/chooseExpress'){
//              this.topTitle = "运营单位管理 > 选择快递页";
//          }else if(to.path == '/expressOrder'){
//              this.topTitle = "运营单位管理>选快递下单";
//          }else if(to.path == '/sendExpressEnter'){
//              this.topTitle = "寄快递入口";
//          }else if(to.path == '/expressCompany'){
//              this.topTitle = "快递公司管理";
//          }else if(to.path == '/chooseExpressOrder'){
//              this.topTitle = "快递下单管理";
//          }else if(to.path == '/serverTypeDiscount'){
//              this.topTitle = "服务类型及折扣管理";
//          }else if(to.path == '/nonServerDistrict'){
//              this.topTitle = "非服务地区管理";
//          }else if(to.path == '/oneCitySend'){
//              this.topTitle = "同城直送管理";
//          }else if(to.path == '/table'){
//              this.topTitle = "附近快递资源管理";
//          }else if(to.path == '/noticeManage'){
//              this.topTitle = "公告管理";
//          }else if(to.path == '/orderCancle'){
//              this.topTitle = "用户管理 > 订单取消频次管理";
//          }else if(to.path == '/blankList'){
//              this.topTitle = "用户管理>订单取消频次管理";
//          }
//      }

        }

  }

</script>

<style>

/* 主内容区 */


/* 导航栏菜单选中效果 */
  /*.isActive{color: #20a0ff!important;}
   #app main .aside .is-active{color: #475669;}*/




</style>
