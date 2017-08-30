export default {
        issessionStorage: window.sessionStorage ? true : false,
          set: function(key, value) {
              if(this.issessionStorage) {
                window.sessionStorage.setItem(key, JSON.stringify(value));
              } else {
                 console.log("no sessionStorage");
              }
           },
          get: function(key) {
              if(this.issessionStorage) {
                return window.sessionStorage.getItem(item) ?JSON.parse(window.sessionStorage.getItem(key)):''
              } else {
               console.log("no sessionStorage");
              }
            },
            clear: function(key) {
              if(this.issessionStorage) {
                sessionStorage.removeItem(key);
              } else {
                 console.log("no sessionStorage");
              }
            }
}
