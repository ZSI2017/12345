<template>
  <section class="login">
    <h1>支付宝我的快递-- 寄件管理后台</h1>
    <el-button type="primary" size="large" @click="loginIn">登 录</el-button>
  </section>
</template>
<script type="text/javascript">
   export default {
       data(){
          return {

          }
       },
      methods: {
         loginIn(){
             this.$router.push({path:"/"})
         }
      }
   }
</script>
<style lang="scss">
    .login{
       text-align:center;
         margin:300px auto;
    }
</style>
