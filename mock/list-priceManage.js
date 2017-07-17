// 随机生成表格里面的数据
var  Mock =require("mockjs");
// Mock.setup({
//      timeout:'200-600'
// }); +Mock.Random.paragraph()

var tableDate = [];

for(var i =0;i<60;i++){
    tableDate.push(
       Mock.mock({
         "tableExpress":Mock.Random.name(),
         "tableTypeOfService":Mock.Random.name(),
         "tableSendProvince":Mock.Random.province(),
         "tableSendCity":Mock.Random.city(),
         "tableRecProvince":Mock.Random.province(),
         "tableRecCity":Mock.Random.city(),
         "tablePresetWeightPrice":Mock.Random.natural(0, 1000)+"元",
         "tablePresetWeight":Mock.Random.natural(0, 1000)+"元",
         "tableExtraWeight":Mock.Random.natural(0, 1000)+"元",
         "tableExtraWeightPrice":Mock.Random.natural(0, 1000)+"元",
       })
    )
}
module.exports = {
      "data":tableDate

}
