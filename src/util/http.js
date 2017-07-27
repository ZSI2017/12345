'use strict'

import axios from "axios";


// add request interceptor
axios.interceptors.request.use(function(config) {
    // TODO  before request is sent
     console.log("%c[axios log]before request:%s\n %o","color:green;font-size:16px;",config.url,config);
    return config;
},function(error){
    // TODO  with request error
      console.log("%c[axios log]before request:\n %o","color:red;font-size:16px;",config);
     return Promise.reject(error);
});

// add a respose interceptor
axios.interceptors.response.use(
  response =>{
      console.log("%c[axios log] success response:%s \n %o","color:green;font-size:16px;",response.config.url,response);
      //  TODO after response
    if(response.error === "ACL_NO_PRIVILEGE") {
            // 没有权限时，跳转到 支付宝的权限管理页面
        window.location.href=response.redrect;
        return Promise.reject(error);
    }
      return response;
},
  error =>{
      console.log("%c[axios log]error response:\n %o","color:red;font-size:16px;",error);
    //  TODO width response error
    return Promise.reject(error);

});

// 这里
function checkErrorCode() {
      let response = arguments[0];
      if(typeof response.meta !== undefined) {
         if(meta.code == "1234"){
            // 错误码定义的提示信息
         } else if (meta.code == "2345") {
            // 错误码定义的提示信息
         } else {
            // 其他错误处理代码
         }
      }
  };

  var mySuccessFn = (response,successfn,errorfn) => {
       if( typeof response.data.meta !== undefined && (response.data.meta.code == "0000" || response.data.meta.success)) {
           successfn(response.data.result);
       }else {
            if(typeof errorfn === undefined) {
                checkErrorCode(response);
            } else {
               errorfn(response);
            }
       }
  }
export default {
    post(url,data,successfn,errorfn){
       axios({
            url:url,
            method:'post',
            baseURL:"http://192.168.12.54:8080/",
            transformRequrest:[function(data) {
                // before the request data is sent to the server
                return data;
            }],
            transformResponse:[function(data) {
                  // before get the response data
                  return data;
            }],
            data:data,
            // timeout:10000,
            responseType:'json',  // default
            xsrfCookieName:'XSRF-TOKEN',      // default
            xsrfHeaderName: 'X-XSRF-TOKEN', // default
            maxRedirects: 5, // default
            proxy:{ }     //  defines the hostname and port of the proxy server
       }).then(
           (response) => {
                mySuccessFn(response,successfn,errorfn);
           }
       ).catch(
           (error) => {
                 console.log(error);
           }
       )
    },
    get(url,successfn,errorfn){
        axios({url:url,
          method:'get',
        //   baseURL:"http://localhost:8080/",
          timeout: 10000,
          headers: {
              'X-Requested-With': 'XMLHttpRequest'
            }
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
