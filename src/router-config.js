
//订单管理
import orderManage from './page/orderManage/index.vue'

//寄快递首页
import sendExpress from './page/sendExpress/index.vue'
import step1 from './page/sendExpress/step1.vue'
import step2 from './page/sendExpress/step2.vue'
import step3 from './page/sendExpress/step3.vue'
import step4 from './page/sendExpress/step4.vue'

//选择快递页
import chooseExpress from './page/chooseExpress/index.vue'

//选快递下单
import expressOrder from './page/expressOrder/index.vue'

//寄快递入口
import sendExpressEnter from './page/sendExpressEnter/index.vue'

//快递公司管理
import expressCompany from './page/expressCompany/index.vue'

//选快递下单管理
import chooseExpressOrder from './page/chooseExpressOrder/index.vue'

//服务类型及折扣管理
import serverTypeDiscount from './page/serverTypeDiscount/index.vue'

//非服务地区管理
import nonServerDistrict from './page/nonServerDistrict/index.vue'

//同城直送管理
import oneCitySend from './page/oneCitySend/index.vue'

//附近快递资源管理
import nearExpress from './page/nearExpress/index.vue'

//公告管理
import noticeManage from './page/noticeManage/index.vue'

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


//
// import orderManage from './page/orderManage/index.vue'
//
// import activePublic from './page/activePublic/step1.vue'
// import step1 from './page/activePublic/step1.vue'
// import step2 from './page/activePublic/step2.vue'
// import step3 from './page/activePublic/step3.vue'
// import step4 from './page/activePublic/step4.vue'
//
// import totalpages from './page/activeManage/totalpages.vue'
// import activeManage from './page/activeManage/index.vue'
// import detail from './page/activeManage/detail.vue'
//
// import page1 from './page/activeManage/page1.vue'
// import page2 from './page/activeManage/page2.vue'
// import page3 from './page/activeManage/page3.vue'
// import page4 from './page/activeManage/page4.vue'
// import page5 from './page/activeManage/page5.vue'
//
//
//
// export default [
//   {
//     path:'/orderManage',component:orderManage
//   },
//   {
//     path: '/activeManage',component:totalpages,
//     children:[
//       { path: ''      , component: activeManage  },
//       {
//         path: 'detail', component: detail,
//
//         children: [
//           {path:'',component: page1},
//           {
//             path: 'page1', component: page1,
//             children: [
//               {path: '', component: step1},
//               {path: 'step1', component: step1},
//               {path: 'step2', component: step2},
//               {path: 'step3', component: step3},
//               {path: 'step4', component: step4}
//             ]
//           },
//           { path: 'page2', component: page2  },
//           { path: 'page3', component: page3  },
//           { path: 'page4', component: page4  },
//           { path: 'page5', component: page5  }
//         ]
//       },
//     ]
//   },{
//     path:'/activePublic',component:activePublic,
//     children:[
//       { path: ''      , component: step1  },
//       { path: 'step1', component: step1  },
//       { path: 'step2', component: step2  },
//       { path: 'step3', component: step3  },
//       { path: 'step4', component: step4  }
//     ]
//   }
// ]

import App from './App.vue';
import table from "./views/table/table.vue";
import time from "./views/table/time.vue";
import form from "./views/table/form.vue";
import index from "./views/index.vue";


import addPage from "./views/component/addpage.vue"
import upload from "./views/component/upload.vue"
import layout from "./views/component/layout.vue"


export default [
  //订单管理
  {
    path:'/orderManage',component:orderManage

  },
  //选择快递页
  {
    path:'/chooseExpress',component:chooseExpress

  },
  //寄快递入口
  {
    path:'/sendExpressEnter',component:sendExpressEnter
    
  },
  //选快递下单
  {
    path:'/expressOrder',component:expressOrder
    
  },
  //快递公司管理
  {
    path:'/expressCompany',component:expressCompany
    
  },
  //选快递下单管理
  {
    path:'/chooseExpressOrder',component:chooseExpressOrder
    
  },
  //服务类型及折扣管理
  {
    path:'/serverTypeDiscount',component:serverTypeDiscount
    
  },
  //非服务地区管理
  {
    path:'/nonServerDistrict',component:nonServerDistrict
    
  },
  // 价格管理
  {
    path: '/priceManage',component:totalpages,
    children:[
      { path: ''      , component: priceManage  },
      {
        path: 'detail', component: detail,

        children: [
          {path:'',component: page1},
          {
            path: 'page1', component: page1,
            children: [
              {path: '', component: step1},
              {path: 'step1', component: step1},
              {path: 'step2', component: step2},
              {path: 'step3', component: step3},
              {path: 'step4', component: step4}
            ]
          },
          { path: 'page2', component: page2  },
          { path: 'page3', component: page3  },
          { path: 'page4', component: page4  },
          { path: 'page5', component: page5  }
        ]
      },
    ]
  },
  //同城直送管理
  {
    path:'/oneCitySend',component:oneCitySend
    
  },
  //附近快递资源管理
  {
    path:'/nearExpress',component:nearExpress
    
  },
  //公告管理
  {
    path:'/noticeManage',component:noticeManage
    
  },
  //订单取消频次管理
  {
    path:'/orderCancle',component:orderCancle
    
  },
  //黑名单管理
  {
    path:'/blankList',component:blankList
    
  },
  //寄快递首页
  {
    path:'/sendExpress',component:sendExpress,
    children:[
      { path: ''      , component: step1  },
      { path: 'step1', component: step1  },
      { path: 'step2', component: step2  },
      { path: 'step3', component: step3  },
      { path: 'step4', component: step4  }
    ]
  }
]

let routes =  [
       {
            path:'/',
            name:"首页",
            component:index,
            hasChild:true,
            children: [
                   { path: 'table', component: table, name: '表格'},
                   { path: 'time', component: time, name: '时间' },
                   { path: 'form', component: form, name: '表单' },
               ]
      },{
           path:'/',
           name:"基础",
           component:index,
           hasChild:true,
           children: [
                  { path: 'upload', component: upload, name: '上传图片' },
                  { path: 'layout', component: layout, name: '布局' }
              ]
     },{
       path:'/',
       name:"table",
       component:index,
      //  hasChild:true,
       children: [
              { path: 'addPage', component: addPage, name: 'table' },
          ]
 },{
          path:"/",
          name:'nearExpress',
          component:index,
          // hasChild:true,
          children: [
              {path:'nearExpress',component:nearExpress,name:"nearExpress"}
          ]
 },{
          path:"/",
          name:'priceManage',
          component:index,
          // hasChild:true,
          children: [
              {path:'priceManage',component:priceManage,name:"priceManage"}
          ]
 }
      // {
      //    path:'/',
      //    com
      // }
    //  {
    //      path:"/second",
    //      name:"second",
    //      component:table
    //  }
];

