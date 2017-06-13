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
    this.element = obj.element;
    this.TElement = obj.TElement;
    this.iSwitch = obj.iSwitch ? obj.iSwitch : false;
    this.limitFontSize = obj.limitFontSize ? obj.limitFontSize : 100;

    this.init().hide();
}
/**
 * BEGIN 字数限制初始化
 * Author:PengLunJian
 * Date:2017-05-10
 * @returns {LimitFontSize}
 */
LimitFontSize.prototype.init = function () {
    var _protoObj_ = this;
    $(this.element).each(function () {
        this.iSwitch = _protoObj_.iSwitch;
        this.TELement = $(this).prev(_protoObj_.TELement);
        this.TELText = this.TELement.text().trim();
        this.TELTextLen = this.TELText.length;
        if (this.TELTextLen <= _protoObj_.limitFontSize) {
            $(this).remove();
        } else {
            this.TELement.text(this.TELText.substring(0, _protoObj_.limitFontSize) + "...");
        }
    })
    return this;
}
/**
 * BEGIN 字数限制原型Hide方法
 * Author:PengLunJian
 * Date:2017-05-10
 * @returns {LimitFontSize}
 */
LimitFontSize.prototype.hide = function () {
    var _protoObj_ = this;
    $(this.element).on("click", function () {
        if (this.iSwitch) {
            this.iSwitch = false;
            $(this).html("阅读更多");
            this.TELement.text(this.TELText.substring(0, _protoObj_.limitFontSize) + "...");
        } else {
            this.iSwitch = true;
            $(this).html("收起更多");
            this.TELement.text(this.TELText);
        }
    });
    return this;
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
/**
 * BEGIN 开始倒计时方法
 * Author:PengLunJian
 * Date:2017-05-27
 * @returns {TimeCountDown} 返回当前对象实现连缀调用
 */
TimeCountDown.prototype.startTime = function () {
    var tempObj = this;
    var text = " 秒后重发";
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
    return this;
}
/**
 * BEGIN 停止倒计时方法
 * Author:PengLunJian
 * Date:2017-05-27
 * @returns {TimeCountDown} 返回当前对象实现连缀调用
 */
TimeCountDown.prototype.stopTime = function () {
    $(this.el).removeClass("disabled");
    $(this.el).text(this.initTime + " 秒后重发");
    $(this.el).removeAttr("disabled");
    if (this.timer) clearInterval(this.timer);
    return this;
}
/**
 * BEGIN 重新启动计时器
 * Author:PengLunJian
 * Date:2017-05-27
 * @param fn 回调函数可执行其他操作
 * @returns {TimeCountDown} 返回当前对象实现连缀调用
 */
TimeCountDown.prototype.restartTime = function (fn) {
    var _protoObj_ = this;
    $(_protoObj_.el).off("click").on("click", function () {
        if (!$(_protoObj_.el).hasClass("disabled")) {
            _protoObj_.startTime();
            fn();
        }
    });
    return this;
}
/**
 * BEGIN 集成个人验证模态框插件
 * Author:PengLunJian
 * Date:2017-05-27
 * @param obj 对象形参
 * @constructor 验证模态框构造函数
 */
function ModalBox(obj) {
    this.elementBg = obj.elementBg ? obj.elementBg : ".modal_bg";
    this.elementInput = obj.elementInput ? obj.elementInput : "";
    this.elementBtnBack = obj.elementBtnBack ? obj.elementBtnBack : ".btn.back";
    this.elementBtnNext = obj.elementBtnNext ? obj.elementBtnNext : ".btn.next";
    this.elementBtnClose = obj.elementBtnClose ? obj.elementBtnClose : ".btn.close";
    this.elementBtnCancel = obj.elementBtnCancel ? obj.elementBtnCancel : ".btn.cancel";
    this.elementBtnConfirm = obj.elementBtnConfirm ? obj.elementBtnConfirm : ".btn.confirm";
    this.elements = obj.elements ? obj.elements : [".modal_login", ".modal_phone", ".modal_code", ".modal_success"];

    this.oTime = null, this.phone = null, this.code = null;
    this.closeModal().prevModal().nextModal().checkCode().setLocalStorage("").openModalBox(obj);
}
/**
 * BEGIN 重置模态框状态
 * Author:PengLunJian
 * Date:2017-05-27
 * @returns {ModalBox} 返回当前对象实现连缀调用
 */
ModalBox.prototype.resetStatus = function () {
    $(".modal_msg").text("");
    $("input[name='phone']").val("");
    if (this.oTime) this.oTime.stopTime();

    this.code = "";
    $("input[name='code']").val("");
    $(".modal_item .code").text("");
    $(".modal_item").removeClass("checked");
    $(".modal_item:eq(0)").addClass("checked");
    return this;
}
/**
 * BEGIN 显示入口验证模态框
 * Author:PengLunJian
 * Date:2017-05-27
 * @returns {ModalBox} 返回当前对象实现连缀调用
 */
ModalBox.prototype.show = function () {
    $(".shop_body").addClass("blur");
    if (!$("html").hasClass("hidden")) {
        $("html").addClass("hidden");
    }
    $(this.elements[0]).removeClass("hide");
    return this;
}
/**
 * BEGIN 显示入口验证模态框
 * Author:PengLunJian
 * Date:2017-05-27
 * @returns {ModalBox} 返回当前对象实现连缀调用
 */
ModalBox.prototype.hide = function () {
    $(".shop_body").removeClass("blur");
    if ($("html").hasClass("hidden")) {
        $("html").removeClass("hidden");
    }
    for (var i = 0; i < this.elements.length; i++) {
        $(this.elements[i]).addClass("hide");
    }
    return this;
}
/**
 * BEGIN 显示入口验证模态框
 * Author:PengLunJian
 * Date:2017-05-27
 * @returns {ModalBox} 返回当前对象实现连缀调用
 */
ModalBox.prototype.closeModal = function () {
    var _protoObj_ = this;
    var selector = this.elementBtnClose + "," + this.elementBtnCancel + "," + this.elementBg;
    $(selector).on("click", function () {
        _protoObj_.hide();
        _protoObj_.resetStatus();
    });
    return this;
}
/**
 * BEGIN 显示入口验证模态框
 * Author:PengLunJian
 * Date:2017-05-27
 * @returns {ModalBox} 返回当前对象实现连缀调用
 */
ModalBox.prototype.prevModal = function () {
    var _protoObj_ = this;
    if (_protoObj_.elementBtnBack) {
        $(_protoObj_.elementBtnBack).on("click", function () {
            var className = $(this).parents(".modal").attr("class");
            var regExp = /modal\s|' '|hide/g;
            var filterName = "." + className.replace(regExp, "");
            _protoObj_.resetStatus();
            if (_protoObj_.oTime) _protoObj_.oTime.stopTime();
            for (var i = 0; i < _protoObj_.elements.length; i++) {
                if (filterName == _protoObj_.elements[i] && (i - 1) >= 0) {
                    _protoObj_.hide();
                    $(".shop_body").addClass("blur");
                    if (!$("html").hasClass("hidden")) {
                        $("html").addClass("hidden");
                    }
                    $(_protoObj_.elements[i - 1]).removeClass("hide");
                    return this;
                }
            }
        })
    }
    return this;
}
/**
 * BEGIN 手机号非空校验
 * Author:PengLunJian
 * Date:2017-05-19
 * @param phoneNumber 用户输入的手机号
 * @returns {boolean} 返回布尔类型
 */
ModalBox.prototype.phoneNotEmptyCheck = function (phoneNumber) {
    var message = "";
    var result = false;
    var regExp = /^1\d{10}$/;
    if (!phoneNumber || "输入手机号" == phoneNumber) {
        message = "手机号不能为空";
    } else if (!regExp.test(phoneNumber)) {
        message = "手机号格式不正确";
    } else {
        result = true;
    }
    if (!result) {
        $(".modal_phone .modal_msg").text(message);
    }
    return result;
}
/**
 * BEGIN 服务器端手机验证
 * Author:PengLunJian
 * Date:2017-05-19
 * @param phoneNumber 用户输入的手机号
 * @param url 服务器端访问路径
 */
ModalBox.prototype.ajaxRequestPhoneCheck = function (phoneNumber, url) {
    var _protoObj_ = this;
    $(".modal_code .modal_info").text("验证码发送至" + phoneNumber);
    $.ajax({
        url: url,
        type: "POST",
        async: true,
        timeout: 2000,
        dataType: "JSON",
        data: {phoneNumber: phoneNumber},
        success: function (data) {
            $(_protoObj_.elements[2] + " .modal_msg").text(data);
            localStorage.setItem("code", "1234");
        },
        error: function (msg) {
            msg = "服务器连接异常！";
            $(_protoObj_.elements[2] + " .modal_msg").text(msg);
            localStorage.setItem("code", "1234");
        }
    })
}
/**
 * BEGIN 显示入口验证模态框
 * Author:PengLunJian
 * Date:2017-05-27
 * @returns {ModalBox} 返回当前对象实现连缀调用
 */
ModalBox.prototype.nextModal = function () {
    var _protoObj_ = this;
    $(_protoObj_.elementBtnConfirm).on("click", function () {
        var className = $(this).parents(".modal").attr("class");
        var regExp = /modal\s|' '|hide/g;
        var filterName = "." + className.replace(regExp, "");
        for (var i = 0; i < _protoObj_.elements.length; i++) {
            if (filterName == _protoObj_.elements[i]) {
                $(".shop_body").addClass("blur");
                if (!$("html").hasClass("hidden")) $("html").addClass("hidden");
                switch (i) {
                    case 0:
                        _protoObj_.hide();
                        $(".shop_body").addClass("blur");
                        if (!$("html").hasClass("hidden")) $("html").addClass("hidden");
                        $(_protoObj_.elements[i + 1]).removeClass("hide");
                        break;
                    case 1:
                        var phoneNumber = $("input[name='phone']").val().trim();
                        if (_protoObj_.phoneNotEmptyCheck(phoneNumber)) {
                            _protoObj_.hide();
                            $(".shop_body").addClass("blur");
                            if (!$("html").hasClass("hidden")) $("html").addClass("hidden");
                            $(_protoObj_.elements[i + 1]).removeClass("hide");
                            _protoObj_.oTime = new TimeCountDown({
                                time: 60,
                                el: ".btn.send",
                                fn: function () {
                                    this.time = this.initTime;
                                    $(this.el).html("重新获取");
                                    $(this.el).removeClass("disabled");
                                    $(this.el).removeAttr("disabled");
                                }
                            });
                            _protoObj_.oTime.startTime();
                            _protoObj_.ajaxRequestPhoneCheck(phoneNumber, "/demo");
                            _protoObj_.oTime.restartTime(function () {
                                _protoObj_.ajaxRequestPhoneCheck(phoneNumber, "/demo");
                            });
                        }
                        break;
                }
            }
        }
    });
    return this;
}
/**
 * BEGIN 核对验证码
 * Author:PengLunJian
 * Date:2017-05-27
 * @returns {ModalBox} 返回当前对象实现连缀调用
 */
ModalBox.prototype.checkCode = function () {
    var _protoObj_ = this;
    var constKeyCode = 48;
    $(".modal_item .code").on("click", function () {
        $("input[name='code']").focus();
    });
    $("input[name='code']").on("keyup", function (e) {
        _protoObj_.code = $(this).val().trim();
        var selector = ".modal_item:eq(" + (_protoObj_.code.length - 1) + ") .code";
        if (e.keyCode == 8) {
            selector = ".modal_item:eq(" + (_protoObj_.code.length) + ") .code";
            $(selector).text("");
        } else {
            $(selector).text(e.keyCode - constKeyCode);
        }
        var afterCode = localStorage.getItem("code");
        $(".modal_item").removeClass("checked");
        selector = ".modal_item:eq(" + _protoObj_.code.length + ")";
        $(selector).addClass("checked");
        if (_protoObj_.code.length >= 4) {
            if (_protoObj_.code == afterCode) {
                $(this).blur();
                _protoObj_.hide();
                $(".shop_body").addClass("blur");
                if (!$("html").hasClass("hidden")) $("html").addClass("hidden");
                $(_protoObj_.elements[3]).removeClass("hide");
            } else {
                $(".modal_code .modal_msg").text("验证码输入错误！");
            }
            _protoObj_.code = "";
            $("input[name='code']").val("");
            $(".modal_item .code").text("");
            $(".modal_item").removeClass("checked");
            $(".modal_item:eq(0)").addClass("checked");
        }
    });
    return this;
}
/**
 * BEGIN 判断用户是否认证
 * Author:PengLunJian
 * Date:2017-06-02
 * @param url 接口访问路径
 * @param paramsObj 对象形参
 * @returns {ModalBox} 返回当前对象实现连缀调用
 */
ModalBox.prototype.isChecked = function (paramsObj) {
    var _protoObj_ = this;
    $.ajax({
        url: paramsObj['url'],
        type: "POST",
        data: paramsObj,
        dataType: "JSON",
        success: function (data) {
            if (data == 0) {
                _protoObj_.show();
            } else {
                localStorage.setItem("phone", data);
                window.location.href = "07_聊天页面.html";
            }
        },
        error: function (msg) {

        }
    });
    return this;
}

/**
 * BEGIN 设置本地存储数据
 * Author:PengLunJian
 * Date:2017-06-06
 * @param url 接口访问路径
 * @returns {ModalBox} 返回当前对象实现连缀调用
 */
ModalBox.prototype.setLocalStorage = function (url) {
    $.ajax({
        url: url,
        type: "POST",
        dataType: "JSON",
        data: {},
        success: function (data) {

        },
        error: function (msg) {

        }
    })
    localStorage.setItem("dataId", "353");
    localStorage.setItem("toUser", "11_799");
    localStorage.setItem("account", "11_675");
    localStorage.setItem("phone", "15900912480");
    localStorage.setItem("fromUser", "15900912480");
    localStorage.setItem("token", "ff24c71623bc99c3");
    localStorage.setItem("outImg", "images/user_logo.jpg");
    localStorage.setItem("inImg", "images/chat_logo.jpg");
    localStorage.setItem("userId", "osZl4jjpN6OO58xgTZSUgxlUpRYb");

    return this;
}
/**
 *
 * @param paramsObj
 * @returns {ModalBox}
 */
ModalBox.prototype.openModalBox = function (paramsObj) {
    var _protoObj_ = this;
    $(".icon-message").on("click", function () {
        _protoObj_.isChecked(paramsObj);
    });
    return this;
}
/**
 * BEGIN 设置字体大小
 * Author:PengLunJian
 * Date:2017-05-27
 * @param obj 对象形参
 * @constructor 构造函数
 */
function HtmlFontSize(obj) {
    this.element = obj.element;
    this.runSetFontSize();
}
/**
 * BEGIN 设置字体大小方法
 * Author:PengLunJian
 * Date:2017-05-27
 * @param selector 选择器
 * @returns {HtmlFontSize} 返回当前对象实现连缀调用
 */
HtmlFontSize.prototype.setFontSize = function (selector) {
    var iFontSize = $(window).width() / 3.75 + "px";
    $(selector).css("fontSize", iFontSize);
    return this;
}
/**
 * BEGIN 调用设置字体大小
 * Author:PengLunJian
 * Date:2017-05-27
 * @returns {HtmlFontSize} 返回当前对象实现连缀调用
 */
HtmlFontSize.prototype.runSetFontSize = function () {
    var _protoObj_ = this;
    $(function () {
        _protoObj_.setFontSize(_protoObj_.element);
        $(window).resize(function () {
            _protoObj_.setFontSize(_protoObj_.element);
        });
        document.body.addEventListener('touchstart', function () {
        });
    });
    return this;
}
/**
 * BEGIN 调用设置字体大小
 * Author:PengLunJian
 * Date:2017-06-05
 * @param ev
 * @constructor 构造函数
 */
function Touch(ev) {
    return this.getTouch(ev);
}
/**
 * BEGIN 调用设置字体大小
 * Author:PengLunJian
 * Date:2017-06-05
 * @param ev
 * @returns {*}
 */
Touch.prototype.getTouch = function (ev) {
    ev = event || window.event;
    ev.stopPropagation();
    var touch = ev.touches[0] || ev.changedTouches[0] || ev.targetTouches[0];
    return touch;
}
/**
 * BEGIN 延时加载插件
 * Author:PengLunJian
 * Date:2017-06-06
 * @param obj 初始化对象形参
 * @constructor 构造函数
 */
function Lazyload(obj) {
    this.timer = obj.timer ? obj.timer : null;
    this.loadImgCount = obj.loadImgCount ? obj.loadImgCount : 5;
    this.loadImg = obj.loadImg ? obj.loadImg : "images/loading.png";
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
                    $(_this).attr("src", this.src);
                    $(_this).animate({"opacity": 1}, 300);
                    _this.tempImgObj = null;
                });
                $(this.tempImgObj).on("error", function () {
                    $(_this).attr("data-loaded", "true");
                    _this.tempImgObj = null;
                });
            }
        });
    }, 100);
    return _protoObj_;
}


$(function () {
    new HtmlFontSize({
        element: "html"
    });

    new Lazyload({
        loadImgCount: 5
    });
})
