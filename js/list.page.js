/**
 * Created by PengLunJian on 2017-6-14.
 */
$(function () {
    (function listPageJS() {
        $(".nav_btn").on("click", function () {
            $(".modal_nav").removeClass("hide");
            $(".modal_nav .modal_bg").addClass("hide");
        });

        $(".modal_bg").on("click", function () {
            $(this).parents(".modal").addClass("hide");
        });

        $(".tab_btn").on("click", function () {
            $(".tab_btn").removeClass("active");
            $(this).addClass("active");
            var index = $(this).index();
            $(".modal").addClass("hide");
            var selectStr = ".modal:eq(" + (index + 1) + ")";
            $(selectStr).removeClass("hide");
        });

        $(".modal a").on("click", function () {
            if ($(this).hasClass("btn")) {
                if ($(this).hasClass("clear")) {
                    //如果用户点击的是清空按钮
                    var $_modal = $(this).parents(".modal");
                    $_modal.find(".modal_body a").removeClass("active");
                    if ($_modal.find(".nstSlider")[0]) {
                        var left = $(".nstSlider").width() - $(".leftGrip").width();
                        $(".leftGrip").css("left", "0px");
                        $(".rightGrip").css("left", left + "px");
                        $(".bar").css({"width": "100%", "left": "0px"});
                    }
                } else if ($(this).hasClass("confirm")) {
                    //如果用户点击的是提交按钮

                }
            } else {
                var $_parent = $(this).parents(".modal");
                if ($_parent.hasClass("modal_addr")) {
                    //如果选择的是地区弹窗
                    $(".modal_addr .modal_body a").removeClass("active");
                    $(this).addClass("active");

                } else if ($_parent.hasClass("modal_filter")) {
                    //如果选择的是筛选弹窗
                    var $_parent = $(this).parents(".modal_filter_group");
                    $_parent.find("a").not(this).removeClass("active");
                    if ($(this).hasClass("active")) {
                        $(this).removeClass("active");
                    } else {
                        $(this).addClass("active");
                    }
                } else if ($_parent.hasClass("modal_sort")) {
                    //如果选择的是排序弹窗
                    $(".modal_sort .modal_body a").removeClass("active");
                    $(this).addClass("active");
                }
            }

        });

        $(".search_btn").on("click", function () {
            $(".modal_search").removeClass("hide");
            $("body").addClass("hidden");
            setTimeout(function () {
                $(".modal_search").addClass("show");
            }, 30);
            $("#search_input").trigger("click").focus();
        });

        $(".btn.cancel").on("click", function () {
            var $_parent = $(this).parents(".modal_search");
            $("body").removeClass("hidden");
            $_parent.removeClass("show");
            setTimeout(function () {
                $_parent.addClass("hide");
            }, 400);
        });

        $(".side_fixed_btn").on("click", function () {
            $(".modal_chat").removeClass("hide");
        });

        $(".modal .icon-close").on("click", function () {
            $(this).parents(".modal").addClass("hide");
        });

        // ajax 请求加载更多数据
        (function (pageCode) {
            $(this).on("scroll", function () {
                if (window.timer) clearInterval(window.timer);
                window.timer = setTimeout(function () {
                    pageCode++;
                    var windowHeight = $(this).height();
                    var scrollTop = $(this).scrollTop();
                    var documentHeight = $(document).height();
                    if (windowHeight + scrollTop >= documentHeight) {
                        // 发送AjAx加载更多数据
                        $.ajax({
                            url: "",
                            type: "POST",
                            dataType: "JSON",
                            data: {pageCode: pageCode},
                            success: function (data) {

                            },
                            error: function (message) {
                                console.log(pageCode);
                            }
                        })
                    }
                    // document.title = windowHeight + "+" + scrollTop + "=" + documentHeight;
                }, 5000);
            });
        })(jQuery, 0);

    })();

    (function nstSlider() {
        $('.nstSlider').nstSlider({
            "left_grip_selector": ".leftGrip",
            "right_grip_selector": ".rightGrip",
            "value_bar_selector": ".bar",
            "highlight": {
                "grip_class": "gripHighlighted",
                "panel_selector": ".highlightPanel"
            },
            "value_changed_callback": function (cause, leftValue, rightValue) {
                $(this).prev().find('.leftLabel').text(leftValue);
                $(this).prev().find('.rightLabel').text(rightValue);
            },
        });
        // Call methods and such...
        var highlightMin = 0, highlightMax = 1000;
        $('.nstSlider').nstSlider('highlight_range', highlightMin, highlightMax);
    })();

    (function NIMSession() {
        var data = {};
        var nim = NIM.getInstance({
            appKey: '54ca06c2b88aa7bf9616fde04c623383',
            account: localStorage.getItem("account"),
            token: localStorage.getItem("token"),
            onconnect: onConnect,
            onerror: onError,
            onwillreconnect: onWillReconnect,
            ondisconnect: onDisconnect,
            // 多端登录
            onloginportschange: onLoginPortsChange,
            // 用户关系
            onblacklist: onBlacklist,
            onsyncmarkinblacklist: onMarkInBlacklist,
            onmutelist: onMutelist,
            onsyncmarkinmutelist: onMarkInMutelist,
            // 好友关系
            onfriends: onFriends,
            onsyncfriendaction: onSyncFriendAction,
            // 用户名片
            onmyinfo: onMyInfo,
            onupdatemyinfo: onUpdateMyInfo,
            onusers: onUsers,
            onupdateuser: onUpdateUser,
            // 群组
            onteams: onTeams,
            onsynccreateteam: onCreateTeam,
//        onteammembers: onTeamMembers,
            onsyncteammembersdone: onSyncTeamMembersDone,
            onupdateteammember: onUpdateTeamMember,
            // 会话
            onsessions: onSessions,
            onupdatesession: onUpdateSession,
            // 消息
            onroamingmsgs: onRoamingMsgs,
            onofflinemsgs: onOfflineMsgs,
            onmsg: onMsg,
            // 系统通知
            onofflinesysmsgs: onOfflineSysMsgs,
            onsysmsg: onSysMsg,
            onupdatesysmsg: onUpdateSysMsg,
            onsysmsgunread: onSysMsgUnread,
            onupdatesysmsgunread: onUpdateSysMsgUnread,
            onofflinecustomsysmsgs: onOfflineCustomSysMsgs,
            oncustomsysmsg: onCustomSysMsg,
            // 同步完成
            onsyncdone: onSyncDone
        });

        function onConnect() {
            console.log('连接成功');
        }

        function onWillReconnect(obj) {
            // 此时说明 `SDK` 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
//        console.log('即将重连');
//        console.log(obj.retryCount);
//        console.log(obj.duration);
        }

        function onDisconnect(error) {
            // 此时说明 `SDK` 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
//        console.log('丢失连接');
            console.log(error);
            if (error) {
                switch (error.code) {
                    // 账号或者密码错误, 请跳转到登录页面并提示错误
                    case 302:
                        break;
                    // 被踢, 请提示错误后跳转到登录页面
                    case 'kicked':
                        break;
                    default:
                        break;
                }
            }
        }

        function onError(error) {
//        console.log(error);
        }

        function onLoginPortsChange(loginPorts) {
//        console.log('当前登录帐号在其它端的状态发生改变了', loginPorts);
        }

        function onBlacklist(blacklist) {
//        console.log('收到黑名单', blacklist);
            data.blacklist = nim.mergeRelations(data.blacklist, blacklist);
            data.blacklist = nim.cutRelations(data.blacklist, blacklist.invalid);
            refreshBlacklistUI();
        }

        function onMarkInBlacklist(obj) {
//        console.log(obj);
//        console.log(obj.account + '被你在其它端' + (obj.isAdd ? '加入' : '移除') + '黑名单');
            if (obj.isAdd) {
                addToBlacklist(obj);
            } else {
                removeFromBlacklist(obj);
            }
        }

        function addToBlacklist(obj) {
            data.blacklist = nim.mergeRelations(data.blacklist, obj.record);
            refreshBlacklistUI();
        }

        function removeFromBlacklist(obj) {
            data.blacklist = nim.cutRelations(data.blacklist, obj.record);
            refreshBlacklistUI();
        }

        function refreshBlacklistUI() {
            // 刷新界面
        }

        function onMutelist(mutelist) {
//        console.log('收到静音列表', mutelist);
            data.mutelist = nim.mergeRelations(data.mutelist, mutelist);
            data.mutelist = nim.cutRelations(data.mutelist, mutelist.invalid);
            refreshMutelistUI();
        }

        function onMarkInMutelist(obj) {
//        console.log(obj);
//        console.log(obj.account + '被你' + (obj.isAdd ? '加入' : '移除') + '静音列表');
            if (obj.isAdd) {
                addToMutelist(obj);
            } else {
                removeFromMutelist(obj);
            }
        }

        function addToMutelist(obj) {
            data.mutelist = nim.mergeRelations(data.mutelist, obj.record);
            refreshMutelistUI();
        }

        function removeFromMutelist(obj) {
            data.mutelist = nim.cutRelations(data.mutelist, obj.record);
            refreshMutelistUI();
        }

        function refreshMutelistUI() {
            // 刷新界面
        }

        function onFriends(friends) {
//        console.log('收到好友列表', friends);
            data.friends = nim.mergeFriends(data.friends, friends);
            data.friends = nim.cutFriends(data.friends, friends.invalid);
            refreshFriendsUI();
        }

        function onSyncFriendAction(obj) {
//        console.log(obj);
            switch (obj.type) {
                case 'addFriend':
//                console.log('你在其它端直接加了一个好友' + obj.account + ', 附言' + obj.ps);
                    onAddFriend(obj.friend);
                    break;
                case 'applyFriend':
//                console.log('你在其它端申请加了一个好友' + obj.account + ', 附言' + obj.ps);
                    break;
                case 'passFriendApply':
//                console.log('你在其它端通过了一个好友申请' + obj.account + ', 附言' + obj.ps);
                    onAddFriend(obj.friend);
                    break;
                case 'rejectFriendApply':
//                console.log('你在其它端拒绝了一个好友申请' + obj.account + ', 附言' + obj.ps);
                    break;
                case 'deleteFriend':
//                console.log('你在其它端删了一个好友' + obj.account);
                    onDeleteFriend(obj.account);
                    break;
                case 'updateFriend':
//                console.log('你在其它端更新了一个好友', obj.friend);
                    onUpdateFriend(obj.friend);
                    break;
            }
        }

        function onAddFriend(friend) {
            data.friends = nim.mergeFriends(data.friends, friend);
            refreshFriendsUI();
        }

        function onDeleteFriend(account) {
            data.friends = nim.cutFriendsByAccounts(data.friends, account);
            refreshFriendsUI();
        }

        function onUpdateFriend(friend) {
            data.friends = nim.mergeFriends(data.friends, friend);
            refreshFriendsUI();
        }

        function refreshFriendsUI() {
            // 刷新界面
        }

        function onMyInfo(user) {
//        console.log('收到我的名片', user);
            data.myInfo = user;
            updateMyInfoUI();
        }

        function onUpdateMyInfo(user) {
//        console.log('我的名片更新了', user);
            data.myInfo = NIM.util.merge(data.myInfo, user);
            updateMyInfoUI();
        }

        function updateMyInfoUI() {
            // 刷新界面
        }

        function onUsers(users) {
//        console.log('收到用户名片列表', users);
            data.users = nim.mergeUsers(data.users, users);
        }

        function onUpdateUser(user) {
//        console.log('用户名片更新了', user);
            data.users = nim.mergeUsers(data.users, user);
        }

        function onTeams(teams) {
//        console.log('群列表', teams);
            data.teams = nim.mergeTeams(data.teams, teams);
            onInvalidTeams(teams.invalid);
        }

        function onInvalidTeams(teams) {
            data.teams = nim.cutTeams(data.teams, teams);
            data.invalidTeams = nim.mergeTeams(data.invalidTeams, teams);
            refreshTeamsUI();
        }

        function onCreateTeam(team) {
//        console.log('你创建了一个群', team);
            data.teams = nim.mergeTeams(data.teams, team);
            refreshTeamsUI();
            onTeamMembers({
                teamId: team.teamId,
                members: owner
            });
        }

        function refreshTeamsUI() {
            // 刷新界面
        }

        function onTeamMembers(teamId, members) {
//        console.log('群id', teamId, '群成员', members);
            var teamId = obj.teamId;
            var members = obj.members;
            data.teamMembers = data.teamMembers || {};
            data.teamMembers[teamId] = nim.mergeTeamMembers(data.teamMembers[teamId], members);
            data.teamMembers[teamId] = nim.cutTeamMembers(data.teamMembers[teamId], members.invalid);
            refreshTeamMembersUI();
        }

        function onSyncTeamMembersDone() {
//        console.log('同步群列表完成');
        }

        function onUpdateTeamMember(teamMember) {
//        console.log('群成员信息更新了', teamMember);
            onTeamMembers({
                teamId: teamMember.teamId,
                members: teamMember
            });
        }

        function refreshTeamMembersUI() {
            // 刷新界面
        }

        function onSessions(sessions) {
//        console.log('收到会话列表', sessions);
            data.sessions = nim.mergeSessions(data.sessions, sessions);
            updateSessionsUI();
        }

        function onUpdateSession(session) {
//        console.log('会话更新了', session);
            data.sessions = nim.mergeSessions(data.sessions, session);
            updateSessionsUI();
        }

        function updateSessionsUI() {
            // 刷新界面
        }

        function onRoamingMsgs(obj) {
//        console.log('漫游消息', obj);
            pushMsg(obj.msgs);
        }

        function onOfflineMsgs(obj) {
//        console.log('离线消息', obj);
            pushMsg(obj.msgs);
        }

        function pushMsg(msgs) {
            if (!Array.isArray(msgs)) {
                msgs = [msgs];
            }
            var sessionId = msgs[0].sessionId;
            data.msgs = data.msgs || {};
            data.msgs[sessionId] = nim.mergeMsgs(data.msgs[sessionId], msgs);
        }

        function onOfflineSysMsgs(sysMsgs) {
//        console.log('收到离线系统通知', sysMsgs);
            pushSysMsgs(sysMsgs);
        }

        function onSysMsg(sysMsg) {
//        console.log('收到系统通知', sysMsg)
            pushSysMsgs(sysMsg);
        }

        function onUpdateSysMsg(sysMsg) {
            pushSysMsgs(sysMsg);
        }

        function pushSysMsgs(sysMsgs) {
            data.sysMsgs = nim.mergeSysMsgs(data.sysMsgs, sysMsgs);
            refreshSysMsgsUI();
        }

        function onSysMsgUnread(obj) {
//        console.log('收到系统通知未读数', obj);
            data.sysMsgUnread = obj;
            refreshSysMsgsUI();
        }

        function onUpdateSysMsgUnread(obj) {
//        console.log('系统通知未读数更新了', obj);
            data.sysMsgUnread = obj;
            refreshSysMsgsUI();
        }

        function refreshSysMsgsUI() {
            // 刷新界面
        }

        function onOfflineCustomSysMsgs(sysMsgs) {
//        console.log('收到离线自定义系统通知', sysMsgs);
        }

        function onCustomSysMsg(sysMsg) {
//        console.log('收到自定义系统通知', sysMsg);
        }

        /**
         * 同步完成加载历史记录
         */
        function onSyncDone() {
//        console.log('同步完成');
        }

        /**
         * 收到消息
         * @param msg
         */
        function onMsg(msg) {
            pushMsg(msg);
            console.log(msg);
        }

        /**
         * 发送消息
         * @param error
         * @param msg
         */
        function sendMsgDone(error, msg) {
            pushMsg(msg);
        }

        new Message({
            url: "http://gltest.2ma2.com/ashx/IMAjax.ashx",
            method: "get_contact",
            tel: localStorage.getItem("phone"),
            data_id: localStorage.getItem("dataId"),
            user_id: localStorage.getItem("userId")
        });
    })();
});
