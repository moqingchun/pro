// JavaScript Document
var intId = null;
(function($) {
	$.fn.myScroll = function(options) {
		//默认配置
		var defaults = {
			speed: 40, //滚动速度,值越大速度越慢
			rowHeight: 24 //每行的高度
		};
		var opts = $.extend({}, defaults, options),
			onOff = true;
		var sh = opts["rowHeight"],
			speed = opts["speed"],
			_this = $(this);
		fnSetInterval(_this, sh, speed);
		_this.hover(function() {
			clearInterval(intId);
		}, function() {
			fnSetInterval(_this, sh, speed);
		});
	}

})(jQuery);

function fnSetInterval(_this, sh, speed) {
	clearInterval(intId);
	intId = setInterval(function() {
		if (_this.find("ul").height() <= _this.height()) {
			clearInterval(intId);
		} else {
			marquee(_this, sh);
		}
	}, speed);
}

function marquee(obj, step) {
	obj.find("ul").animate({
		marginTop: '-=1'
	}, 0, function() {
		var s = Math.abs(parseInt($(this).css("margin-top")));
		if (s >= step) {
			$(this).find("li").slice(0, 1).appendTo($(this));
			$(this).css("margin-top", 0);
		}
	});
}
