<template>
  <div id="app">
    <!-- 头部导航 -->
    <header class="header" :class="{ 'header-fixed' : headerFixed }">
    <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple" style="float:left;width:200px;height:60px;text-align:center;line-height:60px;background-color:#324057;color:#fff;">我的快递</div>
          <div class="header-right" style="float:right;width:200px;height:60px;text-align:center;line-height:60px;background-color:#eee;color:#fff;">123456789</div>
          <!--<el-menu default-active="5" class="el-menu-demo" mode="horizontal" @select="">
            <el-menu-item index="1">高级插件</el-menu-item>
            <el-menu-item index="2">在线商城</el-menu-item>
            <el-menu-item index="3">客户管理</el-menu-item>
            <el-menu-item index="4">系统设置</el-menu-item>
            <el-menu-item index="5">活动发布</el-menu-item>
          </el-menu>-->
        </el-col>
    </el-row>
    </header>
    <div v-show="headerFixed" style="position: relative;height: 60px;width: 100%;"></div>

    <main>
          <!-- 左侧导航 -->
        <div class="main-left" style="background-color:#324057;">
          <el-menu default-active="/orderManage" @open="handleOpen" @close="handleClose" class="el-menu-vertical-demo" :router="true" theme="dark" :unique-opened="uniqueOpened">
            <el-menu-item index="/orderManage">定单管理</el-menu-item>
            <el-submenu index="1">
              <template slot="title">运营位管理</template>
              <el-menu-item index="/activePublic" :class="{'isActive': !active}">寄快递首页</el-menu-item>
              <el-menu-item index="1-2">选择快递页</el-menu-item>
            </el-submenu>
            <el-menu-item index="寄快递入口管理">寄快递入口管理</el-menu-item>
            <el-menu-item index="快递公司管理">快递公司管理</el-menu-item>
            <el-menu-item index="选快递下单管理">选快递下单管理</el-menu-item>
            <el-menu-item index="服务类型及折扣管理">服务类型及折扣管理</el-menu-item>
            <el-menu-item index="非服务地区管理">非服务地区管理</el-menu-item>
            <el-submenu index="2">
              <template slot="title">价格管理</template>
              <el-menu-item index="/activeManage" :class="{'isActive': !active}">运线快递费管理</el-menu-item>
            </el-submenu> 
            <el-menu-item index="同城直送管理">同城直送管理</el-menu-item>
            <el-menu-item index="附近快递资源管理">附近快递资源管理</el-menu-item>
            <el-menu-item index="公告管理">公告管理</el-menu-item>
            <el-submenu index="5">
              <template slot="title">用户管理</template>
              <el-menu-item index="5-1">订单取频次管理</el-menu-item>
              <el-menu-item index="5-2">黑名单管理</el-menu-item>
            </el-submenu>  
            <el-menu-item index="退出登录">退出登录</el-menu-item>            
          </el-menu>
        </div>

          <!-- 右侧主内容区 -->
          <div  class="main-right" >
		      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total,sizes,prev, pager, next, jumper"
      :total="400">
    </el-pagination>
            <el-breadcrumb separator="/">
            <div class="main-title"> 
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>活动管理</el-breadcrumb-item>
              <el-breadcrumb-item>活动列表</el-breadcrumb-item>
              <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </div>
              
            </el-breadcrumb>
            <transition name="fade">
              <router-view class="view"></router-view>
            </transition>
          </div>
    </main>
  </div>
</template>

<script>

import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import $ from 'jquery'

Vue.use(Element)

export default {
  name: 'app',
  data: function (){
    return {
      active:true,
      headerFixed : true,
      uniqueOpened : true
    }
  },
  created: function(){
    this.$router.push('/orderManage');
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  watch: {
     '$route': function (to,from) {
         if(to.path == '/orderManage'){
             this.active = true ;
         }else if(to.path == '/activeManage'){
             this.active = false ;
         }else if(to.path == '/activePublic'){
             this.active = false ;
         }
     }
  }
}

</script>

<style>

body{margin: 0;}
#app {
  min-width: 1200px;
  margin: 0 auto;
  font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
}
/* 头部导航 */
header{z-index: 1000;min-width: 1200px;transition: all 0.5s ease;  border-top: solid 4px #3091F2;  background-color: #fff;  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);  }
header.header-fixed{position: fixed;top: 0;left: 0;right: 0;}
header .el-menu-demo{padding-left: 300px!important;}

/* 主内容区 */
main{display: -webkit-box;display: -ms-flexbox;display: flex;  min-height: 800px; background-color: #FCFCFC;  }
main .main-left{-webkit-box-flex: 0;-ms-flex: 0 0 200px;flex: 0 0 200px;}
main .main-right{-webkit-box-flex:1;-ms-flex:1;flex:1; background-color: #f1f1f1; padding: 30px 70px; }
/*main .el-menu{background-color: transparent!important;}*/
/*  */
.router-link{display:inline-block;width:100%;height:100%;text-align:center;color:#475669;text-decoration: none; }
.is-active .router-link{color:#20a0ff; }

/* 单选框 */
  .el-form-item .el-radio+.el-radio {
    margin-left: 30px!important;
  }
  /* 路由切换动效 */
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-active {
    opacity: 0;
    transform: translateY(30px);
  }

/* 导航栏菜单选中效果 */
  .isActive{color: #20a0ff!important;}
   #app main .aside .is-active{color: #475669;}

  /* 卡片 */
  .el-card{overflow: visible!important;}


.main-title{
  padding-bottom:30px;
}


</style>
