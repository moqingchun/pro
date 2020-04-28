$(function() {
	var shanghaizhui = {
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
			this.fnclick();
		},
		fnclick: function() {
			let oThis = this;
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
						break;
					case 1:
						oThis._currentdata = oThis.dataset['plantC'];
						break;
					case 2:
						oThis._currentdata = oThis.dataset['breedC'];
						break;
					case 3:
						oThis._currentdata = oThis.dataset['productC'];
						break;
					case 4:
						oThis._currentdata = oThis.dataset['sendC'];
						break;
					case 5:
						oThis._currentdata = oThis.dataset['superMarket'];
						break;
					case 6:
						oThis._currentdata = oThis.dataset['farmC'];
						break;
					default:
						break;
				}
				oThis.display(oThis._currentdata);
			});

			// $(document).on('click', '#creditScoreRanking li', function() {
			// 	var txt = $(this).find('.company').text();
			// 	oThis.modal(txt)
			// })
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

			//信用评分Top10企业
			var str = '<div class="creditScoreRanking" id="creditScoreRanking"><ul>';
			$.each(data['top'], function(i, v) {
				if (i == 0) {
					str +=
						`<li><div class="company">${v['name']}</div></li>`;
				} else if (i == 1) {
					str +=
						`<li><div class="company">${v['name']}</div></li>`;
				} else if (i == 2) {
					str +=
						`<li><div class="company">${v['name']}</div></li>`;
				} else {
					str +=
						`<li><div class="company">${v['name']}</div></li>`;
				}
			})
			str += '</ul></div>'
			$('.creditScoreRankingwrap').append(str)
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
					`<li><div class="name">${v['name']}</div><div class="ratewrap"><div class="ratebg"><div class="rate" style="width:${rate};"></div></div></div><div class="count">${v['count']}w</div></li>`;
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
					`<li><div class="name">${v['name']}</div><div class="ratewrap"><div class="ratebg"><div class="rate" style="width:${rate};"></div></div></div><div class="count">${v['count']}w</div></li>`;
			})
			str3 += '</ul></div>'
			$('.classCount').append(str3);
		},
		player: function(chartdom) {
			let fastCheckVideo = document.querySelector('#fastCheckVideo'),
				videoPlayBtn = document.querySelector('.videoPlayBtn'),
				videoMask = document.querySelector('.videoMask'),
				videoModal = document.querySelector('.videoModal'),
				_self = this;
			chartdom.on('click', function(pa) {
				// console.log(pa);
				let i = pa.dataIndex;
				fastCheckVideo.setAttribute('src', _self._currentdata['fastCheck']['video'][i]);
				videoModal.style.display = 'block';
				videoMask.style.display = 'none';
				fastCheckVideo.play();
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
						// label: {
						//     backgroundColor: '#000',
						//     margin:25
						// },
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
