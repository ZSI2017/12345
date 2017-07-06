<template type="html">
<div id="app">
  <!-- 头部导航 -->
  <header class="header" :class="{ 'header-fixed' : headerFixed }" style="background-color:#5295e2;">
    <el-row>
      <el-col :span="24">
        <div class="grid-content" style="float:left;width:200px;height:60px;text-align:center;line-height:60px;background-color:#5295e2;color:#fff;">{{ title }}</div>
        <div class="header-right" style="float:right;width:200px;height:60px;text-align:center;line-height:60px;background-color:#5295e2;color:#fff;">123456789</div>
      </el-col>
    </el-row>
  </header>
  <div v-show="headerFixed" style="position: relative;height: 60px;width: 100%;"></div>
  <div style="display:flex;flex-direction:row;">

    <div class="main-left" style="position:fixed;top:64px;bottom:0;min-width:200px;width:200px;background-color:#fff;overflow-x: hidden; overflow-y: auto;" v-show="fold">
      <el-menu :default-active="$router.path" :unique-opened="uniqueOpened" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router style="background:#fff;">
        <!-- <p style="color:white;text-align:center;font-weight:bold">  后台管理</p> -->
        <template v-for="(items,index) in $router.options.routes">

          <el-submenu :index="index+''"  v-if="items.hasChild&&!items.isHide">
            <template slot="title" >{{items.name}}</template>
            <!-- <el-menu-item-group> -->
            <!-- <template slot="title">分组一</template> -->
            <el-menu-item v-for="item in items.children" :index="item.path" v-if="!item.isHideChild">
              {{item.name}}
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-if="!items.hasChild&&!items.isHide" :index="items.children[0].path">
            {{items.children[0].name}}
          </el-menu-item>
        </template>
        <el-menu-item>退出登录</el-menu-item>
      </el-menu>
    </div>

    <div>

    </div>

    <div style="padding:20px;padding-left:220px;padding-top:20px;flex:1;background:#f1f1f1;">

      <el-breadcrumb style="padding:10px 0 30px 0;" separator="/">
        <!-- {{$route.matched[0].name}} -->
        <el-breadcrumb-item  v-if="index !=0" v-for="(item,index) in $route.matched" :to="{path:item.path==''?'/':item.path}" :key="item.path">
          {{item.name}}
        </el-breadcrumb-item>
        <!-- <el-breadcrumb-item>运营位</el-breadcrumb-item> -->
      </el-breadcrumb>
      <!--   TODO  对表格进行各种操作     -->

      <!-- <router-view></router-view> -->
      <transition name="slide-fade">
        <router-view></router-view>
      </transition>
      <!-- <tableVue></tableVue> -->


      </el-col>
    </div>
  </div>
</div>
</template>

<script>
// import tableVue from "./views/table";
// import VueRouter  from "vue-router"
// import Vue from 'vue'
// Vue.use(VueRouter);
export default {

  data() {
    return {
      uniqueOpened:true,
      fold:true,
      headerFixed: true,
      title: "我的快递",
      username: "20392030429404@alipy.com",
      addFlag: false,
      init_width: "init_width",
      input: '',
       msg: 'Use Vue 2.0 Today!',
    }
  },
  ready() {
    console.log("adfsd" + this.$route.matched);
  },
  methods: {

    startHacking() {
      this.$notify({
        title: 'It Works',
        message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
        duration: 6000
      })
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="scss">
//  设置enter 和 leave 的路由动画
.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slid-fade-leave-active {
    transition: all 0.8s cubic-bezier(1.0,0.5,0.8,1.0);
}
.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}
.main-left .el-menu-item,.main-left .el-submenu__title{
  height:40px;
  line-height:40px;
}
body {
    font-family: Helvetica, sans-serif;
    padding: 0;
    margin: 0;
    background-color: #f3f3f3;
}
.section {
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
    border:1px solid #D3DCE6;
    border-radius: 4px;
    padding:20px;
    background-color: white;

}

// .header {
//      font-size:20px;
//      font-weight: bold;
//      line-height:1;
//      width:100%;
//      height:60px;
//      background:#475669;
//      .el-col{
//         height:60px;
//      }
// }
// .init_width{
//      text-align: center;
//      line-height: 60px;
//      width:257px;
//      height:60px;
//      color:white;
//     border-right:1px solid white
// }
el-menu {
    width: 50px;
}
header {
    z-index: 1000;
    min-width: 1200px;
    transition: all 0.5s ease;
    border-top: solid 4px #3091F2;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
}
header.header-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}
header .el-menu-demo {
    padding-left: 300px !important;
}
.is-active{
  border-right: 3px solid #5295e2;
  box-sizing: border-box;
}
.is-active.is-opened{
  border-right: 0;
}
//////////////// 自定义滑块样式////////////////
::-webkit-scrollbar
{
    width: 3px;
    height: 3px;
    background-color: #3091F2;
}
::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
}
::-webkit-scrollbar-thumb
{
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #3091F2;
}
//////////////// 自定义滑块样式////////////////
</style>
