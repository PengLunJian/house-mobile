/**
 *
 * @param obj
 * @constructor
 */
function Message(obj) {
    this.method = obj.method ? obj.method : "get_contact";
    this.tel = obj.tel ? obj.tel : localStorage.getItem('phone');
    this.url = obj.url ? obj.url : "http://gltest.2ma2.com/ashx/IMAjax.ashx";
    this.data_id = obj.data_id ? obj.data_id : localStorage.getItem('dataId');
    this.user_id = obj.user_id ? obj.user_id : localStorage.getItem('user_id');

    this.sideBar = obj.sideBar ? $(obj.sideBar) : $('.side_fixed_btn');
    this.container = obj.container ? $(obj.container) : $(".chat_content");

    this.init(this.getParams(obj));
}

Message.prototype.init = function (params) {
    var _this = this;
    if (params) {
        $.post(params['url'], params, function (data) {
            var TEMP_HTML = "";
            var JSON_DATA = JSON.parse(data);
            for (var i = 0; i < JSON_DATA.length; i++) {
                TEMP_HTML += _this.getTemplate(JSON_DATA[i]);
            }
            _this.container.append(TEMP_HTML);
        });
    }
    return this;
}

Message.prototype.getTemplate = function (params) {
    params = this.filterData(params);
    var TEMP_HTML = '<li id="' + params['from_user'] + '" class="chat_item">'
        + '<a href="' + params['href'] + '"><div class="item_img col-md-3"><div class="item_photo">'
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
        case "custom":
            params['content'] = "[自定义消息]";
            break;
        default:
            params['content'] = params['content'];
            break;
    }
    var date = new Date(params['create_time']);
    var month = date.getMonth() + 1 + "月";
    var day = date.getDate() + "日";
    params['create_time'] = month + day;
    params['href'] = "07_聊天页面.html";
    date = null;
    return params;
}

Message.prototype.updateStatus = function (params) {
    var $_ITEM = $("#" + params['from']);
    var date = new Date(params['time']);
    var day = date.getDate() + "日";
    var month = date.getMonth() + 1 + "月";

    this.sideBar.addClass("in");
    $_ITEM.addClass("in");
    $_ITEM.find(".item_detail").html(params['text']);
    $_ITEM.find(".item_time").html(month + day);
    date = null;
    return this;
}

Message.prototype.addContact = function (params) {
    this.method = 'add_contact';
    this.user_id = params['from'];
    params = this.getParams(params);
    $.post(params['url'], params, function (data) {
        console.log(data);
    });
    return this;
}

Message.prototype.addMsg = function (params) {
    this.method = 'add_msg';
    params = this.getParams(params);
    localStorage.setItem(params['from_user'], "in");
    $.post(params['url'], params, function (data) {
        console.log(data)
    });
    return this;
}

Message.prototype.saveStatus = function (params) {
    var TEMP_OBJ = {
        status: 'on',
        id: params['from_user'],
    }
    localStorage.setItem(params['from_user'], "on");
    return this;
}

Message.prototype.getParams = function (params) {
    params['url'] = this.url;
    params['tel'] = this.tel;
    params['method'] = this.method;
    params['data_id'] = this.data_id;
    params['user_id'] = this.user_id;
    params['to_user'] = params['tel'];
    params['from_user'] = params['from'];

    return params
}