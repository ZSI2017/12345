<template type="html">
  <section>
  </section>
</template>

<script type="text/javascript">
  export default {
     name: "tableColumn",
     props:{
        label:String,
        myProps:String
     },
     data() {
        return {

        }
     },
     methods() {

     },
     created(){
        console.log("%o from tableColumn",this);

     },
     mounted(){

     }

  }
</script>

<style lang="scss">

</style>
