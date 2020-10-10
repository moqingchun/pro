//author:jack
;
(function(win) {
	win._util = {
		//ajax
		httpJ: function (options) {
			$.ajax({
				url: options.url,
				type: 'POST',
				contentType: "application/json",
				dataType: 'json',
				data: JSON.stringify(options.params),
				success: options.callback
			});
		},
		//放大图片
		imgShow: function(src) {
			var domId = "imgWrap" + new Date().getTime();
			var styleId = "style" + new Date().getTime();
			var dom = '<div id="' + domId + '" class="imgWrap"><img src="' + src + '"/></div>';
			var style = '<style id="' + styleId + '">@keyframes smallToBig{0%{transform: scale(0);}50%{transform: scale(1.5);}100%{transform: scale(1);}}@keyframes fadeIn{0%{opacity:0;}100%{opacity:1;}}@keyframes fadeOut{0%{opacity:1;}100%{opacity:0;}}.imgWrap{cursor:wait;position: fixed;top: 0;left: 0;background: rgba(0,0,0,.6);width: 100%;height: 100%;z-index: 9999;-webkit-animation: fadeIn .5s forwards;-o-animation: fadeIn .5s forwards;animation: fadeIn .5s forwards;overflow:auto;}.imgWrap img{position: absolute;margin: auto;left: 0;top: 0;right: 0;bottom: 0;-webkit-animation: smallToBig .5s forwards;-o-animation: smallToBig .5s forwards;animation: smallToBig .5s forwards;}.imgWrap.fadeOut{animation: fadeOut .5s forwards;}</style>';
			$('body').append(dom);
			$('head').append(style);
			$('#' + domId).click(function() {
				var _self = $(this);
				_self.addClass('fadeOut');
				setTimeout(function() {
					_self.remove()
					$('#' + styleId).remove()
				}, 500)
			})
		},
		//可输入可选择的输入框
		inputSelect: function(dom, str) {
			var html ='<input type="text" class="form-control self_required" placeholder="请选择或者输入" required/><ul>'+str+'</ul>';
			var style ='<style>.inputSel{position: relative;}.inputSel::after{content: "";width: 0;height: 0;border-top: 4px solid #333;border-left: 4px solid transparent;border-right: 4px solid transparent;position: absolute;right: 10px;top: 12px;}.inputSel input{width: 100%;}.inputSel ul{position: absolute;top: 105%;left: 0;width: 100%;background: #fff;z-index: 999;border: 1px solid #ccc;box-shadow: 0 0 6px #373333;display: none;max-height: 250px;overflow: auto;}.inputSel ul li{padding: 3px 20px;color: #777;cursor: pointer;}.inputSel ul li:hover{color: #333;background: #e1e3e9;}</style>';
			$(dom).html(html);
			$('head').append(style);
			$(dom).find('input').on('click', function(event) {
				event.stopPropagation();
				$('.inputSel ul').hide();
				$(dom).find('ul').toggle();
			});
			$(document).on('click', function() {
				$(dom).find('ul').hide();
			});
			$(dom).find('li').on('click', function() {
				$(dom).find('input').val($(this).html());
			});
			$(dom).find('input').on('input propertychange focus', function() {
				var val = $(this).val();
				$(dom).find('li').each(function() {
					$(this).text().indexOf(val) === -1 ? $(this).hide() : $(this).show();
				})
			})
		},
		//必填字段
		requiredTip: function(formID, domID) {
			var _this = this,
				flag = true;
			$(formID).css("position", "relative");
			$(formID).find(domID).each(function() {
				if ($(this).attr('required') && !$.trim($(this).val())) {
					$(this).focus();
					_this.messageBox({ele:formID});
					flag = false;
					return false;
				}
			})
			return flag;
		},
		//form表单必填项提示插件
		messageBox: function(options) {
			var defaults = {
				ele:'body',
				hideTime: 2000,
				message: '你有必填项未填写！'
			}
			for(var key in options){
				if(options.hasOwnProperty(key)){
					defaults[key] = options[key];
				}
			}
			var mdId = 'tip' + new Date().getTime(),
				styleId = 'style' + new Date().getTime();
			var html = '<div class="TIP" id="'+mdId+'">'+defaults.message+'</div>';
			var css = '<style id="' + styleId +'">@keyframes fadeIn{0%{opacity:0}100%{opacity:1;}}@keyframes fadeOut{0%{opacity:1;}100%{opacity:0}}.TIP{width: 40%;height: 30px;line-height: 30px;text-align: center;background: rgba(255, 0, 0, 0.6);font-size: 16px;color: rgb(255, 255, 255);border-radius: 16px;position: absolute;margin:auto;top: 0;left: 0;right:0;bottom:0;z-index: 99999;animation: fadeIn .2s forwards;}.TIP.fadeOut{animation: fadeOut .2s forwards;}</style>'
			$(defaults.ele).append(html);
			$('head').append(css);
			setTimeout(function() {
				$('#' + mdId).addClass('fadeOut');
			}, defaults.hideTime)
			setTimeout(function() {
				$('#' + mdId).remove();
				$('#' + styleId).remove();
			}, defaults.hideTime + 1000)
		},
		//地图打点插件
		Bmap: function(options) {
			var defaults = {
				val:'北京市',
				provice : '北京市',
				city: '北京市',
				bmaplng:116.404,
				bmaplat: 39.915,
				callback:function(){
					
				}
			}
			for(var key in options){
				if(options.hasOwnProperty(key)){
					defaults[key] = options[key];
				}
			}	
			var html ='<div class="BMAP_MASK"><div class="mask_dialog"><div class="mask_header"><span class="BMAP_CANCEL">&times;</span><div>地址设置</div></div><div class="mask_body"><div id="BMAP"></div><div id="BMAP_RES">点击地图或者输入：<input type="text" id="BMAP_INPUT" value="" lat="'+defaults.bmaplat+'" lng="'+defaults.bmaplng+'" province="'+defaults.provice+'" city="'+defaults.city+'"/><button class="BMAP_OK">确定</button></div><div id="BMAP_LIST" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div></div></div></div>';
			var css ='<style class="BMAP_MASK">@keyframes in{0%{margin-top:-30px}100%{margin-top:30px}}.BMAP_MASK{position:fixed;width:100%;height:100%;left:0;top:0;background:rgba(0,0,0,.5);z-index:1050;}.mask_dialog{width:80%;margin:30px auto;background:#fff;box-shadow: 0 5px 15px rgba(0,0,0,.5);border: 1px solid rgba(0,0,0,.2);border-radius: 6px;animation:in .2s forwards;}.mask_header{padding:15px;border-bottom: 1px solid #e5e5e5;font-size:18px;position:relative;}.mask_header span{font-size:30px;position:absolute;right:10px;top:5px;opacity:.2;cursor:pointer;}.mask_header span:hover{opacity:1;}.mask_body{font-size:16px;text-align:center;padding:15px;}.mask_body button{padding:4px 12px;border: 1px solid transparent;border-radius: 4px;background:#3c8dbc;color:#fff;}#BMAP {height: 300px;width: 100%;}#BMAP_RES {width: 100%;padding:10px 0;}#BMAP_INPUT{width: 30%;padding:4px;margin-right:10px;}.tangram-suggestion-main{z-index:9999;height: 400px;overflow-y: auto;}</style>';

			$('body').append(html);
			$('head').append(css);
			var map = new BMap.Map("BMAP");
			var geoc = new BMap.Geocoder();
			var ac = new BMap.Autocomplete( //建立一个自动完成的对象
				{
					"input": "BMAP_INPUT",
					"location": map
				});

			var myValue;

			map.centerAndZoom(new BMap.Point(defaults.bmaplng, defaults.bmaplat), 15); // 初始化地图,设置城市和地图级别。
			map.enableScrollWheelZoom(true); //鼠标滚轮缩放
			map.addOverlay(new BMap.Marker(new BMap.Point(defaults.bmaplng, defaults.bmaplat))); // 回显创建标注

			map.addEventListener("click", function(e) {
				map.clearOverlays(); //清除标注
				var pt = e.point;
				map.addOverlay(new BMap.Marker(pt)); // 创建标注
				geoc.getLocation(pt, function(rs) {
					// console.log(rs)
					G('BMAP_INPUT').value = rs.address;
					G('BMAP_INPUT').setAttribute('lat', rs.point.lat);
					G('BMAP_INPUT').setAttribute('lng', rs.point.lng);
					G('BMAP_INPUT').setAttribute('province', rs.addressComponents.province);
					G('BMAP_INPUT').setAttribute('city', rs.addressComponents.city)
				});
			});

			ac.setInputValue(defaults.val);
			ac.addEventListener("onhighlight", function(e) { //鼠标放在下拉列表上的事件
				var str = "";
				var _value = e.fromitem.value;
				var value = "";
				if (e.fromitem.index > -1) {
					value = _value.province + _value.city + _value.district + _value.street + _value.business;
				}
				str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

				value = "";
				if (e.toitem.index > -1) {
					_value = e.toitem.value;
					value = _value.province + _value.city + _value.district + _value.street + _value.business;
				}
				str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
				G("BMAP_LIST").innerHTML = str;
			});


			ac.addEventListener("onconfirm", function(e) { //鼠标点击下拉列表后的事件
				var _value = e.item.value;
				myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
				G("BMAP_LIST").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
				setPlace();
			});

			function G(id) {
				return document.getElementById(id);
			}

			function setPlace() {
				map.clearOverlays(); //清除地图上所有覆盖物
				function myFun() {
					var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
					// console.log(local.getResults().getPoi(0))
					G('BMAP_INPUT').setAttribute('lat', pp.lat);
					G('BMAP_INPUT').setAttribute('lng', pp.lng);
					G('BMAP_INPUT').setAttribute('province', local.getResults().getPoi(0).province);
					G('BMAP_INPUT').setAttribute('city', local.getResults().getPoi(0).city)
					map.centerAndZoom(pp, 18);
					map.addOverlay(new BMap.Marker(pp)); //添加标注
				}

				var local = new BMap.LocalSearch(map, { //智能搜索
					onSearchComplete: myFun
				});
				local.search(myValue);
			}
			
			$('.BMAP_OK').click(function() {
				var addressRS = {
					addressRS: $('#BMAP_INPUT').val(),
					latRS: $('#BMAP_INPUT').attr('lat'),
					lngRS: $('#BMAP_INPUT').attr('lng'),
					province: $('#BMAP_INPUT').attr('province'),
					city: $('#BMAP_INPUT').attr('city')
				}
				defaults.callback(addressRS)
				$('.BMAP_MASK').remove();
				// $('.tangram-suggestion-main').remove()
			})
			$('.BMAP_CANCEL').click(function() {
				$('.BMAP_MASK').remove();
				// $('.tangram-suggestion-main').remove()
			})
		},

		//loading插件
		loading: function(pa) {
			var html = '<div class="ajax_loading"><img src="../../../images/load.gif"/></div>';
			var css = '<style class="loading_stl">.ajax_loading{position:fixed;width:100%;height:100%;left:0;top:0;background:rgba(255,255,255,0);z-index:1050;}.ajax_loading img{position:absolute;margin:auto;left:0;top:0;right:0;bottom:0;}</style>';
			if(pa === 'hide'){
				$('.ajax_loading').remove();
				$('.loading_stl').remove();
			}else if(pa === 'show' || !pa){
				$('body').append(html);
				$('head').append(css);
			}

		},

		//confirm弹框插件 #FAAD14
		confirmModal: function(options) {
			var defaults = {
				title: '操作提示',
				hideCancel: false,
				message: '删除后不可恢复',
				callback:function(){
				}
			}
			for(var key in options){
				if(options.hasOwnProperty(key)){
					defaults[key] = options[key];
				}
			}
			var mdId = 'Mask' + new Date().getTime(),
				styleId = 'style' + new Date().getTime();
			var html = '<div class="mask" id="' + mdId +'"><div class="mask_dialog"><div class="mask_header">'+defaults.title +'</div><div class="mask_body">' +defaults.message + '</div><div class="mask_footer">';
			html += defaults.hideCancel ? '' : '<button type="button" class="cancel">取消</button>';
			html += '<button type="button" class="ok">确定</button></div></div></div>';
			var css = '<style id="' + styleId +'">@keyframes in{0%{opacity:0;}100%{opacity:1;}}@keyframes out{0%{opacity:1;}100%{opacity:0;}}.mask{position:fixed;width:100%;height:100%;left:0;top:0;background:rgba(255,255,255,0);z-index:1050;animation:in .2s forwards;}.mask_dialog{width:400px;height:174px;position:absolute;margin:auto;top:0;left:0;right:0;bottom:0;background:#fff;box-shadow: 0 5px 15px rgba(0,0,0,.5);border-radius: 6px;}.mask.out{animation:out .2s forwards;}.mask_header{padding:30px 30px 0;font-size:16px;position:relative;text-indent:50px;}.mask_header::after{content:"!";width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;background:#FAAD14;color:#fff;position:absolute;top:25px;left:28px;text-indent:0;}.mask_body{font-size:16px;padding:10px 30px 0;color:rgba(0,0,0,.5);text-indent:50px;}.mask_footer{padding: 30px 20px 0;text-align: right;}.mask_footer button{padding:6px 20px;border-radius: 4px;background:transparent;}.mask_footer .cancel{border: 1px solid #ccc;margin-right:10px;}.mask_footer .ok{border: 1px solid #F5222D;color:#F5222D;}.mask_footer .cancel:hover{box-shadow:0 0 5px #000;}.mask_footer .ok:hover{box-shadow:0 0 5px #F5222D;}</style>';
			$('body').append(html);
			$('head').append(css);
			$('#' + mdId).find('.ok').click(function() {
				defaults.callback();
				$('#' + mdId).addClass('out');
				setTimeout(function() {
					$('#' + mdId).remove();
					$('#' + styleId).remove();
				}, 1000)
			});
			$('#' + mdId).find('.cancel').click(function() {
				$('#' + mdId).addClass('out');
				setTimeout(function() {
					$('#' + mdId).remove();
					$('#' + styleId).remove();
				}, 1000)
			});
			$('#' + mdId).find('.mask_dialog').click(function(event) {
				event.stopPropagation();
			})
			$('#' + mdId).click(function() {
				$('#' + mdId).addClass('out');
				setTimeout(function() {
					$('#' + mdId).remove();
					$('#' + styleId).remove();
				}, 1000)
			})
		},
		//alert提示框插件
		tipBox: function(options) {
			var defaults = {
				hideTime: 2000,
				message: '操作成功!'
			}
			for(var key in options){
				if(options.hasOwnProperty(key)){
					defaults[key] = options[key];
				}
			}
			var mdId = 'tip' + new Date().getTime(),
				styleId = 'style' + new Date().getTime();
			var html = '<div class="TIP" id="'+mdId+'">'+defaults.message+'<span>&times;</span></div>';
			var css = '<style id="' + styleId +'">@keyframes fromTop{0%{top:-50px;}100%{top:0;}}@keyframes toTop{0%{top:0px;}100%{top:-50px;}}.TIP{width: 600px;line-height: 50px;text-align: center;background: rgba(51, 122, 183, 0.9);font-size: 16px;color: rgb(255, 255, 255);border-bottom-right-radius: 16px;border-bottom-left-radius: 16px;position: fixed;top: -50px;left: 50%;margin-left: -300px;z-index: 99999;animation: fromTop .2s forwards;}.TIP.toTop{animation: toTop .2s forwards;}.TIP span{font-size: 26px;color: rgb(255, 255, 255);position: absolute;top: 0px;right: 14px;cursor: pointer;}</style>'
			$('body').append(html);
			$('head').append(css);
			setTimeout(function() {
				$('#' + mdId).addClass('toTop');
			}, defaults.hideTime)
			setTimeout(function() {
				$('#' + mdId).remove();
				$('#' + styleId).remove();
			}, defaults.hideTime + 1000)
			$('#' + mdId).find('span').click(function() {
				$('#' + mdId).addClass('toTop');
			})
		},
		//顶部导航滚动到某一高度固定
		fixedNav: function(navName, fixClass, top) {
			$(window).scroll(function() {
				if ($(document).scrollTop() >= top) {
					$(navName).addClass(fixClass);
				} else {
					$(navName).removeClass(fixClass);
				}
			})
		},
		//公共头部选中状态ul>li>a
		commonHead: function(doc, className) {
			var urlstr = location.href;
			$(doc).each(function() {
				if ((urlstr).indexOf($(this).attr('href')) > -1 && $(this).attr('href') != '' && $(this).attr('href') != '/') {
					$(this).parent().addClass(className);
					$(this).parent().siblings().removeClass(className);
				} else if ((urlstr).indexOf($(this).attr('href')) > -1 && $(this).attr('href') != '' && $(this).attr('href') ===
					'/') {
					$(this).parent().addClass(className);
					$(this).parent().siblings().removeClass(className);
				}
			});
		},
		//复制
		copyCommond: function(clickele, ele) {
			$(clickele).on('click', function() {
				$(ele).select();
				document.execCommand("Copy");
			})
		},
		//超出多少字符显示省略号
		showEclips: function(dom, length) {
			$(dom).each(function() {
				var maxwidth = length;
				if ($(this).html().length > maxwidth) {
					$(this).html($(this).html().substring(0, maxwidth));
					$(this).html($(this).html() + '...');
				}
			});
		},
		// 获取地址栏？后的参数
		getQueryString: function(key) {
			var params = new URLSearchParams(location.search.substring(1));
			return params.get(key);
		},
		//仿checkbox，无背景色
		checkBox: function(divname) {
			$(divname).on('click', function() {
				$(this).html() === '' ? $(this).html('√') : $(this).html('');
			});
		},
		//仿checkbox，并且添加背景色
		checkBoxAddBg: function(divname, className) {
			$(divname).on('click', function() {
				$(this).html() === '' ? $(this).html('√').addClass(className) : $(this).html('').removeClass(className);
			});
		},
		// 仿select并且传值--针对动态生成的元素--input标签
		sltInputLive: function(ele0, ele1, ele2) { //ele0是下拉图标，ele1是与ele0同级的P
			$(document).on('click', ele0, function(event) {
				event.stopPropagation();
				event.preventDefault();
				$(ele2).parent().toggle();
			});
			$(document).on('click', ele1, function(event) {
				event.stopPropagation();
				event.preventDefault();
				$(ele2).parent().toggle();
			});
			$(document).on('click', function() {
				$(ele2).parent().hide();
			});
			$(document).on('click', ele2, function() {
				$(ele1).val($(this).html());
				$(ele1).attr('cn', $(this).attr('cn'));
			});
		},
		// 仿select并且传值--针对动态生成的元素--p标签
		sltLive: function(ele1, ele2) {
			$(document).on('click', ele1, function(event) {
				event.stopPropagation();
				event.preventDefault();
				$(ele2).parent().toggle();
			});
			$(document).on('click', function() {
				$(ele2).parent().hide();
			});
			$(document).on('click', ele2, function() {
				$(ele1).html($(this).html());
				// $(ele1).attr('cn', $(this).attr('cn'));
			});
		},
		// 仿select并且传值
		slt: function(ele1, ele2) {
			$(ele1).on('click', function(event) {
				event.stopPropagation();
				event.preventDefault();
				$(ele2).parent().toggle();
			});
			$(document).on('click', function() {
				$(ele2).parent().hide();
			});
			$(ele2).on('click', function() {
				$(ele1).html($(this).html());
			});
		},
		// 下拉菜单
		sel: function(ele0, ele2) {
			$(ele0).on('click', function(event) {
				event.stopPropagation();
				event.preventDefault();
				$(ele2).parent().toggle();
			});
			$(document).on('click', function() {
				$(ele2).parent().hide();
			});
		},
		//选项卡，针对动态生成的
		changeTabLive: function(eleOne, eleTwo, className) {
			$(document).on('click', eleOne, function() {
				$(this).addClass(className).siblings().removeClass(className);
				$(eleTwo).eq($(this).index()).show().siblings(eleTwo).hide();
			});
		},
		// 选项卡
		changeTab: function(eleOne, eleTwo, className) {
			$(eleOne).on('click', function() {
				$(this).addClass(className).siblings().removeClass(className);
				$(eleTwo).eq($(this).index()).show().siblings(eleTwo).hide();
			});
		},
		//选项卡,只做Tab添加样式
		justChangeTab: function(eleOne, className) {
			$(eleOne).on('click', function() {
				$(this).addClass(className).siblings(eleOne).removeClass(className);
			});
		},
		//发送验证码BUTTON倒计时
		setTime: function(obj, countdown, falsebgcolor, truebgcolor) {
			var timer = setInterval(function() {
				if (countdown === 0) {
					$(obj).attr('disabled', false);
					$(obj).html("获取验证码");
					$(obj).css({
						"background": falsebgcolor
					});
					clearInterval(timer);
				} else {
					$(obj).attr('disabled', true);
					$(obj).html(countdown + "s");
					$(obj).css({
						"background": truebgcolor
					});
					return countdown--;
				}
			}, 1000)
		},
		//剩余时间倒计时
		countDown: function(timeStamp, dom) {
			var timer = setInterval(function() {
				var hh = parseInt(timeStamp / 1000 / 60 / 60 % 24, 10), //计算剩余的小时数
				mm = parseInt(timeStamp / 1000 / 60 % 60, 10), //计算剩余的分钟数
				ss = parseInt(timeStamp / 1000 % 60, 10); //计算剩余的秒数
				hh = hh < 10 ? '0' + hh : hh;
				mm = mm < 10 ? '0' + mm : mm;
				ss = ss < 10 ? '0' + ss : ss;
				if (timeStamp === 0) {
					$(dom).html(00 + ":" + 00 + ":" + 00);
					clearInterval(timer);
				} else {
					$(dom).html(hh + ":" + mm + ":" + ss);
				}
				timeStamp -= 1000; //如果上面除以1000，这里则减1000
				return timeStamp;
			}, 1000);
		},
		//格式化日期
		timeFormate:function(timeStamp, sign) {
			var date = timeStamp.toString(10).length === 10 ? new Date(timeStamp * 1000) : new Date(timeStamp),
			year = date.getFullYear(),
			month = date.getMonth() + 1,
			day = date.getDate(),
			hour = date.getHours(),
			minute = date.getMinutes(),
			second = date.getSeconds(),
			formatNumber = function(n){
			  n = n.toString()
			  return n[1] ? n : '0' + n
			}			
			return [year, month, day].map(formatNumber).join(sign) + ' ' + [hour, minute, second].map(formatNumber).join(':')				
		},
		//限制输入框只能输入数字和固定位数小数
		checkNumber: function(obj) {
			obj.value = obj.value.replace(/[^\d.]/g, "") //清除“数字”和“.”以外的字符
			obj.value = obj.value.replace(/\.{2,}/g, ".") //只保留第一个. 清除多余的
			obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")
			obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d{8}).*$/, '$1$2.$3') //只能输入8个小数
			if (obj.value.indexOf(".") < 0 && obj.value != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
				obj.value = parseFloat(obj.value)
			}
		},
		//验证手机号
		isMobile: function(str) {
			//验证手机
			if (!str.match(/^[1][3,4,5,7,8][0-9]{9}$/)) {
				return false
			}
			return true
		}
	}
	_util.confirmModal()

})(window);
