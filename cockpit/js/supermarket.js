$(function() {

	var _supermarket = {
		qrcodeObj: new QRCode("qrcodeJ", {
			width: 376,
			height: 376,
			colorDark: "#000000",
			colorLight: "#ffffff",
			correctLevel: QRCode.CorrectLevel.H
		}),
		mapLnglat: [],
		dataset: null,
		_currentdata: null,
		timer: null,
		ct: 0,
		init: function() {
			this.getdata();
			this.display(this._currentdata);
			this.setInterval();
			this.mapSet();
			this.triggerClick();
		},
		mapSet: function() {
			setMaps('container', 48, 0, 12, this.mapLnglat, "0d3989f3f60e8b286cc6107d58801daf");
			for (var i = 0; i < this.dataset.length; i++) {
				let markerContent =
					`
				<div class="shangChao">
					<div class="mapText">
						<div class="textColumn">
							<p><span clsaa="nameText">${this.dataset[i].name}</span><span>追溯批数总数：${this.dataset[i].turnCount}</span><span>追溯码总数：${this.dataset[i].traceCodeCount}</span><span></span></p>
						</div>
						<div class="jianColumn"><img src="img/mapText1.png"></div>
					</div>
					<div class="fang"><img src="img/fang.png"></div>
				</div>`;
				let lnglat = this.dataset[i].lnglat.split(",");
				_mapinit.addMarker(lnglat, markerContent);
			}
		},
		qrcodeFn: function(link) {
			let self = this;
			self.qrcodeObj.clear()
			self.qrcodeObj.makeCode(link)
		},
		triggerClick: function() {
			var self = this;
			$('.echartTitle').click(function() {
				link = $(this).attr('link');
				$('.j_modal').show();
				self.qrcodeFn(link);
			});
			$('.j_modalcancel').click(function() {
				$('.j_modal').hide();
			});
			$(document).on("click", ".shangChao", function() {
				let name = $(this).find("span").html();
				$.each(self.dataset, function(index, value) {
					if (value.name == name) {
						self._currentdata = value;
						self.display(value);
					}
				});
			});
			$(document).on("click", "#companyCount li", function() {
				var cn = $(this).attr('cn');
				self.echart('classPrice', self._currentdata['allClass'][cn]['echartData']['date'],
					self._currentdata['allClass'][cn]['echartData']['amount'], '元', self._currentdata['allClass'][cn]['animal'],
					self._currentdata['allClass'][self.ct]
					['link']
				);
			})
		},
		setInterval: function() {
			var self = this;
			self.timer = setInterval(function() {
				self.ct++;
				if (self.ct < self._currentdata['allClass'].length) {

				} else {
					self.ct = 0;
				}
				self.echart('classPrice', self._currentdata['allClass'][self.ct]['echartData']['date'],
					self._currentdata['allClass'][self.ct]['echartData']['amount'], '元', self._currentdata['allClass'][self.ct]
					['animal'], self._currentdata['allClass'][self.ct]
					['link']);
			}, 5000);
			$('#classPrice').hover(function() {
				clearInterval(self.timer)
			}, function() {
				self.timer = setInterval(function() {
					self.ct++;
					if (self.ct < self._currentdata['allClass'].length) {} else {
						self.ct = 0;
					}
					self.echart('classPrice', self._currentdata['allClass'][self.ct]['echartData']['date'],
						self._currentdata['allClass'][self.ct]['echartData']['amount'], '元', self._currentdata['allClass'][self.ct]
						['animal'], self._currentdata['allClass'][self.ct]
						['link']);
				}, 5000);
			});
		},
		display: function(data) {
			$('#companyCount').remove();

			//追溯品种总数
			$(".houseName").html(data['name']);
			$("#dataNums1").rollNum({
				deVal: data['turnCount']
			});
			$("#dataNums2").rollNum({
				deVal: data['traceCodeCount']
			});

			//近一个月追溯数据量变化
			this.echart('dataChange', data['monthData']['date'], data['monthData']['amount'],
				'W');

			//近一个月追溯数据量变化
			this.echart('classPrice', data['allClass'][0]['echartData']['date'], data[
				'allClass'][0]['echartData']['amount'], '元', data['allClass'][0]['animal'], data['allClass'][0]['link']);

			//品种追溯
			var str2 = '<div class="j_trace" id="companyCount"><ul>',
				arr = [],
				max;
			data['allClass'].forEach(function(i, v) {
				arr.push(i['changeAmount'])
			})
			max = Math.max.apply(null, arr);
			$.each(data['allClass'], function(i, v) {
				var rate = v['changeAmount'] / max * 100 + '%';
				str2 +=
					`<li cn=${i}><div class="name"><div class="eclip">${v['animal']}</div><div class="tit">${v['animal']}</div></div><div class="ratewrap"><div class="ratebg"><div class="rate" style="width:${rate};"></div></div></div><div class="count">${v['changeAmount']}w</div></li>`;
			})
			str2 += '</ul></div>'
			$('.companyCount').append(str2)
			$('#companyCount').myScroll({
				speed: 30,
				rowHeight: 26
			});

		},
		getDays: function(num) {
			let xData = [],
				now = new Date().getTime(),
				oneDay = 24 * 3600 * 1000,
				i;

			for (i = num; i > 0; i--) {
				xData.push(new Date(now - i * oneDay).getMonth() + 1 + '/' + new Date(now - i * oneDay).getDate())
			}
			xData.push(new Date(now).getMonth() + 1 + '/' + new Date(now).getDate());
			return xData;
		},
		echart: function(dom, data1, data2, unit, title, link) {
			let _self = this;
			$('.echartTitle').html(title).attr('link', link);
			echarts.init(document.getElementById(dom)).setOption({
				backgroundColor: 'transparent',
				title: {},
				legend: {

				},
				grid: {
					show: false,
					left: 10,
					right: '4%',
					bottom: 10,
					top: '20%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					boundaryGap: false,
					data: _self.getDays(9),
					axisLabel: {
						margin: 10,
						color: '#7086ba',
						rotate: 0,
						align: 'center'
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: '#32404e'
						}
					},
					axisTick: {
						show: false
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: '#32404e'
						}
					},
					splitArea: {
						show: false
					}
				}],
				yAxis: [{
					type: 'value',
					axisLabel: {
						margin: 10,
						color: '#7086ba',
						formatter: '{value}' + unit
					},

					axisTick: {
						show: false
					},
					splitLine: {
						show: false
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: '#32404e'
						}
					}
				}],
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line',
						// label: {
						//     backgroundColor: '#000',
						//     margin:25
						// },
						lineStyle: {
							color: '#555',
							type: 'dashed'
						}
					},
					formatter: ' {b}丨{c}' + unit,
					backgroundColor: 'rgba(46,155,159,1)',
					textStyle: {
						color: '#fff'
					}
				},
				series: [{
					name: '',
					type: 'line',
					symbol: 'circle',
					showSymbol: false,
					stack: '总量',
					smooth: true,
					label: {
						normal: {
							show: false,
							position: 'top',
							padding: [6, 6],
							backgroundColor: 'rgba(46,155,159,1)',
							borderRadius: 10,
							distance: 5,
							formatter: [
								' {a|{b}丨{c}}'
							].join(','),
							rich: {
								a: {
									color: '#fff',
									align: 'center'
								}
							}
						}
					},
					itemStyle: {
						color: "#9ca3ab",
						borderColor: "#9ca3ab",
						borderWidth: 2
					},
					lineStyle: {
						normal: {
							color: 'rgba(46,155,159,1)',
							width: 2
						}
					},

					areaStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: 'rgba(42,104,116,1)'
								},
								{
									offset: 1,
									color: 'rgba(0,0,0,1)'
								}
							], false)
						}
					},
					data: data2
				}]
			});
		},
		getdata: function() {
			var self = this;
			$.ajax({
				url: 'data/singlesupermarkets.json',
				dataType: 'json',
				type: 'get',
				async: false,
				success: function(data) {
					self.dataset = data;
					self._currentdata = data[0];
					self.mapLnglat = data[0].lnglat.split(",");
				},
				error: function(xhr, type, errorThrown) {
					console.log(errorThrown)
				}
			});
		}
	}
	_supermarket.init();
})
