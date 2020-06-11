// 授权
(function() {
    function isWeixin() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            //window.location.href = 'http://api.uc-vr.com/api/v1/member/wechat/wx_auth?next=http%3a%2f%2fmserve.uc-vr.com%2f';
            window.location.href = 'http://mserve.mitianvr.com/404.html';
            return false;
        }
    }
    //isWeixin();
    /*    if (!localStorage.ucvrUser) {
            //window.location.href = 'http://api.uc-vr.com/api/v1/member/wechat/wx_auth?next=http%3a%2f%2fmserve.uc-vr.com%2f';
    		window.location.href = 'http://mserve.mitianvr.com/404.html';
        }
        if (!localStorage.ucvrData) {
            window.location.href = "./";
        }*/
}());
$(document).ready(function() {
    // 如果数据不存在，则自动返回首页
    // 读取本地localStorage中的数据 get data from localStorage
    // var ucvrData = JSON.parse(localStorage.ucvrData);
    // 将统一的底部渲染到页面 render bottom to pages
    var bmStr = '<ul>' +
        '<li>' +
        '<a href="../../index.html" class="bottom-nav-item bottom-0">' +
        '<i></i>' +
        '<span>主页</span>' +
        '</a>' +
        '</li>' +
        '<li>' +
        '<a href="../games-item/game-all.html" class="bottom-nav-item bottom-2 bottom-active">' +
        '<i></i>' +
        '<span>游戏</span>' +
        '</a>' +
        '</li>' +
        /*'<li>' +
        '<a href="../../combo.html" class="bottom-nav-item bottom-1">' +
        '<i></i>' +
        '<span>套餐</span>' +
        '</a>' +
        '</li>' +*/
        '<li>' +
        '<a href="../../help.html" class="bottom-nav-item bottom-3">' +
        '<i></i>' +
        '<span>玩法</span>' +
        '</a>' +
        '</li>' +
        /*'<li>' +
        '<a href="../../user.html" class="bottom-nav-item bottom-4">' +
        '<i></i>' +
        '<span>我的</span>' +
        '</a>' +
        '</li>' +*/
        '</ul>';
    $('.bottom-nav').html(bmStr);
    var popStr = '<div id="game-pop" class="select-pop">' +
        '<div class="select-pop-main">' +
        // '<h2>亲爱的用户：</h2>' +
        '<p>' +
        '<span class="select-sure-text">已成功选择！</span>' +
        '<span id="selected-game-name"></span>' +
        '<br>随后可在' +
        '<span>我的心愿单</span>中查看' +
        '</p>' +
        /*'<p>' +
        '在开始游戏前，需要先选择一个套餐，' +
        '<br><span>马上去挑选套餐？</span>' +
        '</p>' +*/
        '<img src="../../img/home/game-pop.png" alt="">' +
        '</div>' +
        '<div class="select-pop-btn">' +
        '<a href="javascript:;" id="close-game-pop" class="select-close">不再提醒</a>' +
        //'<a href="../../combo.html" id="goto-game-select" class="select-goto">好的</a>' +
        '<a href="javascript:;" id="select-pop-close" class="select-goto">好的</a>' +
        '</div>' +
        '<a href="javascript:;" class="select-pop-close">' +
        '<span>' +
        '<i></i>' +
        '<i></i>' +
        '</span>' +
        '</a>' +
        '</div>';
    //$('#app').append(popStr);
    /* (function () {
         var ucvrData = JSON.parse(localStorage.ucvrData);
         console.log(ucvrData);
         var addWish = $('.wish-item-btn');
         var tempId;
         var tempType;
         for (var i = 0; i < ucvrData.Games.length; i++) {
             for (var j = 0; j < addWish.length; j++) {
                 if (ucvrData.Games[i].gameId === addWish.eq(j).attr('id')) {
                     (ucvrData.Games[i].status === true) && addWish.eq(j).addClass('like');
                 }
             }
         }
         addWish.click(function () {
             tempId = $(this).attr('id');
             ucvrData.Games = ucvrData.Games.map(function (item) {
                 // console.log()
                 if (item.gameId === tempId) {
                     item.status = !item.status
                     tempType = item.gameType;
                 }
                 return item;
             });
             localStorage.setItem('ucvrData', JSON.stringify(ucvrData));
             if ($(this).hasClass('like')) {
                 $(this).removeClass('like');
             } else {
                 if (ucvrData.gameTip) {
                     // 提示为true则弹窗
                     var tempBool;
                     if (tempType == 'single') {
                         tempBool = ucvrData.gameCombo.some(function (value) {
                             return value.type == tempType && value.status;
                         });
                     } else {
                         tempBool = ucvrData.gameCombo.some(function (value) {
                             return value.status;
                         });
                     }
                     // 判断是否选择了相应类型的套餐，如果没有则弹窗
                     if (!tempBool) {
                         $('#selected-game-name').text($(this).parent().find('a').text());
                         $('#game-pop').fadeIn();
                     }
                 }
                 $(this).addClass('like');
                 // 判断是否选择了相应类型的套餐，如果没有则弹窗
                 // var tempBool = ucvrData.gameCombo.some(function (value) {
                 //     return value.type == tempType && value.status;
                 // });
                 // if (!tempBool) {
                 //     $('#selected-game-name').text($(this).parent().find('a').text());
                 //     $('#game-pop').fadeIn();
                 // }
             }
         });
         $('.select-pop-close, #select-pop-close').click(function () {
             $('#game-pop').fadeOut();
         });
         $('#close-game-pop, #select-pop-close' ).click(function () {
             ucvrData.gameTip = false;
             localStorage.setItem('ucvrData', JSON.stringify(ucvrData));
             $('#game-pop').fadeOut();
         });
     }());*/
    setTimeout(function() {
        // 加载完毕去掉loading
        $('#loading').fadeOut();
    }, 0);

    $(window).scroll(function() {
        if ($(window).scrollTop() > 0) {
            $("#go-top").show();
        } else {
            $("#go-top").hide();
        }
    });
    $("#go-top").click(function() {
        $("html,body").animate({
            scrollTop: 0
        }, 500);
    });
});