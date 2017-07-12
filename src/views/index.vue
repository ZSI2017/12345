<template type="html">
<div id="app">
  <!-- 头部导航 -->
  <header class="header" :class="{ 'header-fixed' : headerFixed }" style="background-color:#5295e2;">
    <el-row>
      <el-col :span="24">
        <div class="grid-content" @click="handleHome" style="float:left;width:250px;height:60px;text-align:center;line-height:60px;background-color:#5295e2;color:#fff;cursor: pointer;">{{ title }}</div>
        <div class="header-right" style="float:right;width:200px;height:60px;text-align:center;line-height:60px;background-color:#5295e2;color:#fff;cursor: pointer;">123456789</div>
      </el-col>
    </el-row>
  </header>
  <div v-show="headerFixed" style="position: relative;height: 60px;width: 100%;"></div>
  <div style="display:flex;flex-direction:row;">

    <div class="main-left" style="position:fixed;top:60px;bottom:0;min-width:230px;width:250px;background-color:#fff;overflow-x: hidden; overflow-y: auto;padding-top:20px;" v-show="fold">
      <el-menu :default-active="$router.path" :unique-opened="uniqueOpened" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handleSelect" router style="background:#fff;">
        <!-- <p style="color:white;text-align:center;font-weight:bold">  后台管理</p> -->
        <template v-for="(items,index) in $router.options.routes">

          <el-submenu :index="index+''"  v-if="items.hasChild&&!items.isHide">
            <template slot="title"><i style="width:30px;display:inline-block;"></i>{{items.name}}</template>
            <!-- <el-menu-item-group> -->
            <!-- <template slot="title">分组一</template> -->
            <el-menu-item v-for="item in items.children" :index="item.path" v-if="!item.isHideChild">
            <i style="width:30px;display:inline-block;"></i>{{item.name}}
            </el-menu-item>


          </el-submenu>
          <el-menu-item v-if="!items.hasChild&&!items.isHide" :index="items.children[0].path">
            <i style="width:30px;display:inline-block;"></i>{{items.children[0].name}}
          </el-menu-item>

        </template>
        <!-- <el-menu-item><i style="width:30px;display:inline-block;"></i>退出登录</el-menu-item> -->
      </el-menu>
    </div>

    <div>

    </div>

    <div
        v-loading.fullscreen.lock="fullscreenLoading"
        element-loading-text="拼命加载中"
        style="width:100%;box-sizing:border-box;padding:20px;padding-left:270px;padding-top:20px;flex:1;background:#f1f1f1;">
      <el-breadcrumb style="padding:10px 0 25px;font-size:16px;line-height:100%;margin-bottom:20px;border-bottom:1px solid #999;" separator="/">
        <!-- {{$route.matched[0].name}} -->
        <el-breadcrumb-item v-if="item.name" v-for="(item,index) in $route.matched" :to="{path:item.path==''?'/':item.path}" :key="item.path">

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
  <el-dialog title="提示" :visible.sync="loadingFlag" size="tiny">
    <span>还没有保存,确定放弃编辑？</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="loadingFlag = false">取 消</el-button>
    <el-button type="primary" @click="editSure">确 定</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
import "@/style/common.scss";
import { getLoadingFlag } from "@/vuex/getters";
// import "../styles/usage/page/app.scss";
// import tableVue from "./views/table";
// import VueRouter  from "vue-router"
// import Vue from 'vue'
// Vue.use(VueRouter);
export default {

  data() {
    return {
      fullscreenLoading:false,
      defaultActive:"",
      loadingFlag: false,
      uniqueOpened: true,
      fold: true,
      headerFixed: true,
      title: "我的快递",
      username: "20392030429404@alipy.com",
      addFlag: false,
      init_width: "init_width",
      input: '',
      msg: 'Use Vue 2.0 Today!',
    }
  },
  created() {
    console.log(this.$route.matched);
  },
  watch: {

  },
  methods: {
    test() {
      alert("dsfsadf");
    },
    handleHome(){
        this.$router.push({path:'/home'});
    },
    editSure(){
       this.loadingFlag = false;
       this.$router.app.$store.state.loadingFlag = true;
       console.log(this);
       this.$router.push({ path:this.defaultActive});
      //  this.$route.push({ path:this.defaultActive});
    },
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
    },
    handleSelect(key, keyPath) {
       this.defaultActive =""+key;
      if (this.$route.path == "/addData") {
          if(this.$router.app.$store.state.loadingFlag == false){
            console.log(this.$route.matched);
            console.log(this.$route.path);
            this.loadingFlag = true;
          }
      }else {
        this.fullscreenLoading = true;
        var _this = this;
        setTimeout( () => {
            _this.fullscreenLoading = false
        },600);
      }
    }
  }
}
</script>
<style scoped lang="scss">
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
.main-left .el-menu-item,
.main-left .el-submenu__title {
    height: 42px;
    line-height: 42px;
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
.el-submenu .is-active {
    border-right: 3px solid #5295e2;
    box-sizing: border-box;
}
.is-active.is-opened {
    border-right: 0;
}
.el-menu-item.is-active {
    background: #f2f7fe;
    border-right: 3px solid #5295e2;
    box-sizing: border-box;
}
.el-submenu .el-menu-item.is-active {
    background: #f2f7fe;
}
.el-submenu .el-menu-item {
    background: #fff;
}
.main-left .el-submenu__title{
  padding-left: 25px !important;
}
.main-left .el-menu-item:hover,.main-left .el-submenu__title:hover{
   background: #eaf8fe;
}
.main-left div.el-submenu__title{
  background: red !important;
}

//////////////// 自定义滑块样式////////////////
::-webkit-scrollbar {
    width: 3px;
    height: 3px;
    background-color: #ccc;
}
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #f1f1f1;
}
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #ccc;
}
//////////////// 自定义滑块样式////////////////
</style>
