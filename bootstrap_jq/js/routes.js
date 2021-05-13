$(function () {
    var _a = {
        init: function () {
            this.tabConfirm();
            this.handleClick();
        },
        tabConfirm: function () {
            $('.menu_second>li').each(function () {
                if ($(this).hasClass('active')) {
                    $(this).parent().slideDown(500).siblings().find('.icon_2').attr('cn', '1').addClass('glyphicon-menu-up').removeClass('glyphicon-menu-down');
                }
            })
        },
        handleClick: function () {
            $('.menu_title').click(function () {
                $(this).siblings('.menu_second').slideToggle()
                if ($(this).find('.icon_2').attr('cn') === '0') {
                    $(this).find('.icon_2').attr('cn', '1').addClass('glyphicon-menu-up').removeClass('glyphicon-menu-down')
                } else {
                    $(this).find('.icon_2').attr('cn', '0').addClass('glyphicon-menu-down').removeClass('glyphicon-menu-up')
                }
            })
            $('.menu_second>li').click(function () {
                $(this).addClass('active').siblings().removeClass('active')
                $(this).parent().parent().siblings().find('.menu_second li').removeClass('active')
                $('#iframeWrap').attr('src', $(this).attr('url'))
            })
        }
    }
    _a.init();
})