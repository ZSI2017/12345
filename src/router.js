import home from './page/home.vue'
//订单管理
import orderManage from './page/orderManage/index.vue'
import orderDetail from './page/orderManage/orderDetail.vue'
import main from './page/orderManage/main.vue'


//寄快递首页    选择快递页  选快递下单  公用同一个组件  chooseExpress
import operationPosition from './page/chooseExpress/index.vue';
import operationPositionMain from "./page/chooseExpress/main.vue";
import sendExpress from './page/sendExpress/index.vue'


import chooseExpress from './page/chooseExpress/index.vue'

import expressOrder from './page/expressOrder/index.vue'



//寄快递入口
import sendExpressEnter from './page/sendExpressEnter/index.vue'
import sendExpressEnterMain from './page/sendExpressEnter/main.vue'
import sendExpressEnterAddData from "./page/sendExpressEnter/addData.vue";
import sendExpressEnterEditData from "./page/sendExpressEnter/editData.vue";


//快递公司管理
import expressCompany from './page/expressCompany/index.vue'
import expressCompanyMain from './page/expressCompany/main.vue'
import expressCompanyAddData from "./page/expressCompany/addData.vue";
import expressCompanyEditData from "./page/expressCompany/editData.vue";

//选快递下单管理
import chooseExpressOrder from './page/chooseExpressOrder/index.vue'

//服务类型及折扣管理
import serverTypeDiscount from './page/serverTypeDiscount/index.vue'

//非服务地区管理
import nonServerDistrict from './page/nonServerDistrict/index.vue'

//同城直送管理
import oneCitySend from './page/oneCitySend/index.vue'
import oneCitySendMain from "./page/OneCitySend/main.vue"
import oneCitySendAddData from "./page/oneCitySend/addData.vue";
import oneCitySendEditData from "./page/oneCitySend/editData.vue";


//附近快递资源管理
// import nearExpress from './page/nearExpress/nearExpress.vue'
// import NEaddData from './page/nearExpress/NEaddData.vue'
import nearExpress from './page/nearExpress/index.vue'
import nearExpressMain from "./page/nearExpress/main.vue"
import nearExpressAddData from "./page/nearExpress/addData.vue";
import nearExpressEditData from "./page/nearExpress/editData.vue";

//公告管理
import noticeManage from './page/noticeManage/index.vue'
import noticeManageMain from "./page/noticeManage/main.vue"
import noticeManageAddData from "./page/noticeManage/addData.vue";
import noticeManageEditData from "./page/noticeManage/editData.vue";

//订单取消频次管理
import orderCancle from './page/orderCancle/index.vue'

//黑名单管理
import blankList from './page/blankList/index.vue'

// 价格管理
import totalpages from './page/priceManage/totalpages.vue'
import priceManage from './page/priceManage/index.vue'
import detail from './page/priceManage/detail.vue'

import page1 from './page/priceManage/page1.vue'
import page2 from './page/priceManage/page2.vue'
import page3 from './page/priceManage/page3.vue'
import page4 from './page/priceManage/page4.vue'
import page5 from './page/priceManage/page5.vue'


import App from './App.vue';
import table from "./views/table/table.vue";
import time from "./views/table/time.vue";
import form from "./views/table/form.vue";
import index from "./views/index.vue";
import addData from "./page/chooseExpress/addData.vue";
import editData from './page/chooseExpress/editData.vue';

import welcome from "./page/welcome.vue";
import login from "./page/login.vue";


import addPage from "./views/component/addpage.vue"
import upload from "./views/component/upload.vue"
import layout from "./views/component/layout.vue"

let routes =  [
  {
    path:'/login',
    name:"我的快递",
    isHide:true,
    component:login,
  },
//   {
//    path:'/',
//    name:"我的快递",
//    redirect: '/home',
//    isHide:true,
//    component:welcome,
//  },
 {
   path:'/',
   name:"我的快递",
   redirect: '/home',
   isHide:true,
   component:index,
   children:[
      {path:'/home',component:home},
   ]
 },
{
   path:'/',
   name:"首页",
   component:index,
   children:[
      {path:'/orderManage/main',component:orderManage,name:"订单管理",
      children:[
         {path:'',component:main},
         {path:'/orderManage/orderDetail',name:'查看详情',component:orderDetail}
      ]},
   ]
 },{
   path:'/',
   name:"运营位管理",
   component:index,
   hasChild:true,
   children:[
     { path:'/sendExpress',component:operationPosition,name:"寄快递首页",
       children:[
          {path:'',component:operationPositionMain},
          {path:'addData',name:'添加数据',component:addData},
          {path:'editData',name:'修改数据',component:editData},
          {path:'detail',name:'查看详情',component:editData}
       ]},
      {path:'/chooseExpress',component:operationPosition,name:"选择快递页",
      children:[
          {path:'',component:operationPositionMain},
          {path:'addData',name:'添加数据',component:addData},
          {path:'editData',name:'修改数据',component:editData},
          {path:'detail',name:'查看详情',component:editData}
      ]
    },
      {path:'/expressOrder',component:operationPosition,name:"选快递下单页",
      children:[
         {path:'',component:operationPositionMain},
         {path:'addData',name:'添加数据',component:addData},
         {path:'editData',name:'修改数据',component:editData},
          {path:'detail',name:'查看详情',component:editData}
      ]
    }
   ]
 },
 //寄快递入口
 {
   path:'/',
   name:"首页",
   component:index,
   children:[
      {path:'/sendExpressEnter',component:sendExpressEnter,name:"寄快递首页管理",
          children:[
            {path:'',component:sendExpressEnterMain},
            {path:'addData',name:'添加数据',component:sendExpressEnterAddData},
            {path:'editData',name:'修改数据',component:sendExpressEnterEditData},
            {path:'detail',name:'查看详情',component:sendExpressEnterEditData}
          ]
      }
   ]
  //  path:'/sendExpressEnter',component:sendExpressEnter

 },
 //选快递下单页
//  {
//    path:'/',
//    name:"首页",
//    component:index,
//    children:[
//       {path:'expressOrder',component:expressOrder,name:"选快递下单"}
//    ]
//   //  path:'/expressOrder',component:expressOrder

//  },
 //快递公司管理
 {
   path:'/',
   name:"首页",
   component:index,
   children:[
      {path:'/expressCompany',component:expressCompany,name:"快递公司管理",
        children:[
            {path:'',component:expressCompanyMain},
            {path:'addData',name:'添加数据',component:expressCompanyAddData},
            {path:'editData',name:'修改数据',component:expressCompanyEditData},
            {path:'detail',name:'查看详情',component:expressCompanyEditData}
          ]
      }
   ]
  //  path:'/expressCompany',component:expressCompany

 },
 //选快递下单管理
 {
   path:'/',
   name:"首页",
   component:index,
   children:[
      {path:'/chooseExpressOrder',component:chooseExpressOrder,name:"选快递下单管理"}
   ]
  //  path:'/chooseExpressOrder',component:chooseExpressOrder

 },
 //服务类型及折扣管理
 {
   path:'/',
   name:"首页",
   component:index,
   children:[
      {path:'/serverTypeDiscount',component:serverTypeDiscount,name:"服务类型及折扣管理"}
   ]
  //  path:'/serverTypeDiscount',component:serverTypeDiscount

 },
 //非服务地区管理
 {
   path:'/',
   name:"首页",
   component:index,
   children:[
      {path:'/nonServerDistrict',component:nonServerDistrict,name:"非服务地区管理"}
   ]
  //  path:'/nonServerDistrict',component:nonServerDistrict

 },
 // 价格管理
 {
   path:'/',
   name:"价格管理",
   component:index,
   hasChild:true,
   children:[
      {path:'/priceManage',component:totalpages,name:"运线快递费管理",   children:[
           { path: ''      , component: priceManage  },
           {
             path: '/detail', component: detail,

             children: [
               {path:'',component: page1},
               {
                 path: '/page1', component: page1,
                //  children: [
                //   //  {path: '', component: step1},
                //   //  {path: 'step1', component: step1},
                //    {path: '/step2', component: step2},
                //    {path: '/step3', component: step3},
                //    {path: '/step4', component: step4}
                //  ]
               },
               { path: '/page2', component: page2  },
               { path: '/page3', component: page3  },
               { path: '/page4', component: page4  },
               { path: '/page5', component: page5  }
             ]
           },
         ]
       }
   ]
 },
 //同城直送管理
 {
   path:'/',
   name:"首页",
   component:index,
   children:[
      {path:'/oneCitySend',component:oneCitySend,name:"同城直送管理",
      children:[
        {path:'',component:oneCitySendMain},
        {path:'addData',name:'添加数据',component:oneCitySendAddData},
        {path:'editData',name:'修改数据',component:oneCitySendEditData},
        {path:'detail',name:'查看详情',component:oneCitySendEditData}
      ]
    }
   ]
  //  path:'/oneCitySend',component:oneCitySend

 },
 //附近快递资源管理
 {
   path:'/',
   name:"首页",
   component:index,
   children:[
      {path:'/nearExpress',component:nearExpress,name:"附近快递资源管理",
       children:[
          {path:'',component:nearExpressMain},
          {path:'addData',name:'添加数据',component:nearExpressAddData},
          {path:'editData',name:'修改数据',component:nearExpressEditData},
          {path:'detail',name:'查看详情',component:nearExpressEditData}
       ]
    }
   ]
 },
 //公告管理
 {
   path:'/',
   name:"首页",
   component:index,
   children:[
     {path:'/noticeManage',component:noticeManage,name:"公告管理",
     children:[
        {path:'',component:noticeManageMain},
        {path:'addData',name:'添加数据',component:noticeManageAddData},
        {path:'editData',name:'修改数据',component:noticeManageEditData},
        {path:'detail',name:'查看详情',component:noticeManageEditData}
     ]
    }
  ]

 },
 //用户管理
 {
   path:'/',
   name:"用户管理",
   component:index,
   hasChild:true,
   children:[
      {path:'/orderCancle',component:orderCancle,name:"订单取消频次管理"},
      {path:'/blankList',component:blankList,name:"黑名单管理"}
   ]
  //  path:'/orderCancle',component:orderCancle

}
, {
   path:'/',
   name:"首页",
   component:index,
   isHide:true,
   children:[
      {path:'/login',component:oneCitySend,name:"退出登录"}
   ]

 }
 //黑名单管理
//  {
//    path:'/',
//    name:"首页",
//    component:index,
//    children:[
//       {path:'blankList',component:blankList,name:"黑名单管理"}
//    ]
//   //  path:'/blankList',component:blankList

//  },


];
export default routes;
