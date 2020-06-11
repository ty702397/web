
 // 首次登录
(function () {
    function isWeixin () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
			// window.location.href = 'http://api.uc-vr.com/api/v1/member/wechat/wx_auth?next=http%3a%2f%2fmserve.uc-vr.com%2f';
            window.location.href = 'http://mserve.mitianvr.com/404.html';
            return false;
        }
    }
    //isWeixin();
    /*function GetQueryString (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg); // 获取url中"?"符后的字符串并正则匹配
        var context = "";
        if (r != null) { context = r[2]; }
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    }
    if (!GetQueryString('code')) {
        window.location.href = 'http://api.uc-vr.com/api/v1/member/wechat/wx_auth?next=http%3a%2f%2fmserve.uc-vr.com%2f';
        return false;
    }
    if (!localStorage.ucvrUser) {
        var code1 = {
            "code": GetQueryString('code')
        };
        var codeJson = JSON.stringify(code1);
        $.ajax({
            url: 'http://api.uc-vr.com/api/v1/member/login/authorization/wechat',
            type: 'POST',
            data: codeJson,
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                var tempData = {
                    avatar: data.avatar,
                    nickname: data.nickname
                }
                localStorage.setItem('ucvrUser', JSON.stringify(tempData));
            },
            error: function () {
                window.location.href = 'http://api.uc-vr.com/api/v1/member/wechat/wx_auth?next=http%3a%2f%2fmserve.uc-vr.com%2f';
            }
        });
    }*/
})();
$(document).ready(function () {
   /* (function () {
        var maskWrap = $('#user-sure'); // 用户确认
        var maskBtn = $('.mask-sure'); // 用户须知确认按钮
        // 如果本地没有记录用户确认记录，则弹出用户须知，待用户确认后，将记录保存至localStorage
        if (!localStorage.sure) {
            maskWrap.show();
        }
        maskBtn.on('click', function () {
            localStorage.sure = true;
            maskWrap.css('display', 'none');
        });
        // 用户不接受，关闭当前微信窗口
        $('.user-not-sure').click(function () {
            maskWrap.css('display', 'none');
        });
    }());*/
    // 将套餐，游戏数据系列化，并且转为json字符串存储到localstorage

    // updateTime 为localstorage过期时间 ，目前设定48小时
    (function () {
        var setData = (function () {
            // 将单机套餐的数据循环写入到数组
            var ComboArr = [];
            $('#single-combo').children().each(function () {
                var temp = {
                    comboId: $(this).attr('id'),
                    status: false,
                    type: 'single',
                    imgSrc: $(this).attr('data-src')
                };
                ComboArr.push(temp);
            });
            // 将联机套餐加入数组
            var temp1 = {
                comboId: $('#online-combo img').attr('id'),
                status: false,
                type: 'online',
                imgSrc: $('#online-combo img').attr('data-src')
            };
            ComboArr.push(temp1);
            // 将单机游戏按类型分别写入数组
            var gameArr = [];
            // 游戏数据
            $('#games .item').each(function () {
                var tempName = $(this).find('h2').text().trim();
                var tempLink = $(this).find('a').attr('href');
                var tempId = $(this).attr('id');
                for (var i = 0; i < $('.tags-game-item .game-text h3').length; i++) {
                    if (tempName == $('.tags-game-item .game-text h3').eq(i).text().trim()) {
                        $('.tags-game-item .game-text').eq(i).parent().attr('href', tempLink);
						$('.tags-game-item .wish-item-btn').eq(i).attr('onclick','location.href="'+tempLink+'"');
                        $('.tags-game-item').eq(i).attr('id', tempId);
                    }
                }

                var temp;
                if ($(this).attr('data-type') == 'no') {
                    temp = {
                        gameId: $(this).attr('id'),
                        name: $(this).find('h2').text().trim(),
                        imgSrc: $(this).find('img').attr('data-src'),
                        status: false,
                        gameType: 'single',
                        detailLink: $(this).find('a').attr('href')
                    };
                }
                if ($(this).attr('data-type') == 'yes') {
                    temp = {
                        gameId: $(this).attr('id'),
                        name: $(this).find('h2').text().trim(),
                        imgSrc: $(this).find('img').attr('data-src').trim(),
                        status: false,
                        gameType: 'online',
                        detailLink: $(this).find('a').attr('href').trim()
                    };
                }
                gameArr.push(temp);
            });
            // 获取当前时间
            // var timestamp = Date.parse(new Date()) / 1000;
            // 将数据整合到一个对象
            var obj = {
                gameCombo: ComboArr,
                Games: gameArr,
                gameTip: true,
                comboTip: true
            };
            // 将对象存储至localStorage
            return obj;
        })();
        if (!localStorage.ucvrDataOrigin) {
            console.log(setData);
            localStorage.setItem('ucvrDataOrigin', JSON.stringify(setData));
            localStorage.setItem('ucvrData', JSON.stringify(setData));
        } else {
            console.log(localStorage.ucvrDataOrigin);
            var ucvrData = JSON.parse(localStorage.ucvrDataOrigin);
            if (!Compare(setData, ucvrData)) {
                localStorage.setItem('ucvrDataOrigin', JSON.stringify(setData));
                localStorage.setItem('ucvrData', JSON.stringify(setData));
                $('#user-sure').show();
            }
        }
        // localStorage.setItem('ucvrData', JSON.stringify(obj));
        // 判断json是否相同
        function isObj (object) {
            return object && typeof (object) === 'object' && Object.prototype.toString.call(object).toLowerCase() == "[object object]";
        }

        function isArray (object) {
            return object && typeof (object) === 'object' && object.constructor == Array;
        }

        function getLength (object) {
            var count = 0;
            for (var i in object) count++;
            return count;
        }

        function Compare (objA, objB) {
            if (!isObj(objA) || !isObj(objB)) return false;
            if (getLength(objA) != getLength(objB)) return false;
            return CompareObj(objA, objB, true);
        }

        function CompareObj (objA, objB, flag) {
            for (var key in objA) {
                if (!flag) {
                    break;
                }
                if (!objB.hasOwnProperty(key)) {
                    flag = false;
                    break;
                }
                if (!isArray(objA[key])) {
                    if (objB[key] != objA[key]) {
                        flag = false;
                        break;
                    }
                } else {
                    if (!isArray(objB[key])) {
                        flag = false;
                        break;
                    }
                    var oA = objA[key],
                        oB = objB[key];
                    if (oA.length != oB.length) {
                        flag = false;
                        break;
                    }
                    for (var k in oA) {
                        if (!flag) {
                            break;
                        }
                        flag = CompareObj(oA[k], oB[k], flag);
                    }
                }
            }
            return flag;
        }
    }());
    /*(function () {
        var ucvrData = JSON.parse(localStorage.ucvrData);
        console.log(ucvrData);
        var addWish = $('.wish-item-btn');
        var tempId;
        var tempType;
        for (var i = 0; i < ucvrData.Games.length; i++) {
            for (var j = 0; j < addWish.length; j++) {
                if (ucvrData.Games[i].gameId === addWish.eq(j).parent().attr('id')) {
                    (ucvrData.Games[i].status === true) && addWish.eq(j).addClass('like');
                }
            }
        }

        addWish.click(function () {
            tempId = $(this).parent().attr('id');
            ucvrData.Games = ucvrData.Games.map(function (item) {
                // console.log()
                if (item.gameId === tempId) {
                    item.status = !item.status;
                    tempType = item.gameType;
                }
                return item;
            });
            localStorage.setItem('ucvrData', JSON.stringify(ucvrData));
            if ($(this).hasClass('like')) {
                $(this).removeClass('like');
            } else {
                $(this).addClass('like');
                if (ucvrData.gameTip) {
                    // 提示为true则弹窗
                    // 判断是否选择了相应类型的套餐，如果没有则弹窗
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
});
