/**
 *
 * @param obj
 * @constructor
 */
function Message(obj) {
    this.config = obj ? obj : null;
    this.container = $(".chat_content");

    if (this.config) this.init(this.config);
}
/**
 *
 * @param params
 * @returns {Message}
 */
Message.prototype.init = function (params) {
    var _this = this;
    if (params) {
        $.post(params['url'], params, function (data) {
            var TEMP_HTML = "";
            var JSON_DATA = JSON.parse(data);
            for (var i = 0; i < JSON_DATA.length; i++) {
                TEMP_HTML += _this.getTemplate(JSON_DATA[i]);
            }
            console.log(JSON_DATA);
            _this.container.append(TEMP_HTML);
        });
    }
    return this;
}
/**
 *
 * @param params
 * @returns {string}
 */
Message.prototype.getTemplate = function (params) {
    this.filterData(params);
    var TEMP_HTML = '<li class="chat_item" data-from-user="' + params['from_user'] + '">'
        + '<a href="' + params['href'] + '"><div class="item_img col-md-3"><div class="item_photo in">'
        + '<img src="images/loading.png" data-original="' + params['img'] + '" data-loaded="false"/></div>'
        + '</div><div class="item_info col-md-9"><div class="item_lv1 clearfix">'
        + '<span class="item_name pull-left">' + params['user_name'] + '</span>'
        + '<time class="item_time pull-right">' + params['create_time'] + '</time></div>'
        + '<div class="item_lv1 clearfix"><p class="item_detail ellipsis">' + params['content'] + '</p>'
        + '</div></div><div class="clearfix"></div></a></li>';
    return TEMP_HTML;
}

Message.prototype.filterData = function (params) {
    switch (params['type']) {
        case "5":
            params['content'] = "[自定义消息]";
            break;
        default:
            params['content'] = "[自定义消息]";
            break;
    }
    var date = new Date(params['create_time']);
    var month = date.getMonth() + 1 + "月";
    var day = date.getDay() + "日";
    params['create_time'] = month + day;
    params['href'] = "07_聊天页面.html";
    date = null;
    return params;
}

Message.prototype.addMsgItem = function () {
    return this;
}

Message.prototype.updateStatus = function () {
    return this;
}