var highId, oInfoWindow, echartsId;

var vary = {
	"mId": "b6868a0257583bdf6b3c600d84bff39c",
	"dataHome": null,
	"ifCES":[],
	"nationwide": [], //全国
	"meatvegetable": [], //肉菜
	"madicien": [], //中药
	"product": [], //产品追溯
	"showName": "meatvegetable",
	"showIcon": "shucai-",
	"storage": [],
	"arrs": [],
	"chart": null,
}
var way = {
	establish: function(id, zoomMap, centerMap) {
		setMaps(id, 48, 0, zoomMap, centerMap, "0d3989f3f60e8b286cc6107d58801daf");
	},
	addMarker: function(oPosition, markerContent, markers) { //实例化点标记
		let marker = new AMap.Marker({
			content: markerContent,
			position: oPosition,
			offset: new AMap.Pixel(-13, -30)
		});
		map.add(marker);
		if (markers == "1") {
			vary.storage.push(marker);
		}
	},
	infoWindow: function(name, className, attribute, info) { //实例化点标记
		let markerContent =
			'<div class="addMarker"><div class="mapName"><span></br></span></div><div class="mapIcon"><span class="iconfont icon-' +
			className +
			'"></span><img src="img/marker.png"></div></div>';
		let lnglat = name.lnglat.split(",");
		let marker = new AMap.Marker({
			content: markerContent,
			position: [lnglat[0], lnglat[1]],
			offset: new AMap.Pixel(-13, -30)
		});
		map.add(marker);
		marker.content = info;
		vary.storage.push(marker);
		marker.on('mouseover', way.markerOver);
		marker.on('mouseout', way.markerClose);
	},
	markerOver: function(e) { //信息
		oInfoWindow = new AMap.InfoWindow({
			isCustom: true, //使用自定义窗体
			offset: new AMap.Pixel(-5, -68),
		});
		oInfoWindow.setContent(e.target.content);
		oInfoWindow.open(map, e.target.getPosition());
	},
	markerClose: function() { //信息
		oInfoWindow.close();
	},
	pathSimplifier: function() {

	},
	establishColumn: function() { //实例化柱
		highId = document.getElementById("markerColumn");
		if (highId) {
			$(".mapText").addClass("textKeyframe");
			vary.chart = Highcharts.chart(highId, {
				chart: {
					type: 'column',
					options3d: {
						enabled: true,
						alpha: 30,
						beta: 55,
						depth: 50,
					},
					margin: [0, 0, 0, 0],
					spacing: [0, 0, 0, 0],
				},
				title: {
					text: null,
				},
				xAxis: {
					labels: {
						enabled: false,
					},
					visible: false,
				},
				tooltip: {
					enabled: false,
				},
				yAxis: {
					floor: 0,
					max: 10,
					labels: {
						enabled: false,
					},
					visible: false,
				},
				series: [{
					showInLegend: false,
					data: [{
						'color': 'rgba(3,66,212,0.7)',
						'y': 10,
					}],
				}]
			});
		}
	},
}
