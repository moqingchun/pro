$(function() {
	var shanghaizhui = {
		timer:null,
		traceCodeFlag: true,
		dataset: null,
		_currentdata: null,
		"zoomMap": 12,
		centerMap: null,
		"markers": [],
		"total": 0,
		"totalAttribute": [],
		"categoryAttribute": [],
		"showName": "nationwide",
		"showIcon": vary.showIcon,
		init: function() {
			this.getdata();
			this.display(this._currentdata);
			way.establish('container', this.zoomMap, this.centerMap);
			this.category();
			this.fnclick();
		},
		category: function(attribute) { //肉菜，中药，产品追溯
			let oThis = this;
			oThis.storageReset();
			oThis.enterprise();
			let nationwide = vary[oThis.showName];
			for (var i = 0; i < nationwide.length; i++) {
				if (nationwide[i][attribute] != 0) {
					let info =
						`
						<div class="custom-content-marker quickCheckMarker five">
							<div class="mapText">
								<div class="flex selfAdaption">
									<div class="left"></div>
									<p>
										<span>${nationwide[i].ENTP_NAME}</span>
										<span>企业地址:${nationwide[i].businessAddress}</span>
										<span>企业类型:${nationwide[i].enterpriseType}</span>
										<span>追&ensp;溯&ensp;码:${nationwide[i].traceabilityCode}</span>
										<span>追溯批次数据:${nationwide[i].traceabilityData}</span>										
									</p>
									<div class="right"></div>
								</div>
								<div class="selfAdaptionImg"><img src="img/mapText1.png"></div>
							</div>
						</div>
					`;
					way.infoWindow(nationwide[i], oThis.showIcon, attribute, info);
				}
			}
		},
		enterprise: function() { //企业数据初始化
			let oThis = this;
			var arrs = oThis.totalAttribute;
			let attribute = ["plantingEnterprises", "aquacultureEnterprises", "processingEnterprises",
				"distributionEnterprises",
				"shangChaoEnterprise", "farmProductMarket"
			];
			for (var i = 0; i < attribute.length; i++) {
				arrs[i] = 0;
			}
			let nationwide = vary[oThis.showName];
			for (var i = 0; i < nationwide.length; i++) {
				for (let j = 0; j < arrs.length; j++) {
					arrs[j] += parseInt(nationwide[i][attribute[j]]);
				}
			}
			$("#technologicalProcess>div").each(function(v, t) {
				if (v != 0) {
					$(t).children("p:last").text(arrs[v - 1] + "家")
				}
			});
		},
		fnSeries: function() {
			seriesData(this.centerMap, 10);
			if (vary.chart) {
				if (vary.chart.renderTo) {
					vary.chart.destroy();
				}
			}
		},
		storageReset: function() { //移除
			$(".addMarker").remove();
			map.remove(vary.storage);
			vary.storage = [];
			vary.arrs = [];
		},
		quickCheck: function() {
			let oThis = this;
			let quickCheck = vary.quickCheck;
			seriesData(this.centerMap, 13);
			for (let i = 0; i < quickCheck.length; i++) {
				let markerContent =
					`<div class="custom-content-marker quickCheckMarker">
						<div class="mapText">
							<div class="flex selfAdaption">
								<div class="left"></div>
								<p><span>${quickCheck[i].name}</span><span>${quickCheck[i].address}</span></p>
								<div class="right"></div>
							</div>
							<div class="selfAdaptionImg"><img src="img/mapText1.png"></div>
						</div>
						<div class="maplines">
							<div class="mapIcon">
								<span class="iconfont icon-shucai-"></span>
								<img src="img/marker.png">
							</div>
							<div class="water">
								<div class="water1"></div>
								<div class="water2"></div>
								<div class="water3"></div>
								<div class="water4"></div>
							</div>
						</div>
					</div>`;
				let lnglat = quickCheck[i].lnglat.split(",");
				way.addMarker([lnglat[0], lnglat[1]], markerContent, 1);
			}
		},
		fnclick: function() {
			let oThis = this;
			$("#technologicalProcess>div").click(function() { //流程
				let index = $(this).index();
				$(this).addClass("active").siblings().removeClass("active");
				if (oInfoWindow) {
					oInfoWindow.close();
				}
				switch (index) {
					case 0:
						oThis.category();
						seriesData(oThis.centerMap, oThis.zoomMap);
						break;
					case 1:
						oThis.category("plantingEnterprises");
						break;
					case 2:
						oThis.category("aquacultureEnterprises");
						break;
					case 3:
						oThis.category("processingEnterprises");
						break;
					case 4:
						oThis.category("distributionEnterprises");
						break;
					case 5:
						oThis.category("shangChaoEnterprise");
						break;
					case 6:
						oThis.category("farmProductMarket");
						break;
					default:
						break;
				}
				if (index) {
					oThis.fnSeries();
				}
			});

			$("#quickCheck").click(function() {
				if (oInfoWindow) {
					oInfoWindow.close();
				}
				$("#technologicalProcess .active").removeClass("active");
				oThis.storageReset();
				oThis.quickCheck();
			});

			$('.j_modalcancel').click(function() {
				$(this).parent().parent().hide();
			});
			$('.creditAnalysisTitle').click(function() {
				$('.creditModal').show();
				let radar = {
					"indicator": [{
							"name": "企业基础体系",
							"max": 600
						},
						{
							"name": "保障提升体系",
							"max": 600
						},
						{
							"name": "检验检测体系",
							"max": 600
						},
						{
							"name": "质量标准体系",
							"max": 600
						},
						{
							"name": "泛供应链体系",
							"max": 600
						}
					],
					"serias": [600, 600, 600, 600, 600, 600]
				}
				oThis._radar(echarts.init(document.getElementById('fiveSystem')), radar['indicator'], radar[
					'serias'
				])
			})
			$('#technologicalProcess>div').click(function() {
				let i = $(this).index();
				switch (i) {
					case 0:
						oThis._currentdata = oThis.dataset['all'];
						oThis.traceCodeFlag = true;
						break;
					case 1:
						oThis._currentdata = oThis.dataset['plantC'];
						oThis.traceCodeFlag = false;
						break;
					case 2:
						oThis._currentdata = oThis.dataset['breedC'];
						oThis.traceCodeFlag = false;
						break;
					case 3:
						oThis._currentdata = oThis.dataset['productC'];
						oThis.traceCodeFlag = false;
						break;
					case 4:
						oThis._currentdata = oThis.dataset['sendC'];
						oThis.traceCodeFlag = false;
						break;
					case 5:
						oThis._currentdata = oThis.dataset['superMarket'];
						oThis.traceCodeFlag = false;
						break;
					case 6:
						oThis._currentdata = oThis.dataset['farmC'];
						oThis.traceCodeFlag = false;
						break;
					default:
						break;
				}
				oThis.display(oThis._currentdata);
			});

			$(document).on('click', '#creditScoreRanking li', function() {
				var txt = $(this).find('.company').text();
				// oThis.modal(txt)
			})
		},
		modal: function(txt) {
			var str = '',
				max, average, arr = [],
				_self = this;
			_self._currentdata['top'].forEach(function(v, i) {
				arr.push(v['score']);
			})
			max = Math.max.apply(null, arr);
			average = Math.round(eval(arr.join("+")) / arr.length);
			_self._currentdata['top'].forEach(function(v, i) {
				if (v['name'] == txt) {
					$('.companyModal').show();
					$('.companyName').html(v['name']);
					$('.companyCode').html(v['codenum']);
					$('.companyIndustry').html(v['industry']);
					$('.companyPhone').html(v['phone']);
					$('.companyAddr').html(v['address']);
					for (var i = 0; i < v['level']; i++) {
						str += '<img src="img/credit-min.png" >'
					}
					$('.creditlevel').html(str);
					$('.creditscore').html(v['score']);
					if (eval(v['score'] - v['lastscore']) >= 0) {
						$('.creditupdown').addClass('up').removeClass('down');
					} else {
						$('.creditupdown').addClass('down').removeClass('up');
					}
					$('.creditrate').html(Math.round(Math.abs(v['score'] - v['lastscore']) / v['lastscore'] * 100) + '%');
					$('.creditupdate').html(v['update']);
					$('.creditlastscore').html(v['lastscore']);
					$('.creditend').html(max);
					$('.creditcurrent').html(v['name'])
					$('.creditline').css('width', v['score'] / max * 100 + '%');
					$('.creditaverage').css('left', average / max * 590 - 10 + 'px')
					_self._modalechart(echarts.init(document.getElementById('creditEchart')), v['yeardata']['date'], v[
						'yeardata'][
						'score'
					]);
					_self._radar(echarts.init(document.getElementById('radarEchart')), v['radar']['indicator'], v['radar'][
						'serias'
					])
				}
			})
		},
		display: function(data) {
			var _self = this;
			$('#creditScoreRanking').remove();
			$('#companyCount').remove();
			$('#classCount').remove();
			
			//追溯码总数
			// localStorage.clear()
			if (_self.traceCodeFlag) {
				if(localStorage.getItem('traceCodeNum')){
					localStorage.setItem('traceCodeNum', parseInt(localStorage.getItem('traceCodeNum')) + Math.round(Math.random() *
						5))
					$("#dataNums").rollNum({
						deVal: localStorage.getItem('traceCodeNum')
					});
				}else{
					localStorage.setItem('traceCodeNum', parseInt(data['allclass']))
					$("#dataNums").rollNum({
						deVal: data['allclass']
					});
				}
				_self.timer = setInterval(function() {
					localStorage.setItem('traceCodeNum', parseInt(localStorage.getItem('traceCodeNum')) + Math.round(Math.random() *
						5))
					$("#dataNums").rollNum({
						deVal: localStorage.getItem('traceCodeNum')
					});
				}, 15000)
			}else{
				$("#dataNums").rollNum({
					deVal: data['allclass']
				});
				clearInterval(_self.timer);
			}

			//信用评分Top10企业
			var str = '<div class="creditScoreRanking" id="creditScoreRanking"><ul>';
			$.each(data['top'], function(i, v) {
				// 				if (i == 0) {
				// 					str +=
				// 						`<li><div class="num num1">${v['id']}</div><div class="company">${v['name']}</div><div class="score">${v['score']}</div></li>`;
				// 				} else if (i == 1) {
				// 					str +=
				// 						`<li><div class="num num2">${v['id']}</div><div class="company">${v['name']}</div><div class="score">${v['score']}</div></li>`;
				// 				} else if (i == 2) {
				// 					str +=
				// 						`<li><div class="num num3">${v['id']}</div><div class="company">${v['name']}</div><div class="score">${v['score']}</div></li>`;
				// 				} else {
				// 					str +=
				// 						`<li><div class="num">${v['id']}</div><div class="company">${v['name']}</div><div class="score">${v['score']}</div></li>`;
				// }
				str +=
					`<li><div class="company">${v['name']}</div></li>`;
			})
			str += '</ul></div>'
			$('.creditScoreRankingwrap').append(str)

			//最近一个月业态信用分折
			this.echart(echarts.init(document.getElementById('creditAnalysis')), data['monthbelieve']['date'], data[
				'monthbelieve'][
				'score'
			]);

			//快检服务
			var fastCheckChart = echarts.init(document.getElementById('fastChecko'));
			this._barEchart(fastCheckChart, data['fastCheck']['company'], data['fastCheck']['nopass'], data['fastCheck'][
				'pass'
			]);
			this.player(fastCheckChart);

			//近一个月追溯数据量变化
			this.echart(echarts.init(document.getElementById('dataChange')), data['monthdata']['date'], data['monthdata'][
				'score'
			]);
			//热门搜索品种
			var str1 = '',
				minJ, maxJ, resJ, arrayJ = [],
				minFont = 12,
				maxFont = 30;
			$.each(data['class'], function(i, v) {
				arrayJ.push(v[1])
			})
			minJ = Math.min.apply(null, arrayJ);
			maxJ = Math.max.apply(null, arrayJ);

			$.each(data['class'], function(i, v) {
				resJ = (v[1] - minJ) * (maxFont - minFont) / (maxJ - minJ) + minFont;
				str1 += `<a style="font-size:${resJ}px;">${v[0]}</a>`;
			})
			$('#searchClass').html(str1);
			tagcloud({
				selector: "#searchClass", //元素选择器
				fontsize: 20, //基本字体大小, 单位px
				radius: 95, //滚动半径, 单位px
				mspeed: "normal", //滚动最大速度, 取值: slow, normal(默认), fast
				ispeed: "normal", //滚动初速度, 取值: slow, normal(默认), fast
				direction: 135, //初始滚动方向, 取值角度(顺时针360): 0对应top, 90对应left, 135对应right-bottom(默认)...
				keep: false //鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动
			});

			//企业追溯数据量
			var str2 = '<div class="j_trace" id="companyCount"><ul>',
				arr = [],
				max;
			data['monthcompany'].forEach(function(i, v) {
				arr.push(i['count'])
			})
			max = Math.max.apply(null, arr);
			$.each(data['monthcompany'], function(i, v) {
				var rate = v['count'] / max * 100 + '%';
				str2 +=
					`<li><div class="name"><div class="eclip">${v['name']}</div><div class="tit">${v['name']}</div></div><div class="ratewrap"><div class="ratebg"><div class="rate" style="width:${rate};"></div></div></div><div class="count">${v['count']}w</div></li>`;
			})
			str2 += '</ul></div>'
			$('.companyCount').append(str2)

			//品种追溯数据量
			var str3 = '<div class="j_trace" id="classCount"><ul>',
				arr1 = [],
				max1;
			data['monthclass'].forEach(function(i, v) {
				arr1.push(i['count'])
			})
			max1 = Math.max.apply(null, arr1);
			$.each(data['monthclass'], function(i, v) {
				var rate = v['count'] / max1 * 100 + '%';
				str3 +=
					`<li><div class="name"><div class="eclip">${v['name']}</div><div class="tit">${v['name']}</div></div><div class="ratewrap"><div class="ratebg"><div class="rate" style="width:${rate};"></div></div></div><div class="count">${v['count']}w</div></li>`;
			})
			str3 += '</ul></div>'
			$('.classCount').append(str3);


			$('#creditScoreRanking').myScroll({
				speed: 30,
				rowHeight: 40
			});
			$('#companyCount').myScroll({
				speed: 30,
				rowHeight: 26
			});
			$('#classCount').myScroll({
				speed: 30,
				rowHeight: 26
			});

		},
		player: function(chartdom) {
			let fastCheckVideo = document.querySelector('#fastCheckVideo'),
				videoPlayBtn = document.querySelector('.videoPlayBtn'),
				videoMask = document.querySelector('.videoMask'),
				videoModal = document.querySelector('.videoModal'),
				_self = this;
			chartdom.on('click', function(pa) {
				let i = pa.dataIndex;
				fastCheckVideo.setAttribute('src', _self._currentdata['fastCheck']['video'][i]);
				videoModal.style.display = 'block';
				videoMask.style.display = 'none';
				fastCheckVideo.play();
			})
			$('.j_modalcancel').click(function(){
				fastCheckVideo.pause();
			})
		},
		getdata: function() {
			var self = this;
			$.ajax({
				url: 'data/j.json',
				dataType: 'json',
				type: 'get',
				async: false,
				success: function(data) {
					self.dataset = data;
					self._currentdata = data['all'];
				},
				error: function(xhr, type, errorThrown) {
					console.log(111)
				}
			});
			$.ajax({
				url: 'data/shanghai.json',
				dataType: 'json',
				type: 'get',
				async: false,
				success: function(data) {
					self.centerMap = data.shanghai.lnglat.split(",");
					vary.nationwide = data.shanghai.distribution;
					vary.quickCheck = data.shanghai.rapiddetection;
					let name = decodeURI(window.location.search.substr(1));
					let showIcon = name.split("&");
					vary.showIcon = showIcon[1];
				},
				error: function(xhr, type, errorThrown) {
					console.log(111)
				}
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
		echart: function(dom, data1, data2) {
			let _self = this;
			dom.setOption({
				backgroundColor: 'transparent',
				title: {

				},
				legend: {

				},
				grid: {
					show: false,
					left: 10,
					right: '4%',
					bottom: 10,
					top: '10%',
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
						color: '#7086ba'
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
						lineStyle: {
							color: '#555',
							type: 'dashed'
						}
					},
					formatter: ' {b}丨{c}',
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
		_barEchart: function(dom, comp, nopass, pass) {
			dom.setOption({
				backgroundColor: 'transparent',
				title: {

				},
				legend: {
					orient: 'vertical',
					left: 'right',
					top: 'middle',
					align: 'left',
					itemWidth: 10,
					itemHeight: 10,
					textStyle: {
						color: '#7086ba'
					}
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line',
						lineStyle: {
							color: '#555',
							type: 'dashed'
						}
					},
					backgroundColor: 'rgba(46,155,159,1)',
					textStyle: {
						color: '#fff'
					},
					confine: true
				},
				grid: {
					show: false,
					left: 10,
					right: '20%',
					bottom: 10,
					top: '10%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					boundaryGap: true,
					data: comp,
					axisLabel: {
						margin: 10,
						color: '#7086ba',
						rotate: 0,
						align: 'center',
						formatter: function(v) {
							return v.substr(0, 2)
						}
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
						show: false,
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
						color: '#7086ba'
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
				series: [{
						name: '不合格',
						type: 'bar',
						stack: '合格',
						data: nopass,
						barWidth: '18',
						itemStyle: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: 'rgba(21,111,255,1)'
								},
								{
									offset: 1,
									color: 'rgba(156,8,250,1)'
								}
							], false)
						}
					},
					{
						name: '合格',
						type: 'bar',
						stack: '合格',
						data: pass,
						barWidth: '18',
						itemStyle: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: 'rgba(18,254,169,1)'
								},
								{
									offset: 1,
									color: 'rgba(16,151,239,1)'
								}
							], false)
						}
					}
				]
			});
		},
		_radar: function(dom, data1, data2) {
			dom.setOption({
				// tooltip:{},
				radar: {
					indicator: data1,
					center: ['50%', '50%'],
					radius: '50%',
					startAngle: 90,
					splitNumber: 5,
					shape: 'polygon',
					name: {
						formatter: '{value}',
						color: '#999999'
					},
					axisLine: {
						lineStyle: {
							color: 'rgba(43, 81, 125, 1)'
						}
					},
					splitLine: {
						lineStyle: {
							color: 'rgba(43, 81, 125, 1)'
						}
					},
					splitArea: {
						areaStyle: {
							color: ['transparent', 'transparent']
						}
					}
				},
				series: [{
					name: '预算',
					type: 'radar',
					data: [{
						value: data2,
						name: '预算分配'
					}],
					itemStyle: {
						opacity: 0
					},
					lineStyle: {
						color: 'rgb(0,255,255)'
					},
					areaStyle: {
						color: '#0884a3'
					}
				}]
			})
		},
		_modalechart: function(doc, res1, res2) {
			doc.setOption({
				backgroundColor: 'transparent',
				title: {

				},
				legend: {

				},
				grid: {
					show: false,
					left: 10,
					right: '4%',
					bottom: 10,
					top: '10%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					boundaryGap: false,
					data: res1,
					axisLabel: {
						margin: 10,
						color: '#869bb4',
						rotate: 0,
						align: 'center'
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: '#143c6d'
						}
					},
					axisTick: {
						show: false
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: '#143c6d'
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
						color: '#869bb4'
					},

					axisTick: {
						show: false
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: '#143c6d'
						}
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: '#143c6d'
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
							color: '#ddd',
							type: 'dashed'
						}
					},
					formatter: ' {b}丨{c}',
					backgroundColor: 'rgba(72,187,249,.8)',
					textStyle: {
						color: '#fff'
					}
				},
				series: [{
					name: '',
					type: 'line',
					symbol: 'circle',
					showSymbol: true,
					stack: '总分',
					// smooth: true,
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
						color: "#fff",
						borderColor: "#fff",
						borderWidth: 2
					},
					lineStyle: {
						normal: {
							color: 'rgba(121,175,215,1)',
							width: 3
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
							], false),
							opacity: 0
						}
					},
					data: res2
				}]
			});
		}
	}
	shanghaizhui.init()
})
