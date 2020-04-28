$(function() {
	var _expo = {
		dataset: null,
		init: function() {
			this.getdata();
			this.display(this.dataset);
			// this.threeD();
			this.blockChain();
		},

		display: function(data) {
			let _self = this;
			//供应商、餐饮企业
			let max, arr = [],
				str;
			data['supplier']['supply'].forEach(function(v, i) {
				arr.push(v['value']);
			})
			max = Math.max.apply(null, arr);
			_self.chinaChart('expoMap', data['supplier']['supply'], max);

			$('.expoCont').remove();
			str = '<div class="expoExcelCont" id="supRank"><ul>';
			data['supplier']['company'].sort(function(a, b) { //二维数组降序
				return b[1] - a[1];
			})
			data['supplier']['company'].forEach(function(v, i) {
				str +=
					`<li class="flexbox">
						<div class="supName">
							${v[0]}
						</div>
						<div class="supCan">
							${v[1]}
						</div>
					</li>`;
			})
			str += '</ul></div>';
			$('.supRank').append(str);
			$('#supRank').myScroll({
				speed: 30,
				rowHeight: 34
			});

			//追溯扫码统计
			_self.linebarChart('expoTrace', data['traceCode']);

			//每日进场人数
			_self.barChart('everydayPeople', data['everydayPeople']);

			//每日餐饮供应
			_self.multilineChart('consumptionEvaluation', data['everydaySupply'], '份');

			//原料供应情况
			str = '<div class="expoExcelCont" id="supplyEvaluation"><ul>';
			data['supplyEvaluation'].map(function(v, i) {
				return {
					name: v['name'],
					num: eval(v['count'].map(function(item, index) {
						return item[1]
					}).join('+'))
				}
			}).sort(function(a, b) {
				return b['num'] - a['num'];
			}).forEach(function(v, i) {
				str +=
					`<li class="flexbox">
						<div class="supName">
							${v['name']}
						</div>
						<div class="supCan">
							${v['num']}
						</div>
					</li>`;
			})
			str += '</ul></div>';
			$('.supplyEvaluation').append(str);
			$('#supplyEvaluation').myScroll({
				speed: 30,
				rowHeight: 34
			});
			_self.multilineChart('expomultiLine', data['supplyEvaluation'], 'kg');

			//消费单品分析
			str = '<div class="expoExcelCont" id="consumptionAnalysis"><ul>';
			data['consumptionAnalysis']['class'].sort(function(a, b) { //二维数组降序
				return b['value'] - a['value'];
			})
			data['consumptionAnalysis']['class'].forEach(function(v, i) {
				str +=
					`<li class="flexbox">
						<div class="supName">
							${v['name']}
						</div>
						<div class="supCan">
							${v['value']}
						</div>
					</li>`;
			})
			str += '</ul></div>';
			$('.consumptionAnalysis').append(str);
			$('#consumptionAnalysis').myScroll({
				speed: 30,
				rowHeight: 34
			});
			_self.pieChart('expoPie', data['consumptionAnalysis']['class']);

			//标签企业
			// 			str = '';
			// 			data['companyData'].forEach(function(v, i) {
			// 				str +=
			// 					`<a>
			// 						${v}
			// 					</a>`;
			// 			})
			// 			$('.companyTag').append(str);
			// 			_self.tagUp();
		},
		blockChain: function() { 
			var chart = function() {
				//查询节点数量和状态
				var checkNumber = function() {
					var data = {};

					data.data = {
						"PeerSynchronizedCnt": 4.0,
						"PeerOrgMapping": {
							"peer0.org1.cesgroup.com.cn": "Org1MSP",
							"peer0.org2.cesgroup.com.cn": "Org2MSP",
							"peer1.org2.cesgroup.com.cn": "Org2MSP",
							"peer1.org1.cesgroup.com.cn": "Org1MSP"
						},
						"PeerSynchronized": [{
							"properties": {
								"grpc.ManagedChannelBuilderOption.maxInboundMessageSize": 9000000.0,
								"pemFile": "/usr/local/tomcat/webapps/gateway/WEB-INF/classes/fabric/crypto-config/peerOrganizations/org1.cesgroup.com.cn/peers/peer0.org1.cesgroup.com.cn/tls/server.crt",
								"negotiationType": "TLS",
								"sslProvider": "openSSL",
								"hostnameOverride": "peer0.org1.cesgroup.com.cn"
							},
							"name": "peer0.org1.cesgroup.com.cn",
							"url": "grpcs://peer0.org1.cesgroup.com.cn:7051",
							"protocol": "grpcs"
						}, {
							"properties": {
								"grpc.ManagedChannelBuilderOption.maxInboundMessageSize": 9000000.0,
								"pemFile": "/usr/local/tomcat/webapps/gateway/WEB-INF/classes/fabric/crypto-config/peerOrganizations/org1.cesgroup.com.cn/peers/peer1.org1.cesgroup.com.cn/tls/server.crt",
								"negotiationType": "TLS",
								"sslProvider": "openSSL",
								"hostnameOverride": "peer1.org1.cesgroup.com.cn"
							},
							"name": "peer1.org1.cesgroup.com.cn",
							"url": "grpcs://peer1.org1.cesgroup.com.cn:7051",
							"protocol": "grpcs"
						}, {
							"properties": {
								"grpc.ManagedChannelBuilderOption.maxInboundMessageSize": 9000000.0,
								"pemFile": "/usr/local/tomcat/webapps/gateway/WEB-INF/classes/fabric/crypto-config/peerOrganizations/org2.cesgroup.com.cn/peers/peer0.org2.cesgroup.com.cn/tls/server.crt",
								"negotiationType": "TLS",
								"sslProvider": "openSSL",
								"hostnameOverride": "peer0.org2.cesgroup.com.cn"
							},
							"name": "peer0.org2.cesgroup.com.cn",
							"url": "grpcs://peer0.org2.cesgroup.com.cn:7051",
							"protocol": "grpcs"
						}, {
							"properties": {
								"grpc.ManagedChannelBuilderOption.maxInboundMessageSize": 9000000.0,
								"pemFile": "/usr/local/tomcat/webapps/gateway/WEB-INF/classes/fabric/crypto-config/peerOrganizations/org2.cesgroup.com.cn/peers/peer1.org2.cesgroup.com.cn/tls/server.crt",
								"negotiationType": "TLS",
								"sslProvider": "openSSL",
								"hostnameOverride": "peer1.org2.cesgroup.com.cn"
							},
							"name": "peer1.org2.cesgroup.com.cn",
							"url": "grpcs://peer1.org2.cesgroup.com.cn:7051",
							"protocol": "grpcs"
						}],
						"PeerAbnormalCnt": 0.0,
						"PeerSynchronizingCnt": 0.0,
						"PeerSynchronizing": [],
						"PeerAbnormal": []
					};
					if (data.exception === null || data.exception === undefined) {
						// console.log(document.getElementsByClassName("drawArea-opacity"));
						//获取所有的orgNameList
						var ORG_URL = "api/explorer/getOrgList";
						var OWN_ORG_URL = "api/explorer/ownOrg";
						var orgList = [{
							"mspId": "Org2MSP",
							"orgName": ""
						}, {
							"mspId": "Org1MSP",
							"orgName": "追溯云"
						}];
						var ownOrgInfo = {
							"mspId": "Org1MSP"
						};
						var orgName = '';
						$("#peerCount").html("");
						$("#peerCount").html("PEER" + "  " + (Number(data.data.PeerSynchronizedCnt) + Number(data.data.PeerSynchronizingCnt) +
							Number(data.data.PeerAbnormalCnt)));
						$("#ytb").html(data.data.PeerSynchronizedCnt);
						$("#tbz").html(data.data.PeerSynchronizingCnt);
						$("#yc").html(data.data.PeerAbnormalCnt);
						if (data.data.PeerSynchronizingCnt != 0) {
							for (var i = 0; i < data.data.PeerSynchronizingCnt; i++) {
								var peeName = data.data.PeerSynchronizing[i].name;
								for (var j = 0; j < orgList.length; j++) {
									if (data.data.PeerOrgMapping[peeName] == orgList[j].mspId) {
										orgName = orgList[j].orgName;
									}
								}

								document.getElementsByClassName("drawArea-opacity")[0].children[1].children[0].textContent = data.data.PeerSynchronizing[
									i].name.substring(0, 10);
								document.getElementsByClassName("drawArea-opacity")[0].children[1].children[0].className =
									"synchronization";
								// document.getElementsByClassName("drawArea-opacity")[0].children[1].children[1].textContent = "同步";
								document.getElementsByClassName("drawArea-opacity")[0].children[1].children[2].textContent = orgName;
								document.getElementsByClassName("drawArea-opacity")[0].children[1].children[1].className =
									"synchronization";
								if (ownOrgInfo.mspId == data.data.PeerOrgMapping[peeName]) {
									$(document.getElementsByClassName("drawArea-opacity")[0].children[1].children[2]).css("display", "block");
									document.getElementsByClassName("drawArea-opacity")[0].children[1].children[2].className =
										"drawarea-name drawarea-static";
									document.getElementsByClassName("drawArea-opacity")[0].children[1].className = "cube-txt static-txt"
								}
								var classList = document.getElementsByClassName("drawArea-opacity")[0].className.split(" ");
								var classNames = classList[0] + " " + "drawArea-anmition" + " " + classList[2] + " " + classList[3];
								document.getElementsByClassName("drawArea-opacity")[0].className = classNames;

							}
						}
						if (data.data.PeerSynchronizedCnt != 0) {
							for (var i = 0; i < data.data.PeerSynchronizedCnt; i++) {
								var peeName = data.data.PeerSynchronized[i].name;
								for (var j = 0; j < orgList.length; j++) {
									if (data.data.PeerOrgMapping[peeName] == orgList[j].mspId) {
										orgName = orgList[j].orgName;
									}
								}

								document.getElementsByClassName("drawArea-opacity")[0].children[1].children[0].textContent = data.data.PeerSynchronized[
									i].name.substring(0, 10);
								document.getElementsByClassName("drawArea-opacity")[0].children[1].children[0].className = "sync";
								// document.getElementsByClassName("drawArea-opacity")[0].children[1].children[1].textContent = "已同步";
								document.getElementsByClassName("drawArea-opacity")[0].children[1].children[2].textContent = orgName;
								document.getElementsByClassName("drawArea-opacity")[0].children[1].children[1].className = "sync";
								if (ownOrgInfo.mspId == data.data.PeerOrgMapping[peeName]) {
									$(document.getElementsByClassName("drawArea-opacity")[0].children[1].children[2]).css("display", "block");
									document.getElementsByClassName("drawArea-opacity")[0].children[1].children[2].className =
										"drawarea-name drawarea-static";
									document.getElementsByClassName("drawArea-opacity")[0].children[1].className = "cube-txt static-txt"
								}
								var classList = document.getElementsByClassName("drawArea-opacity")[0].className.split(" ");
								var classNames = classList[0] + " " + "drawArea-anmition" + " " + classList[2] + " " + classList[3];
								document.getElementsByClassName("drawArea-opacity")[0].className = classNames;

							}
						}

						if (data.data.PeerAbnormalCnt != 0) {
							for (var i = 0; i < data.data.PeerAbnormalCnt; i++) {
								var p = 0;
								var peeName = data.data.PeerAbnormal[i].name;
								for (var j = 0; j < orgList.length; j++) {
									if (data.data.PeerOrgMapping[peeName] == orgList[j].mspId) {
										orgName = orgList[j].orgName;
									}
								}

								document.getElementsByClassName("drawArea-opacity")[p].children[1].children[0].textContent = data.data.PeerAbnormal[
									i].name.substring(0, 10);
								document.getElementsByClassName("drawArea-opacity")[p].children[1].children[0].className = "abnormal";
								// document.getElementsByClassName("drawArea-opacity")[p].children[1].children[1].textContent = "异常";
								document.getElementsByClassName("drawArea-opacity")[p].children[1].children[2].textContent = orgName;
								document.getElementsByClassName("drawArea-opacity")[p].children[1].children[1].className = "abnormal";
								if (ownOrgInfo.mspId == data.data.PeerOrgMapping[peeName]) {
									$(document.getElementsByClassName("drawArea-opacity")[0].children[1].children[2]).css("display", "block");
									document.getElementsByClassName("drawArea-opacity")[0].children[1].children[2].className =
										"drawarea-name drawarea-static";
									document.getElementsByClassName("drawArea-opacity")[0].children[1].className = "cube-txt static-txt"
								}
								var classList = document.getElementsByClassName("drawArea-opacity")[p].className.split(" ");
								var classNames = classList[0] + " " + "drawArea-anmition" + " " + classList[2] + " " + classList[3];
								document.getElementsByClassName("drawArea-opacity")[p].className = classNames;
							}


						}
					} else {
						$("#peerCount").html("");
						$("#ytb").html(0);
						$("#tbz").html(0);
						$("#yc").html(0);
					}
				}
				checkNumber();

				var getOrderNumber = function() {
					var data = ["orderer1.cesgroup.com.cn:7050",
						"orderer0.cesgroup.com.cn:7050",
						"orderer3.cesgroup.com.cn:7050",
						"orderer2.cesgroup.com.cn:7050"
					];
					if (data.exception === null || data.exception === undefined) {
						var orderers = data;
						var ordererNum = data.length;
						$("#orderStatus").html("");
						$("#orderStatus").html("ORDER" + "  " + ordererNum);
						$("#zcorder").html(ordererNum);
						for (var j = 0; j < ordererNum; j++) {
							var ordererName = orderers[j];
							if (ordererName != "" && ordererName != undefined) {
								ordererName = ordererName.substring(0, ordererName.indexOf("."));
							} else {
								ordererName = "orderer"
							}
							var oj = 0;
							document.getElementsByClassName("drawArea-opacity drawArea-items-ball")[oj].children[1].children[0].textContent =
								ordererName;
							document.getElementsByClassName("drawArea-opacity drawArea-items-ball")[oj].children[1].children[0].className =
								"sync";
							var classList = document.getElementsByClassName("drawArea-opacity drawArea-items-ball")[oj].className.split(
								" ");
							var classNames = classList[0] + " " + "drawArea-anmition" + " " + classList[2] + " " + classList[3] + " " +
								classList[4];
							document.getElementsByClassName("drawArea-opacity drawArea-items-ball")[oj].className = classNames;
						}

					}
				}
				getOrderNumber();

			}

			//驾驶舱立方体和球之间的连线逻辑
			var initLine = function() {

				var drawAreaISVG = $("svg");
				var html = "";
				for (var i = 1; i < 9; i++) {

					var j = i + 1;
					var j1 = i + 2;
					var drawAreaItems1L = parseInt($(".drawArea" + i).position().left) + 30;
					var drawAreaItems1T = parseInt($(".drawArea" + i).position().top) + 30;

					var drawAreaItems2L = parseInt($(".drawArea" + j).position().left) + 30;
					var drawAreaItems2T = parseInt($(".drawArea" + j).position().top) + 30;

					var drawAreaItems3L = parseInt($(".drawArea" + j1).position().left) + 30;
					var drawAreaItems3T = parseInt($(".drawArea" + j1).position().top) + 30;

					html += '<line class="drawAreaLine1" x1="' + drawAreaItems1L + '" y1="' + drawAreaItems1T + '" x2="' +
						drawAreaItems2L + '" y2="' + drawAreaItems2T + '" style="stroke:rgba(255,255,255,0.2);stroke-width:1"/>' +
						'<line class="drawAreaLine1" x1="' + drawAreaItems1L + '" y1="' + drawAreaItems1T + '" x2="' +
						drawAreaItems3L +
						'" y2="' + drawAreaItems3T + '" style="stroke:rgba(255,255,255,0.2);stroke-width:1"/>'

					drawAreaISVG.html(html);
				}
				for (var i = 10; i < 19; i++) {
					var j = i + 1;
					var drawAreaItems1L = parseInt($(".drawArea" + i).position().left) + 30;
					var drawAreaItems1T = parseInt($(".drawArea" + i).position().top) + 20;
					var drawAreaItems2L = parseInt($(".drawArea" + j).position().left) + 20;
					var drawAreaItems2T = parseInt($(".drawArea" + j).position().top) + 20;
					html += '<line class="drawAreaLine1" x1="' + drawAreaItems1L + '" y1="' + drawAreaItems1T + '" x2="' +
						drawAreaItems2L + '" y2="' + drawAreaItems2T + '" style="stroke:rgba(255,255,255,0.1);stroke-width:1"/>'

					drawAreaISVG.html(html);
				}


			};
			$(window).resize(function() {
				initLine();
			});
			chart(); //图表
			initLine(); //线
		},
		tagUp: function() {
			let container = document.querySelector('.companyTag'),
				dom = document.querySelectorAll('.companyTag a'),
				i;
			for (i = 0; i < dom.length; i++) {
				dom[i].pause = 1;
				initialize(dom[i]);
				dom[i].onmouseover = function() {
					this.pause = 0;
				};
				dom[i].onmouseout = function() {
					this.pause = 1;
				};
			}
			setInterval(starmove, 50);

			function starmove() {
				for (i = 0; i < dom.length; i++) {
					if (dom[i].pause) {
						domove(dom[i]);
					}
				}
			}

			function domove(obj) {
				if (obj.offsetTop >= container.offsetHeight) {
					initialize(obj);
				} else {
					obj.style.top = obj.offsetTop + obj.ispeed + "px";
				}
			}

			function initialize(obj) {
				let rotate = -Math.random() * 30;
				obj.style.transform = 'rotateX(' + rotate + 'deg)';
				obj.style.top = Math.random() * (container.offsetHeight - obj.offsetHeight) + "px";
				obj.style.left = Math.random() * (container.offsetWidth - obj.offsetWidth) + "px";
				obj.ispeed = Math.ceil(Math.random() * 4) + 1;
			}
		},
		threeD: function() {
			var container = document.getElementById("threeD");
			var width = container.clientWidth;
			var height = container.clientHeight;
			var aspect = width / height;
			var renderer = new THREE.WebGLRenderer({ //渲染器
				antialias: true,
				alpha: true
			});
			renderer.setSize(width, height);
			container.appendChild(renderer.domElement);

			var scene = new THREE.Scene(); //场景

			var camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 1000); //观点相机
			camera.position.z = 500

			system = new THREE.Group(); // 创建组

			scene.add(
				new THREE.AmbientLight(0xFFFFFF, 0.2) //向场景添加环境光
			);

			var light = new THREE.DirectionalLight(0xFFFFFF, 2.5); //添加可投影光源
			light.position.set(1500, 2500, 0);
			scene.add(light);

			var material = new THREE.MeshLambertMaterial({ //创建材质
				color: 0x0C2D4D
			});

			var planet = new THREE.Mesh(
				new THREE.IcosahedronGeometry(100, 3), //创建球体
				material
			);

			for (var i = 0; i < planet.geometry.vertices.length; i++)
				planet.geometry.vertices[i].multiplyScalar(
					Math.random() * 0.05 + 0.95
				);

			planet.geometry.computeFlatVertexNormals(); //将每个面的每个顶点的法线设置为与面的法线相同
			system.add(planet);

			var asteroids = new THREE.Group();
			for (var p = 0; p < Math.PI * 2; p = p + Math.random() * 0.15) {
				var asteroid = new THREE.Mesh(
					new THREE.IcosahedronGeometry(8, 0),
					material
				);

				var size = Math.random() * 0.5;
				for (var i = 0; i < asteroid.geometry.vertices.length; i++)
					asteroid.geometry.vertices[i].multiplyScalar(
						Math.random() * 0.5 + size
					);

				rand = Math.random() * 60 - 30;
				asteroid.position.set(200 * Math.sin(p) + rand, rand, 200 * Math.cos(p) + rand);

				asteroid.geometry.computeFlatVertexNormals();

				asteroids.add(asteroid);
			}

			system.add(asteroids);

			system.rotation.x = 0.1;
			system.rotation.y = -.3;
			system.rotation.z = -0.4;

			scene.add(system);

			function render() {
				requestAnimationFrame(render);

				planet.rotation.y += 0.001;
				planet.rotation.z -= 0.0005;

				asteroids.rotation.y += 0.003;
				renderer.render(scene, camera);
			}

			render();
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
		multilineChart: function(dom, data, unit) {
			let legendData = [],
				seriasData = [],
				_self = this;

			data.forEach(function(v, i) {
				let randomColor = '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
				legendData.push({
					name: v['name'],
					textStyle: {
						color: randomColor
					}
				})
				seriasData.push({
					name: v['name'],
					type: 'line',
					symbol: 'circle',
					showSymbol: true,
					// smooth: true,
					itemStyle: {
						color: randomColor,
						borderColor: randomColor,
						borderWidth: 2
					},
					lineStyle: {
						normal: {
							color: randomColor,
							width: 1
						}
					},
					data: v['count'].map(function(v, i) {
						return v[1]
					})
				})
			})
			echarts.init(document.getElementById(dom)).setOption({
				backgroundColor: 'transparent',
				title: {},
				legend: {
					data: legendData,
					top: 10,
					itemWidth: 14,
					itemHeight: 10
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line',
						lineStyle: {
							color: '#192d3d',
							type: 'dashed'
						}
					},
					backgroundColor: 'rgba(46,155,159,1)',
					textStyle: {
						color: '#fff'
					},
					confine: true,
					formatter: function(p) {
						let str = `${p[0]['name']}<br>`;
						p.map(function(v) {
							str += `${v['marker']}${v['seriesName']}: ${v['value']} ${unit}<br>`;
						})
						return str
					}
				},
				grid: {
					show: false,
					left: 10,
					right: '5%',
					bottom: 10,
					top: '20%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					boundaryGap: false,
					data: data[0]['count'].map(function(v, i) {
						return v[0]
					}),
					// data: _self.getDays(num),
					axisLabel: {
						margin: 10,
						color: '#65c6e7',
						rotate: 0,
						align: 'center'
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: '#59aecc'
						}
					},
					axisTick: {
						show: false
					},
					splitLine: {
						show: false,
						lineStyle: {
							color: '#192d3d'
						}
					},
					splitArea: {
						// show: true
					}
				}],
				yAxis: [{
					type: 'value',
					axisLabel: {
						margin: 10,
						color: '#65c6e7',
						formatter: '{value}' + unit
					},
					axisTick: {
						show: false
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: '#192d3d'
						}
					},
					axisLine: {
						show: false,
						lineStyle: {
							color: '#192d3d'
						}
					}
				}],
				series: seriasData
			});
		},
		pieChart: function(dom, res) {
			let colorArray = [],
				i;
			for (i = 0; i < 50; i++) {
				colorArray.push('#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6))
			}
			echarts.init(document.getElementById(dom)).setOption({
				backgroundColor: 'transparent',
				color: colorArray,
				tooltip: {
					show: false
				},
				legend: {
					show: false
				},
				series: [{
					name: '消费单品占比',
					type: 'pie',
					radius: ['50%', '70%'],
					label: {
						normal: {
							show: true,
							formatter: '{b}{d}%'
						}
					},
					labelLine: {
						normal: {
							show: true
						}
					},
					data: res
				}]
			});
		},
		barChart: function(dom, data) {
			let _self = this;
			echarts.init(document.getElementById(dom)).setOption({
				backgroundColor: 'transparent',
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
					boundaryGap: true,
					data: data.map(function(v) {
						return v[0]
					}),
					axisLabel: {
						margin: 10,
						color: '#65c6e7',
						rotate: 0,
						align: 'center'
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: '#59aecc'
						}
					},
					axisTick: {
						show: false
					},
					splitLine: {
						show: false,
						lineStyle: {
							color: '#121924'
						}
					},
					splitArea: {
						// show: true
					}
				}],
				yAxis: [{
					name: '万人次',
					nameTextStyle: {
						color: '#65c6e7'
					},
					type: 'value',
					axisLabel: {
						margin: 10,
						color: '#65c6e7',
						formatter: '{value}'
					},

					axisTick: {
						show: false
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: '#192d3d'
						}
					},
					axisLine: {
						show: false,
						lineStyle: {
							color: '#121924'
						}
					}
				}],
				series: [{
						name: '进场人数',
						type: 'bar',
						data: data.map(function(v) {
							return v[1]
						}),
						barWidth: '26',
						itemStyle: {
							color: '#3cefff',
							opacity: .7
						}
					},
					{
						name: '进场人数',
						type: 'pictorialBar',
						symbol: 'circle',
						symbolSize: [26, 12],
						symbolOffset: [0, -6],
						symbolPosition: "end",
						z: 12,
						data: data.map(function(v) {
							return v[1]
						}),
						itemStyle: {
							color: '#3cefff'
						},
						label: {
							show: true,
							position: 'top',
							formatter: '{c}万人次'
						}
					},
					{
						name: '进场人数',
						type: 'pictorialBar',
						symbol: 'circle',
						symbolSize: [26, 12],
						symbolOffset: [0, 6],
						z: 12,
						data: data.map(function(v) {
							return v[1]
						}),
						itemStyle: {
							color: '#3cefff',
						}
					}
				]
			});
		},
		linebarChart: function(dom, data) {
			let _self = this;
			echarts.init(document.getElementById(dom)).setOption({
				backgroundColor: 'transparent',
				title: {},
				legend: {
					data: ["赋码量", "增长率"],
					itemWidth: 14,
					itemHeight: 10,
					textStyle: {
						color: '#0EFCFF'
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
					formatter: function(pa) {
						let str = `${pa[0].name}<br>`;
						pa.forEach(function(v, i) {
							v.seriesName == '增长率' ? str += `${v.marker}${v.seriesName}: ${v.value}%<br>` : str +=
								`<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background:linear-gradient(rgba(18,254,169,1),rgba(16,151,239,1));"></span>${v.seriesName}: ${v.value}万<br>`;
						})
						return str;
					}
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
					boundaryGap: true,
					data: data.map(function(v) {
						return v[0]
					}),
					axisLabel: {
						margin: 10,
						color: '#fff',
						rotate: 0,
						align: 'center'
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: '#192d3d'
						}
					},
					axisTick: {
						show: false
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: '#192d3d'
						}
					},
					splitArea: {
						// show: true
					}
				}],
				yAxis: [{
						type: 'value',
						axisLabel: {
							margin: 10,
							color: '#fff',
							formatter: '{value} W'
						},

						axisTick: {
							show: false
						},
						splitLine: {
							show: true,
							lineStyle: {
								color: '#192d3d'
							}
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: '#192d3d'
							}
						}
					},
					{
						type: 'value',
						position: 'right',
						axisLabel: {
							margin: 10,
							color: '#fff',
							formatter: '{value}%'
						},
						axisTick: {
							show: false
						},
						splitLine: {
							show: true,
							lineStyle: {
								color: '#192d3d'
							}
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: '#192d3d'
							}
						}
					}
				],
				series: [{
						name: '赋码量',
						type: 'bar',
						data: data.map(function(v) {
							return v[1]
						}),
						yAxisIndex: 0,
						barWidth: '26',
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
					}, {
						name: '增长率',
						type: 'line',
						symbol: 'circle',
						yAxisIndex: 1,
						showSymbol: true,
						// smooth: true,
						itemStyle: {
							color: "#fff",
							borderColor: "#fff",
							borderWidth: 2
						},
						lineStyle: {
							normal: {
								color: '#79afd7',
								width: 2
							}
						},
						data: data.map(function(v) {
							return v[2]
						})
					}

				]
			});
		},
		chinaChart: function(dom, data, max) {
			echarts.init(document.getElementById(dom)).setOption({
				tooltip: {
					trigger: 'item',
					formatter: function(pa) {
						return `${pa['name']}: ${pa['value']?pa['value']:0}`;
					},
					backgroundColor: '#297cd1',
					textStyle: {
						color: '#fff'
					}
				},
				visualMap: {
					min: 0,
					max: max,
					calculable: true,
					inRange: {
						color: ['#297cd1', '#0922d1']
					},
					textStyle: {
						color: '#000'
					},
					show: false
				},
				geo: {
					map: 'china',
					roam: true,
					label: {
						show: false,
					},
					itemStyle: {
						areaColor: '#fff',
						borderColor: '#0a27d1'
					},
					emphasis: {
						label: {
							show: false
						},
						itemStyle: {
							areaColor: '#0922d1'
						}
					},
				},
				series: [{
					name: '分布情况',
					type: 'map',
					geoIndex: 0,
					data: data
				}]
			})
		},
		getdata: function() {
			var self = this;
			$.ajax({
				url: 'data/expo.json',
				dataType: 'json',
				type: 'get',
				async: false,
				success: function(data) {
					self.dataset = data;
				},
				error: function(xhr, type, errorThrown) {
					console.log('111')
				}
			});
		}
	}
	_expo.init()
})
