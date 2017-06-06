/**
 * BEGIN 延时加载插件
 * Author:PengLunJian
 * Date:2017-06-06
 * @param obj 初始化对象形参
 * @constructor 构造函数
 */
function Lazyload(obj) {
    this.timer = obj.timer ? obj.timer : null;
    this.loadImg = obj.loadImg ? obj.loadImg : "images/loading.png";
    this.loadImgLength = obj.loadImgLength ? obj.loadImgLength : 5;
    this.element = obj.element ? obj.element : "img[src='" + this.loadImg + "']";

    this.loading();
}
/**
 * BEGIN 加载方法
 * Author:PengLunJian
 * Date:2017-06-06
 * @returns {Lazyload}
 */
Lazyload.prototype.loading = function () {
    var _protoObj_ = this;
    this.timer = setInterval(function () {
        $(_protoObj_.element).each(function () {
            var _this = this;
            this.iWidth = $(window).outerWidth();
            this.iHeight = $(window).outerHeight();
            this.dataLoaded = "false" == $(this).attr("data-loaded");
            this.iTop = $(this).offset().top - $(window).scrollTop();
            this.iLeft = $(this).offset().left - $(window).scrollLeft();
            this.offsetYIN = (this.iTop >= 0 && this.iTop <= this.iHeight);
            this.offsetXIN = (this.iLeft >= 0 && this.iLeft <= this.iWidth);
            if (this.offsetXIN && this.offsetYIN && this.dataLoaded) {
                this.tempImgObj = new Image();
                this.tempImgObj.src = $(this).attr("data-original");
                $(this.tempImgObj).on("load", function () {
                    $(_this).attr("data-loaded", "true");
                    $(_this).css("opacity", 0);
                    $(_this).attr("src", _this.tempImgObj.src);
                    $(_this).animate({"opacity": 1}, 300);
                });
            }
        });
    }, 100);
    return _protoObj_;
}
