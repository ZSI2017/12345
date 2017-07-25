<template type="html">
  <section>
    <div class="table-cell">
      column
    </div>
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
        console.log("%oadsfasdfsd",this);
        // console.log("%o from tableColumn from tableColumn from tableColumn from tableColumn from tableColumn from tableColumn from tableColumn  from tableColumn",this);

     },
     mounted(){
      //  alert("dsafsd");
     }

  }
</script>

<style lang="scss">

</style>
