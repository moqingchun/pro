;
(function (win) {
    win._lbr = {
        getQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURIComponent(r[2]);
            }
            return null;
        },
        //下载文件
        downLoad: function (url) {
            var elink = document.createElement('a')
            elink.style.display = 'none'
            elink.href = url
            document.body.appendChild(elink)
            elink.click()
            document.body.removeChild(elink)
        },
        // 放大图片
        imgShow: function (src) {
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
                node: '@keyframes smallToBig{0%{transform: scale(0);}50%{transform: scale(1.5);}100%{transform: scale(1);}}@keyframes fadeIn{0%{opacity:0;}100%{opacity:1;}}@keyframes fadeOut{0%{opacity:1;}100%{opacity:0;}}.imgWrap{cursor:pointer;position: fixed;top: 0;left: 0;background: rgba(0,0,0,.6);width: 100%;height: 100%;z-index: 9999;-webkit-animation: fadeIn .5s forwards;-o-animation: fadeIn .5s forwards;animation: fadeIn .5s forwards;overflow:auto;}.imgWrap img{position: absolute;margin: auto;left: 0;top: 0;right: 0;bottom: 0;-webkit-animation: smallToBig .5s forwards;-o-animation: smallToBig .5s forwards;animation: smallToBig .5s forwards;}.imgWrap.fadeOut{animation: fadeOut .5s forwards;}',
                wrap: that.QS('head')
            })
            that.QS('#' + domId).onclick = function (e) {
                var _self = this;
                this.className += ' fadeOut'
                setTimeout(function () {
                    _self.remove();
                    that.QS('#' + styleId).remove()
                }, 500)
            }
        },

        //必填字段
        requiredTip: function (formID, domID) {
            var that = this,
                flag = true;
            var nodes = that.QSA(formID + ' ' + domID)
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].required && !nodes[i].value.trim()) {
                    nodes[i].focus();
                    that.tipBox({
                        message: '星号为必填项！'
                    });
                    flag = false;
                    return flag;
                }
            }
            return flag

        },
        //form表单必填项提示插件
        messageBox: function (options) {
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
            setTimeout(function () {
                that.QS('#' + mdId).className += ' fadeOut'
            }, defaults.hideTime)
            setTimeout(function () {
                that.QS('#' + mdId).remove();
                that.QS('#' + styleId).remove();
            }, defaults.hideTime + 1000)
        },
        //confirm弹框插件 #FAAD14
        confirmModal: function (options) {
            var that = this
            var defaults = {
                title: '操作提示',
                hideCancel: false,
                message: '删除后不可恢复',
                callback: function () {}
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
            that.QS('#' + mdId + " .ok").addEventListener('click', function () {
                defaults.callback();
                that.QS('#' + mdId).className += ' out'
                setTimeout(function () {
                    that.QS('#' + mdId).remove()
                    that.QS('#' + styleId).remove()
                }, 1000)
            })
            that.QS('#' + mdId + " .cancel").addEventListener('click', function () {
                that.QS('#' + mdId).className += ' out'
                setTimeout(function () {
                    that.QS('#' + mdId).remove()
                    that.QS('#' + styleId).remove()
                }, 1000)
            })
            that.QS('#' + mdId + " .mask_dialog").addEventListener('click', function (e) {
                var e = e || window.event
                e.stopPropagation()
            })
            that.QS('#' + mdId).addEventListener('click', function () {
                that.QS('#' + mdId).className += ' out'
                setTimeout(function () {
                    that.QS('#' + mdId).remove()
                    that.QS('#' + styleId).remove()
                }, 1000)
            })
        },
        //alert提示框插件
        tipBox: function (options) {
            var that = this;
            var defaults = {
                hideTime: 3000,
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
                node: '@keyframes fromTop{0%{top:-50px;}100%{top:0;}}@keyframes toTop{0%{top:0px;}100%{top:-50px;}}.TIP{width: 600px;line-height: 40px;text-align: center;background: rgba(255, 80, 33, 0.9);font-size: 16px;color: rgb(255, 255, 255);border-bottom-right-radius: 16px;border-bottom-left-radius: 16px;position: fixed;top: -50px;left: 50%;margin-left: -300px;z-index: 99999;animation: fromTop .2s forwards;}.TIP.toTop{animation: toTop .2s forwards;}.TIP span{font-size: 26px;color: rgb(255, 255, 255);position: absolute;top: 0px;right: 14px;cursor: pointer;}',
                wrap: that.QS('head')
            })
            setTimeout(function () {
                that.QS('#' + mdId).className += ' toTop'
            }, defaults.hideTime)
            setTimeout(function () {
                that.QS('#' + mdId).remove()
                that.QS('#' + styleId).remove()
            }, defaults.hideTime + 1000)
            that.QS('#' + mdId).children[0].addEventListener('click', function () {
                that.QS('#' + mdId).className += ' toTop'
            })

        },
        //格式化日期
        timeFormate: function (datetime, formatStr) {
            var dat = datetime;
            var str = formatStr;
            var Week = ['日', '一', '二', '三', '四', '五', '六'];
            str = str.replace(/yyyy|YYYY/, dat.getFullYear());
            str = str.replace(/yy|YY/, (dat.getYear() % 100) > 9 ? (dat.getYear() % 100).toString() : '0' + (dat.getYear() % 100));
            str = str.replace(/MM/, dat.getMonth() > 9 ? (dat.getMonth() + 1).toString() : '0' + (dat.getMonth() + 1));
            str = str.replace(/M/g, (dat.getMonth() + 1));
            str = str.replace(/w|W/g, Week[dat.getDay()]);
            str = str.replace(/dd|DD/, dat.getDate() > 9 ? dat.getDate().toString() : '0' + dat.getDate());
            str = str.replace(/d|D/g, dat.getDate());
            str = str.replace(/hh|HH/, dat.getHours() > 9 ? dat.getHours().toString() : '0' + dat.getHours());
            str = str.replace(/h|H/g, dat.getHours());
            str = str.replace(/mm/, dat.getMinutes() > 9 ? dat.getMinutes().toString() : '0' + dat.getMinutes());
            str = str.replace(/m/g, dat.getMinutes());
            str = str.replace(/ss|SS/, dat.getSeconds() > 9 ? dat.getSeconds().toString() : '0' + dat.getSeconds());
            str = str.replace(/s|S/g, dat.getSeconds());
            return str
        },
        //寻找dom
        QS: function (a) {
            return document.querySelector(a);
        },
        QSA: function (a) {
            return document.querySelectorAll(a);
        },
        //向dom添加元素
        append: function (op) {
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

    }

})(window);