export default{
	setLoc(key,value){
		localStorage.setItem(key, JSON.stringify(value));
	},
	getLoc(key){
		return JSON.parse(localStorage.getItem(key));
	},
	removeLoc(key) {
		localStorage.removeItem(key);
	},
	setCookie(name,value,Days=7){
		var exp  = new Date();
		exp.setTime(exp.getTime() + Days*24*60*60*1000);
		document.cookie = name + "="+ escape(value) +";expires="+ exp.toGMTString();
	},
	getCookie(name){
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		if(arr != null){
		  return unescape(arr[2])
		}else{
		  return null
		}
	},
	downLoad(url){
		const elink = document.createElement('a')
		elink.style.display = 'none'
		elink.href = url
		document.body.appendChild(elink)
		elink.click()
		document.body.removeChild(elink)
	}
}