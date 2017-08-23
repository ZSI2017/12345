<template type="html">
<div id="app">
  <!-- 头部导航 -->
  <header class="header" :class="{ 'header-fixed' : headerFixed }" style="background-color:#5295e2;">
    <el-row>
      <el-col :span="24">
        <div class="grid-content" @click="handleHome" style="float:left;width:230px;height:60px;text-align:center;line-height:60px;color:#fff;cursor: pointer;">{{ title }}</div>
        <div class="header-right" style="float:right;width:400px;height:60px;text-align:center;line-height:60px;color:#fff;cursor: pointer;padding-right:20px;">
          <el-row>
            <el-col :span="17"><div class="grid-content">当前用户: {{userID}}</div></el-col>
            <el-col :span="7"><div class="grid-content" @click="handleLogout">退出登录</div></el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </header>
  <div v-show="headerFixed" style="position: relative;height: 60px;width: 100%;"></div>
  <div style="display:flex;flex-direction:row;" >

    <div
      class="main-left" style="position:fixed;top:60px;bottom:0;min-width:180px;width:220px;background-color:#fff;overflow-x: hidden; overflow-y: auto;padding-top:20px;"
      v-loading.body.fullscreen.lock="fullscreenLoading"
      v-show="fold"
      >
      <el-menu  v-if="menuFlag" :default-active="$route.fullPath" :unique-opened="uniqueOpened" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handleSelect" router style="background:#fff;">
        <!-- <p style="color:white;text-align:center;font-weight:bold">  后台管理</p> -->
        <template v-for="(items,index) in $router.options.routes">

          <el-submenu :index="index+''"  v-if="items.hasChild&&!items.isHide">
            <template slot="title"><i style="width:20px;display:inline-block;"></i>{{items.name}}</template>
            <!-- <el-menu-item-group> -->
            <!-- <template slot="title">分组一</template> -->
            <el-menu-item v-for="(item,index) in items.children" :index="item.path" v-if="!item.isHideChild" :key="index">
            <i style="width:20px;display:inline-block;"></i>{{item.name}}
            </el-menu-item>


          </el-submenu>
          <el-menu-item v-if="!items.hasChild&&!items.isHide" :index="items.children[0].path">
            <i style="width:20px;display:inline-block;"></i>{{items.children[0].name}}
          </el-menu-item>

        </template>
        <!-- <el-menu-item><i style="width:30px;display:inline-block;"></i>退出登录</el-menu-item> -->
      </el-menu>
    </div>

    <div>

    </div>

    <div style="width:100%;box-sizing:border-box;padding:20px;padding-left:250px;padding-top:20px;flex:1;background:#f1f1f1;">

      <el-breadcrumb v-bind:class="{ active: isActive }" style="padding:20px 0 20px 25px;line-height:100%;border:1px solid #D3DCE6;border-radius: 5px 5px 0 0;border-bottom:0;background:#fff;" separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="item.name&&item.name !='首页'" v-for="(item,index) in $route.matched" :to="{path:item.path}" :key="item.path">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <!--   TODO  对表格进行各种操作     -->

      <!-- <router-view></router-view> -->
      <!--<transition name="slide-fade">-->
          <router-view></router-view>
      <!--</transition>-->
      <!-- <tableVue></tableVue> -->
      </el-col> </div>
  </div>
  <el-dialog title="提示" :visible.sync="loadingFlag" size="tiny"  custom-class="dialogWidth" :show-close="showClose">
    <i class="el-icon-warning" style="color:#F7BA2A;padding-right:10px;font-size: 36px!important;position: absolute;top: 33%;"></i>
    <p style="font-weight:bold;padding-left:44px;">您还没有保存，确定放弃编辑？</p>
    <span style="padding-left:44px;">放弃后，将不会保存您刚才所编辑的内容</span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="hideCountFlag">编 辑</el-button>
        <el-button type="primary" @click="editSure">放 弃</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import "@/style/common.scss";
import { getLoadingFlag } from "@/vuex/getters";
import localEvent from 'src/vuex/function.js';
import Cookie from "@/util/cookie.js"
// import "../styles/usage/page/app.scss";
// import tableVue from "./views/table";
// import VueRouter  from "vue-router"
// import Vue from 'vue'
// Vue.use(VueRouter);
export default {
  data() {
    return {
      menuFlag:true,
      showClose:false,
      fullscreenLoading:false,
      defaultActive:"",
      // loadingFlag: false,
      uniqueOpened: true,
      fold: true,
      headerFixed: true,
      // userID:"2088702773405612@alipay",
      title: "寄件平台运营管理系统",
      input: '',
      isActive:false
    }
  },
  computed:{
      loadingFlag() {
          return this.$store.state.loadingFlag;
      },
      Authority() {
        return this.$store.getters.getAuthority;
      },
      userID() {
          return this.$store.state.uid;
      }
  },
  mounted() {
      this.sayHello();
  },
  created() {
    this.menuFlag = false;
    // this.menuFlag = true;
    if(this.$router.currentRoute.fullPath == "/home") {
        this.isActive = true;
    }
    var _this = this;
    setTimeout(() => {
      console.log(_this);
        _this.menuFlag = true;
    },400);
    console.log("router");
    console.log(this);
  },
  watch: {
    '$route': function(to, from) {
      if (to.path == "/home") {
        this.isActive = true
      }else{
        this.isActive = false
      }
    }
  },
  methods: {
    sayHello:function(){
       console.log("hello from  index.vue!");
    },
    hideCountFlag () {
        this.$store.dispatch('changeLoadingFlag');
        this.$store.dispatch('changeLoadingChange',false);
        // this.$router.app.$store.state.loadingChange = false;
    },
    handleHome(){
        this.$router.push({path:'/home'});
    },
    editSure(){
      this.$store.dispatch('changeLoadingFlag');
      //  this.loadingFlag = false;
      this.$store.dispatch('changeLoadingChange',true);
      //  this.$router.app.$store.state.loadingChange = true;
      //  console.log(this);
      this.$router.push({ path:this.$store.getters.getNextRouter});
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
         this.PageStore.commit("setPage",1);
         this.PageStore.commit("setRadio",1);
         this.PageStore.commit("setTabName",this.Authority == "审核"?"已上线":'配置');
      if (this.$route.path == "/sendExpress/addData"
           ||this.$route.path == "/sendExpressEnter/addData"
           ||this.$route.path == "/chooseExpress/addData"
           ||this.$route.path == "/expressOrder/addData"
           ||this.$route.path == "/noticeManage/addData"
           ||this.$route.path == "/nearExpress/addData"
           ||this.$route.path == "/oneCitySend/addData"
           ||this.$route.path == '/expressCompany/addData'
           ||this.$route.path == '/chooseExpressOrder/addData'
        ) {
          if(this.$store.getters.getLoadingFlag === false){
            // console.log(this.$route.matched);
            // console.log(this.$route.path);
            // this.loadingFlag = true;
          }
      }else {

        var _this = this;

        this.fullscreenLoading = true;
        // console.log(_this.fullscreenLoading);
        setTimeout(() => {
            _this.fullscreenLoading = false;
            console.log(_this.fullscreenLoading);
        },600);
      }
    },
    handleLogout(){
       let _this = this;
        this.$http.post('/api/logout',{},(result)=>{
              _this.$store.dispatch('setLoginOutFlag',true);
              let topLevel_domains = ".alipay-eco.com"
              console.log(topLevel_domains);
              localEvent.clear("ACL");
              Cookie.delete("SMJSESSIONID");
              Cookie.delete('ALIPAYJSESSIONID');
              Cookie.delete("ctoken",topLevel_domains);
              Cookie.delete('ECOACLJSESSIONID',topLevel_domains);
              Cookie.delete('express1');
              _this.$router.push({path:'/login'});
        })

    }
  }
}
</script>
<style scoped lang="scss">
//  设置enter 和 leave 的路由动画
// .slide-fade-enter-active {
//     transition: all 0.3s ease;
// }
// .slid-fade-leave-active {
//     transition: all 0.8s cubic-bezier(1.0,0.5,0.8,1.0);
// }
// .slide-fade-enter,
// .slide-fade-leave-to {
//     transform: translateX(10px);
//     opacity: 0;
// }
.dialogWidth{
  width:23% !important
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
.active{
  display:none;
}
el-menu {
    width: 50px;
}
header {
    z-index: 1000;
    min-width: 1200px;
    transition: all 0.5s ease;
    // border-top: solid 4px #3091F2;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
}
header.header-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}
.grid-content:hover{
  background: #79a8eb;
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
