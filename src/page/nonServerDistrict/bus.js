  // 这里作为事件 和 table数据中转站
import Vue from "vue";


export var bus = new Vue({
       data:{
          bodyWarpper:"12334",
          scrollY:false
       },
       methods:{
            updateScrollY(){


            }
       },
       watch:{
            bodyWarpper(newValue,oldValue) {
                 console.log(newValue);
            }
       }
});
