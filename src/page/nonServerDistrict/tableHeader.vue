<!-- <template type="html">
     <section class="tableHeader">
          <table
              border="0"
              cellspacing="0"
              bgcolor="white"
              width="100%"
              align="center"
              >
              <colgroup>
                  <col width="48"  v-for="(item,index) in store"  :key="index"/>
              </colgroup>
                <tr>
                    <th colspan="1" v-for="(item,index) in store" :key="index"> {{item.headerName}}</th>
                </tr>
          </table>
     </section>
</template> -->
<script type="text/javascript">
import scrollbarWidth from 'element-ui/src/utils/scrollbar-width';
export default {
  props: {
    store: Array,
    tableData: Array,
    scrollY:Boolean
  },
  data() {
    return {

    }
  },
  render(h) {
    return (
      h('section', {
        "class": 'tableHeader',
         style:{paddingRight:this.scrollY?'0px':this.gutterWidth+'px' }
      }, [h('table', {
        attrs: {
          border: "0",
          cellspacing: "0",
          bgcolor: 'white',
          align: 'center',
          width: "100%"
        }
      }, [h('colgroup', [this._l(this.store, item => h('col', {
          attrs: {
            width: 48
          }
        }))]),
        h('tr', [this._l(this.store, item => h('th', [item.headerName]))])
      ])])
    )
  },
  methods: {

  },
  watch:{
      // store(newVal){
      //
      // }
  },
  mounted(){
    // alert(this.scrollY);
  },
   computed:{
     gutterWidth(){
         return scrollbarWidth();
     }
   }
}
</script>
<style lang="scss">
.tableHeader {
    table {
        table-layout:fixed;
        border: 1px solid #dfe6ec;
        text-align: center;
        border-right:0;
    }
    ,
    th {
        line-height: 30px;
        background-color: #eef1f6;
    }
    ,
    th+th {
        border-left: 1px solid #dfe6ec;
    }
    tr:hover {
        background-color: #eef1f6;
    }
    tr+tr {
        td {
            border-top: 1px solid #dfe6ec;
        }
    }
}
</style>
