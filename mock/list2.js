
// 随机生成表格里面的数据


var  Mock =require("mockjs");
// Mock.setup({
//      timeout:'200-600'
// }); +Mock.Random.paragraph()

var tableDate = [];

for(var i =0;i<60;i++){
    tableDate.push(
       Mock.mock({
         "currentState":"已上架",
         "Forder":Mock.Random.natural(0, 1000),
         "link":Mock.Random.url('http') + Mock.Random.paragraph(),
         "operationsMapName":Mock.Random.name(),
         "date":Mock.Random.datetime(),
         "createTime":Mock.Random.datetime(),
         "modifyTime":Mock.Random.datetime(),
         "activeTime":Mock.Random.datetime() +" \n 至 \n "+Mock.Random.datetime(),
         "activeTime1":Mock.Random.datetime(),
         "activeTime2":Mock.Random.datetime(),
         "name":Mock.Random.name(),
         "address":Mock.Random.county(true).replace(/' '/g,''),
         "reviewState":"已完成",
         "content":Mock.Random.ctitle(),
         "ordernumber":Mock.Random.natural(10000000000,19999999999)
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
