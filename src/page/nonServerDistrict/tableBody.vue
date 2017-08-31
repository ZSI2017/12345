<script type="text/javascript">
import scrollbarWidth from 'element-ui/src/utils/scrollbar-width';
import tableColumn from "@/page/nonServerDistrict/tableColumn"
import {bus}  from "@/page/nonServerDistrict/bus"
name: "tableBody";
export default {
  components: {
    tableColumn
  },
  props: {
    store: Array,
    tableData: Array,
    scrollY:Boolean,
  },
  data() {
    return {
      sourceData: [],
      column: []
    }
  },
  render(h) {
    return (
      h(
        "section", {
          'class': "tableBody",
          "ref":'tableBody'
        }, [h('table', {
           "ref":"mytable",
            attrs: {
              border: "0",
              cellspacing: "0",
              bgcolor: 'white',
              align: 'center',
              width: "100%"
            }
          }, [
            h('colgroup', [this._l(this.store, item => h('col', {
              attrs: {
                width: 48
              }
            }))]),
            this._l(this.sourceData,
              items =>h('tr',[this._l(this.store,(item,index) => h("td",[
                   item.scope(h,items,item)] )
              )])
            )
            // this._l(this.store,
            //   items =>h('tr',[h('span',{"class":"cel"},[items.scope]) ])
            // ),
            // this._l(this.store,
            //   items =>h('tr',[items.scope])
            //   )
          ]

        )]
      )
    )
  },
  mounted(){
    // alert(bus.bodyWarpper);
    // alert(scrollbarWidth())
    //  this.$nextTick(()=>{alert(this.$refs.mytable.offsetHeight);alert(this.$refs.tableBody.offsetHeight)});
    //  let _selt = this;
    // setTimeout(function(){
    //      alert(_selt.$refs.mytable.offsetHeight);
    //      alert(_selt.$refs.tableBody.offsetHeight);
    // },10000)
    // alert(scrollY)
    // console.log("%c from tableBody： %o","color:pink",this.store);  .querySelector("table")
  },
  watch: {
    tableData(newValue) {
      this.sourceData = newValue;
      // console.log("%c from tableBody： %o","color:red",newValue);
    },
    store(newValue) {
      console.log();
      this.column = newValue;
      // alert(this.$refs.tableBody.querySelector("table").offsetHeight);
      // alert( this.$refs.mybody.offsetHeight);
      // this.scrollY = this.$refs.tableBody.querySelector("table").offsetHeight> this.$refs.tableBody.offsetHeight;
    }
  },
  methods() {

  },
  computed:{
        gutterWidth(){
            return scrollbarWidth();
        }
  }
}
</script>
<style lang ="scss">
.tableBody {
    max-height:460px;
    overflow-y:auto;
    border-bottom:1px solid #dfe6ec;
    table {
        border: 1px solid #dfe6ec;
        text-align: center;
        /*height: 100px;*/
        table-layout:fixed;
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
