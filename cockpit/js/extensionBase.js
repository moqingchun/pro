var extensionBase = {
	"zoomMap": 8,
	"centerMap": [121.472644, 31.231706],
	"index": 0,
	"allData": [], //省份
	"provincelnglat": "", //省份坐标
	"base": [], //基地
	"varieties": [], //品种
	"singleVarieties": [], //单个品种
	"quantitativeTrends": [], //近一个月数量变化趋势
	"trends": [], //近一个月价格变化趋势
	"inventoryDetails": [], //基地库存详情
	init: function() {
		this.ajaxData();
	},
	ajaxData: function() {
		let oThis = this;
		$.get("data/extensionBase.json", function(data) {
			let max = data.shanghai.addBase.length - 1;
			let min = 0;
			let index = parseInt(Math.random() * (max - min + 1) + min, 10);
			oThis.base = data.shanghai.addBase[index];
			oThis.province = data.shanghai.addBase;
			oThis.allData = data.shanghai;
			oThis.allBase();
			oThis.generate();
		});
	},
	allBase: function() {
		let oThis = this;
		let allBase = oThis.allData.addBase;
		var chinaDatas = [];
		var chinaGeoCoordMap = {};
		chinaGeoCoordMap[oThis.allData.province] = oThis.centerMap;
		for (let i = 0; i < allBase.length; i++) {
			let name = allBase[i].basename;
			let lnglat = allBase[i].lnglat.split(",");
			chinaGeoCoordMap[name] = [lnglat[0], lnglat[1]];
			chinaDatas.push([{
				"name": allBase[i].basename,
				"marketColor": allBase[i].marketColor,
				"baseColor": allBase[i].baseColor,
				"value": Math.floor(Math.random() * 1) + 1
			}]);
		}
		var convertData = function(data) {
			var res = [];
			for (var i = 0; i < data.length; i++) {
				var dataItem = data[i];
				var fromCoord = chinaGeoCoordMap[dataItem[0].name];
				var toCoord = oThis.centerMap;
				if (fromCoord && toCoord) {
					res.push([{
						"name": dataItem[0].name,
						"coord": fromCoord,
						"marketColor": allBase[i].marketColor,
						"value": dataItem[0].value
					}, {
						"coord": toCoord,
					}]);
				}
			}
			return res;
		};
		var series = [];
		[
			[oThis.allData.province, chinaDatas]
		].forEach(function(item, i) {
			series.push({
				type: 'lines',
				zlevel: 2,
				coordinateSystem: 'amap',
				effect: {
					show: true,
					period: 4,
					trailLength: 0.05,
					symbol: 'arrow',
					symbolSize: 8,
				},
				lineStyle: {
					normal: {
						// color: '#01e8e8',
						color: function(params) {
							let num = params.data.marketColor;
							if (num == "1") {
								return '#01e8e8';
							} else if (num == "2") {
								return '#0c64eb';
							} else {
								return '#ff5d5d';
							}
						},
						width: 1,
						opacity: 1,
						curveness: .3
					}
				},
				data: convertData(item[1])
			}, {
				type: 'effectScatter',
				coordinateSystem: 'amap',
				zlevel: 2,
				rippleEffect: {
					brushType: 'fill',
				},
				symbol: 'circle',
				symbolSize: function(val) {
					return 5 + val[2] * 5; //圆环大小
				},
				itemStyle: {
					normal: {
						show: false,
						// color: '#ffffff',
						color: function(params) {
							let num = params.data.baseColor;
							if (num == "1") {
								return '#01e8e8'; //西郊国际
							} else if (num == "2") {
								return '#ffffff'; //上农批
							} else {
								return '#ff5d5d';
							}
						},
						borderColor: '#0d60ca',
						borderWidth: 2,
						shadowBlur: 10,
						shadowColor: '#52a19f',
					}
				},
				data: item[1].map(function(dataItem) {
					return {
						"name": dataItem[0].name,
						"value": chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value]),
						"baseColor": dataItem[0].baseColor,
					};
				}),
			}, {
				type: 'scatter',
				coordinateSystem: 'amap',
				zlevel: 2,
				rippleEffect: {
					period: 4,
					brushType: 'stroke',
					scale: 4
				},
				label: {
					normal: {
						show: true,
						position: 'right',
						color: '#d1d2d3',
						formatter: '{b}',
						fontSize: 16,
						borderColor: 'auto',
					},
				},
				symbol: 'pin',
				symbolSize: 40,
				itemStyle: {
					normal: {
						color: '#ffffff',
						borderColor: '#0d60ca',
						borderWidth: 4,
						shadowBlur: 10,
						shadowColor: '#52a19f',
					}
				},
				data: [{
					name: item[0],
					value: chinaGeoCoordMap[item[0]].concat([10]),
				}],
			});
		});
		let amapItem = {
			id: "container",
			centerMap: [121.357850, 31.999008],
			zoomMap: oThis.zoomMap,
			mapStyle: "0d3989f3f60e8b286cc6107d58801daf",
			vMode: "",
			pitch: 18,
			oParams: function(params) {
				//1 =产销对接型 2=精准扶贫型
				let baseColor = ""; //点
				let marketColor = ""; //线
				if (params.data.marketColor == "2" && params.data.baseColor == undefined) {
					marketColor = "-->上农批";
				} else if (params.data.marketColor == "1" && params.data.baseColor == undefined) {
					baseColor = "-->西郊国际";
				}
				if (params.data.baseColor == "2" && params.data.marketColor == undefined) {
					baseColor = "(精准扶贫型)";
				} else if (params.data.baseColor == "1" && params.data.marketColor == undefined) {
					baseColor = "(产销对接型)";
				}
				let name = params.data.name + baseColor + marketColor;
				let str = `<div class="mapParams"><span>${name}->${baseColor}</span></div>`;
				return name;
			},
			series: series,
		}
		echartsAmap(amapItem);
		//baseTotal外延基地总数
		let str =
			`<span>${allBase.length}</span><span>4</span><span>3</span><span>37</span><span>14</span><span>5</span><span>1</span><span>1</span>`;
		$("#baseTotal").append(str);
	},
	generate: function() {
		let oThis = this;
		let base = this.base;
		let productClock = this.base.productClock;
		$("#baseTitle").text(base.basename);
		let varieties0 = []; //全部
		let varieties1 = []; //指定
		$.each(productClock, function(i, v) {
			let given = v.given;
			if (given == 1) {
				varieties1.push(v);
			} else {
				varieties0.push(v);
			}
		});
		//品种数据
		if (varieties1.length > 4) {
			oThis.sortNumber(varieties1);
			oThis.singleVarieties = varieties1;
		} else {
			oThis.sortNumber(varieties1);
			oThis.sortNumber(varieties0);
			let addVarietie = varieties1.concat(varieties0);
			oThis.singleVarieties = addVarietie;
		}
		oThis.interactive();
		oThis.createVarieties();
		oThis.fnClick();
	},
	interactive: function() { //点击切换数据
		let oThis = this;
		let quantitativeTrends = oThis.singleVarieties[oThis.index].quantitativeTrends;
		let trends = oThis.singleVarieties[oThis.index].trends;
		oThis.chartData("numberTrend", quantitativeTrends);
		oThis.chartData("priceTrend", trends);
		oThis.createBase();
	},
	createVarieties: function() { //品种生成
		let oThis = this;
		let strVarieties = "";
		let singleVarieties = oThis.singleVarieties;
		let num = 5;
		if (singleVarieties.length < 5) {
			num = singleVarieties.length;
		}
		for (let i = 0; i < num; i++) {
			let className = "";
			if (i == oThis.index) {
				className = "active";
			}
			strVarieties +=
				`<li class="${className}"><img src="img/varieties/${singleVarieties[i].img}"><span>${singleVarieties[i].name}</span></li>`;
		}
		$("#varieties").html(strVarieties);
	},
	createBase: function() { //基地库存详情生成
		let oThis = this;
		let strBase = "";
		let aBase = oThis.singleVarieties[oThis.index].inventoryDetails;
		for (let i = 0; i < aBase.length; i++) {
			strBase +=
				`<li><span>${aBase[i].name}</span><span>${aBase[i].number}kg</span><span>${aBase[i].time}</span></li>`;
		}
		$("#baseDetails ul").css("margin-top", 0);
		$("#baseDetails ul").html(strBase);
		if (intId) {
			fnSetInterval($('#baseDetails'), 26, 40)
		} else {
			$('#baseDetails').myScroll({
				rowHeight: 33
			});
		}
	},
	chartData: function(id, all) {
		let oThis = this;
		let xAxisData = [];
		let seriesData = [];
		let seriesMaxData = [];
		for (let i = 0; i < all.length; i++) {
			xAxisData.push(all[i].xAxisData);
			seriesData.push(all[i].seriesData);
		}
		let oMax = Math.max.apply(null, seriesData);
		for (let i = 0; i < all.length; i++) {
			seriesMaxData.push(oMax);
		}
		oThis.echart(id, xAxisData, seriesData, seriesMaxData);
	},
	echart: function(id, xAxisData, seriesData, seriesMaxData) {
		let company = "";
		if (id == "priceTrend") {
			company = "￥";
		}
		var dom = document.getElementById(id);
		var myChart = echarts.init(dom);
		let option = {
			title: {},
			tooltip: {
				trigger: 'axis',
				padding: 0,
				axisPointer: {
					type: 'none',
				},
				formatter: function(pa) {
					let str =
						`<div class="formatter"><span>${pa[1].name}</span><span class="xian">|</span><span>${pa[1].value}${company}</span></div>`;
					return str;
				}
			},
			grid: {
				show: false,
				left: 10,
				right: '7%',
				bottom: 1,
				top: '20%',
				containLabel: true
			},
			xAxis: [{
				boundaryGap: false,
				data: xAxisData,
				axisLabel: {
					interval: 0,
					color: '#87a0dc',
					rotate: 20,
					align: 'center',
					verticalAlign: 'top',
				},
			}],
			yAxis: [{
				type: 'value',
				axisLabel: {
					margin: 20,
					color: '#87a0dc',
					formatter: '{value}' + company
				},
				axisTick: {
					show: false
				},
				splitLine: {
					show: false,
				},
				axisLine: {
					show: false,
				}
			}],
			series: [{
				name: '',
				type: 'bar',
				data: seriesMaxData,
				barWidth: '15',
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(9,20,37,1)'
						},
						{
							offset: 1,
							color: 'rgba(54,65,79,1)'
						}
					], false)
				}
			}, {
				name: '',
				type: 'line',
				showSymbol: true,
				smooth: true,
				itemStyle: {
					color: 'rgba(13,236,240,.9)',
					borderColor: 'rgba(11,136,147,1)',
					borderWidth: 2
				},
				lineStyle: {
					normal: {
						width: 3,
						shadowColor: 'rgba(11,136,147,1)',
						shadowBlur: 10,
						shadowOffsetY: 1
					}
				},
				data: seriesData
			}]
		};
		if (option && typeof option === "object") {
			myChart.setOption(option, true);
		}
	},
	sortNumber: function(all) {
		all.sort(function(a, b) {
			return a.home < b.home ? 1 : -1;
		});
	},
	fnClick: function() {
		let oThis = this;
		$(document).on("click", "#varieties li", function() { //品种切换
			$(this).addClass("active").siblings().removeClass("active");
			oThis.index = $(this).index();
			oThis.interactive();
		});
		echartsId.on('click', 'series.effectScatter.label', function(params) {
			oThis.markerClick(params.data.name);
		});
	},
	markerClick: function(name) {
		let oThis = extensionBase;
		let province = oThis.province;
		for (let i = 0; i < province.length; i++) {
			if (province[i].basename == name) {
				oThis.index = 0;
				oThis.base = province[i];
				oThis.generate();
			}
		}
	}
}
extensionBase.init();
