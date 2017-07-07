
// 随机生成表格里面的数据


var  Mock =require("mockjs");

var tableDate = [];

for(var i =0;i<60;i++){
    tableDate.push(
       Mock.mock({
        //  "currentState":"已上架",
        //  "Forder":Mock.Random.natural(0, 1000),
        //  "link":Mock.Random.url('http'),
        //  "operationsMapName":Mock.Random.name(),
        //  "date":Mock.Random.datetime(),
        //  "createTime":Mock.Random.datetime(),
        //  "modifyTime":Mock.Random.datetime(),
        //  "activeTime":Mock.Random.datetime() +"至"+Mock.Random.datetime(),
        //  "name":Mock.Random.name(),
        //  "address":Mock.Random.county(true).replace(/' '/g,''),
        //  "reviewState":"已完成",
        //  "content":Mock.Random.ctitle(),

         "orderTime":Mock.Random.datetime(),
         "ordernumber":Mock.Random.natural(10000000000,19999999999),
         "sendifo":Mock.Random.name()+"-"+Mock.Random.county(true).replace(/' '/g,''),
         "recipientifo":Mock.Random.name()+"-"+Mock.Random.county(true).replace(/' '/g,''),
         "company":Mock.Random.name(),
         "status":"订单已取消",
       })
    )
}

module.exports = {
      "data":tableDate

}
