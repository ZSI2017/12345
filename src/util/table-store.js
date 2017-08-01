

/**
 *  只创建唯一一个实例
 *  目前 ,记录pagecount
 **/


const PageStore = function(pageCount) {
     this.pageCount = "1";
}
PageStore.prototype.mutations = {
     setPage(pageCount){
       this.pageCount = pageCount;
     }
},
PageStore.prototype.commit = function(name,args) {
    // 这里模拟 commit  事件触发
    const mutations = this.mutations;
    if(mutations[name]) {
         mutations[name].apply(this,[args]);
    }else {
       console.log("action not found");
    }
}
const pageStore = new PageStore();
export default pageStore;
