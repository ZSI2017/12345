export const toggle = {
       data(){
           return {

           }
       },
       methods:{
         hideCountFlag () {
             this.$store.dispatch('changeLoadingFlag');
             this.$store.dispatch('changeLoadingChange',false);
             // this.$router.app.$store.state.loadingChange = false;
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
       }
}
