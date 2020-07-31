

$(document).ready(function () {
	t();
	videohover();
	cont2img();
});

	function videohover(){
		var video1=document.getElementById("video1");
		var video2=document.getElementById("video2");
		var video3=document.getElementById("video3");
		 $('.cont3-box .item1').hover(function(){
				$('.cont3-box .item1 .zz').animate({opacity:'0.8'});
				video1.play();
			},function(){
				$('.cont3-box .item1 .zz').animate({opacity:'0'});
				video1.pause();
			});
			$('.cont3-box .item2').hover(function(){
				$('.cont3-box .item2 .zz').animate({opacity:'0.8'});
				video2.play();
			},function(){
				$('.cont3-box .item2 .zz').animate({opacity:'0'});
				video2.pause();
			});
			$('.cont3-box .item3').hover(function(){
				$('.cont3-box .item3 .zz').animate({opacity:'0.8'});
				video3.play();
			},function(){
				$('.cont3-box .item3 .zz').animate({opacity:'0'});
				video3.pause();
			});
	}
	
	function cont2img(){
		 $('.cont2-img1').hover(function(){
			 $('.cont2-item ').removeClass('cont2-item-hover').removeClass('cont2-item-other');
			 $('.cont2-item1').addClass('cont2-item-hover');
			 $('.cont2-item2,.cont2-item3').addClass('cont2-item-other');
			}, function () {
            $('.cont2-item ').removeClass('cont2-item-hover').siblings().removeClass('cont2-item-other');
			});
		$('.cont2-img2').hover(function(){
			 $('.cont2-item ').removeClass('cont2-item-hover').removeClass('cont2-item-other');
			 $('.cont2-item2').addClass('cont2-item-hover');
			 $('.cont2-item1,.cont2-item3').addClass('cont2-item-other');			 
			},function () {
            $('.cont2-item ').removeClass('cont2-item-hover').siblings().removeClass('cont2-item-other');
        });
		$('.cont2-img3').hover(function(){
			 $('.cont2-item ').removeClass('cont2-item-hover').removeClass('cont2-item-other');
			 $('.cont2-item3').addClass('cont2-item-hover');
			 $('.cont2-item2,.cont2-item1').addClass('cont2-item-other');			 
			},function () {
            $('.cont2-item ').removeClass('cont2-item-hover').siblings().removeClass('cont2-item-other');
        });
	}

    function t() {
        var e, t, i = $(window), n = i.height(), l = $(".ui-animEle"), a = l.length;
        return $.browser.msie && 9 > parseInt($.browser.version) ? void l.removeClass("ui-animEle") : (t = function() {
            var o;
            $.each(l, function(e, t) {
                t._animed || (o = $(t),
                n > t.getBoundingClientRect().top && (o.removeClass("ui-animEle"),
                a--,
                t._animed = !0))
            }),
            a || (i.unbind("scroll", t),
            i.unbind("resize", e))
        }
        ,
        i.bind("scroll", t),
        e = function() {
            n = i.height()
        }
        ,
        i.bind("resize", e),
        void t())
    }