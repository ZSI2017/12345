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


export default {
    post(url,data,successfn,errorfn){
       axios({
            url:url,
            method:'post',
            baseURL:"https://domain.com/api",
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
                 return myErrorFn(error)
           }
       )
    }

};
