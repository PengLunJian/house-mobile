/**
 * BEGIN 设置字体大小
 * Author:PengLunJian
 * Date:2017-06-01
 * @param obj 对象形参
 * @constructor 构造函数
 */
function SessionPage(obj) {
    this.url = obj.url ? obj.url : "";
    this.pageCode = obj.pageCode ? obj.pageCode : 1;
    this.paramsObj = obj.paramsObj ? obj.paramsObj : null;

    this.messageTemplate = {
        warn: '',
    };
    this.init(".fixed").send(".send").historyRecord(this.url, this.paramsObj);
}

/**
 * BEGIN 设置字体大小
 * Author:PengLunJian
 * Date:2017-06-01
 * @param element
 * @returns {SessionPage}
 */
SessionPage.prototype.init = function (element) {
    $("input[name='say']").on("blur", function () {
        $(element).removeClass("absolute");
    });
    $(".session").on("touchstart", function () {
        $("input[name='say']").blur();
    });
    $("input[name='say']").on("focus", function () {
        $(element).addClass("absolute");
    });
    return this;
}

/**
 * BEGIN 设置字体大小
 * Author:PengLunJian
 * Date:2017-06-01
 * @param element
 * @returns {SessionPage}
 */
SessionPage.prototype.send = function (element) {
    var _protoObj_ = this;
    var paramsObj = null;
    var tempObj = $("input[name='say']");
    $(element).on("click", function () {
        paramsObj = {
            method: "add_sms",
            txt: tempObj.val(),
            content_txt: tempObj.val(),
            from_user: "15900912480",
            tel: localStorage.getItem("phone"),
            to_user: "11_803",
            data_id: "353",
            msg_id: "22e604c7811c23586355f63f24658530"
        };
        var template = _protoObj_.getTemplate(paramsObj);
        $(".session").append(template);
        tempObj.val("");
        tempObj.focus();
        var frontHeight = $(element).outerHeight();
        var afterHeight = $("body").outerHeight();
        var offsetHeight = afterHeight - frontHeight;
        $("html,body").animate({
            scrollTop: offsetHeight
        });
        _protoObj_.addMessage(_protoObj_.url, paramsObj);
    });
    return this;
}

/**
 * BEGIN 设置字体大小
 * Author:PengLunJian
 * Date:2017-06-01
 * @param obj
 * @returns {string}
 */
SessionPage.prototype.getTemplate = function (obj) {
    var phone = localStorage.getItem("phone");
    var position = obj['from_user'] == phone ? "right" : "left";
    var template = '<li id="' + obj['msg_id'] + '" class="' + position + '"><div class="image">'
        + '<img src="images/chat_logo.jpg"></div><div class="info">'
        + '<p>' + obj['content_txt'] + '</p></div></li>';
    return template;
}

/**
 *
 * @param info
 * @returns {string}
 */
SessionPage.prototype.getMessageTemplate = function (info) {
    var template = '<li class="line"><div class="message"><p>' + info + '</p></div></li>';
    return this.messageTemplate['warn'] = template;
}
/**
 * BEGIN 设置字体大小
 * Author:PengLunJian
 * Date:2017-06-01
 * @returns {SessionPage}
 */
SessionPage.prototype.historyRecord = function (url, paramsObj) {
    var _protoObj_ = this;
    $.ajax({
        url: url,
        type: "POST",
        data: paramsObj,
        dataType: "text",
        success: function (data) {
            _protoObj_.pageCode++;
            data = JSON.parse(data);
            for (var i = 0; i < data.length; i++) {
                $(".load_more").after(_protoObj_.getTemplate(data[i]));
            }
        },
        error: function (msg) {

        }
    });
    return this;
}

/**
 * BEGIN 设置字体大小
 * Author:PengLunJian
 * Date:2017-06-01
 * @returns {SessionPage}
 */
SessionPage.prototype.addMessage = function (url, paramsObj) {
    var _protoObj_ = this;
    var tempObj = $("#" + paramsObj['msg_id']);
    $.ajax({
        url: url,
        type: "POST",
        data: paramsObj,
        dataType: "text",
        success: function (data) {
            console.log(data);
        },
        error: function (msg) {
            tempObj.addClass("fail");
            tempObj.after(_protoObj_.getMessageTemplate("服务器连接异常，请检查您的网络或联系管理员!"));
        }
    });
    return this;
}

// SessionPage.prototype.dropDown = function (element) {
//     var _protoObj_ = this;
//     var pageCode = this.pageCode;
//     var url = "http://gl.2ma2.com/ashx/IMAjax.ashx";
//     $(window).on("scroll", function (ev) {
//         // _protoObj_.historyRecord(url, {
//         //     page: pageCode,
//         //     method: "get_msg",
//         //     user_id: "11_803",
//         //     data_id: 353,
//         //     customer_tel: localStorage.getItem("phone")
//         // });
//     });
//     _protoObj_.initX = 0;
//     _protoObj_.initY = 0;
//     $(document).on("touchstart", function (ev) {
//         ev = event || window.event;
//         var touch = ev.touches[0];
//         _protoObj_.initX = touch.pageX;
//         _protoObj_.initY = touch.pageY;
//         document.title = touch.pageX + "==" + touch.pageY;
//     });
//     $(document).on("touchmove", function (ev) {
//         ev = event || window.event;
//         var touch = ev.touches[0];
//         $(".session").attr("style", "transform:translateY(" + (touch.pageY - _protoObj_.initY) + "px)");
//         document.title = touch.pageX + "==" + touch.pageY;
//     });
//     $(document).on("touchend", function (ev) {
//         ev = event || window.event;
//         var touch = ev.changedTouches[0];
//         $(".session").attr("style", "transform:translateY(0px);transition:all 300ms ease-out;");
//         document.title = touch.pageX + "==" + touch.pageY;
//     });
//     return this;
// }

