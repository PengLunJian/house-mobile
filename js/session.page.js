/**
 *
 * @param obj
 * @constructor
 */
function SessionPage(obj) {
    this.initX = obj.initX ? obj.initX : 0;
    this.initY = obj.initY ? obj.initY : 0;
    this.timer = obj.timer ? obj.timer : null;
    this.page_code = obj.page_code ? obj.page_code : 1;
    this.oInput = obj.oInput ? obj.oInput : $("input[name='say']");
    this.url = obj.url ? obj.url : "http://gl.2ma2.com/ashx/IMAjax.ashx";

    this.init(".fixed").sendMsg(".send").dropDown().DropDownAnimation(".session_content");

}
/**
 *
 * @param element
 * @returns {SessionPage}
 */
SessionPage.prototype.init = function (element) {
    var _protoObj_ = this;
    this.oInput.on("blur", function () {
        $(element).removeClass("absolute");
    });
    $(".session_content").on("touchstart", function () {
        _protoObj_.oInput.blur();
    });
    this.oInput.on("focus", function () {
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
    });
    return this;
}
/**
 *
 * @param paramsObj
 * @returns {string}
 */
SessionPage.prototype.getTemplate = function (paramsObj) {
    var template = '<li id="' + paramsObj['idClient'] + '" class="' + paramsObj['flow'] + '">'
        + '<div class="image"><img src="' + paramsObj['userImg'] + '"></div><div class="info">'
        + '<p>' + paramsObj['text'] + '</p></div><p class="msg"></p></li>';
    return template;
}
/**
 *
 * @param paramsObj
 * @returns {SessionPage}
 */
SessionPage.prototype.pushMsg = function (paramsObj) {
    var template = this.getTemplate(paramsObj);
    $(".session_content").append(template);
    this.oInput.val("");
    this.oInput.focus();
    this.moveBottom();
    this.addMessage(paramsObj);
    return this;
}
/**
 *
 * @param paramsObj
 * @returns {SessionPage}
 */
SessionPage.prototype.showStatus = function (paramsObj) {
    var tempObj = $("#" + paramsObj['msg_id']);
    tempObj.addClass("error");
    tempObj.find(".msg").html(paramsObj['statusMsg']);
    return this;
}
/**
 *
 * @param paramsObj
 * @returns {SessionPage}
 */
SessionPage.prototype.historyRecord = function (paramsObj) {
    var template = "";
    var _protoObj_ = this;
    paramsObj['method'] = "get_msg";
    $.ajax({
        url: _protoObj_.url,
        type: "POST",
        data: paramsObj,
        dataType: "text",
        success: function (data) {
            data = JSON.parse(data);
            if (data.length > 0) {
                _protoObj_.page_code++;
                for (var i = 0; i < data.length; i++) {
                    template += _protoObj_.getTemplate(_protoObj_.getParamsObj(data[i]));
                }
                $("#load_more").after(template);
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
 * @param paramsObj
 * @returns {SessionPage}
 */
SessionPage.prototype.addMessage = function (paramsObj) {
    paramsObj['method'] = "add_msg";
    var _protoObj_ = this;
    $.ajax({
        url: _protoObj_.url,
        type: "POST",
        data: paramsObj,
        dataType: "text",
        success: function (data) {
            console.log("添加成功！");
        },
        error: function (msg) {
            console.log("添加失败！");
            paramsObj['statusMsg'] = "服务器连接异常，请检查您的网络或联系管理员!";
            _protoObj_.showStatus(paramsObj);
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
    var template = this.getTemplate(paramsObj);
    $(".session_content").append(template);
    this.moveBottom();
    this.addMessage(paramsObj);
    return this;
}
/**
 *
 * @param paramsObj
 * @returns {*}
 */
SessionPage.prototype.getParamsObj = function (paramsObj) {
    paramsObj.tel = paramsObj.tel ? paramsObj.tel : localStorage.getItem("phone");
    paramsObj.page_code = paramsObj.page_code ? paramsObj.page_code : this.page_code;
    paramsObj.data_id = paramsObj.data_id ? paramsObj.data_id : localStorage.getItem("dataId");
    paramsObj.user_id = paramsObj.user_id ? paramsObj.user_id : localStorage.getItem("userId");
    paramsObj.userImg = paramsObj.flow == 'in' ? localStorage.getItem("inImg") : localStorage.getItem("outImg");
    paramsObj.to_user = paramsObj.flow == 'in' ? localStorage.getItem("fromUser") : localStorage.getItem("toUser");
    paramsObj.from_user = paramsObj.flow == 'in' ? localStorage.getItem("toUser") : localStorage.getItem("fromUser");

    return paramsObj;
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
/**
 *
 * @param element
 * @param value
 * @returns {SessionPage}
 */
SessionPage.prototype.setTransform = function (element, value) {
    var style = '-webkit-transform: translateY(' + value + 'px);'
        + '-moz-transform: translateY(' + value + 'px);'
        + '-ms-transform: translateY(' + value + 'px);'
        + '-o-transform: translateY(' + value + 'px);'
        + 'transform: translateY(' + value + 'px);';
    if (!value) {
        style += '-webkit-transition: all 300ms ease-out'
            + '-moz-transition: all 300ms ease-out;'
            + '-ms-transition: all 300ms ease-out;'
            + '-o-transition: all 300ms ease-out;'
            + 'transition: all 300ms ease-out;"';
    }
    $(element).attr("style", style);
    return this;
}
/**
 *
 * @param element
 * @returns {SessionPage}
 * @constructor
 */
SessionPage.prototype.DropDownAnimation = function (element) {
    var _protoObj_ = this;
    $(element).on("touchstart", function (ev) {
        var touch = new Touch(ev);
        _protoObj_.initX = touch.pageX;
        _protoObj_.initY = touch.pageY;
    });

    $(element).on("touchmove", function (ev) {
        var touch = new Touch(ev);
        var offsetX = touch.pageX - _protoObj_.initX;
        var offsetY = touch.pageY - _protoObj_.initY;
        var scrollTop = parseFloat($(window).scrollTop());
        if (offsetY - offsetX > 0) {
            if (scrollTop <= 0) {
                ev.preventDefault();
                _protoObj_.setTransform(".session_content", offsetY / 4);
            }
        }
    });

    $(element).on("touchend", function (ev) {
        var touch = new Touch(ev);
        _protoObj_.setTransform(".session_content", 0);
    });

    return this;
}