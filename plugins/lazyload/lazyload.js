/**
 * Created by Administrator on 2016/12/21.
 */
/*
 * BEGIN
 * 编写通用延时加载功能
 * Author:PENGLUNJIAN
 * Date:2016-12-21
 */

//延时加载方式一 Method One
(function lazyLoad() {


    var timer = null;

    function lazyLoad(index) {
        if (timer) clearInterval(timer);
        timer = setTimeout(function () {
            var iHeight = $(window).height();
            var $obj = $("img[data-loaded='false']:eq(" + index + ")");
            if ($obj[0]) {
                var offsetTop = $obj.parent().offset().top;
                var scrollTop = $(document).scrollTop();
                if (offsetTop - scrollTop <= iHeight) {
                    $obj.attr("data-loaded", "true");
                    var tempImg = new Image();
                    tempImg.src = $obj.attr("data-original");
                    $(tempImg).load(function () {
                        $obj.css("opacity", 0);
                        $obj.attr("src", $obj.attr("data-original"));
                        $obj.animate({"opacity": 1}, 300);
                        lazyLoad(index);
                    })
                }
            }
        }, 100);
    }

    $(function () {
        lazyLoad(0);
        $(window).scroll(function () {
            lazyLoad(0);
        })
    });
})()

//延时加载方式二 Method Second

/*function lazyLoad(){
 timer = setTimeout(function(){
 var iHeight = $(window).height();
 $("img[data-loaded='false']").each(function(){
 var $_obj = $(this);
 var offsetTop = $_obj.parent().offset().top;
 var scrollTop = $(document).scrollTop();
 if(offsetTop-scrollTop<=iHeight){
 $_obj.attr("data-loaded","true");
 var tempImg = new Image();
 tempImg.src = $_obj.attr("data-original");
 $(tempImg).load(function(){
 $_obj.css("opacity",0);
 $_obj.attr("src",$_obj.attr("data-original"));
 $_obj.animate({"opacity":1},300);
 })
 }
 });
 },100);
 }
 $(function(){
 lazyLoad();
 $(window).scroll(function(){
 lazyLoad();
 })
 });*/