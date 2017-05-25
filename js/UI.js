/**
 * BEGIN 选项卡切换插件
 * Author:PengLunJian
 * Date:2017-05-12
 * @param obj 对象形参
 * @constructor 构造函数
 */
function MoveBar(obj) {
    this.element = obj.element;
    this.startBtnEle = obj.startBtnEle;
    this.ajaxFunction = obj.ajaxFunction;
    this.dataIndex = obj.dataIndex ? obj.dataIndex : 0;
}

/**
 * BEGIN 选项卡选中状态
 * Author:PengLunJian
 * Date:2017-05-12
 */
MoveBar.prototype.startMove = function () {
    var tempObj = this;
    $(this.startBtnEle).on("click", function () {
        var index = $(this).index();
        tempObj.dataIndex = index;
        $(this).addClass("active");
        $(tempObj.startBtnEle).not(this).removeClass("active");
        var rootFontSize = parseFloat($("html").css("fontSize"));
        var value = ($(this).width() - $(tempObj.element).width()) / 2 + $(this).width() * index;
        var remValue = value / rootFontSize;
        tempObj.setTranslate(remValue);
        if ("function" == typeof tempObj.ajaxFunction) tempObj.ajaxFunction();
    });
}

/**
 * BEGIN 设置选项卡滚动条样式
 * Author:PengLunJian
 * Date:2017-05-12
 * @param value 位移形参 TranslateX
 */
MoveBar.prototype.setTranslate = function (value) {
    var style = '-webkit-transform: translateX(' + value + 'rem);'
        + '-moz-transform: translateX(' + value + 'rem);'
        + '-ms-transform: translateX(' + value + 'rem);'
        + '-o-transform: translateX(' + value + 'rem);'
        + 'transform: translateX(' + value + 'rem);';
    $(this.element).attr("style", style);
}

/**
 * BEGIN 编写字数限制插件
 * Author:PengLunJian
 * Date:2017-05-11
 * @param obj 对象形参
 * @constructor 字数限制构造函数
 */
function LimitFontSize(obj) {
    this.iSwitch = obj.iSwitch;
    this.element = obj.element;
    this.targetElement = obj.targetElement;
    this.limitFontSize = obj.limitFontSize ? obj.limitFontSize : 100;

    this.targetElementText = $(this.targetElement).text().trim();
    this.targetElementTextLen = $(this.targetElement).text().trim().length;
    if (this.targetElementTextLen <= this.limitFontSize) {
        $(this.element).remove();
    } else {
        $(this.targetElement).text(this.targetElementText.substring(0, this.limitFontSize) + "...");
    }
}

/**
 * 字数限制原型Hide方法
 */
LimitFontSize.prototype.hide = function () {
    var tempObj = this;
    if (this.targetElementTextLen >= this.limitFontSize) {
        $(this.element).on("click", function () {
            if (tempObj.iSwitch) {
                tempObj.iSwitch = false;
                $(tempObj.element).html("阅读更多");
                $(tempObj.targetElement).text(tempObj.targetElementText.substring(0, tempObj.limitFontSize) + "...");
            } else {
                tempObj.iSwitch = true;
                $(tempObj.element).html("收起更多");
                $(tempObj.targetElement).text(tempObj.targetElementText);
            }
        });
    }
}

/**
 * BEGIN 倒计时插件
 * Author:PengLunJian
 * Date:2017-05-10
 * @param obj 初始化的参数对象
 * @constructor 倒计时构造函数
 */
function TimeCountDown(obj) {
    this.timer = null;
    this.el = obj.el;
    this.time = obj.time ? obj.time : 60;
    this.initTime = obj.time ? obj.time : 60;
    this.finishFn = obj.fn;
}

// 开始倒计时方法
TimeCountDown.prototype.startTime = function () {
    var tempObj = this;
    var text = $(tempObj.el).text().trim().replace(/\d/g, "");
    $(tempObj.el).addClass("disabled");
    $(tempObj.el).attr("disabled", "disabled");
    tempObj.timer = setTimeout(function () {
        tempObj.time--;
        $(tempObj.el).html(tempObj.time + text);
        tempObj.startTime();
        if (tempObj.time <= 0) {
            clearInterval(tempObj.timer);
            tempObj.finishFn();
        }
    }, 1000);
}

// 停止倒计时方法
TimeCountDown.prototype.stopTime = function () {
    if (this.timer) clearInterval(this.timer);
}

// 集成模态框验证插件

function ModalBox(obj) {
    this.element = obj.element ? obj.element : ".modal";
    this.elementBg = obj.elementBg ? obj.elementBg : ".modal_bg";
    this.elementInput = obj.elementInput ? obj.elementInput : "";
    this.elementPreModal = obj.elementPreModal ? obj.elementPreModal : "";
    this.elementBtnBack = obj.elementBtnBack ? obj.elementBtnBack : ".btn.back";
    this.elementBtnNext = obj.elementBtnNext ? obj.elementBtnNext : ".btn.next";
    this.elementBtnClose = obj.elementBtnClose ? obj.elementBtnClose : ".btn.close";
    this.elementBtnCancel = obj.elementBtnCancel ? obj.elementBtnCancel : ".btn.cancel";
    this.elementBtnConfirm = obj.elementBtnConfirm ? obj.elementBtnConfirm : ".btn.confirm";

    this.close();
    this.back();
}

ModalBox.prototype.show = function () {
    $(".shop_body").addClass("blur");
    if (!$("html").hasClass("hidden")) {
        $("html").addClass("hidden");
    }
    if (this) $(this.element).removeClass("hide");
    return this;
}

ModalBox.prototype.hide = function () {
    $(".shop_body").removeClass("blur");
    if ($("html").hasClass("hidden")) {
        $("html").removeClass("hidden");
    }
    $(".modal").addClass("hide");
    return this;
}

ModalBox.prototype.close = function () {
    var _protoObj_ = this;
    var selector = this.elementBtnClose + "," + this.elementBtnCancel + "," + this.elementBg;
    $(selector).on("click", function () {
        _protoObj_.hide();
    });
    return this;
}

ModalBox.prototype.back = function () {
    var _protoObj_ = this;
    if (_protoObj_.elementBtnBack) {
        $(_protoObj_.elementBtnBack).on("click", function () {
            _protoObj_.hide();
            $(_protoObj_.elementPreModal).removeClass("hide");
        })
    }
    return this;
}

ModalBox.prototype.confirm = function (fn) {
    var _protoObj_ = this;
    if (_protoObj_.elementBtnConfirm) {
        $(_protoObj_.elementBtnConfirm).on("click", function () {
            _protoObj_.hide();
            fn();
        })
    }
    return this;
}


function setFontSize() {
    var iFontSize = $(window).width() / 3.75 + "px";
    $("html").css("fontSize", iFontSize);
}

$(function () {
    setFontSize();
    $(window).resize(function () {
        setFontSize();
    });
    document.body.addEventListener('touchstart', function () {
    });
});
