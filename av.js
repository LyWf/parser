var page = require('webpage').create(),
    system = require('system'),
	helper = require('./helper.js').create(page),
    url, pageCount;

url = system.args[1] || 'http://www.avito.ru/samara/doma_dachi_kottedzhi/prodam?pmax=2500000';
pageCount = system.args[2] || 20;

page.userAgent = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0';
page.viewportSize = { width: 1280, height: 1280 };

page.open(url, function(status) {
	if(status === 'success') {
		window.setTimeout(function() {
			console.log('Page: loaded.');
			console.log(helper.filter.cleanPage());
			console.log(helper.filter.processResultsPage());
			console.log('Page: render.');
			page.render('page.png');
			page.close();
			page.open('http://google.ru', function(status) {
				if(status === 'success') {
					window.setTimeout(function() {
						console.log(page.pages, page.title);
					}, 1000);
				};
			});
			phantom.exit();
		}, 1000);
	} else {
		console.log('Page: load fail.');
		phantom.exit();
	};
});
