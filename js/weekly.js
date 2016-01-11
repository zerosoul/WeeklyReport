	 
// 对Date的扩展，将 Date 转化为指定格式的String 
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function(fmt) 
{ //author: meizz 
  var o = { 
    "M+" : this.getMonth()+1,                 //月份 
    "d+" : this.getDate(),                    //日 
    "h+" : this.getHours(),                   //小时 
    "m+" : this.getMinutes(),                 //分 
    "s+" : this.getSeconds(),                 //秒 
    "q+" : Math.floor((this.getMonth()+3)/3), //季度 
    "S"  : this.getMilliseconds()             //毫秒 
  }; 
  if(/(y+)/.test(fmt)) 
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  for(var k in o) 
    if(new RegExp("("+ k +")").test(fmt)) 
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
  return fmt; 
}

     $.extend({
// 1. 设置cookie的值，把name变量的值设为value   
//example $.cookie(’name’, ‘value’);
// 2.新建一个cookie 包括有效期 路径 域名等
//example $.cookie(’name’, ‘value’, {expires: 7, path: ‘/’, domain: ‘jquery.com’, secure: true});
//3.新建cookie
//example $.cookie(’name’, ‘value’);
//4.删除一个cookie
//example $.cookie(’name’, null);
//5.取一个cookie(name)值给myvar
//var account= $.cookie('name');

    cookie: function(name, value, options) {
        if (typeof value != 'undefined') { // name and value given, set cookie
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            var path = options.path ? '; path=' + options.path : '';
            var domain = options.domain ? '; domain=' + options.domain : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else { // only name given, get cookie
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = $.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    }
}); 
     var DEBUG=false;
     var myname= $.cookie("myname");
     // console.log(myname);
     if(myname){
        $("#mynameSpan").text(myname+"@");
        $("#emailSubject").text("周报-"+myname+'-'+new Date().Format("yyyy年MM月dd日"));
     }else{
        $("#maskDiv").show();
        $("#mynameInput").fadeIn(500);
     }
    $(function(){
        $("#mynameInput .name").keypress(function(evt){
            if(evt.which==13){    
                var name=$(this).val();
                if(name==""){
                    alert("客官，报上你的大名...");
                    return;
                }
                $.cookie("myname",name);
                $("#maskDiv").hide();
                $("#mynameInput").hide();
                $("#mynameSpan").text(name+"@");
                $("#emailSubject").text("周报-"+name+"-"+new Date().Format("yyyy年MM月dd日"));
             }
        });
        var count= $("#copyto").find("span.profile").length;
        // console.log(count);
        $("#sendList").find("em.num").text("("+count+"人)");

        //focus first input element
        $("input:first").focus();
         $(document).bind("mouseup",function(e){
            // var st = getSelected();
            $("span.profile").removeClass("notShow");
              // if(st!=''){
                // $("#selectedText").text(st);
                var xx = (e.pageX || 0)+10; 
                var yy = e.pageY || 0; 
                $("#actionPopup").css({"left":xx+"px","top":yy+"px"}).fadeIn();
              // }
            });
          $(document).bind("mousedown",function(e){
                $("#actionPopup").hide();
                $("#profilePopup").hide();
                $("span.profile").addClass("notShow");
            });
        //add or remove item
         $(".workList tbody tr").hover(function(){
            $(this).find("a").toggle();
         });
         $(".workList tbody tr a").on("click",function(evt){
            evt=evt||window.event;
            evt.preventDefault();
            var currEle=$(this);
            var currCount=currEle.parents("tbody").find("tr").length;
            if(currEle.hasClass("remove")){
                if(currCount===1){
                    alert("客官，不要这样...");
                    return;
                }
                currEle.parents("tr").fadeOut("300",function(){
                    $(this).remove();
                });
            }else if(currEle.hasClass("add")){
                var clonedItem=currEle.parents("tr").clone(true).find("input").val("").end();
                currEle.parents("table.workList").append(clonedItem.find("a").hide().end().fadeIn());
            }
         });
         $("span.profile").hover(function(e){
            var currEle=$(this);
            if(!currEle.hasClass("notShow")){
                var h=$("#profilePopup").height()+$(this).height()+10;
                var xx=currEle.offset().left;
                var yy=currEle.offset().top-h;
                $("#profileImg img").prop("src",currEle.attr("data-img")|| "img/test.jpg");
                $("#profileIntro .email").text(currEle.attr("data-email") || "");
                // $("#dataEemail").text(currEle.attr("data-email") || "303301491@qq.com;");
                $("#profileIntro .intro").text(currEle.attr("data-intro") || "这家伙很懒");

                $("#profilePopup").css({"left":xx+"px","top":yy+"px"}).toggle();
            }
         });
          //generate weekly report
         $("#generate").click(function(evt){
            var currEle=$(this);
            if(currEle.hasClass("return")){
                $("#sendList").next(".main").remove();
                $("div.main").fadeIn();
                currEle.removeClass("return").text("生成周报");
                $("#sendEmailBtn").hide();
            }else{
                // evt=evt||window.event;
                // evt.preventDefault();
                var temp=$("div.main").clone();
                temp.find(".lazyRemove").remove();
                temp.find("input.item").each(function(){
                    var currEle=$(this);
                    var currText=currEle.val();
                    currEle.parent().text(currText);
                    currEle.remove();
                });
                var aboutThoughtStr=$("textarea[name='aboutThought']").val();
                // console.log(str3);
                var aboutThought = temp.find(".aboutThought");
                if(aboutThoughtStr==""){
                    aboutThought.parents(".panel").remove();
                }else{
                    var tempDiv=$("<div class='aboutThoughtDiv'></div>").text(aboutThoughtStr);
                    aboutThought.parent().append(tempDiv);
                    aboutThought.remove();
                }

                $("div.main").hide();
                $("#sendList").after(temp);
                currEle.addClass("return").text("返回编辑");
                $("#sendEmailBtn").show().css("display","block");
            }
         });

        $("#closeMask").click(function(evt){
            evt=evt||window.event;
            evt.preventDefault();
            $("#maskDiv").hide();
            $("#mynameInput").hide();
        });
        var RESPONSE=null;
        $("#sendEmailBtn").click(function(evt){
                evt=evt||window.event;
                evt.preventDefault();
                $("#confirmAgain").show();
                
    });
        $("#confirmAgain a.yes").click(function (evt){
            evt=evt||window.event;
                evt.preventDefault();
                $("#confirmAgain").hide();
                sendEmail();
        });

        $("#confirmAgain a.no").click(function (evt){
            evt=evt||window.event;
                evt.preventDefault();
                $("#confirmAgain").hide();
        });
        function sendEmail(){
            var sendContent={};
                sendContent.key="EqW8mnYeVIYrfzwQ45hLrg";
                sendContent.message={};
                sendContent.message.from_email='yangguochun@fh21.com';
                sendContent.message.autotext="true";
                sendContent.message.subject=$("#emailSubject").text();
                var htmlStr=$("div.main").eq(1).find(".panel:first").remove().end().html();
                // console.log(htmlStr);
                 sendContent.message.html=htmlStr;
                // return;
                if(DEBUG){
                    sendContent.message.to=[{
                        email:"yangguochun@fh21.com",
                        name:"代总",
                        type:"to"
                    }]; 
                    var reciever={
                        "email":"yanggc888@163.com",
                        "name":"wtf",
                        "type":"cc"
                    };
                    sendContent.message.to.push(reciever);
                }else{
                	var sendToBoss=$("#sendToBoss").attr("data-email");
                     sendContent.message.to=[{
                        email:sendToBoss,
                        name:"代总",
                        type:"to"
                    }]; 
                     $.each($("#copyto").find("span"),function(idx,tag){
                         var reciever={
                        "email":"",
                        "name":"hello",
                        "type":"cc"
                        };
                        var rname=$(this).attr("data-email");
                        reciever.email=rname;
                        reciever.name=$(this).text();

                        sendContent.message.to.push(reciever);
                    });
                }
                // console.log($("#copyto").find("span"));
                console.log(sendContent);
                
                $("#mynameInput input").hide();
                $("#mynameInput .header").text("客官，正在发送，稍安勿躁...");
                $("#mynameInput .content").append($("<img/>").attr("src","img/waiting.jpg"));
                $("#maskDiv").show();
                $("#mynameInput").css("height","auto").fadeIn(500);
                var purl="https://mandrillapp.com/api/1.0/messages/send.json";
                $.post(purl,sendContent,function(response){
                    RESPONSE=response;
                    setTimeout(function(){
                        console.log(RESPONSE); // if you're into that sorta thing
                        var resultList=[];
                        $.each(RESPONSE,function(idx,item){
                            var result={};
                            switch(item.status){
                                case "sent":
                                case 'queued':
                                case 'scheduled':
                                    result.email=item.email;
                                    result.status=1;
                                    resultList.push(result);
                                    break;
                                case "rejected":
                                case "invalid":
                                    result.email=item.email;
                                    result.status=0;
                                    resultList.push(result);
                                    break;
                                default:
                                    break;
                            }
                        });
                        var $ul=$("<ul/>");
                        $.each(resultList,function(idx,item){
                            
                            var $li=$("<li/>").text(item.email);
                            if(item.status==1){
                                $li.append($("<span/>").addClass("ok").text("√"));
                            }else{
                                $li.append($("<span/>").addClass("failed").text("X"));
                            }
                            $ul.append($li);
                        });
                        $("#mynameInput .content").css("width","250px").find("ul,img").remove()
                        .end().prepend($ul);

                        $("#mynameInput .header").text("客官，发送结果，请过目！");
                       
                        $("#closeMask").show().css("display","block");
                    },3000);
                });
        }
});
