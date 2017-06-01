/**
 * Created by PengLunJian on 2017-6-1.
 */

/**
 * BEGIN 设置字体大小
 * Author:PengLunJian
 * Date:2017-06-01
 * @param obj 对象形参
 * @constructor 构造函数
 */
function SessionPage(obj) {
    this.pageCode = obj.pageCode ? obj.pageCode : 1;
    this.init(".fixed").send(".send");
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
    $(".session").on("touchstart", function () {
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
SessionPage.prototype.send = function (element) {
    var _protoObj_ = this;
    var tempObj = $("input[name='say']");
    $(element).on("click", function () {
        var template = _protoObj_.setTemplate(tempObj.val());
        $(".session").append(template);
        tempObj.val("");
        tempObj.focus();
        var frontHeight = $(element).outerHeight();
        var afterHeight = $("body").outerHeight();
        var offsetHeight = afterHeight - frontHeight;
        $("html,body").animate({
            scrollTop: offsetHeight
        });
    });
    return this;
}

/**
 *
 * @param context
 * @returns {string}
 */
SessionPage.prototype.setTemplate = function (context) {
    var template = '<li class="right fail"><div class="image">'
        + '<img src="images/chat_logo.jpg"></div><div class="info">'
        + '<p>' + context + '</p></div></li>';
    return template;
}

/**
 *
 * @returns {SessionPage}
 */
SessionPage.prototype.historyRecord = function () {
    var _protoObj_ = this;
    $.ajax({
        url: "/",
        type: "POST",
        data: {pageCode: _protoObj_.pageCode},
        dataType: "JSON",
        success: function (data) {
            _protoObj_.pageCode++;
        },
        error: function (msg) {

        }
    })
    return this;
}

