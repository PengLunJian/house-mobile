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
    this.pageCode = obj.pageCode ? obj.pageCode : 1;
    this.oInput = obj.oInput ? obj.oInput : $("input[name='say']");
    this.paramsObj = obj.paramsObj ? obj.paramsObj : this.getParamsObj({
        method: "get_msg"
    });

    this.init(".fixed").sendMsg(".send").dropDown();

}
/**
 *
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
 *
 * @param element
 * @returns {SessionPage}
 */
SessionPage.prototype.sendMsg = function (element) {
    var _protoObj_ = this;
    $(element).on("click", function () {
        var msg = nim.sendText({
            scene: 'p2p',
            to: '11_710',
            text: _protoObj_.oInput.val(),
            done: sendMsgDone
        });
        var paramsObj = _protoObj_.getParamsObj(msg);
        _protoObj_.refreshPage(paramsObj);
        this.oInput.val("");
        this.oInput.focus();
        _protoObj_.moveBottom();
        _protoObj_.addMessage(_protoObj_.url, paramsObj);
    });
    return this;
}
/**
 *
 * @param paramsObj
 * @returns {SessionPage}
 */
SessionPage.prototype.refreshPage = function (paramsObj) {
    var phone = localStorage.getItem("phone");
    var position = paramsObj['from_user'] == phone ? "right" : "left";
    var msg = paramsObj['content_txt'] ? paramsObj['content_txt'] : paramsObj['text'];
    var msgId = paramsObj['msg_id'] ? paramsObj['msg_id'] : paramsObj['idClient'];
    var template = '<li id="' + msgId + '" class="' + position + '"><div class="image">'
        + '<img src="images/chat_logo.jpg"></div><div class="info">'
        + '<p>' + msg + '</p></div></li>';
    $(".session_content").append(template);
    return this;
}
/**
 *
 * @param paramsObj
 * @param message
 * @returns {SessionPage}
 */
SessionPage.prototype.showStatus = function (paramsObj, message) {
    var tempObj = $("#" + paramsObj['msg_id']);
    tempObj.addClass("error");
    tempObj.find(".msg").html(message);
    return this;
}
/**
 *
 * @param url
 * @param paramsObj
 * @returns {SessionPage}
 */
SessionPage.prototype.historyRecord = function (paramsObj) {
    var _protoObj_ = this;
    $.ajax({
        url: paramsObj.url,
        type: "POST",
        data: paramsObj,
        dataType: "text",
        success: function (data) {
            data = JSON.parse(data);
            if (data.length > 0) {
                _protoObj_.pageCode++;
                for (var i = 0; i < data.length; i++) {
                    _protoObj_.refreshPage(paramsObj);
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
 *
 * @param url
 * @param paramsObj
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
            console.log("添加成功！");
        },
        error: function (msg) {
            console.log("添加失败！");
            _protoObj_.showStatus(paramsObj, "服务器连接异常，请检查您的网络或联系管理员!");
        }
    });
    return this;
}
/**
 *
 * @returns {SessionPage}
 */
SessionPage.prototype.dropDown = function () {
    var _protoObj_ = this;
    $(window).on("scroll", function () {
        if ($(this).scrollTop() <= 0) {
            if (_protoObj_.timer) clearInterval(_protoObj_.timer);
            _protoObj_.timer = setTimeout(function () {
                _protoObj_.historyRecord(_protoObj_.getParamsObj({
                    method: "get_msg"
                }));
            }, 500);
        }
    });
    return this;
}
/**
 *
 * @param paramsObj
 * @returns {SessionPage}
 */
SessionPage.prototype.pullMsg = function (paramsObj) {
    var _protoObj_ = this;
    _protoObj_.refreshPage(paramsObj);
    _protoObj_.moveBottom();
    _protoObj_.addMessage(_protoObj_.url, paramsObj);
    return this;
}
/**
 *
 * @param paramsObj
 * @returns {*}
 */
SessionPage.prototype.getParamsObj = function (paramsObj) {
    paramsObj.method = paramsObj.method ? paramsObj.method : "";
    // paramsObj.txt = paramsObj.txt ? paramsObj.txt : this.oInput.val();
    paramsObj.page = paramsObj.page ? paramsObj.page : this.pageCode;
    paramsObj.pageCode = paramsObj.pageCode ? paramsObj.pageCode : this.pageCode;
    paramsObj.tel = paramsObj.tel ? paramsObj.tel : localStorage.getItem("phone");
    // paramsObj.content_txt = paramsObj.content_txt ? paramsObj.content_txt : this.oInput.val();
    // paramsObj.from_user = paramsObj.from_user ? paramsObj.from_user : localStorage.getItem("phone");
    // paramsObj.to_user = paramsObj.to_user ? paramsObj.to_user : "11_803";
    paramsObj.data_id = paramsObj.data_id ? paramsObj.data_id : "353";
    // paramsObj.msg_id = paramsObj.msg_id ? paramsObj.msg_id : paramsObj['idClient'];
    paramsObj.url = paramsObj.url ? paramsObj.url : "http://gl.2ma2.com/ashx/IMAjax.ashx";

    this.paramsObj = paramsObj;
    return this.paramsObj;
}
/**
 *
 * @returns {SessionPage}
 */
SessionPage.prototype.moveBottom = function () {
    var frontHeight = $(".fixed").outerHeight();
    var afterHeight = $("body").outerHeight();
    var offsetHeight = afterHeight - frontHeight;
    $("html,body").animate({
        scrollTop: offsetHeight
    });
    return this;
}