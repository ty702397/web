// 授权判断
(function() {
    // 如果数据不存在，则自动返回首页
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
    // $('.game-wish-btn').text('选择');
    // 读取本地localStorage中的数据 get data from localStorage
    // var ucvrData = JSON.parse(localStorage.ucvrData);
    // 将统一的底部渲染到页面 render bottom to pages
    // 判断详情页无效的内容进行删除
    $(function() {
        // 判断轮播图片的数量
        $('.swiper-slide').each(function() {
            ($(this).find('img').attr('src') == '' || $(this).find('img').attr('src') == undefined) && $(this).remove();
        });
        // 判断玩法教程类型
        var tempType = $('.game-help').attr('data-type').trim();
        if (tempType == '敬请期待') {
            $('#help-video').remove();
            $('#help-img').remove();
        }
        if (tempType == '视频教程') {
            $('#wait').remove();
            $('#help-img').remove();
        }
        if (tempType == '图文教程') {
            $('#help-video').remove();
            $('#wait').remove();
        }
        // 判断无效玩法图片
        $('.game-help-pic li').each(function() {
            ($(this).find('img').attr('src') == '' || $(this).find('img').attr('src') == undefined) && $(this).remove();
        });
    });
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
        /* '<li>' +
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
        // '<span id="selected-game-name"></span>' +
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
    /*(function () {
        var ucvrData = JSON.parse(localStorage.ucvrData);
        console.log(ucvrData);
        var addWish = $('.game-wish-btn');
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
                $(this).find('p').text('选择');
            } else {
                $(this).addClass('like');
                $(this).find('p').text('已选择');
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
            }
        });
        $('.select-pop-close, #select-pop-close').click(function () {
            $('#game-pop').fadeOut();
        });
        $('#close-game-pop, #select-pop-close').click(function () {
            ucvrData.gameTip = false;
            localStorage.setItem('ucvrData', JSON.stringify(ucvrData));
            $('#game-pop').fadeOut();
        });
    }());*/
    // video play 视频播放
    (function() {
        // var videoImg = $('.pic-video-main span');
        // var video2Img = $('.help-video-main span');
        var videoBtn = $('.pic-video-main img, .pic-video-main span');
        var video2Btn = $('.help-video-main img, .help-video-main span');
        var video = document.getElementById('video');
        var video2 = document.getElementById('video2');
        videoBtn.on('click', function() {
            videoBtn.hide();
            // videoImg.css('display', 'none');
            video.style.position = 'relative';
            video.style.opacity = '1';
            video.play();
        });
        video2Btn.on('click', function() {
            video2Btn.hide();
            // video2Img.css('display', 'none');
            video2.style.position = 'relative';
            video2.style.opacity = '1';
            video2.play();
        });
        if (video) {
            video.addEventListener('ended', function() {
                video.style.position = 'absolute';
                video.style.opacity = '0';
                // videoImg.css('display', 'block');
                videoBtn.show();
            });
        }
        if (video2) {
            video2.addEventListener('ended', function() {
                video2.style.position = 'absolute';
                video2.style.opacity = '0';
                // video2Img.css('display', 'block');
                video2Btn.show();
            });
        }
    }());
    setTimeout(function() {
        // 加载完毕去掉loading
        $('#loading').fadeOut();
    }, 0);
});