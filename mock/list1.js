// import Mock from "mockjs";

Mock.setup({
     timeout:'200-600'
});

var tableDate = [];

for(var i =0;i<100;i++){
    tableDate.push(
       Mock.mock({
         "date":Random.date('yyyy-MM-dd'),
         "name":Random.name(),
         "address":Random.county(true)
       })
    )
}
// [{
//      "title":"这是通过json-server 的rest api 实现的mock数据1"
// },{
//     "title":"这是通过json-server 的rest api 实现的mock数据2"
// },{
//     "title":"这是通过json-server 的rest api 实现的mock数据3"
// }]
// export {tableDate};
module.exports ={
     "data":tableDate
}
