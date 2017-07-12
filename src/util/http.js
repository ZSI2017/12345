'use strict'

import axios from "axios";


// add request interceptor
axios.interceptors.request.use(function(config) {
    // TODO  before request is sent
    console.log("【axios log】"+JSON.stringify(config))
    return config;
},function(error){
    // TODO  with request error
      console.log("【axios error log】"+JSON.stringify(config))
     return Promise.reject(error);
});

// add a respose interceptor
axios.interceptors.response.use(function(response){
      //  TODO after response
      return response;
},function(error){
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
      }else if(response.error === "ACL_NO_PRIVILEGE") {
            // 没有权限时，跳转到 支付宝的权限管理页面
              window.location.href=response.redrect;
      }
  };

  var mySuccessFn = () => {
       let response,successfn,errorfn;
       [response,successfn,errorfn] = arguments;
       if( typeof response.meta !== undefined && (response.meta.code == "0000" || response.meta.success)) {
           successfn(response);
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
            // baseURL:"https://domain.com/api",
            transformRequrest:[function(data) {
                // before the request data is sent to the server
                return data;
            }],
            transformResponse:[function(data) {
                  // before get the response data
                  return data;
            }],
            headers: {'X-Requested-With':'XMLHttpRequest'},
            data:data,
            timeout:10000,
            responseType:'json',  // default
            xsrfCookieName:'XSRF-TOKEN',      // default
            xsrfHeaderName: 'X-XSRF-TOKEN', // default
            maxRedirects: 5, // default
            proxy:{ }     //  defines the hostname and port of the proxy server
       }).then(
           (response) => {
               return mySuccessFn(response,successfn,errorfn);
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
          baseURL:"http://localhost:8080/",
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
