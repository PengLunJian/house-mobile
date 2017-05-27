/**
 * 经纪人微店页面JS交互
 * Created by PengLunJian on 2017-5-22.
 */
$(function () {
    new LimitFontSize({
        iSwitch: false,
        element: ".btn-limit",
        targetElement: ".p-context",
        limitFontSize: 95,
    }).hide();

    var modalBox = new ModalBox({
        elements: [
            ".modal_login",
            ".modal_phone",
            ".modal_code",
            ".modal_success"
        ]
    });

    $(".icon-message").on("click", function () {
        modalBox.show();
    });
});


