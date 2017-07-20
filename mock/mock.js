var  Mock =require("mockjs");
// var mocklist1 = require('./list1.js');
var mocklist2 = require('./list2.js');
var mocklist22 = require("./list2-2.js");
var mocklist23 = require("./list2-3.js");
var mocklist3 = require('./list3.js');
var mocklist4 = require('./list4.js');
var mocklist5 = require('./list5.js');
var mockPriceManage = require('./list-priceManage.js');
var serverDis = require('./serverDistrict.js');

module.exports = function(){
       return{
            // "list":mocklist1,
            "list2":mocklist2,
            "list2-2":mocklist22,
            "list2-3":mocklist23,
            "list3":mocklist3,
            "list4":mocklist4,
            "list5":mocklist5,
            "list6":mockPriceManage,
            "list7":serverDis
       }
}
