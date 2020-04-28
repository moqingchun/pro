function _mapinit(){
	
}
_mapinit.prototype = {
	addMarker: function(oPosition, markerContent) {//添加标记
		let marker = new AMap.Marker({
			content: markerContent,
			position: oPosition,
			offset: new AMap.Pixel(-13, -30)
		});
		map.add(marker);
	}
}
window._mapinit = new _mapinit();