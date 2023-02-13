//let messAnim = true


// $(window).scroll(function() {

// 	let windowScrollTop = $(window).scrollTop() + $(window).height() - $(".integration__img").height()
// 	if(windowScrollTop > $(".integration__img").offset().top && messAnim == true) {




		setInterval(function() {
			let i = 0;
			let pos = $("#anim-message-1").attr("x")
			let pos2 = $("#anim-message-1").attr("x")
			let refreshIntervalId = setInterval(function() {
				if(i < 100) {
					$("#anim-message-1").attr("x", pos - 1)
					pos--;
					i++;
				}
				else {
					clearInterval(refreshIntervalId);
					pos = pos2;
					setTimeout(function() {
						$("#anim-message-1").attr("x", pos2)
					}, 2300)
					// i = 0;
					// pos = pos2;	
					// $("#anim-message-1").attr("x", pos);
				}
				// $("#anim-message-2").attr("x")
			}, 3)
		}, 3200)





		setInterval(function() {
			setTimeout(function() {
				let i = 0;
				let pos = $("#anim-message-2").attr("x")
				let pos2 = $("#anim-message-2").attr("x")
				let refreshIntervalId = setInterval(function() {
					if(i < 100) {
						$("#anim-message-2").attr("x", pos - 1)
						pos--;
						i++;
					}
					else {
						clearInterval(refreshIntervalId);
						pos = pos2;
						setTimeout(function() {
							$("#anim-message-2").attr("x", pos2)
						}, 2000)
					}
					// $("#anim-message-2").attr("x")
				}, 3)
			}, 300)
		}, 3200)
		


		setInterval(function() {
			setTimeout(function() {
				let i = 0;
				let pos = $("#anim-message-3").attr("x")
				let pos2 = $("#anim-message-3").attr("x")
				let refreshIntervalId = setInterval(function() {
					if(i < 100) {
						$("#anim-message-3").attr("x", pos - 1)
						pos--;
						i++;
					}
					else {
						clearInterval(refreshIntervalId);
						pos = pos2;
						setTimeout(function() {
							$("#anim-message-3").attr("x", pos2)
						}, 1700)
					}
					// $("#anim-message-2").attr("x")
				}, 3)
			}, 600)
		}, 3200)


		// messAnim = false

// 	}
// });