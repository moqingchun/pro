var Router = function() {
	this.routes = {};
	this.curUrl = '/';
};

Router.prototype = {
	init: function() {
		let _el = this;
		window.addEventListener('hashchange', _el.reloadPage.bind(_el));
	},
	reloadPage: function() {
		let _el = this;
		_el.curUrl = location.hash.substring(1) || '/';
		_el.routes[_el.curUrl]();
	},
	map: function(key, callback) {
		let _el = this;
		_el.routes[key] = callback;
	}
};

var ORouter = new Router();

ORouter.init();

ORouter.map('/', function() {
	$('#router-view').load('views/index.html',function(){
		// console.log('加载完毕')
		// $.getScript('include.js')
	})
});
ORouter.map('/index', function() {
	$('#router-view').load('views/index.html')
});
ORouter.map('/about', function() {
	$('#router-view').load('views/about.html')
});
ORouter.map('/mine', function() {
	$('#router-view').load('views/mine.html')
});

ORouter.reloadPage()
