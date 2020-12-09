/**
 * author:jack
 * 目录:
 * 下载文件
 * app适配
 * 整屏自适应缩放
 * 放大图片
 * 可输入可选择的输入框
 * 必填字段校验
 * 地图打点插件
 * loading插件
 * confirm弹框插件
 * alert提示框插件
 * 获取地址栏？后的参数
 * 发送验证码BUTTON倒计时
 * 剩余时间倒计时
 * 格式化日期
 * 限制输入框只能输入数字和固定位数小数
 * 验证手机号
 * 函数防抖和节流
 */
;
(function(win) {
	win._lbr = {
		//下载文件
		downLoad: function(url) {
			var elink = document.createElement('a')
			elink.style.display = 'none'
			elink.href = url
			document.body.appendChild(elink)
			elink.click()
			document.body.removeChild(elink)
		},
		//app适配,默认basePx
		adapt: function(basePx) {
			var base = basePx || 640;
			adaptfn()
			window.onresize = this.debounce(adaptfn, 600)

			function adaptfn() {
				var deviceWidth = document.documentElement.clientWidth;
				if (deviceWidth > base) deviceWidth = base;
				document.documentElement.style.fontSize = deviceWidth / (base / 100) + 'px';
			}
		},
		//整屏自适应缩放
		resetScreenSize: function(dw, dh) {
			var init = function() {
				var el = document.querySelector('body');
				var hScale = window.innerHeight / (dh || 1080);
				var wScale = window.innerWidth / (dw || 1920);
				// el.style.transform = 'scaleX(' + wScale + ') scaleY(' + hScale + ')'
				el.style.cssText = 'transform: scale(' + wScale + ');transform-origin:left top;backgroundSize: 100% 100%'
			}


			window.onresize = this.debounce(init, 600)
			init()
		},
		// 放大图片
		imgShow: function(src) {
			var that = this;
			var domId = "imgWrap" + new Date().getTime();
			var styleId = "style" + new Date().getTime();
			that.append({
				el: 'div',
				id: domId,
				className: 'imgWrap',
				node: '<img src="' + src + '"/>'
			})
			that.append({
				el: 'style',
				id: styleId,
				className: '',
				node: '@keyframes smallToBig{0%{transform: scale(0);}50%{transform: scale(1.5);}100%{transform: scale(1);}}@keyframes fadeIn{0%{opacity:0;}100%{opacity:1;}}@keyframes fadeOut{0%{opacity:1;}100%{opacity:0;}}.imgWrap{cursor:wait;position: fixed;top: 0;left: 0;background: rgba(0,0,0,.6);width: 100%;height: 100%;z-index: 9999;-webkit-animation: fadeIn .5s forwards;-o-animation: fadeIn .5s forwards;animation: fadeIn .5s forwards;overflow:auto;}.imgWrap img{position: absolute;margin: auto;left: 0;top: 0;right: 0;bottom: 0;-webkit-animation: smallToBig .5s forwards;-o-animation: smallToBig .5s forwards;animation: smallToBig .5s forwards;}.imgWrap.fadeOut{animation: fadeOut .5s forwards;}',
				wrap: that.QS('head')
			})
			that.QS('#' + domId).onclick = function(e) {
				var _self = this;
				this.className += ' fadeOut'
				setTimeout(function() {
					_self.remove();
					that.QS('#' + styleId).remove()
				}, 500)
			}
		},
		//设置样式，获取样式
		getAndSetStyle: function(ele, prop, val) {
			if (val) {
				// 设置值
				ele.style[prop] = val;
			} else {
				// 兼容ie8以下
				if (ele.currentStyle) {
					return ele.currentStyle[prop];
				}
				return window.getComputedStyle(ele)[prop];

			}
		},
		//可输入可选择的输入框
		inputSelect: function(dom, str) {
			var that = this;
			var html =
				'<input type="text" class="self_required" placeholder="请选择" required onkeyup="this.value = this.value.trim()"/><ul>' +
				str + '</ul><span>×</span>';
			that.append({
				el: 'div',
				className: 'inputSel',
				node: html,
				wrap: that.QS(dom)
			})
			that.append({
				el: 'style',
				node: '.inputSel{position: relative;width:100%;height:100%}.inputSel span{position: absolute;right: 6px;top: 0px;width: 14px;height: 100%;text-align: center;cursor: pointer;background: #fff;font-size: 18px;display: none}.inputSel input{width: 100%;height:100%;box-sizing: border-box;padding: 0 10px;outline: none;border: 1px solid #ddd;border-radius: 4px;}.inputSel ul{position: absolute;top: 105%;left: 0;width: 100%;background: #fff;z-index: 999;border: 1px solid #ccc;box-shadow: 0 0 6px #373333;display: none;max-height: 250px;overflow: auto;margin:0;padding:0;}.inputSel ul li{padding: 3px 20px;color: #777;cursor: pointer;list-style: none;}.inputSel ul li:hover{color: #333;background: #e1e3e9;}',
				wrap: that.QS('head')
			})
			document.addEventListener('click', function(e) {
				var e = e || window.event;
				e.stopPropagation();
				that.getAndSetStyle(that.QS(dom + ' ul'), 'display', 'none')
			})
			that.QS(dom + ' input').addEventListener('click', function(e) {
				var e = e || window.event;
				e.stopPropagation();
				if (that.getAndSetStyle(this.nextElementSibling, 'display') === 'none') {
					that.getAndSetStyle(this.nextElementSibling, 'display', 'block')
				} else {
					that.getAndSetStyle(this.nextElementSibling, 'display', 'none')
				}
			})

			that.QS(dom + ' ul').addEventListener('click', function(e) { //采用事件捕获，避免循环
				var e = e || window.event;
				if (e.target.tagName === 'LI') {
					this.previousElementSibling.value = e.target.innerHTML
					that.getAndSetStyle(this, 'display', 'none');
				}
			})
			that.QS(dom + ' input').oninput = that.QS(dom + ' input').onpropertychange = that.QS(dom + ' input').onfocus =
				function() {
					var val = this.value,
						childs = this.nextElementSibling.children;
					for (var i = 0; i < childs.length; i++) {
						childs[i].innerHTML.indexOf(val) === -1 ? that.getAndSetStyle(childs[i], 'display', 'none') : that.getAndSetStyle(
							childs[i], 'display', 'block')
					}
				}
			that.QS(dom + ' input').addEventListener('mouseover', function() {
				if (this.value) {
					that.getAndSetStyle(this.nextElementSibling.nextElementSibling, 'display', 'block')
				}
			})
			that.QS(dom + ' input').addEventListener('mouseout', function() {
				that.getAndSetStyle(this.nextElementSibling.nextElementSibling, 'display', 'none')
			})
			that.QS(dom + ' span').addEventListener('mouseover', function() {
				that.getAndSetStyle(this, 'display', 'block')
			})
			that.QS(dom + ' span').addEventListener('mouseout', function() {
				that.getAndSetStyle(this, 'display', 'none')
			})
			that.QS(dom + ' span').addEventListener('click', function() {
				this.previousElementSibling.previousElementSibling.value = ''
			})
		},
		//必填字段
		requiredTip: function(formID, domID) {
			var that = this,
				flag = true;
			var nodes = that.QSA(formID + ' ' + domID)
			that.QS(formID).style.position = 'relative';
			for (var i = 0; i < nodes.length; i++) {
				if (nodes[i].required && !nodes[i].value.trim()) {
					nodes[i].focus();
					that.messageBox({
						ele: formID
					});
					flag = false;
					return flag;
				}
			}
			return flag

		},
		//form表单必填项提示插件
		messageBox: function(options) {
			var that = this;
			var defaults = {
				ele: 'body',
				hideTime: 2000,
				message: '你有必填项未填写！'
			}
			for (var key in options) {
				if (options.hasOwnProperty(key)) {
					defaults[key] = options[key];
				}
			}
			var mdId = 'tip' + new Date().getTime(),
				styleId = 'style' + new Date().getTime();
			that.append({
				id: mdId,
				className: 'TIP',
				node: defaults.message,
				wrap: that.QS(defaults.ele)
			})
			that.append({
				el: 'style',
				id: styleId,
				node: '@keyframes fadeIn{0%{opacity:0}100%{opacity:1;}}@keyframes fadeOut{0%{opacity:1;}100%{opacity:0}}.TIP{width: 40%;height: 30px;line-height: 30px;text-align: center;background: rgba(255, 0, 0, 0.6);font-size: 16px;color: rgb(255, 255, 255);border-radius: 16px;position: absolute;margin:auto;top: 0;left: 0;right:0;bottom:0;z-index: 99999;animation: fadeIn .2s forwards;}.TIP.fadeOut{animation: fadeOut .2s forwards;}',
				wrap: that.QS('head')
			})
			setTimeout(function() {
				that.QS('#' + mdId).className += ' fadeOut'
			}, defaults.hideTime)
			setTimeout(function() {
				that.QS('#' + mdId).remove();
				that.QS('#' + styleId).remove();
			}, defaults.hideTime + 1000)
		},
		//地图打点插件
		Bmap: function(options) {
			var that = this;
			var defaults = {
				val: '北京市',
				provice: '北京市',
				city: '北京市',
				bmaplng: 116.404,
				bmaplat: 39.915,
				callback: function() {

				}
			}
			for (var key in options) {
				if (options.hasOwnProperty(key)) {
					defaults[key] = options[key];
				}
			}
			that.append({
				className: 'BMAP_MASK',
				node: '<div class="mask_dialog"><div class="mask_header"><span class="BMAP_CANCEL">&times;</span><div>地址设置</div></div><div class="mask_body"><div id="BMAP"></div><div id="BMAP_RES">点击地图或者输入：<input type="text" id="BMAP_INPUT" value="" lat="' +
					defaults.bmaplat + '" lng="' + defaults.bmaplng + '" province="' + defaults.provice + '" city="' + defaults.city +
					'"/><button class="BMAP_OK">确定</button></div><div id="BMAP_LIST" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div></div></div>'
			})
			that.append({
				el: 'style',
				className: 'BMAP_MASK',
				node: '@keyframes in{0%{margin-top:-30px}100%{margin-top:30px}}.BMAP_MASK{position:fixed;width:100%;height:100%;left:0;top:0;background:rgba(0,0,0,.5);z-index:1050;}.mask_dialog{width:80%;margin:30px auto;background:#fff;box-shadow: 0 5px 15px rgba(0,0,0,.5);border: 1px solid rgba(0,0,0,.2);border-radius: 6px;animation:in .2s forwards;}.mask_header{padding:15px;border-bottom: 1px solid #e5e5e5;font-size:18px;position:relative;}.mask_header span{font-size:30px;position:absolute;right:10px;top:5px;opacity:.2;cursor:pointer;}.mask_header span:hover{opacity:1;}.mask_body{font-size:16px;text-align:center;padding:15px;}.mask_body button{padding:4px 12px;border: 1px solid transparent;border-radius: 4px;background:#3c8dbc;color:#fff;}#BMAP {height: 300px;width: 100%;}#BMAP_RES {width: 100%;padding:10px 0;}#BMAP_INPUT{width: 30%;padding:4px;margin-right:10px;}.tangram-suggestion-main{z-index:9999;height: 400px;overflow-y: auto;}',
				wrap: that.QS('head')
			})
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
			that.QS('.BMAP_OK').addEventListener('click', function() {
				var addressRS = {
					addressRS: that.QS('#BMAP_INPUT').value,
					latRS: that.QS('#BMAP_INPUT').getAttribute('lat'),
					lngRS: that.QS('#BMAP_INPUT').getAttribute('lng'),
					province: that.QS('#BMAP_INPUT').getAttribute('province'),
					city: that.QS('#BMAP_INPUT').getAttribute('city')
				}
				defaults.callback(addressRS)
				that.QS('.BMAP_MASK').remove();
				// $('.tangram-suggestion-main').remove()
			})
			that.QS('.BMAP_CANCEL').addEventListener('click', function() {
				that.QS('.BMAP_MASK').remove();
				// $('.tangram-suggestion-main').remove()
			})
		},

		//loading插件
		loading: function(pa) {
			var that = this;
			if (pa === 'hide') {
				that.QS('.ajax_loading').remove();
				that.QS('.loading_stl').remove();
			} else if (pa === 'show' || !pa) {
				that.append({
					className: 'ajax_loading',
					node: '<img src="../../../images/load.gif"/>'
				})
				that.append({
					el: 'style',
					className: 'loading_stl',
					node: '.ajax_loading{position:fixed;width:100%;height:100%;left:0;top:0;background:rgba(255,255,255,0);z-index:1050;}.ajax_loading img{position:absolute;margin:auto;left:0;top:0;right:0;bottom:0;}',
					wrap: that.QS('head')
				})
			}

		},

		//confirm弹框插件 #FAAD14
		confirmModal: function(options) {
			var that = this
			var defaults = {
				title: '操作提示',
				hideCancel: false,
				message: '删除后不可恢复',
				callback: function() {}
			}
			for (var key in options) {
				if (options.hasOwnProperty(key)) {
					defaults[key] = options[key];
				}
			}
			var mdId = 'Mask' + new Date().getTime(),
				styleId = 'style' + new Date().getTime();
			var html = '<div class="mask_dialog"><div class="mask_header">' + defaults.title +
				'</div><div class="mask_body">' + defaults.message + '</div><div class="mask_footer">';
			html += defaults.hideCancel ? '' : '<button type="button" class="cancel">取消</button>';
			html += '<button type="button" class="ok">确定</button></div></div>';
			that.append({
				id: mdId,
				className: 'mask',
				node: html
			})
			that.append({
				el: 'style',
				id: styleId,
				node: '@keyframes in{0%{opacity:0;}100%{opacity:1;}}@keyframes out{0%{opacity:1;}100%{opacity:0;}}.mask{position:fixed;width:100%;height:100%;left:0;top:0;background:rgba(255,255,255,0);z-index:1050;animation:in .2s forwards;}.mask_dialog{width:400px;height:174px;position:absolute;margin:auto;top:0;left:0;right:0;bottom:0;background:#fff;box-shadow: 0 5px 15px rgba(0,0,0,.5);border-radius: 6px;}.mask.out{animation:out .2s forwards;}.mask_header{padding:30px 30px 0;font-size:16px;position:relative;text-indent:50px;}.mask_header::after{content:"!";width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;background:#FAAD14;color:#fff;position:absolute;top:25px;left:28px;text-indent:0;}.mask_body{font-size:16px;padding:10px 30px 0;color:rgba(0,0,0,.5);text-indent:50px;}.mask_footer{padding: 30px 20px 0;text-align: right;}.mask_footer button{padding:6px 20px;border-radius: 4px;background:transparent;}.mask_footer .cancel{border: 1px solid #ccc;margin-right:10px;}.mask_footer .ok{border: 1px solid #F5222D;color:#F5222D;}.mask_footer .cancel:hover{box-shadow:0 0 5px #000;}.mask_footer .ok:hover{box-shadow:0 0 5px #F5222D;}',
				wrap: that.QS('head')
			})
			that.QS('#' + mdId + " .ok").addEventListener('click', function() {
				defaults.callback();
				that.QS('#' + mdId).className += ' out'
				setTimeout(function() {
					that.QS('#' + mdId).remove()
					that.QS('#' + styleId).remove()
				}, 1000)
			})
			that.QS('#' + mdId + " .cancel").addEventListener('click', function() {
				that.QS('#' + mdId).className += ' out'
				setTimeout(function() {
					that.QS('#' + mdId).remove()
					that.QS('#' + styleId).remove()
				}, 1000)
			})
			that.QS('#' + mdId + " .mask_dialog").addEventListener('click', function(e) {
				var e = e || window.event
				e.stopPropagation()
			})
			that.QS('#' + mdId).addEventListener('click', function() {
				that.QS('#' + mdId).className += ' out'
				setTimeout(function() {
					that.QS('#' + mdId).remove()
					that.QS('#' + styleId).remove()
				}, 1000)
			})
		},
		//alert提示框插件
		tipBox: function(options) {
			var that = this;
			var defaults = {
				hideTime: 2000,
				message: '操作成功!'
			}
			for (var key in options) {
				if (options.hasOwnProperty(key)) {
					defaults[key] = options[key];
				}
			}
			var mdId = 'tip' + new Date().getTime(),
				styleId = 'style' + new Date().getTime();
			that.append({
				id: mdId,
				className: 'TIP',
				node: defaults.message + '<span>&times;</span>'
			})
			that.append({
				el: 'style',
				id: styleId,
				node: '@keyframes fromTop{0%{top:-50px;}100%{top:0;}}@keyframes toTop{0%{top:0px;}100%{top:-50px;}}.TIP{width: 600px;line-height: 50px;text-align: center;background: rgba(51, 122, 183, 0.9);font-size: 16px;color: rgb(255, 255, 255);border-bottom-right-radius: 16px;border-bottom-left-radius: 16px;position: fixed;top: -50px;left: 50%;margin-left: -300px;z-index: 99999;animation: fromTop .2s forwards;}.TIP.toTop{animation: toTop .2s forwards;}.TIP span{font-size: 26px;color: rgb(255, 255, 255);position: absolute;top: 0px;right: 14px;cursor: pointer;}',
				wrap: that.QS('head')
			})
			setTimeout(function() {
				that.QS('#' + mdId).className += ' toTop'
			}, defaults.hideTime)
			setTimeout(function() {
				that.QS('#' + mdId).remove()
				that.QS('#' + styleId).remove()
			}, defaults.hideTime + 1000)
			that.QS('#' + mdId).children[0].addEventListener('click', function() {
				that.QS('#' + mdId).className += ' toTop'
			})

		},
		// 获取地址栏？后的参数
		getQueryString: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) {
				return unescape(r[2]);
			}
			return null;
		},
		//发送验证码BUTTON倒计时
		setTime: function(obj, countdown, falsebgcolor, truebgcolor) {
			var that = this;
			var timer = setInterval(function() {
				if (countdown === 0) {
					that.QS(obj).disabled = false;
					that.QS(obj).innerHTML = '获取验证码'
					that.QS(obj).style.cssText = 'background:' + falsebgcolor
					clearInterval(timer);
				} else {
					that.QS(obj).disabled = true;
					that.QS(obj).innerHTML = countdown + 's'
					that.QS(obj).style.cssText = 'background:' + truebgcolor
					return countdown--;
				}
			}, 100)
		},
		//剩余时间倒计时
		countDown: function(timeStamp, dom) {
			var that = this;
			var timer = setInterval(function() {
				var hh = parseInt(timeStamp / 1000 / 60 / 60 % 24, 10), //计算剩余的小时数
					mm = parseInt(timeStamp / 1000 / 60 % 60, 10), //计算剩余的分钟数
					ss = parseInt(timeStamp / 1000 % 60, 10); //计算剩余的秒数
				hh = hh < 10 ? '0' + hh : hh;
				mm = mm < 10 ? '0' + mm : mm;
				ss = ss < 10 ? '0' + ss : ss;
				if (timeStamp === 0) {
					that.QS(dom).innerHTML = 00 + ":" + 00 + ":" + 00;
					clearInterval(timer);
				} else {
					that.QS(dom).innerHTML = hh + ":" + mm + ":" + ss;
				}
				timeStamp -= 1000; //如果上面除以1000，这里则减1000
				return timeStamp;
			}, 1000);
		},
		//格式化日期
		timeFormate: function(timeStamp, sign) {
			var date = timeStamp.toString(10).length === 10 ? new Date(timeStamp * 1000) : new Date(timeStamp),
				year = date.getFullYear(),
				month = date.getMonth() + 1,
				day = date.getDate(),
				hour = date.getHours(),
				minute = date.getMinutes(),
				second = date.getSeconds(),
				formatNumber = function(n) {
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
		},
		//寻找dom
		QS: function(a) {
			return document.querySelector(a);
		},
		QSA: function(a) {
			return document.querySelectorAll(a);
		},
		//向dom添加元素
		append: function(op) {
			var that = this;
			var defaults = {
				el: 'div',
				id: '',
				className: '',
				node: '',
				wrap: that.QS('body')
			}
			for (var key in op) {
				if (op.hasOwnProperty(key)) {
					defaults[key] = op[key];
				}
			}
			var el = document.createElement(defaults.el);
			el.id = defaults.id;
			el.className = defaults.className;
			el.innerHTML = defaults.node;
			defaults.wrap.appendChild(el);
		},
		/**
		 * @desc 函数防抖
		 * @param func 函数
		 * @param wait 延迟执行毫秒数
		 * @param immediate true 表立即执行，false 表非立即执行
		 */
		debounce: function(func, wait, immediate) {
			var timeout;

			return function() {
				var context = this;
				var args = arguments;

				if (timeout) clearTimeout(timeout);
				if (immediate) {
					var callNow = !timeout;
					timeout = setTimeout(() => {
						timeout = null;
					}, wait)
					if (callNow) func.apply(context, args)
				} else {
					timeout = setTimeout(function() {
						func.apply(context, args)
					}, wait);
				}
			}
		},
		/**
		 * @desc 函数节流
		 * @param func 函数
		 * @param wait 延迟执行毫秒数
		 * @param type 1 表时间戳版立即执行一次，2 表定时器版不会立即执行一次
		 */
		throttle: function(func, wait, type) {
			if (type === 1) {
				var previous = 0;
			} else if (type === 2) {
				var timeout;
			}
			return function() {
				var context = this;
				var args = arguments;
				if (type === 1) {
					var now = Date.now();

					if (now - previous > wait) {
						func.apply(context, args);
						previous = now;
					}
				} else if (type === 2) {
					if (!timeout) {
						timeout = setTimeout(() => {
							timeout = null;
							func.apply(context, args)
						}, wait)
					}
				}
			}
		}
	}

})(window);
