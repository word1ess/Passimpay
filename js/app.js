


// console.log($("#anim-message-1").offset().top)
// console.log(window.pageYOffset)












(() => {
    "use strict";
    const modules_flsModules = {};
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    function functions_FLS(message) {
        //setTimeout((() => {
        //    if (window.FLS) console.log(message);
        //}), 0);
    }
    class MousePRLX {
        constructor(props, data = null) {
            let defaultConfig = {
                init: true,
                logging: true
            };
            this.config = Object.assign(defaultConfig, props);
            if (this.config.init) {
                const paralaxMouse = document.querySelectorAll("[data-prlx-mouse]");
                if (paralaxMouse.length) {
                    this.paralaxMouseInit(paralaxMouse);
                    this.setLogging(`Проснулся, слежу за объектами: (${paralaxMouse.length})`);
                } else this.setLogging("Нет ни одного объекта. Сплю...zzZZZzZZz...");
            }
        }
        paralaxMouseInit(paralaxMouse) {
            paralaxMouse.forEach((el => {
                const paralaxMouseWrapper = el.closest("[data-prlx-mouse-wrapper]");
                const paramСoefficientX = el.dataset.prlxCx ? +el.dataset.prlxCx : 100;
                const paramСoefficientY = el.dataset.prlxCy ? +el.dataset.prlxCy : 100;
                const directionX = el.hasAttribute("data-prlx-dxr") ? -1 : 1;
                const directionY = el.hasAttribute("data-prlx-dyr") ? -1 : 1;
                const paramAnimation = el.dataset.prlxA ? +el.dataset.prlxA : 50;
                let positionX = 0, positionY = 0;
                let coordXprocent = 0, coordYprocent = 0;
                setMouseParallaxStyle();
                if (paralaxMouseWrapper) mouseMoveParalax(paralaxMouseWrapper); else mouseMoveParalax();
                function setMouseParallaxStyle() {
                    const distX = coordXprocent - positionX;
                    const distY = coordYprocent - positionY;
                    positionX += distX * paramAnimation / 1e3;
                    positionY += distY * paramAnimation / 1e3;
                    el.style.cssText = `transform: translate3D(${directionX * positionX / (paramСoefficientX / 10)}%,${directionY * positionY / (paramСoefficientY / 10)}%,0);`;
                    requestAnimationFrame(setMouseParallaxStyle);
                }
                function mouseMoveParalax(wrapper = window) {
                    wrapper.addEventListener("mousemove", (function(e) {
                        const offsetTop = el.getBoundingClientRect().top + window.scrollY;
                        if (offsetTop >= window.scrollY || offsetTop + el.offsetHeight >= window.scrollY) {
                            const parallaxWidth = window.innerWidth;
                            const parallaxHeight = window.innerHeight;
                            const coordX = e.clientX - parallaxWidth / 2;
                            const coordY = e.clientY - parallaxHeight / 2;
                            coordXprocent = coordX / parallaxWidth * 100;
                            coordYprocent = coordY / parallaxHeight * 100;
                        }
                    }));
                }
            }));
        }
        setLogging(message) {
            this.config.logging ? functions_FLS(`[PRLX Mouse]: ${message}`) : null;
        }
    }
    modules_flsModules.mousePrlx = new MousePRLX({});
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    function DynamicAdapt(type) {
        this.type = type;
    }
    DynamicAdapt.prototype.init = function() {
        const _this = this;
        this.оbjects = [];
        this.daClassname = "_dynamic_adapt_";
        this.nodes = document.querySelectorAll("[data-da]");
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            const data = node.dataset.da.trim();
            const dataArray = data.split(",");
            const оbject = {};
            оbject.element = node;
            оbject.parent = node.parentNode;
            оbject.destination = document.querySelector(dataArray[0].trim());
            оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
            оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.оbjects.push(оbject);
        }
        this.arraySort(this.оbjects);
        this.mediaQueries = Array.prototype.map.call(this.оbjects, (function(item) {
            return "(" + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
        }), this);
        this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, (function(item, index, self) {
            return Array.prototype.indexOf.call(self, item) === index;
        }));
        for (let i = 0; i < this.mediaQueries.length; i++) {
            const media = this.mediaQueries[i];
            const mediaSplit = String.prototype.split.call(media, ",");
            const matchMedia = window.matchMedia(mediaSplit[0]);
            const mediaBreakpoint = mediaSplit[1];
            const оbjectsFilter = Array.prototype.filter.call(this.оbjects, (function(item) {
                return item.breakpoint === mediaBreakpoint;
            }));
            matchMedia.addListener((function() {
                _this.mediaHandler(matchMedia, оbjectsFilter);
            }));
            this.mediaHandler(matchMedia, оbjectsFilter);
        }
    };
    DynamicAdapt.prototype.mediaHandler = function(matchMedia, оbjects) {
        if (matchMedia.matches) for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.moveTo(оbject.place, оbject.element, оbject.destination);
        } else for (let i = оbjects.length - 1; i >= 0; i--) {
            const оbject = оbjects[i];
            if (оbject.element.classList.contains(this.daClassname)) this.moveBack(оbject.parent, оbject.element, оbject.index);
        }
    };
    DynamicAdapt.prototype.moveTo = function(place, element, destination) {
        element.classList.add(this.daClassname);
        if ("last" === place || place >= destination.children.length) {
            destination.insertAdjacentElement("beforeend", element);
            return;
        }
        if ("first" === place) {
            destination.insertAdjacentElement("afterbegin", element);
            return;
        }
        destination.children[place].insertAdjacentElement("beforebegin", element);
    };
    DynamicAdapt.prototype.moveBack = function(parent, element, index) {
        element.classList.remove(this.daClassname);
        if (void 0 !== parent.children[index]) parent.children[index].insertAdjacentElement("beforebegin", element); else parent.insertAdjacentElement("beforeend", element);
    };
    DynamicAdapt.prototype.indexInParent = function(parent, element) {
        const array = Array.prototype.slice.call(parent.children);
        return Array.prototype.indexOf.call(array, element);
    };
    DynamicAdapt.prototype.arraySort = function(arr) {
        if ("min" === this.type) Array.prototype.sort.call(arr, (function(a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) return 0;
                if ("first" === a.place || "last" === b.place) return -1;
                if ("last" === a.place || "first" === b.place) return 1;
                return a.place - b.place;
            }
            return a.breakpoint - b.breakpoint;
        })); else {
            Array.prototype.sort.call(arr, (function(a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if ("first" === a.place || "last" === b.place) return 1;
                    if ("last" === a.place || "first" === b.place) return -1;
                    return b.place - a.place;
                }
                return b.breakpoint - a.breakpoint;
            }));
            return;
        }
    };
    const da = new DynamicAdapt("max");
    da.init();
    new Swiper(".advantages__swiper", {
        pagination: {
            el: ".advantages__pagination"
        }
    });
    new Swiper(".carousel-crypto__swiper", {
        slidesPerView: "auto",
        spaceBetween: 30,
        loop: true,
        autoplay: true
    });
    new Swiper(".carousel-footer__swiper", {
        slidesPerView: "auto",
        spaceBetween: 40,
        loop: true,
        autoplay: true
    });
	const swiper = new Swiper(".reviews_info_swiper", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
		threshold: 10,
		navigation: {
          nextEl: ".reviews__next",
          prevEl: ".reviews__prev",
        },
    });
	swiper.on('slideChange', function (swiper) {
		$('.reviews_list_img span img').removeClass('active');
		$('.reviews_list_img span img').eq(swiper.realIndex).addClass('active');
		$('.reviews__info p').removeClass('active').css({height: ''});
		$('.reviews__info').removeClass('arrow_hide');
		$(".review_more").each(function(){
			$(this).find('span').html($(this).data('text2'));
		});
	});
    $(".review_more").on("click", function() {
		var p = $(this).prev();
		p.toggleClass('active');
		if (p.hasClass('active')) {
			$(this).find('span').html($(this).data('text1'));
			$('.reviews__info').addClass('arrow_hide');
			p.css({height: p[0].scrollHeight});
		} else {
			$(this).find('span').html($(this).data('text2'));
			$('.reviews__info').removeClass('arrow_hide');
			p.css({height: ''});
		}
		return false;
    });
	$(".review_more").each(function(){
		var p = $(this).prev();
		if (p[0].scrollHeight > p.height()) {
			$(this).show();
		} else {
			$(this).hide();
		}
	});
	/*
	$(".reviews__arrows a").on("click", function() {
		var i = 0;
		var active = $('.reviews__item._active');
		if ($(this).parent().hasClass('reviews__next')) {
			if (active.next().length) {
				i = active.next().index();
			} else {
				i = 0;
			}
		} else {
			if (active.prev().length) {
				i = active.prev().index();
			} else {
				i = $('.reviews__item').length - 1;
			}
		}
		$(".reviews__item").removeClass("_active");
        $(".reviews__item").eq(i).addClass("_active");
		return false;
    });
	
    function setReviewsColors(className) {
        let colors = [ {
            background: "#D4DBB9",
            border: "#F1F4E6",
            shadow: "#D4DBB9"
        }, {
            background: "#D6B9DB",
            border: "#F8EDFA",
            shadow: "#D6B9DB"
        }, {
            background: "#1843BF",
            border: "#7395F9",
            shadow: "#1843BF"
        }, {
            background: "#97E0B0",
            border: "#DEFFE9",
            shadow: "#97E0B0"
        }, {
            background: "#B2BFE7",
            border: "#D7DCE9",
            shadow: "#B2BFE7"
        } ];
        $(className).each((function(i) {
            $(this).css("background-color", colors[i].background);
            $(this).css("border", "5px solid " + colors[i].border);
        }));
    }
    setReviewsColors(".reviews__item");
	*/
    $(".home-buisnes-intro__codeMask ul li").each((function() {}));
    function setCodeMask() {
        
        let i = 0;
        setInterval((function() {
            if(i < $(".home-buisnes-intro__codeMask ul li").length) {
                $(".home-buisnes-intro__codeMask ul li").eq(i).css("width", "0%");
                i++;
            }
            else {
                $(".home-buisnes-intro__codeMask ul li").css("width", "100%")
                i = 0;
            }
        }), 700);
    }
    setCodeMask();
    function buisnesMap() {
        var mappoint = $(".mappoint");
        var i = 0;
        var b = 0;
        setInterval((function() {
            if (i < mappoint.length && 0 == b) {
                $(mappoint[i]).attr("opacity", $(mappoint[i]).data("opacity"));
                $(mappoint[i + 1]).attr("opacity", $(mappoint[i + 1]).data("opacity"));
                i++;
                $(mappoint[i - 1]).attr("opacity", "0");
                $(mappoint[i - 2]).attr("opacity", "0");
            }
            if (i >= mappoint.length) b = 1;
            if (i > 0 && 1 == b) {
                $(mappoint[i]).attr("opacity", $(mappoint[i]).data("opacity"));
                $(mappoint[i - 1]).attr("opacity", $(mappoint[i + 1]).data("opacity"));
                i--;
                $(mappoint[i + 1]).attr("opacity", "0");
                $(mappoint[i + 2]).attr("opacity", "0");
            }
            if (i <= 0) b = 0;
        }), 600);
        var mapline = $(".mapline");
        var g = 0;
        var s = 0;
        setInterval((function() {
            if (g < mapline.length && 0 == s) {
                $(mapline[g - 1]).attr("opacity", "0");
                $(mapline[g - 2]).attr("opacity", "0");
                $(mapline[g]).attr("opacity", "1");
                $(mapline[g + 1]).attr("opacity", "1");
                g++;
            }
            if (g >= mapline.length) s = 1;
            if (g > 0 && 1 == s) {
                $(mapline[g + 1]).attr("opacity", "0");
                $(mapline[g + 2]).attr("opacity", "0");
                $(mapline[g - 1]).attr("opacity", "1");
                $(mapline[g]).attr("opacity", "1");
                g--;
            }
            if (g <= 0) s = 0;
        }), 1e3);
    }
    buisnesMap();
    new Swiper(".wallet-support__swiper", {
        slidesPerView: "auto",
        spaceBetween: 20,
        loop: true,
        autoplay: true,
        allowTouchMove: false,
        breakpoints: {
            991.98: {
                spaceBetween: 110
            },
            767.98: {
                spaceBetween: 60
            }
        }
    });
	if ($(window).width() > 990) {
		$(".steps-cont__item").on("mouseenter", (function() {
			let index = $(this).index();
			if (index > 0) {
				if ($(".steps-cont__item").eq(index - 1).hasClass("_active")) $(this).addClass("_active");
			} else if (0 == index) {
				$(".steps-cont__item._active").removeClass("_active");
				$(this).addClass("_active");
			}
			var left = $(".steps-cont__item._active").last().find('.steps-cont__circle').offset().left;
			var wrp = $(".steps__cont").offset().left;
			$(".steps-cont__logo").css({left: (left - wrp)});
			let count = $(".steps-cont__item._active").last().index() + 1;
			let leftMargin = ($(".steps__cont").width() - $(".steps-cont__inner").width()) / 2 + (count - 1) * $(".steps-cont__item").first().outerWidth() + 30 * (count - 1);
			if (0 != count) {
				let style = "";
				style += `<style>.steps-cont::after {width: ${leftMargin}px;}</style>`;
				$("#line-style").html(style);
			}
		}));
	} else {
		$(window).on('scroll', function(event){
			var currentPos = $(window).scrollTop();
			
			if ($('.steps-cont__item').length) {
				$('.steps-cont__item').each(function(){
					var btop = $(this).offset().top;
					var bH = $(this).height();
					var bS = currentPos + $(window).height() / 2;
					if (bS >= btop) {
						$(this).addClass("_active");
					} else {
						$(this).removeClass("_active");
					}
				});
			}

		}).scroll();
	}
	/*
    function controlReviewsInfo() {
        if ($(window).width() < 769) $(".reviews__item").each((function() {
            $(this).css("left", "0px");
            let offset = $(this).children(".reviews__info").offset();
            let num = offset.left - 40;
            console.log(num);
            let pos = "-" + num + "px";
            $(this).children(".reviews__info").css("left", pos);
        }));
    }
    controlReviewsInfo();
	*/
    function buisnesCalc() {
        $(".calculator-cont__item-range input").on("input", (function() {
            $(this).parents(".calculator-cont__item-range").siblings(".calculator-cont__item-num").children("input").val($(this).val());
            $(this).parents(".calculator-cont__item-range").siblings(".calculator-cont__item-num").find("p span").text($(this).val());
            let width = $(this).val() / $(this).attr("max") * 100;
            $(this).siblings(".calculator-cont__item-range-fill").css("width", width + "%");
            $(this).siblings(".calculator-cont__item-range-circle").css("left", width + "%");
			buisnesCalcTotal();
        }));
		$(".calculator-cont__item-num input").on("input", (function() {
			$(this).siblings('p').children('span').text($(this).val());
			var range = $(this).parent().siblings(".calculator-cont__item-range").children("input");
            range.val($(this).val());
            let width = $(this).val() / $(this).attr("max") * 100;
			if (width > 100) width = 100;
            range.siblings(".calculator-cont__item-range-fill").css("width", width + "%");
            range.siblings(".calculator-cont__item-range-circle").css("left", width + "%");
			buisnesCalcTotal();
        }));
    }
	function buisnesCalcTotal() {
		var c1 = parseFloat($('#calc_input1').val());
		var c2 = parseFloat($('#calc_input2').val());
		var c3 = parseFloat($('#calc_input3').val());
		var c4 = parseFloat($('#calc_input4').val());
		if (!c1) c1 = 0;
		if (!c2) c2 = 0;
		if (!c3) c3 = 0;
		if (!c4) c4 = 0;
		var count = c2 * c1 / 100;
		var amount = count * c4;
		var result = c3 * amount / 100;
		if ($('#calc_checkbox').prop('checked')) {
			result = result - (3.5 * result / 100);
		}
		result = Math.round(result * 10000) / 10000;
		$('#calc_total').text(result);
	}
	$("#calc_checkbox").on("click", (function() {
		buisnesCalcTotal();
    }));
    buisnesCalc();
    function partnerCalc() {
        $(".partners-calc-cont__range-slider input").on("input", (function() {
            $(this).parents(".partners-calc-cont__range-slider").siblings(".partners-calc-cont__range-num").children("input").val($(this).val());
            let width = $(this).val() / $(this).attr("max") * 100;
            $(this).siblings("p").css("width", width + "%");
            $(this).siblings("span").css("left", width + "%");
			partnerCalcTotal();
        }));
		$(".partners-calc-cont__range-num input").on("input", (function() {
			var range = $(this).parent().siblings(".partners-calc-cont__range-slider").children("input");
            range.val($(this).val());
            let width = $(this).val() / $(this).attr("max") * 100;
			if (width > 100) width = 100;
            range.siblings("p").css("width", width + "%");
            range.siblings("span").css("left", width + "%");
			partnerCalcTotal();
        }));
    }
	function partnerCalcTotal() {
		var amount = parseFloat($('#pamount').val());
		if (!amount) amount = 0;
		var count = parseFloat($('#pcount').val());
		if (!count) count = 0;
		var sum = amount * count;
		$(".partners-calc-cont__buttons-item").removeClass("_active");
		if (sum < 500000) {
			$(".partners-calc-cont__buttons-item").eq(0).addClass("_active");
		}
		if (sum >= 500000 && sum < 1500000) {
			$(".partners-calc-cont__buttons-item").eq(1).addClass("_active");
		}
		if (sum >= 1500000) {
			$(".partners-calc-cont__buttons-item").eq(2).addClass("_active");
		}
		var percent = parseFloat($('.partners-calc-cont__buttons-item._active').data('percent'));
		var result = ((amount * 3.5 / 100) * percent / 100) * count;
		result = Math.round(result * 10000) / 10000;
		$('#calc_partner_total').text(result);
	}
    partnerCalc();
    $(".partners-calc-cont__buttons-item").on("click", (function() {
        $(".partners-calc-cont__buttons-item").removeClass("_active");
        $(this).addClass("_active");
		partnerCalcTotal();
    }));
    window["FLS"] = true;
    isWebp();
    menuInit();
})();










// $(document).mouseup(function(e) 
// {
//     var container = $(".reviews__item");

//     // if the target of the click isn't the container nor a descendant of the container
//     if (!container.is(e.target) && container.has(e.target).length === 0 && $("#cookie-big").css("display") == "none" && $("#cookie-sm").css("display") == "none") 
//     {
//         container.removeClass("_active");
//     }
// });

// setTimeout(function() {
// 	$("#anim-message-1")
// }, )

$(".login-window__password-input img").on("click", function() {
    $(this).parents(".login-window__password-input").toggleClass("_show")
    if($(this).parents(".login-window__password-input").hasClass("_show")) {
        $(this).siblings("input").attr("type", "text");
    }
    else {
        $(this).siblings("input").attr("type", "password");
    }
})

$(".cookie__accept").on("click", function() {
    $("#cookie-sm").fadeOut(300);
	setCookie('cookieagree', 1, 999);
})

$(".cookie__control").on("click", function() {
    $("#cookie-sm").fadeOut(300)
    $("#cookie-big").fadeIn(300).css("display", "flex")
})

$("#cookie-big .cookie__title button, #cookie-big .cookie__save button").on("click", function() {
    $("#cookie-big").fadeOut(300)
    $("#cookie-sm").fadeIn(300).css("display", "flex")
})

$("#cookie-big .cookie__checkbox label input").on("input", function() {
    if($(this).is(":checked")) {
        $(this).parents("label").addClass("_active")
    }
    else {
        $(this).parents("label").removeClass("_active")
    }
})



function setCookie(name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
	var matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

$('body').on('mousemove', '.lang a, .btn1, .btn2, .btn3, .login-window__social ul li, .list_sh a, .btn_close_modal, .valutes_buttons a, .info_navigation_btn', function(e){
	var x = e.pageX - $(this).offset().left;
	var y = e.pageY - $(this).offset().top;
	$(this).css({'--x': `${ x }px`, '--y': `${ y }px`});
});
$('body').on('click', '.btn_type_page', function(e){
	setCookie('typebuisnes', $(this).data('type'), 999);
});
$('body').on('input', '.login-window__perBuis-inner input', function(e){
	setCookie('typebuisnes', $(this).val(), 999);
});
$(window).on('scroll', function(event){
	var currentPos = $(window).scrollTop();
	
	if ($('lottie-player:not(.no_scroll)').length) {
		$('lottie-player:not(.no_scroll)').each(function(){
			var btop = $(this).offset().top;
			var bH = $(this).height();
			if (currentPos + $(window).height() >= btop && currentPos <= btop + bH) {
				$(this).get(0).play();
			} else {
				$(this).get(0).stop();
			}
		});
	}

}).scroll();
$('body').delegate('.close_alert', 'click', function(){
	$(this).parents('.item_alert').addClass('hide');
	return false;
});
$('.captcha_img_click').click(function () {
	var src = $(this).attr('src').split('&t=')[0] + '&t=' + new Date().getTime();
	$(this).attr('src', src);
	return false;
});
$('body').on('click', '[data-modal]', function(){
	if (!$('#' + $(this).data('modal')).length) return false; 
	$('body').addClass('open_modal');
	$('#' + $(this).data('modal')).addClass('show');
	return false;
});

$(document).click(function(event) {
	if ($(event.target).closest(".inner_modal").length) return;
	$('body').removeClass('open_modal');
	$('.modal').removeClass('show');
	event.stopPropagation();
});
$('body').on('click', '.btn_close_modal, .close_modal', function(){
	$(this).closest('.modal').removeClass('show');
	if (!$('.modal.show').length) {
		$('body').removeClass('open_modal');
	}
});
$('.link_anim_span').each(function(){
	$(this).html('<span>' + $(this).text().split(' ').join('&ensp;</span><span>') + '</span>');
});
if ($(window).width() <= 768) {
	new Swiper(".item_news_right_swiper", {
		slidesPerView: 1,
		spaceBetween: 20,
		loop: true,
		autoplay: false,
		pagination: {
			el: '.item_news_right_swiper .swiper-pagination',
			type: 'bullets',
		},
		breakpoints: {
			600: {
				slidesPerView: 2
			}
		}
	});
}
$('.convert-valute_info .info_item a').addClass('_link-anim');

$('.h-captcha').closest('form').submit(function(event) {
	if ($('[name="h-captcha-response"]').val() === "") {
		event.preventDefault();
	}
});



