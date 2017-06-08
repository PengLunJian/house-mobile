/**
 *
 * @param obj
 * @constructor
 */
function SessionPage(obj) {
    this.obj = obj ? obj : null;
    this.initX = obj.initX ? obj.initX : 0;
    this.initY = obj.initY ? obj.initY : 0;
    this.timer = obj.timer ? obj.timer : null;
    this.overTime = obj.overTime ? obj.overTime : 0;
    this.page_code = obj.page_code ? obj.page_code : 1;
    this.oInput = obj.oInput ? obj.oInput : $("input[name='say']");
    this.url = obj.url ? obj.url : "http://gltest.2ma2.com/ashx/IMAjax.ashx";
    this.init(".session_content").dropDown(".session_container").sendMsg(".send");
}
/**
 *
 * @param element
 * @returns {SessionPage}
 */
SessionPage.prototype.init = function (element) {
    var _protoObj_ = this;
    this.overTimeOpera = this.getTimer();
    $(element).on("touchstart", function () {
        _protoObj_.oInput.blur();
    });
    return this;
}
/**
 *
 * @param obj
 * @returns {number}
 */
SessionPage.prototype.getTimer = function () {
    var _protoObj_ = this;
    var timer = setTimeout(function () {
        _protoObj_.obj.overTimeOpera();
    }, _protoObj_.overTime * 60 * 1000);
    return timer;
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
            to: localStorage.getItem("toUser"),
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
    var template = "";
    //console.log(paramsObj['type']);
    if ("text" == paramsObj['type']) {
        template = '<li id="' + paramsObj['idClient'] + '" class="' + paramsObj['flow'] + '">'
            + '<div class="image"><img src="' + paramsObj['userImg'] + '"></div><div class="info">'
            + '<div class="info_msg">' + paramsObj['text'] + '</div></div><p class="msg"></p></li>';
    } else if ("custom" == paramsObj['type']) {
        //自定义推送信息模板
        //<li class="item-rate">' + tempObj['no'] + '</li>
        var tempObj = JSON.parse(paramsObj['content'])['data'];
        template = '<li id="' + paramsObj['idClient'] + '" class="' + paramsObj['flow'] + '"><div class="image">'
            + '<img src="' + paramsObj['userImg'] + '"></div><div class="info"><div class="info_msg"><a href="javascript:void(0);">'
            + '<div class="item-box clearfix"><div class="item-img col-md-5"><img src="images/loading.png" data-original="' + tempObj['pic'] + '" data-loaded="false"/>'
            + '</div><div class="item-info col-md-7"><h2 class="item-title ellipsis"><i class="item-id">#' + tempObj['estno'] + '</i>'
            + '<span>' + tempObj['name'] + '</span></h2><ul class="item-params clearfix"><li class="item-area">' + tempObj['size'] + '</li>'
            + '<li class="item-layout">' + tempObj['div'] + '</li></ul><em class="item-price">' + tempObj['price'] + '</em>'
            + '</div></div></a></div></div><p class="msg"></p></li>';
    }
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
    this.moveBottom(".session_container");
    this.saveMsg(paramsObj);
    return this;
}
/**
 *
 * @param paramsObj
 * @returns {SessionPage}
 */
SessionPage.prototype.showMsgStatus = function (paramsObj) {
    var tempObj = $("#" + paramsObj['idClient']);
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
            if (data.length > 0) {
                _protoObj_.page_code++;
                var JSON_DATA = JSON.parse(data);
                for (var i = 0; i < JSON_DATA.length; i++) {
                    template += _protoObj_.getTemplate(_protoObj_.getParamsObj(JSON_DATA[i]));
                }
                $(".session_content").prepend(template);
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
SessionPage.prototype.saveMsg = function (paramsObj) {
    var _protoObj_ = this;
    paramsObj['method'] = "add_msg";
    clearInterval(this.overTimeOpera);
    this.overTimeOpera = this.getTimer();
    if ("success" == paramsObj['status']) {
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
                _protoObj_.showMsgStatus(paramsObj);
            }
        });
    } else {
        paramsObj['statusMsg'] = "服务器连接异常，请检查您的网络或联系管理员!";
        _protoObj_.showMsgStatus(paramsObj);
    }
    return this;
}
/**
 *
 * @param element
 * @returns {SessionPage}
 */
SessionPage.prototype.dropDown = function (element) {
    var _protoObj_ = this;
    $(element).on("scroll", function () {
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
    this.moveBottom(".session_container");
    this.saveMsg(paramsObj);
    return this;
}
/**
 *
 * @param paramsObj
 * @returns {*}
 */
SessionPage.prototype.getParamsObj = function (paramsObj) {
    paramsObj.type = paramsObj.type ? paramsObj.type : "text";
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
 * @param element
 * @returns {SessionPage}
 */
SessionPage.prototype.moveBottom = function (element) {
    var frontHeight = $(".fixed").outerHeight();
    var afterHeight = $(".session_content").outerHeight();
    var offsetHeight = afterHeight - frontHeight;
    $(element).animate({
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
 * @param obj
 * @returns {SessionPage}
 * @constructor
 */
SessionPage.prototype.DropDownAnimation = function (element, obj) {
    var _protoObj_ = this;
    $(element).on("touchstart", function (ev) {
        var touch = new Touch(ev);
        _protoObj_.initX = touch.pageX;
        _protoObj_.initY = touch.pageY;
        clearInterval(_protoObj_.overTimeOpera);
        _protoObj_.overTimeOpera = _protoObj_.getTimer(obj);
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
/**
 *
 * @param paramsObj
 * @returns {SessionPage}
 */
SessionPage.prototype.ajaxRequestCustomerMsg = function (paramsObj) {
    var _protoObj_ = this;
    paramsObj['method'] = "messaget_est";
    paramsObj['est_row_id'] = "50cf1a0e-894a-422d-b642-997c482b5491";
    if (paramsObj['est_row_id']) {
        $.ajax({
            url: _protoObj_.url,
            type: "POST",
            data: paramsObj,
            dataType: "JSON",
            success: function (data) {
                var content = {
                    type: 5,
                    data: data
                };
                var msg = nim.sendCustomMsg({
                    scene: 'p2p',
                    to: localStorage.getItem("toUser"),
                    content: JSON.stringify(content),
                    isLocal: true,
                    done: sendMsgDone
                });
            },
            error: function (msg) {
                console.log(msg);
            }
        });
    }
    return this;
}