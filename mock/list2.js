
var  Mock =require("mockjs");
// Mock.setup({
//      timeout:'200-600'
// });

var tableDate = [];

for(var i =0;i<100;i++){
    tableDate.push(
       Mock.mock({
         "date":Mock.Random.date('yyyy-MM-dd'),
         "name":Mock.Random.name(),
         "address":Mock.Random.county(true)
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
