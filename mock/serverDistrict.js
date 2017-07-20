// 随机生成覆盖地区里面的数据


// 随机生成表格里面的数据
var  Mock =require("mockjs");
// Mock.setup({
//      timeout:'200-600'
// });

var result = {};
result.noProvinces = [];
for(var i =0;i<12;i++) {
    var proObj = {};
    proObj.provinceName = Mock.Random.province();
    proObj.noServiceCitys = [];
    for(var j=0;j<20;j++) {
        var cityObj = {};
        cityObj.cityName = Mock.Random.city();
        cityObj.noServiceDistricts =[];
        for(var k =0;k<10;k++) {
            var disObj = {};
            disObj.districName = Mock.Random.county();
            cityObj.noServiceDistricts.push(disObj);
        }
        proObj.noServiceCitys.push(cityObj)
    }
    result.noProvinces.push(proObj);
}

module.exports = {
      "data":result

}
