/**
 * BEGIN 设置字体大小
 * Author:PengLunJian
 * Date:2017-06-01
 * @param obj 对象形参
 * @constructor 构造函数
 */
function SessionPage(obj) {
    this.url = obj.url ? obj.url : "";
    this.timer = obj.timer ? obj.timer : null;
    this.timer = obj.timer ? obj.timer : null;
    this.pageCode = obj.pageCode ? obj.pageCode : 1;
    this.paramsObj = obj.paramsObj ? obj.paramsObj : null;

    this.init(".fixed")
        .send(".send")
        .dropDown(".session_box")
        .historyRecord(this.url, this.paramsObj);

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
    $(".session_box").on("touchstart", function () {
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
        $(".session_content").append(template);
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
 * @param paramsObj
 * @param type
 * @param message
 * @returns {SessionPage}
 */
SessionPage.prototype.showStatus = function (paramsObj, type, message) {
    var messageTemplate = "";
    var tempObj = $("#" + paramsObj['msg_id']);
    if ("information" == type) {

    } else if ("warning" == type) {
        messageTemplate = '<li class="line"><div class="message"><p>' + message + '</p></div></li>';
        tempObj.addClass("fail");
        tempObj.after(messageTemplate);
    } else if ("error" == type) {

    } else if ("question" == type) {

    }
    return this;
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
            data = JSON.parse(data);
            if (data.length > 0) {
                _protoObj_.pageCode++;
                for (var i = 0; i < data.length; i++) {
                    $("#load_more").after(_protoObj_.getTemplate(data[i]));
                }
            } else {
                $("#load_more").html("全部加载完毕！");
            }
        },
        error: function (msg) {
            $("#load_more").html("服务器连接异常，请检查您的网络或联系管理员!");
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
    $.ajax({
        url: url,
        type: "POST",
        data: paramsObj,
        dataType: "text",
        success: function (data) {
            //console.log(data);
        },
        error: function (msg) {
            _protoObj_.showStatus(paramsObj, "warning", "服务器连接异常，请检查您的网络或联系管理员!");
        }
    });
    return this;
}

/**
 *
 * @param element
 * @returns {SessionPage}
 */
SessionPage.prototype.dropDown = function (element) {
    var _protoObj_ = this;
    $(window).on("scroll", function () {
        var fontSize = parseFloat($("html").css("fontSize"));
        if ($(this).scrollTop() <= 0.48 * fontSize) {
            if (_protoObj_.timer) clearInterval(_protoObj_.timer);
            _protoObj_.timer = setTimeout(function () {
                _protoObj_.historyRecord(_protoObj_.url, {
                    page: _protoObj_.pageCode,
                    method: "get_msg",
                    user_id: "11_803",
                    data_id: 353,
                    customer_tel: localStorage.getItem("phone")
                });
            }, 500);
        }
    });
    return this;
}