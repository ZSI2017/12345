'use strict'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import $ from'jquery';

Vue.use(ElementUI);
var vue = new Vue();
import axios from "axios";


// add request interceptor
axios.interceptors.request.use(function(config) {

    // TODO  before request is sent
     console.log("%c[axios log]before request:%s\n %o","color:green;font-size:16px;",config.url,config);
    return config;
},function(error){
      vue.$message.error('调用接口失败！');
    // TODO  with request error
      console.log("%c[axios log]before request:\n %o","color:red;font-size:16px;",config);
     return Promise.reject(error);
});

// add a respose interceptor
axios.interceptors.response.use(
  response =>{

      console.log("%c[axios log]success response:%s \n %o","color:green;font-size:16px;",response.config.url,response);
      //  TODO after response
    if(response.error === "ACL_NO_PRIVILEGE") {
            // 没有权限时，跳转到 支付宝的权限管理页面
        window.location.href=response.redrect;
        return Promise.reject(error);
    }
    return response;
},
  (error) =>{
      // if(error.response)
      // vue.$message.error('接口调用失败！sdfasd');
      console.log("%c[axios log]error response:\n %o","color:red;font-size:16px;",error);
      // console.log(code);
    //  TODO width response error
    return Promise.reject(error);

});

// 这里
function checkErrorCode(response) {
      if(typeof response.data.meta.code !== "undefined") {
         if(response.data.meta.code == "0012"){
             vue.$message.error('系统异常 code:0012');
             console.log("%c[axios log]error :\n %o","color:red;font-size:16px;",response);
            // 错误码定义的提示信息
         } else if (response.data.meta.code == "2345") {
            // 错误码定义的提示信息
         } else {
              vue.$message.error('系统异常');
            // 其他错误处理代码
         }
      }else {
         vue.$message.error('系统异常 code无效');
      }
  };

  var mySuccessFn = (response,successfn,errorfn) => {
      //  alert(response);
       if( typeof response.data.meta !== "undefined" && (response.data.meta.code == "0000" || response.data.meta.success)) {
           successfn(response.data.result);
       }else {
            if(typeof errorfn === "undefined") {
                checkErrorCode(response);
            } else {
               errorfn(response);
            }
       }
  }
export default {
    post(url,data,successfn,errorfn){
        //  $.ajax({
        //    type: "post",
        //     timeout : 10000,
        //     dataType: "json",
        //     crossDomain: true,
        //     contentType: "application/json; charset=utf-8",
        //     data: JSON.stringify(data),
        //     xhrFields: {
        //       withCredentials: true
        //     },
        //      data:data,
        //      url:'http://sendexmng-sit.alipay-eco.com/api/promotion/getConfList',
        //      success:function(){
        //        alert("success")
        //      },
        //      error:function(jsXHR){
        //         alert("jsXHR")
        //         console.log(jsXHR);
        //      },
        //      complete:function(e){
        //          console.log("complete %o",e);
        //      }
        //  })
       axios({
            url:url,
            method:'post',
            baseURL:'http://sendexmng-sit.alipay-eco.com/',
            // baseURL:"http://192.168.12.54:8080/",
            transformRequrest:[function(data) {
                // before the request data is sent to the server
                return data;
            }],
            // headers: {
            //     'X-Requested-With': 'XMLHttpRequest'
            //   },
            transformResponse:[function(data) {
                  // before get the response data
                  return data;
            }],
            // withCredentials: false,   //  默认false
            data:data,
            // timeout:10000,
            responseType:'json',  // default
            contentType: "application/json; charset=utf-8",
            xsrfCookieName:'XSRF-TOKEN',      // default
            xsrfHeaderName: 'X-XSRF-TOKEN', // default
            validateStatus: function (status) {
                   return status>=0 && status  < 600;  // 默认的
            },
            // headers: {'X-Requested-With': 'XMLHttpRequest'},
            // headers: {'contentType': "application/json; charset=utf-8"},
            maxRedirects: 5, // default
            proxy:{ }     //  defines the hostname and port of the proxy server
       }).then(
           (response) => {
               console.log("success");
                mySuccessFn(response,successfn,errorfn);
           }
       ).catch(
           (error) => {
                 console.log("error %o",error);
                //  vue.$message.error('接口调用失败22222');
           }
       )
    },
    get(url,successfn,errorfn){
        axios({url:url,
          method:'get',
        //   baseURL:"http://localhost:8080/",
          timeout: 10000,
          // headers: {
          //     'X-Requested-With': 'XMLHttpRequest'
          //   }
          }).then( (response) => {
             successfn(response);
          }
        ).catch(
              (error) => {

                   errorfn(error);
              }
        )
       }

};
