jQuery(document).ready(function($){
	
	if ($('#chart').length) {
		var el = $('#chart');
		var chart;
		var chartUrl = el.data('url');
		var filter = $('.chart_filter a.active').data('filter');
		el.addClass('loading');
		$.getJSON(chartUrl, {filter: filter}, function( data ) {
			chart = data;
			creatChart();
		});
	}
	
	$('body').delegate('.chart_filter a', 'click', function(){
		$('.chart_filter a').removeClass('active');
		$(this).addClass('active');
		el.addClass('loading');
		$.getJSON(chartUrl, {filter: $(this).data('filter')}, function( data ) {
			chart = data;
			creatChart();
		});
		return false;
	});
	
	creatChart = function() {
	
		
		el.html('<div class="chart_vertical"></div><div class="chart_horizontal"></div><div class="chart_lines"></div><div class="chart_svg"></div>');
		var data = chart;
		
		var max = 0;
		$.each(data, function(x, w){
			var price = Number(w.price);
			if (price > max){
				max = price;
			}
		});
		
		for (var i = 0; i <= 5; i++) {
			var str = max / 5 * i;
			if (str < 1 && str > 0) {
				str = parseFloat(str).toFixed(4);
			} else {
				str = Math.round(str);
			}
			var step = Math.round(max / 5 * i);
			if (step >= 1000) {
				str = Math.round(step / 1000) + 'k';
			}
			if (step >= 1000000) {
				str = parseFloat(step / 1000000).toFixed(1) + 'm';
			}
			$('.chart_vertical').prepend('<div><span>'+ str +'</span></div>');
		}
		
		$.each(data, function(i, item){
			var percent = 0;
			if (max > 0) {
				percent = Number(item.price) * 100 / max;
			}
			var price = '<div class="fs-12 color-green"><b>+'+ item.price +' $</b></div>';
			if (item.type == 'withdraw') {
				price = '<div class="fs-12 color-red"><b>-'+ item.price +' $</b></div>';
			}
			$('.chart_horizontal').append('<div><span></span></div>');
			$('.chart_lines').append('<div style="height:'+ percent +'%"><div class="chart_lines_bg"></div><div class="chart_popup">'+ price +'<div class="fs-12 color-gray"><b>'+ item.time +'</b></div></div></div>');
		});
		
		var cW = $(".chart_svg").width();
		var cH = $(".chart_svg").height();
		var x, y;
		
		var list = [];
		
		$('.chart_lines > div').each(function(i, v){
			y = parseInt($(this).position().top);
			x = parseInt($(this).position().left + ($(this).width() / 2));
			list.push([x, y]);
		});
		
		var path = '';
		
		$.each(list, function(i, item){
			var x = item[0];
			var y = item[1];
			if (i == 0) {
				path += 'M'+ x +' '+ y +' ';
			} else {
				path += 'L'+ x +' '+ y +' ';
			}
		});
		
		
		$('.chart_svg').append('<svg width="100%" height="100%" viewBox="0 0 '+ cW +' '+ cH +'" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="'+ path +'" stroke="#1843BF" /></svg>');
		
		el.removeClass('loading');
	};
	
	$(window).on('resize', creatChart);

});



