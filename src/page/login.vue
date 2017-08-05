<template>
<section class="login">
  <h1>支付宝我的快递-- 寄件管理后台</h1>
  <el-button type="primary" size="large" @click="loginIn">登 录</el-button>
</section>
</template>
<script type="text/javascript">
import Cookie from "@/util/cookie.js"
export default {
  data() {
    return {

    }
  },
  created() {
     // 模拟 权限管理
    //  隐藏 或者显示 导航菜单 服务类型及折扣改管理
    // let routerArr = this.$router.options.routes;
    // for (var i = 0; i < routerArr.length; i++) {
    //   if (typeof routerArr[i].children !== undefined && routerArr[i].children[0].name === "*务类型及折扣管*") {
    //     this.$router.options.routes[i].isHide = true;
    //   }
    // }
    // this.$router.options[0].name = "awdsfasdfsad";
    console.log(this.$router.options.routes);
  },
  methods: {
    loginIn() {
      const URL = "/loginProxy"
      this.$http.get(URL,{
        "realUrl":"http://192.168.11.88:8080/#/home"
      }, (result) => {
          // _this.totalCount = result.page_list.length; //获取数据长度
      });
      Cookie.set("express","mng",6000000);
      this.$router.push({
        path: "/"
      })
    }
  }
}
</script>
<style lang="scss">
.login {
    text-align: center;
    margin: 300px auto;
}
</style>
