<!-- <template type="html">
  <section class="tableBody">
      <table-column />
    <table
        border="0"
        cellspacing="0"
        bgcolor="white"
        width="100%"
        align="center"
        >
        <colgroup>
            <col  v-for="(item,index) in store"  :key="index"/>
        </colgroup>
          <tr v-for="(items,indexs) in sourceData">kk
            <td v-for="(item,index) in store ">
                {{items[item.myProps]?items[item.myProps]:"---"}}
             </td>
          </tr>
    </table>

  </section>
</template> -->
<script type="text/javascript">
import scrollbarWidth from 'element-ui/src/utils/scrollbar-width';
import tableColumn from "@/page/nonServerDistrict/tableColumn"
name: "tableBody";
export default {
  components: {
    tableColumn
  },
  props: {
    store: Array,
    tableData: Array
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
          "ref":''
        }, [h('table', {
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
  mounted() {
    // console.log("%c from tableBody： %o","color:pink",this.store);
  },
  watch: {
    tableData(newValue) {
      this.sourceData = newValue;
      // console.log("%c from tableBody： %o","color:red",newValue);
    },
    store(newValue) {
      console.log();
      this.column = newValue;
    }
  },
  methods() {

  },

}
</script>
<style lang ="scss">
.tableBody {
    height:460px;
    overflow-y:auto;
    border-bottom:1px solid #dfe6ec;
    table {
        border: 1px solid #dfe6ec;
        text-align: center;
        height: 100px;
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
