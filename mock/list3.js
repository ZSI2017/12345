// 随机生成覆盖地区里面的数据


// 随机生成表格里面的数据


var  Mock =require("mockjs");
// Mock.setup({
//      timeout:'200-600'
// });

var tableDate = [];

for(var j =0;j<31;j++){
    var city = [];
    for(var i=0;i<10;i++){
           city.push(Mock.Random.city());
    }

    tableDate.push(
       Mock.mock({
         "city":city,
         "value":Mock.Random.province()
       })
    )
}
module.exports = {
      "data":tableDate

}
