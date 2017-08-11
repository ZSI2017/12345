<!-- <template type="html">
    <div class="table-cell">
       <solt></solt>
    </div>
</template> -->

<script type="text/javascript">
import {bus} from "@/page/nonServerDistrict/bus.js";
  export default {
     name: "tableColumn",
     props:{
         headerName:String,
         myProps:String,
         width:Number
     },
     render(h) {
        return h(
           'div',
           {
             'class' :'table-cell'
            },
           [this.$scopedSlots.default()]
        )
     },
     data() {
        return {
           defParent:this.$parent,
           columnConfig:''
        }
     },
     methods() {

     },
     mounted(){
       let _self = this;
       let renderCell =function(h,data,item){
              return h(
                "div",
                {
                  "class":"cell"
                },
                [
                  _self.$scopedSlots.default? _self.$scopedSlots.default(data):data[item.myProps]
                ]
              )

       }
      // console.log("%c from table-column %o","color:blue",  this.$scopedSlots.default? this.$scopedSlots.default():this.$slots.default)
       // this.columnConfig = { children : 这里定义了 table-column 中 的各种配置方法  }
       this.columnConfig = {
           headerName:this.headerName,
           myProps:this.myProps,
           children:this.$children,
           scope:renderCell
       }
       // 这里 向上遍历，寻找 父类中的table 标签， 以tableId 为table 的标识，
       //
         let parent = this.$parent;

         while(parent && !parent.tableId) {
             parent = parent.$parent;
         }

         this.defParent =  parent;
         console.log("headerName:  %o +++  myProps:  %o ++++=",this.columnConfig,this);
         bus.$emit('fromColumn',this.columnConfig);
       // 先等到 table 父类的引用
        // console.log("%oadsfasdfsd",this);
        // console.log("%o from tableColumn from tableColumn from tableColumn from tableColumn from tableColumn from tableColumn from tableColumn  from tableColumn",this);
     },
    //  mounted(){
    //      //  alert("dsafsd");
     //
    //  }
  }
</script>

<style lang="scss">

</style>
