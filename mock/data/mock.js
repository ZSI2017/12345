import Mock from "mockjs";

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

export {tableDate};
