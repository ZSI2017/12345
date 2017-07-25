<template type="html">
   <section class="">
      <div class="my_header">
          <table-header>
          </table-header>
      </div>
      <div class="my_body">
           <table-body>
           </table-body>
      </div>
      <slot >
      </slot>
   </section>
</template>
<script type="text/javascript">
   import tableBody from "@/page/nonServerDistrict/tableBody";
   import tableHeader from "@/page/nonServerDistrict/tableHeader";
  export default {
    name:'table',
    components: {
        tableBody,
        tableHeader
    },
       data() {
          return {

          }
       },
       methods() {

       },
       created() {

       }
  }
</script>
<style lang="scss">

</style>
