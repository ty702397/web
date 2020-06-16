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
    $('.store-list').each(function(i, n) {
        //console.log($(n));
        if ($(n).attr('data-type') == "敬请期待") {
            $(n).addClass("coming");
            $('.coming p').remove();
            $('.coming a').remove();
            $(n).append('<span class="wait">即将开业，敬请期待</span>');

        }
    });
    game_list();

});
//store index  select city
var district = [];
$('#areaList li').each(function(i, n) {
    district.push($(n).text());
    $(this).click(function() {
        $(this).addClass("current").siblings().removeClass("current");
        $('.stores-list').eq(i).show().siblings('.stores-list').hide();
        clockArea();
        var expressArea = district[i];
        $("#expressArea").attr("value", expressArea);
    });
});

function clockArea() {
    $("#areaMask").fadeOut();
    $("#areaLayer").animate({
        "bottom": "-100%"
    });
}
$("#expressArea").click(function() {
    $("#areaMask").fadeIn();
    $("#areaLayer").animate({
        "bottom": 0
    }).attr("flag", "0");
});
$("#areaMask, #closeArea").click(function() {
    clockArea();
});

//store acr
var mySwiper = new Swiper('.store-swiper-container', {
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    autoplay: true

});

function game_list() {
    $.ajax({
        type: 'get',
        url: '/games.json',
        dataType: 'json',
        success: function(data) {
            var str = "";
            var d = "";
            var item = $('#games h4');
            for (var i = 0, j = 1; i < item.length; i++, j++) {
                for (var key in data) {
                    var title = data[key].title;
                    var icon = data[key].icon;
                    var intro = data[key].intro;
                    var url = "/pages/games-detail/" + data[key].id + ".html";
                    var game_name = item[i].innerHTML;
                    if (game_name == title) {
                        str += '<div class="game-item"> <a href ="' + url + '"><div class = "game-item-img"><img src = "http://mserve.mitianvr.com/' + icon + '" alt = "' + title + '"></div><div class = "game-info"><section class = "game-text"><h4>' + title + '</h4><p>' + intro + ' </p></section><span class = "wish-item-btn"> 查看详情 </span></div></a></div>';
                        if (j % 5 == 0) {
                            d += '<div class="game-list-swiper swiper-slide">' + str + '</div>';
                            str = "";
                        } else {
                            d1 = '<div class="game-list-swiper swiper-slide">' + str + '</div>';
                        }
                        res = d + d1;
                    }
                }
                $('#game-list').html(res);
            }
        }
    });
    var swiper = new Swiper('.game-list', {
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        onSlideChangeEnd: function(swiper) {
            swiper.update();
            // mySwiper.startAutoplay();
            // mySwiper.reLoop();
        }
    });

}