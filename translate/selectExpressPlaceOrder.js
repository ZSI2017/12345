Zepto(function($){
    Express.init();
});
var Express = new Object({
      init:function(){
                console.log("cityCode "+window.cityCode);
                console.log("pageNo "+window.pageNo);
                        var expresshtml = '',xHtml='';
                        var tagval = '';
                        var listOperation = '';
                          console.log("/ep/express/list no data")
                          // var paginationArr = result.result.logises;

             for(var i =0;i<30;i++) {
                                                 // 加载标签
                  var taghtml = '<span style="height:.11rem;line-height: .11rem;">'+123+'</span>'
                                +'<span style="height:.11rem;line-height: .11rem;">'+14343+'</span>'
										xHtml='<div class="am-list-item typelink" style="height:.90rem">';
									expresshtml+=xHtml +'<div class="am-list-thumb choice_leftlogo">'
                                    +'<img src="'+'" alt="">'
                                    +'</div>'
                                    +'<div class="am-list-content">'
                                    +'<div class="am-list-title list_lineheight">'
                                    +'<span class="list_merchantName" style="font-size:.16rem">'+'德邦'+'</span>'
                                    +'<span class="hot_icon hoticon1'+'">热</span>'
                                    +'<span class="hot_icon newicon1'+'">新</span>'
                                    +'</div>'
                                    +'<span class="am-ft-gray advertisementvals" style="font-size:.14rem;padding-top: 0.025rem;padding-bottom: 0.005rem">'+'非常大的好快递'+'</span>'
                                    +'<div class="am-ft-orange bubble_font" style="height:.135rem;line-height:.135rem;;margin-top:0.005rem;margin-bottom:0.01rem;padding-top:0.0001rem;">'+taghtml+'</div>'
                                    +'</div>'
                                    +'<div class="am-list-arrow"><span class="am-icon horizontal"><img src="https://expressprod.oss-cn-hangzhou.aliyuncs.com/mobile/img/indicator_icon.png"/></span></div>'
                                    +'</div>'

                        $(".management_list").append(expresshtml);

}
                        $(".management_list .typelink:nth-child(n)").css({"padding-bottom":"0.005rem","padding-top":"0"});
                        $(".management_list .typelink:first-child").css("padding-top","0.005rem");
                        $(".express_content").show();


    }


});
