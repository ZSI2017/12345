<template type="html">
  <section>
    <div>msg: {{msg}}</div>
    <button @click = 'fn("../123")'>点击获取 数据</button>
  </section>
</template>

<script type="text/javascript">
  import Axios from "axios";
  // import mock from "../../mock/data/mock.js";
  import MockAdapter from "axios-mock-adapter";
        export default {
          data(){
            return {
                msg:'hello Axios'
            }
          },
          methods:{
             fn:function(){
                var _this = this;
                // this.$http.get("/rest/list2")
              _this.$http.get("/rest/list2")
                     .then(function(rsp){
                         _this.msg = rsp.data.data
                     })
                     .catch(function(error){
                          console.log(error);
                     })
             }
          }

        }


</script>
