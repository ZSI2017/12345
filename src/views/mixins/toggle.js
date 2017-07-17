export const toggle = {
       data(){
           return {

           }
       },
       mounted(){
          this.sayHello();
       },
       created(){

       },
       methods:{
           sayHello:function(){
              console.log("hello from toggle!");
           },
           handleLogout(){

            //  alert("to /login")
               this.$router.push({path:'/login'});
               // this.$router.
           }
       }
}
