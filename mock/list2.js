
// 随机生成表格里面的数据


var  Mock =require("mockjs");
// Mock.setup({
//      timeout:'200-600'
// });

var tableDate = [];

for(var i =0;i<60;i++){
    tableDate.push(
       Mock.mock({
         "currentState":"已上架",
         "Forder":Mock.Random.natural(0, 1000),
         "link":Mock.Random.url('http'),
         "operationsMapName":Mock.Random.name(),
         "date":Mock.Random.datetime(),
         "createTime":Mock.Random.datetime(),
         "modifyTime":Mock.Random.datetime(),
         "activeTime":Mock.Random.datetime() +"至"+Mock.Random.datetime(),
         "name":Mock.Random.name(),
         "address":Mock.Random.county(true).replace(/' '/g,''),
         "reviewState":"已完成",
         "content":Mock.Random.ctitle(),
       })
    )
}
// [{
//   title:"菜鸟驿站",
//   subtitle:"官方合作门店，安全有保障",
//   little:[
//     "安全保障","便捷代寄"
//    ]},
//  {
//   title:"顺丰",
//   subtitle:"找就近网点快速提供服务",
//   little:[
//    "快速上门","安全保障"]
//   },
//   {
//     title:"闪送",
//     subtitle:"官方合作门店，安全有保障",
//     little:[
//        "安全保障","便捷代寄"
//          ]
//    }
//  ]
module.exports = {
      "data":tableDate

}