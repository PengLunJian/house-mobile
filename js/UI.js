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
    this.switch = obj.switch;
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
            if (tempObj.switch) {
                tempObj.switch = false;
                $(tempObj.element).html("阅读更多");
                $(tempObj.targetElement).text(tempObj.targetElementText.substring(0, tempObj.limitFontSize) + "...");
            } else {
                tempObj.switch = true;
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
TimeCountDown.prototype.startClock = function () {
    var tempObj = this;
    var text = $(tempObj.el).text().trim().replace(/\d/g, "");
    $(tempObj.el).addClass("disabled");
    $(tempObj.el).attr("disabled", "disabled");
    tempObj.timer = setTimeout(function () {
        tempObj.time--;
        $(tempObj.el).html(tempObj.time + text);
        tempObj.fnCountDown();
        if (tempObj.time <= 0) {
            clearInterval(tempObj.timer);
            tempObj.finishFn();
        }
    }, 1000);
}

// 停止倒计时方法
TimeCountDown.prototype.stopClock = function () {
    if (this.timer) clearInterval(this.timer);
}

/**
 * BEGIN 编写数字软键盘插件
 * Author:PengLunJian
 * Date:2017-05-23
 * @param obj 初始化的参数对象
 * @constructor 数字软键盘构造函数
 */
function Keyboard(obj) {
    var _proto_obj = this;
    this.element = obj.element ? obj.element : ".modal_keyboard";
    this.btnCancel = obj.btnCancel ? obj.btnCancel : ".btn-cancel";
    this.btnConfirm = obj.btnConfirm ? obj.btnConfirm : ".btn-confirm";
    this.keyBtnElement = obj.keyBtnElement ? obj.keyBtnElement : ".btn-num-item";


    // 打开数字软键盘
    $(this.btnCancel).on("click", function () {
        _proto_obj.hide();
    });

    // 关闭数字软键盘
    $(this.btnConfirm).on("click", function () {
        _proto_obj.hide();
    });
}

/**
 * BEGIN 打开数字软键盘
 * Author:PengLunJian
 * Date:2017-05-23
 * @returns {Keyboard} 数字软键盘对象
 */
Keyboard.prototype.show = function () {
    if (this) $(this.element).removeClass("hide");
    return this;
}

/**
 * BEGIN 关闭数字软键盘
 * Author:PengLunJian
 * Date:2017-05-23
 * @returns {Keyboard} 数字软键盘对象
 */
Keyboard.prototype.hide = function () {
    if (this) $(this.element).addClass("hide");
    return this;
}

/**
 * BEGIN 点击键盘按键输入数字
 * Author:PengLunJian
 * Date:2017-05-23
 * @param selector 目标文本选择器
 * @returns {Keyboard} 数字软键盘对象
 */
Keyboard.prototype.keyBtnPress = function (selector) {
    var str = "";
    var $_obj = $(selector);
    var placeholder = $_obj.attr("data-placeholder").trim();
    $(this.element).off("touchstart").on("touchstart", this.keyBtnElement, function () {
        str = $_obj.text().trim();
        var index = $(this).index();
        var value = $(this).text().trim();
        if (11 == index) {
            if (str != placeholder) str = str.substring(0, str.length - 1);
        } else if (9 != index) {
            if (str == placeholder) str = "";
            if (str.length < $_obj.attr("data-size")) str += value;
        }
        if ("" == str || placeholder == str) {
            str = placeholder;
        }
        $_obj.text(str);
    });
    return this;
}

Keyboard.prototype.resetPosition = function (selector) {
    var _mc = " .modal_content";
    var selectName = this.element + _mc;
    var iHeight = $(selectName).outerHeight();
    var fontSize = parseFloat($("html").css("fontSize"));
    var translateY = "transform:translateY(" + (-iHeight / 2 / fontSize) + "rem)";
    $(selector + _mc).attr("style", translateY);
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
