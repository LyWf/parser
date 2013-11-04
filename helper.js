
(function() {
	function Helper(page) {
		var _this = this;
		
		this.jQuerify = false;
		jQuerify();
		
		this.filter = {
			processResultsPage: function() {
				return page.evaluate(filterResultsPage);
			},
			processItemPage: function() {
				return page.evaluate(filteItemPage);
			},
			cleanPage: function() {
				return page.evaluate(cleanPage);
			}
		};
		
		function filterResultsPage() {
			return (function($) {
				var elsCount = $('div.t_i_i').length,
					elsDelta = 0;
					_return = 'Filter: filterResultsPage, start. \n';
					_return += 'Filter: total elements ' + elsCount + '\n';
				//console.log($('div.t_i_i').length);
				$('p.t_i_address').each(function() { // расстояние
					var el = $(this),
						text = $.trim(el.text()),
						reg = /^\d{2,3}\s+/i,
						regVal;
					if(reg.test(text)) {
						regVal = parseInt(reg.exec(text)[0]);
						if(regVal > 20) {
							el.parents('div.t_i_i').remove();
						};
					};
				});
				elsDelta = elsCount - $('div.t_i_i').length;
				elsCount = $('div.t_i_i').length;
				_return += 'Filter: filtered ' + elsDelta + ' elements, total elements ' + elsCount + '\n';
				//console.log($('div.t_i_i').length);
				$('h3.t_i_h3 a.second-link').each(function() { // площадь
					var el = $(this),
						text = $.trim(el.text()),
						reg = /\d{2,3}\s+м/i,
						regVal;
					if(reg.test(text)) {
						regVal = parseInt(reg.exec(text)[0]);
						if(regVal < 40 || regVal > 190) {
							el.parents('div.t_i_i').remove();
						};
					};
				});
				elsDelta = elsCount - $('div.t_i_i').length;
				elsCount = $('div.t_i_i').length;
				_return += 'Filter: filtered ' + elsDelta + ' elements, total elements ' + elsCount + '\n';
				//console.log($('div.t_i_i').length);
				$('div.t_i_description span:first-child').each(function() { // стоимость
					var el = $(this),
						text = $.trim(el.text()).replace(/\s/g, ''),
						regVal = parseInt(text);
					if(regVal && regVal > 2000001) {
						el.parents('div.t_i_i').remove();
					};
				});
				elsDelta = elsCount - $('div.t_i_i').length;
				elsCount = $('div.t_i_i').length;
				_return += 'Filter: filtered ' + elsDelta + ' elements, total elements ' + elsCount + '\n';
				//console.log($('div.t_i_i').length);
				_return += 'Filter: filterResultsPage, finished. \n';
				return _return;
			})(jQuery);
		};
		function filterItemPage() {
			return '';
		};
		function cleanPage() {
			return (function($) {
				var _return = 'Filter: clean, start. \n';
				$('div.g_b_16, div.b_c-map, div.footer, #yandex_direct, #ads_ldr_low, #ads_ldr_top').remove();
				_return += 'Filter: clean, finished. \n';
				return _return;
			})(jQuery);
		};
		function jQuerify() {
			page.includeJs('http://code.jquery.com/jquery-2.0.3.min.js', function() {
				_this.jQuerify = true;
			});
		}
	};

	module.exports = {
		create: function(page) {
			return new Helper(page);
		}
	};
})();
