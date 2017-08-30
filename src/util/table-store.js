

/**
 *  只创建唯一一个实例
 *  目前 ,记录pagecount
 **/


const PageStore = function(pageCount) {
       this.pageCount = "1";    // 默认的数据类型
       this.tabName =  "";  // tab 菜单页
       this.radio=  "1";       // 单选按钮
       this.pageSize = 5;      // 默认 每页数量
}
PageStore.prototype.mutations = {
     setPage(pageCount){
       this.pageCount = pageCount;
     },
     setTabName(tabName) {
         this.tabName  =  tabName;
     },
     setRadio(radio) {
         this.radio = radio;
     },
     setPageSize(size) {
         this.pageSize  = size;
     }
},

PageStore.prototype.commit = function(name,args) {
    // 这里模拟 commit  事件触发
    const mutations = this.mutations;
    if(mutations[name]) {
        mutations[name].apply(this,[args]);
    }else{
       console.log("action not found");
    }
}
const pageStore = new PageStore();

export default pageStore;
