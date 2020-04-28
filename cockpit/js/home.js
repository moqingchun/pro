fnAjax();


function fnAjax() {
	$.get("data/home.json", function(data, status) {
		vary.meatvegetable = data.meatVege;
		vary.madicien = data.madicien;
		vary.product = data.product;
		let sumData = [];
		sumData = sumData.concat(vary.meatvegetable).concat(vary.madicien).concat(vary.product);
		vary.nationwide = sumData;
		vary.dataHome = data;
		if (data.theServer) {
			vary.onLine = data.theServer.onLine; //在线
			vary.dataUpload = data.theServer.dataUpload; //数据上传
		}
		if (vary.nationwide.length > 0) {
			homeObj.init();
		}
	});
}
var homeObj = {
	"zoomMap": 6,
	"centerMap": [106.504962, 29.533155],
	"timer1": null,
	"timer2": null,
	"timer3": null,
	"oIndex": 1,
	"onOff": 1,
	"categoryIndex": 0,
	"markers": [],
	"total": 0,
	"totalAttribute": [],
	"categoryAttribute": [],
	"showName": "meatvegetable",
	"showIcon": "shucai-",
	"yesCES": [], //是中信
	"noCES": [], //不是中信
	init: function() {
		way.establish('container', this.zoomMap, this.centerMap);
		this.theServer();
		this.category(); //初始化肉菜
		this.dataRollNum(); //初始化容量总量
		this.fnclick();
	},
	theServer: function() { //服务器和品类数据初始化
		let oThis = this;
		oThis.categoryAttribute = ["meatvegetable", "madicien", "product"];
		$("#category>div").each(function(v, t) {
			let obj = vary[oThis.categoryAttribute[v]];
			let index = 0;
			for (let k in obj) {
				if (obj[k].ifCES == "1") {
					index++;
				}
			}
			$(t).children("span:nth-child(2)").text(index);
		});
		oThis.enterprise();
	},
	category: function(attribute) { //肉菜，中药，产品追溯
		let oThis = this;
		oThis.storageReset();
		let nationwide = vary[oThis.showName];
		for (var i = 0; i < nationwide.length; i++) {
			if (nationwide[i][attribute] != 0) {
				oThis.markerContent(nationwide[i], oThis.showIcon, attribute, nationwide[i].ifCES);
			}
		}
		oThis.fnTimeout();
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
				let attributes = nationwide[i][attribute[j]];
				if (attributes != 0 && attributes != "") {
					arrs[j] += parseInt(attributes);
				}
			}
		}
		$("#technologicalProcess>div").each(function(v, t) {
			if (v != 0) {
				$(t).children("p:last-child").text(arrs[v - 1] + "家")
			}
		});
	},
	dataRollNum: function() { //数据容量总量
		let oThis = this;
		let dataCapacity = vary.dataHome.dataCapacity;
		let dataTotal = vary.dataHome.dataTotal;
		let capacity = localStorage.getItem("dataCapacity");
		let total = localStorage.getItem("dataTotal");
		if (capacity) {
			oThis.fnInterval("#dataCapacity", capacity);
			oThis.fnInterval("#dataTotal", total);
		} else {
			oThis.fnInterval("#dataCapacity", dataCapacity);
			oThis.fnInterval("#dataTotal", dataTotal);
			localStorage.setItem("dataCapacity", dataCapacity);
			localStorage.setItem("dataTotal", dataTotal);
		}
		let max = 0.5;
		let min = 0.1;
		oThis.timer3 = setInterval(function() {
			let oRandom = Math.random() * (max - min) + min;
			let oToFixed = oRandom.toFixed(1);
			let capacity = localStorage.getItem("dataCapacity");
			let total = localStorage.getItem("dataTotal");
			capacity =  Math.ceil(capacity)+Number(oToFixed);
			total =  Math.ceil(total)+Number(oToFixed);
			localStorage.setItem("dataCapacity", capacity);
			localStorage.setItem("dataTotal", total);
			// console.log(capacity,total,oToFixed);
			oThis.fnInterval("#dataCapacity", capacity);
			oThis.fnInterval("#dataTotal", total);
		}, 15000);
	},
	fnInterval: function(id, dataCapacity) {
		$(id).rollNum({ //数据容量(T)
			deVal: dataCapacity
		});
	},
	markerContent: function(name, className, attribute, ifCES) {
		let oThis = this;
		let infoWindow = "";
		if (attribute) {
			infoWindow = name[attribute] + '家';
		}
		let spot = "offline";
		let oInfo = '';
		if (name.traceabilityEnterprise != "" && attribute == undefined) {
			oInfo =
				`<div class="oInfo homeInfo"><div class="mapText"><div class="textColumn"><p><span class="infoSpan1">${name["name"] + infoWindow}</span><span>企业数量：</span><span>${name.traceabilityEnterprise}</span></p></div><div class="jianColumn"><img src="img/mapText1.png"></div></div></div>`;
			oThis.yesCES.push(name);
		}
		if (ifCES == "1") {
			spot = "dataUpload";
		}
		let markerContent =
			`<div class="addMarker">
				<div class="mapName">
					<span class="oName">${name["name"] + infoWindow}</span>
					${oInfo}
				</div>
				<div class="mapIcon">
					<span class="iconfont icon-${className}"></span>
					<img src="img/marker.png">
				</div>
			</div>
			<div class="amap-marker-content">
				<div class="serverSpot ${spot}">
					<div class="mapIcon"></div>
					<div class="mapName"><span></span></div>
				</div>
			</div>`;
		let lnglat = name.lnglat.split(",");
		way.addMarker([lnglat[0], lnglat[1]], markerContent, 1);
	},
	dataProcessing: function(name, data) {
		let oThis = this;
		for (var i = 0; i < data.length; i++) {
			let markerContent =
				'<div class="serverSpot ' + name + '"><div class="mapIcon"></div><div class="mapName"><span></span></div></div>';
			let lnglat = data[i].lnglat.split(",");
			way.addMarker([lnglat[0], lnglat[1]], markerContent);
		}
	},
	fnTimeout: function() {
		let oThis = this;
		clearTimeout(oThis.timer2);
		oThis.timer2 = setTimeout(function() {
			oThis.fnSwitch();
		}, 5000);
	},
	fnSwitch: function(oValue) {
		let oThis = this;
		clearTimeout(oThis.timer1);
		oThis.eventOpen();
		if (oThis.oIndex == 2) { //全国
			$(".serverSpot").show();
			seriesData(oThis.centerMap, oThis.zoomMap);
			if (highId) {
				$(".mapText").removeClass("textKeyframe");
				$("#customMarker").remove();
				vary.chart.destroy();
			}
			oThis.fnOpen();
		} else if (oThis.oIndex == 1) {
			$(".addMarker").remove();
			$(".serverSpot").hide();
			oThis.eventClose();
			let zoomRandom = Math.floor(Math.random() * 7) + 7;
			let chinaData = oThis.yesCES; //全部
			let max = chinaData.length - 1;
			let min = 0;
			let index = parseInt(Math.random() * (max - min + 1) + min, 10);
			let chinaDataPosition = (!oValue) ? chinaData[index].lnglat.split(",") : oValue;
			let markerContent =
				'<div id="customMarker" class="custom-content-marker"><div class="mapText"><div class="textColumn"><p><span class="nbr">' +
				chinaData[index].name + '</span><span>追溯企业：</span><span>' +
				chinaData[index].traceabilityEnterprise +
				'</span></p></div><div class="jianColumn"><img src="img/mapText1.png"></div></div><div class="markerColumn" id="markerColumn"></div></div>';
			way.addMarker([chinaDataPosition[0], chinaDataPosition[1]], markerContent);
			seriesData([chinaDataPosition[0], chinaDataPosition[1]], zoomRandom);
			oThis.oIndex = 2;
			oThis.timer1 = setTimeout(function() {
				way.establishColumn();
				oThis.fnTimeout();
			}, 1000);
		} else {
			oThis.fnClose();
		}
	},
	fnOpen: function() {
		this.oIndex = 1;
		this.category();
	},
	fnClose: function() {
		if (this.oIndex == 2) {
			return;
		}
		this.oIndex = 3;
		clearTimeout(this.timer2);
	},
	eventClose: function() {
		map.off('click', this.handleEvent);
		map.off('movestart', this.handleEvent);
		map.off('mouseout', this.handleEvent);
	},
	eventOpen: function() {
		map.on('click', this.handleEvent);
		map.on('movestart', this.handleEvent);
		// map.on('mouseout', this.handleEvent);
	},
	handleEvent: function(ev) { //开启或者关闭自动切换
		if (ev.type == "click" || ev.type == "movestart") { //暂停
			homeObj.fnClose();
		} else { //播放
			homeObj.fnOpen();
			if (highId) {
				$(".mapText").removeClass("textKeyframe");
				$("#customMarker").remove();
			}
		}
	},
	storageReset: function() { //移除
		map.remove(vary.storage);
		vary.storage = [];
		vary.arrs = [];
	},
	fnclick: function() {
		let oThis = this;
		$("#kaiqi").click(function() { //自动播放
			if (oThis.onOff == 1) {
				$(this).children("span").show();
				oThis.onOff++;
				return;
			} else if (oThis.onOff == 2) {
				oThis.fnOpen();
				$(this).children("span").hide();
				oThis.onOff--;
				return;
			}
		});
		$("#category>div").click(function() { //品类过滤
			if (oThis.oIndex == 2) {
				return;
			}
			oThis.fnClose();
			let index = $(this).index();
			oThis.categoryIndex = index;
			oThis.yesCES = [];
			let oHasClass = $(this).hasClass('active');
			if (oHasClass) {
				oThis.showName = "nationwide";
				oThis.showIcon = "quan";
				$(this).removeClass("active");
				$("#technologicalProcess .j_tracediv0").addClass("active");
			} else if (index == "0") {
				oThis.showName = "meatvegetable";
				oThis.showIcon = "shucai-";
				$("#homeRanking").show();
			} else if (index == "1") {
				oThis.showName = "madicien";
				oThis.showIcon = "zhongyaozhishi";
				$("#homeRanking").hide();
			} else if (index == "2") {
				oThis.showName = "product";
				oThis.showIcon = "start";
				$("#homeRanking").hide();
			} else {
				return;
			}
			if (!oHasClass) {
				$(this).addClass("active").siblings().removeClass("active");
				$("#technologicalProcess .active").removeClass("active");
			}
			oThis.category();
			oThis.enterprise();
		});
		$("#technologicalProcess>div").click(function() { //流程
			if (oThis.oIndex == 2) {
				return;
			}
			oThis.fnClose();
			let index = $(this).index();
			$(this).addClass("active").siblings().removeClass("active");
			switch (index) {
				case 0:
					$("#category .active").removeClass("active");
					oThis.showName = "nationwide";
					oThis.showIcon = "quan";
					oThis.category();
					oThis.enterprise();
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
		});
		$(document).on("click", ".addMarker", function() {
			let name = $(this).find(".oName").text();
			if (name.substr(0, 2) == "上海" && oThis.categoryIndex == 0) {
				window.location.href = "shanghaitraceability.html?" + name + "&" + oThis.showIcon;
			} else {
				alert("暂无数据!");
			}
		});
		$(document).on("mouseover", ".addMarker", function() {
			$(this).find(".oInfo").show();
		});
		$(document).on("mouseout", ".addMarker", function() {
			$(this).find(".oInfo").hide();
		});
	}
}
