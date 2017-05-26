/**
 * 经纪人微店页面JS交互
 * Created by PengLunJian on 2017-5-22.
 */
$(function () {
    /**
     * BEGIN 手机号非空校验
     * Author:PengLunJian
     * Date:2017-05-19
     * @param phoneNumber 用户输入的手机号
     * @returns {boolean} 返回布尔类型
     */
    function phoneNotEmptyCheck(phoneNumber) {
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

    function ajaxCallBackFunction() {
        $(".modal_code .modal_info").text("验证码发送至" + window.phoneNumber);
        $(".modal").addClass("hide");
        $(".modal_code").removeClass("hide");
        $(".modal_content").attr("style", "");

        localStorage.setItem("code", 1234);
        initializationData();

        window.oTime = new TimeCountDown({
            time: 60,
            el: ".btn.send",
            fn: function () {
                this.time = this.initTime;
                $(this.el).html("重新获取");
                $(this.el).removeClass("disabled");
                $(this.el).removeAttr("disabled");
            }
        });
        window.oTime.startTime();
    }

    /**
     * BEGIN 服务器端手机验证
     * Author:PengLunJian
     * Date:2017-05-19
     * @param phoneNumber 用户输入的手机号
     * @param url 服务器端访问路径
     */
    function ajaxPhoneRequestCheck(phoneNumber, url) {
        $.ajax({
            url: url,
            type: "POST",
            async: true,
            timeout: 2000,
            dataType: "JSON",
            data: {phoneNumber: phoneNumber},
            success: function (data) {
                $(".modal_msg").text(data);

                ajaxCallBackFunction();
            },
            error: function (msg) {
                $(".modal_msg").text(msg);

                ajaxCallBackFunction();
            }
        })
    }


    function initializationData() {
        $(".phone").text("输入手机号");
        $(".modal_msg").text("");
        window.index = 0;
        window.phoneNumber = [];
        $(".modal_item:eq(0)").addClass("checked");
        $(".btn.send").text("60 秒后重发");
        if (window.oTime) clearInterval(window.oTime.timer);

        window.code = "";
        $(".modal_item .code").text("");
        $(".modal_item").removeClass("checked");
        $(".modal_item:eq(0)").addClass("checked");
    }


    // (function ($, el, modal) {
    //     $(el).on("click", function () {
    //         $("html").addClass("hidden");
    //         $(".shop_body").addClass("blur");
    //         $(modal).removeClass("hide");
    //     });
    // })(jQuery, ".icon-message", ".modal_login");
    //
    //
    // (function ($, el, modal) {
    //     $(el).on("click", function () {
    //         $(".modal").addClass("hide");
    //         $(modal).removeClass("hide");
    //     });
    // })(jQuery, ".modal_login .confirm", ".modal_phone");
    //
    //
    // (function ($, el, modal) {
    //     $(el).on("click", function () {
    //         $(modal).addClass("hide");
    //         var className = "." + $(this).attr("data-back-modal");
    //         $(className).removeClass("hide");
    //         $(".modal_content").attr("style", "");
    //     });
    // })(jQuery, ".modal .back", ".modal");
    //
    //
    // (function ($, el) {
    //     $(el).on("click", function () {
    //         var phoneNumber = $("input[name='phone']").val().trim();
    //         if (phoneNotEmptyCheck(phoneNumber)) {
    //             ajaxPhoneRequestCheck(phoneNumber, "/");
    //         }
    //     });
    // })(jQuery, ".modal_phone .next", ".modal_code");


    new LimitFontSize({
        iSwitch: false,
        element: ".btn-limit",
        targetElement: ".p-context",
        limitFontSize: 95,
    }).hide();


    // (function ($, el, modal) {
    //     $(el).on("click", function () {
    //         $(modal).removeClass("hide");
    //     })
    // })(jQuery, ".phone", ".modal_keyboard");
    //
    //
    // (function ($, el, modal) {
    //     $(el).on("click", function () {
    //         $("html").removeClass("hidden");
    //         $(modal).addClass("hide");
    //         $(".shop_body").removeClass("blur");
    //         $(".modal_content").attr("style", "");
    //     });
    // })(jQuery, ".modal_bg,.btn.close,.modal_login .cancel", ".modal");


    var modalLogin = new ModalBox({
        element: ".modal_login",
        elementNextModal: ".modal_phone"
    });
    var modalPhone = new ModalBox({
        element: ".modal_phone",
        elementPrevModal: ".modal_login",
        elementNextModal: ".modal_code"
    });
    var modalCode = new ModalBox({
        element: ".modal_code",
        elementPrevModal: ".modal_phone",
        elementNextModal: ".modal_success"
    });
    var modalSuccess = new ModalBox({
        element: ".modal_success",
        elementPrevModal: ".modal_code"
    });

    $(".icon-message").on("click", function () {
        modalLogin.show();
    });

    $(modalLogin.elementBtnBack).on("click", function () {
        var $_modal = $(this).parents(".modal").attr("class");
        var regExp = /modal\s|' '|hide/g;
        var modalName = "."+$_modal.replace(regExp, "");
        if (modalName == modalPhone.elementPrevModal) {
            modalPhone.hide();
            modalLogin.show();
        } else if (modalName == modalCode.elementPrevModal) {
            modalCode.hide();
            modalPhone.show();
        }else if (modalName == modalSuccess.elementPrevModal) {
            modalSuccess.hide();
            modalCode.show();
        }
    });

    $(modalLogin.elementBtnConfirm).on("click", function () {
        var $_modal = $(this).parents(".modal");
        if ($_modal.hasClass(modalLogin.element.substring(1))) {
            modalLogin.hide();
            modalPhone.show();
        } else if ($_modal.hasClass(modalPhone.element.substring(1))) {
            modalPhone.hide();
            modalCode.show();
        } else if ($_modal.hasClass(modalCode.element.substring(1))) {
            modalCode.hide();
            modalSuccess.show();
        }
    });
});


