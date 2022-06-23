$(function () {
    var mapFn = {
        at:0,
        map:null,
        startPng:'<img src="https://webapi.amap.com/theme/v1.3/markers/n/start.png"/>',
        passPng:'<img src="https://webapi.amap.com/theme/v1.3/markers/n/mid.png"/>',
        endPng:'<img src="https://webapi.amap.com/theme/v1.3/markers/n/end.png"/>',
        markerStart:null,
        markerEnd:null,
        marker1:null,
        marker2:null,
        marker3:null,
        polySta:null,
        polyEnd:null,
        poly1:null,
        poly2:null,
        poly3:null,

        originLngLat:[],
        endLngLat:[],
        pass1:[],
        pass2:[],
        pass3:[],
        driving:null,
        polyLine:null,
        data:null,
        points:[],
        remakes:[],
        searchMarker: null,
        dragPoints:[],
        posi:[],
        addr:null,

        init:function () {
            var that = this;
            this.map = new AMap.Map('container', {
                zoom:6,
                center: [116.397428, 39.90923],
                resizeEnable: true,
                viewMode:'3D'
            });
            this.map.addControl(new AMap.ToolBar())

            var autocomplete= new AMap.Autocomplete({
                city: "全国",
                input: "keyword"
            });
            var placeSearch = new AMap.PlaceSearch()
            AMap.event.addListener(autocomplete, "select", function(e){
                //针对选中的poi实现自己的功能
                placeSearch.search(e.poi.name,function (a,b) {
                    console.log(b)
                    if(a==='complete'){
                        that.posi = [b.poiList.pois[0].location.R,b.poiList.pois[0].location.Q]
                        that.addr = b.poiList.pois[0].name;
                        that.map.setZoomAndCenter(14, that.posi);
                        if(that.searchMarker !=  null){
                            that.map.remove(that.searchMarker);
                            that.searchMarker = null;
                        }

                        var content = '<div class="search_marker_box"><img src="//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png" width="25" /><img src="https://webapi.amap.com/images/close.gif" class="close_btn" /><div class="setType"><p asd="1">设为起点</p>';
                        if(!that.markerStart||!that.markerEnd){
                            content+='<p asd="2" style="pointer-events:none;color: #eeeeee;">设为关键点</p>'
                        }else{
                            content+='<p asd="2">设为关键点</p>'
                        }
                        if(!!that.marker1&&!!that.marker2&&!!that.marker3){
                            content+='<p asd="3" style="pointer-events:none;color: #eeeeee;">设为途径点</p>'
                        }else{
                            content+='<p asd="3">设为途径点</p>'
                        }
                        content+='<p asd="4">设为终点</p></div></div>'
                        that.searchMarker = new AMap.Marker({
                            content: content,
                            position: that.posi,
                            map:that.map
                        });

                        that.searchMarker.on("mouseover", function (e) {
                            $(".search_marker_box .close_btn").show();
                            $(".search_marker_box .close_btn").on('click', function(){
                                that.map.remove(that.searchMarker);
                                that.searchMarker = null;
                            })
                        })
                        that.searchMarker.on("click", function (e){
                            $(".search_marker_box .setType").show();
                        })
                    }
                })
            });
            this.selData()
            this.showData()
            this.clickFn()
        },
        //下拉框数据
        selData:function(){
            var that = this;
            $.ajax({
                url: '/emmp.PathPlanAction.do?CMD=getGeometryS',
                type: 'POST',
                dataType:'json',
                async:false,
                success: function(data) {
                    var res = data.data,
                        str = '';

                    if(res.length){
                        res.map(function (v) {
                            str += '<li>'+v.groupName+'</li>'
                        })
                        that.data = res;
                    }
                    _util.inputSelect('.inputSel',str)
                }
            });

        },
        //展示
        showData:function(){
            var that = this;
            var lineParams = JSON.parse(localStorage.getItem('lineParams'))
            if(!lineParams.id){//创建
                return
            }
            if(lineParams.type==='1'){//查看
                $('.inputSel').css('pointer-events','none');
                $('.mapPoint').prop('disabled',true);
                $('#lineName').prop('disabled',true);
                $('#saveLine').prop('disabled',true);
                $('#keyword').prop('disabled',true);
            }
            $.ajax({
                url: '/emmp.PathPlanAction.do?CMD=getInfo',
                type: 'GET',
                dataType:'json',
                // async:false,
                data:{
                    id:lineParams.id
                },
                success: function(data) {
                    $('#start_name input').val(data.start_name)
                    $('#end_name input').val(data.end_name)
                    $('#lineName').val(data.line_name)
                        $('#distance').html(data.distance/1000)
                    that.originLngLat = data.points[0]
                    that.endLngLat = data.points[data.points.length-1]
                    that.markerStart = new AMap.Marker({
                        content: that.startPng,
                        position:that.deepClone(that.originLngLat),
                        draggable:false,
                        zIndex:999
                    });
                    that.markerEnd = new AMap.Marker({
                        content: that.endPng,
                        position:that.deepClone(that.endLngLat),
                        draggable:false,
                        zIndex:999
                    });
                    that.map.add([that.markerStart,that.markerEnd])
                    if(data.routes.length){
                        data.routes.map(function (v) {
                            if(v.passType === 1){
                                $('#wayP1 input').val(v.groupName)
                                v.area.map(function (item) {
                                    if(item.type===1){
                                        that.pass1 = item.Arr[0];
                                        that.marker1 = new AMap.Marker({
                                            content: that.passPng,
                                            position:  that.deepClone(that.pass1),
                                            draggable:false,
                                            zIndex:999
                                        });
                                        that.map.add(that.marker1);
                                        that.dragPoints.push(item.Arr[0])
                                    }else if (item.type===99){
                                        that.pass1 = item.Arr;
                                        that.marker1 = new AMap.Marker({
                                            content: that.passPng,
                                            position:  that.deepClone(that.pass1),
                                            draggable:false,
                                            zIndex:999
                                        });
                                        that.map.add(that.marker1);
                                        that.dragPoints.push(item.Arr)
                                    }else{
                                        that.poly1 = new AMap.Polygon({
                                            path: that.deepClone(item.Arr),
                                            strokeColor: "#FF33FF",
                                            strokeWeight: 6,
                                            strokeOpacity: 0.5,
                                            fillOpacity: 0.5,
                                            fillColor: '#1791fc',
                                            zIndex: 50,
                                        })
                                        that.map.add(that.poly1);
                                    }
                                })
                            }else if (v.passType === 2) {
                                $('#wayP2 input').val(v.groupName)
                                v.area.map(function (item) {
                                    if(item.type===1){
                                        that.pass2 = item.Arr[0];
                                        that.marker2 = new AMap.Marker({
                                            content: that.passPng,
                                            position:  that.deepClone(that.pass2),
                                            draggable:false,
                                            zIndex:999
                                        });
                                        that.map.add(that.marker2);
                                        that.dragPoints.push(item.Arr[0])
                                    }else if (item.type===99){
                                        that.pass2 = item.Arr;
                                        that.marker2 = new AMap.Marker({
                                            content: that.passPng,
                                            position:  that.deepClone(that.pass2),
                                            draggable:false,
                                            zIndex:999
                                        });
                                        that.map.add(that.marker2);
                                        that.dragPoints.push(item.Arr)
                                    }else{
                                        that.poly2 = new AMap.Polygon({
                                            path: that.deepClone(item.Arr),
                                            strokeColor: "#FF33FF",
                                            strokeWeight: 6,
                                            strokeOpacity: 0.5,
                                            fillOpacity: 0.5,
                                            fillColor: '#1791fc',
                                            zIndex: 50,
                                        })
                                        that.map.add(that.poly2);
                                    }
                                })
                            }else if(v.passType === 3){
                                $('#wayP3 input').val(v.groupName)
                                v.area.map(function (item) {
                                    if(item.type===1){
                                        that.pass3 = item.Arr[0];
                                        that.marker3 = new AMap.Marker({
                                            content: that.passPng,
                                            position:  that.deepClone(that.pass3),
                                            draggable:false,
                                            zIndex:999
                                        });
                                        that.map.add(that.marker3);
                                        that.dragPoints.push(item.Arr[0])
                                    }else if (item.type===99){
                                        that.pass3 = item.Arr;
                                        that.marker3 = new AMap.Marker({
                                            content: that.passPng,
                                            position:  that.deepClone(that.pass3),
                                            draggable:false,
                                            zIndex:999
                                        });
                                        that.map.add(that.marker3);
                                        that.dragPoints.push(item.Arr)
                                    }else{
                                        that.poly3 = new AMap.Polygon({
                                            path: that.deepClone(item.Arr),
                                            strokeColor: "#FF33FF",
                                            strokeWeight: 6,
                                            strokeOpacity: 0.5,
                                            fillOpacity: 0.5,
                                            fillColor: '#1791fc',
                                            zIndex: 50,
                                        })
                                        that.map.add(that.poly3);
                                    }
                                })
                            }else{
                                v.area.map(function (item) {
                                    if(item.type===1){
                                        that.dragPoints.push(item.Arr[0])
                                    }else if (item.type===99){
                                        that.dragPoints.push(item.Arr)
                                    }
                                })
                            }

                        })
                    }
                    that.drawLine()
                }
            });
        },
        //点击事件
        clickFn:function () {
            var that = this;
            //展开与收起
            $('#showSmall').click(function () {
                $('.spread-box').show(300)
                $('.lineset-modal').hide(300)
            })
            $('.spread-box').click(function () {
                $(this).hide(300)
                $('.lineset-modal').show(300)
            })
            $('.remake-shouqi').click(function () {
                $('.spread-box1').show(300)
                $('.data-box').hide(300)
            })
            $('.spread-box1').click(function () {
                $(this).hide(300)
                $('.data-box').show(300)
            })


            //全局获取当前点击的地图标点按钮，地图点击
            $('.mapPoint').click(function () {
                that.at = $(this).attr('at');
                that.mapClick();
            })
            //下拉框选点
            $(document).on('click','.inputSel li',function () {
                var at = $(this).parent().parent().siblings('.mapPoint').attr('at'),
                    val = $(this).html();
                    that.selClick(at,val)
            })
            //去点
            $(document).on('click','.inputSel span',function () {
                var at = $(this).parent().siblings('.mapPoint').attr('at');
                that.delPoint(at);
            })

            $('#saveLine').click(function () {
                if(!that.originLngLat.length||!that.endLngLat.length||!$('#lineName').val()){
                    _util.messageBox({
                        ele:'#lineForm',
                        message:'请填写星号必填项！'
                    })
                    return false;
                }
                that.saveLine()
            })
            $(document).on('click','.setType>p',function (){
                var asd = $(this).attr('asd');
                switch (asd) {
                    case '1':
                        if(!!that.markerStart){
                            that.map.remove(that.markerStart)
                            that.markerStart=null;
                        }
                        if(!!that.polySta){
                            that.map.remove(that.polySta)
                            that.polySta=null;
                        }
                        that.markerStart = new AMap.Marker({
                            content: that.startPng,
                            position:  that.deepClone(that.posi),
                            draggable:false,
                            zIndex:999
                        });
                        that.map.add(that.markerStart);
                        that.originLngLat = that.deepClone(that.posi);
                        $('#start_name input').val(that.addr);
                        break;
                    case '2':
                        if(that.dragPoints.length){
                            var copy = that.deepClone(that.dragPoints);
                            copy.unshift(that.originLngLat)
                            var arr = copy.map(function (v,i) {
                                return {
                                    distance:AMap.GeometryUtil.distance(that.posi,v),
                                    po:i
                                }
                            })
                            var min = Math.min.apply(null,arr.map(function (v) { return v.distance }))
                            arr.map(function (v) {
                                if(v.distance==min){
                                    that.dragPoints.splice(v.po,0,that.posi)
                                }
                            })
                        }else{
                            that.dragPoints.push(that.posi)
                        }
                        break;
                    case '3':
                        if(that.dragPoints.length){
                            if(!that.marker1){
                                if(!!that.marker2){
                                    var copy = that.deepClone(that.dragPoints);
                                    copy.unshift(that.originLngLat)
                                    var indexs = null;
                                    copy.map(function (v,i) {
                                        if(JSON.stringify(v)==JSON.stringify(that.pass2)){
                                            indexs=i
                                        }
                                    })
                                    var copy1 = copy.slice(0,indexs);
                                    var copy2 = copy.slice(indexs,copy.length)
                                    var arr = copy1.map(function (v,i) {
                                        return {
                                            distance:AMap.GeometryUtil.distance(that.posi,v),
                                            po:i
                                        }
                                    })
                                    var min = Math.min.apply(null,arr.map(function (v) { return v.distance }))
                                    arr.map(function (v) {
                                        if(v.distance==min){
                                            copy1.splice(v.po+1,0,that.posi)
                                        }
                                    })
                                    that.dragPoints = copy1.concat(copy2).shift()
                                    return
                                }
                                if(!!that.marker3){
                                    var copy = that.deepClone(that.dragPoints);
                                    copy.unshift(that.originLngLat)
                                    var indexs = null;
                                    copy.map(function (v,i) {
                                        if(JSON.stringify(v)==JSON.stringify(that.pass3)){
                                            indexs=i
                                        }
                                    })
                                    var copy1 = copy.slice(0,indexs);
                                    var copy2 = copy.slice(indexs,copy.length)
                                    var arr = copy1.map(function (v,i) {
                                        return {
                                            distance:AMap.GeometryUtil.distance(that.posi,v),
                                            po:i
                                        }
                                    })
                                    var min = Math.min.apply(null,arr.map(function (v) { return v.distance }))
                                    arr.map(function (v) {
                                        if(v.distance==min){
                                            copy1.splice(v.po+1,0,that.posi)
                                        }
                                    })
                                    that.dragPoints = copy1.concat(copy2).shift()
                                    return
                                }
                                var copy = that.deepClone(that.dragPoints);
                                copy.unshift(that.originLngLat)
                                var arr = copy.map(function (v,i) {
                                    return {
                                        distance:AMap.GeometryUtil.distance(that.posi,v),
                                        po:i
                                    }
                                })
                                var min = Math.min.apply(null,arr.map(function (v) { return v.distance }))
                                arr.map(function (v) {
                                    if(v.distance==min){
                                        copy.splice(v.po+1,0,that.posi)
                                    }
                                })
                                that.dragPoints = copy.shift()
                            }else if(!that.marker2){
                                if(!that.marker3){
                                    var copy = that.deepClone(that.dragPoints);
                                    var indexs = null;
                                    copy.map(function (v,i) {
                                        if(JSON.stringify(v)==JSON.stringify(that.pass1)){
                                            indexs=i
                                        }
                                    })
                                    var copy1 = copy.slice(0,indexs);
                                    var copy2 = copy.slice(indexs,copy.length)
                                    var arr = copy2.map(function (v,i) {
                                        return {
                                            distance:AMap.GeometryUtil.distance(that.posi,v),
                                            po:i
                                        }
                                    })
                                    var min = Math.min.apply(null,arr.map(function (v) { return v.distance }))
                                    arr.map(function (v) {
                                        if(v.distance==min){
                                            copy2.splice(v.po+1,0,that.posi)
                                        }
                                    })
                                    that.dragPoints = copy1.concat(copy2)
                                }else{
                                    var copy = that.deepClone(that.dragPoints);
                                    var indexs1 = null,indexs2=null;
                                    copy.map(function (v,i) {
                                        if(JSON.stringify(v)==JSON.stringify(that.pass1)){
                                            indexs1=i
                                        }
                                    })
                                    copy.map(function (v,i) {
                                        if(JSON.stringify(v)==JSON.stringify(that.pass3)){
                                            indexs2=i
                                        }
                                    })
                                    var copy1 = copy.slice(0,indexs1);
                                    var copy2 = copy.slice(indexs1,indexs2)
                                    var copy3 = copy.slice(indexs2,copy.length)
                                    var arr = copy2.map(function (v,i) {
                                        return {
                                            distance:AMap.GeometryUtil.distance(that.posi,v),
                                            po:i
                                        }
                                    })
                                    var min = Math.min.apply(null,arr.map(function (v) { return v.distance }))
                                    arr.map(function (v) {
                                        if(v.distance==min){
                                            copy2.splice(v.po+1,0,that.posi)
                                        }
                                    })
                                    that.dragPoints = copy1.concat(copy2).concat(copy3)
                                }
                            }else if(!that.marker3){
                                var copy = that.deepClone(that.dragPoints);
                                var indexs = null;
                                copy.map(function (v,i) {
                                    if(JSON.stringify(v)==JSON.stringify(that.pass2)){
                                        indexs=i
                                    }
                                })
                                var copy1 = copy.slice(0,indexs);
                                var copy2 = copy.slice(indexs,copy.length)
                                var arr = copy2.map(function (v,i) {
                                    return {
                                        distance:AMap.GeometryUtil.distance(that.posi,v),
                                        po:i
                                    }
                                })
                                var min = Math.min.apply(null,arr.map(function (v) { return v.distance }))
                                arr.map(function (v) {
                                    if(v.distance==min){
                                        copy2.splice(v.po+1,0,that.posi)
                                    }
                                })
                                that.dragPoints = copy1.concat(copy2)
                            }
                        }else{
                            that.dragPoints.push(that.posi)
                        }

                        if(!that.marker1){
                            that.marker1 = new AMap.Marker({
                                content: that.passPng,
                                position:  that.deepClone(that.posi),
                                draggable:false,
                                zIndex:999
                            });
                            that.map.add(that.marker1);
                            that.pass1 = that.posi;
                            $('#wayP1 input').val(that.addr);
                        }else if(!that.marker2){
                            that.marker2 = new AMap.Marker({
                                content: that.passPng,
                                position:  that.deepClone(that.posi),
                                draggable:false,
                                zIndex:999
                            });
                            that.map.add(that.marker2);
                            that.pass2 = that.posi;
                            $('#wayP2 input').val(that.addr);
                        }else if(!that.marker3){
                            that.marker3 = new AMap.Marker({
                                content: that.passPng,
                                position:  that.deepClone(that.posi),
                                draggable:false,
                                zIndex:999
                            });
                            that.map.add(that.marker3);
                            that.pass3 = that.posi;
                            $('#wayP3 input').val(that.addr);
                        }
                        break;
                    case '4':
                        if(!!that.markerEnd){
                            that.map.remove(that.markerEnd)
                            that.markerEnd=null;
                        }
                        if(!!that.polyEnd){
                            that.map.remove(that.polyEnd)
                            that.polyEnd=null;
                        }
                        that.markerEnd = new AMap.Marker({
                            content: that.endPng,
                            position:  that.deepClone(that.posi),
                            draggable:false,
                            zIndex:999
                        });
                        that.map.add(that.markerEnd);
                        that.endLngLat = that.posi;
                        $('#end_name input').val(that.addr);
                        break;
                    default:
                        break;
                }
                if(that.searchMarker !=  null){
                    that.map.remove(that.searchMarker);
                    that.searchMarker = null;
                }
                that.map.setFitView()
                that.drawLine()
            })
        },
        //保存
        saveLine:function(){
            var that = this;
            var routes = [];
            that.dragPoints.map(function (item) {
                if(that.pass1.length&&JSON.stringify(that.pass1) == JSON.stringify(item)){
                    if(!that.poly1){
                        routes.push({
                            "area": [{
                                "Arr": [
                                    that.pass1
                                ],
                                "code": "",
                                "name": "",
                                "type": 99
                            }],
                            "groupName": $('#wayP1 input').val(),
                            "groupId":'',
                            "passType":1
                        })
                    }else{
                        that.data.map(function (v) {
                            if(v.groupName === $('#wayP1 input').val()){
                                v.passType = 1
                                routes.push(v)
                            }
                        })
                    }
                }else if(that.pass2.length&&JSON.stringify(that.pass2) == JSON.stringify(item)){
                    if(!that.poly2){
                        routes.push({
                            "area": [{
                                "Arr": [
                                    that.pass2
                                ],
                                "code": "",
                                "name": "",
                                "type": 99
                            }],
                            "groupName": $('#wayP2 input').val(),
                            "groupId":'',
                            "passType":2
                        })
                    }else{
                        that.data.map(function (v) {
                            if(v.groupName === $('#wayP2 input').val()){
                                v.passType = 2
                                routes.push(v)
                            }
                        })
                    }
                }else if(that.pass3.length&&JSON.stringify(that.pass3) == JSON.stringify(item)){
                    if(!that.poly3){
                        routes.push({
                            "area": [{
                                "Arr": [
                                    that.pass3
                                ],
                                "code": "",
                                "name": "",
                                "type": 99
                            }],
                            "groupName": $('#wayP3 input').val(),
                            "groupId":'',
                            "passType":3
                        })
                    }else{
                        that.data.map(function (v) {
                            if(v.groupName === $('#wayP3 input').val()){
                                v.passType = 3
                                routes.push(v)
                            }
                        })
                    }
                }else{
                    routes.push({
                        "area": [{
                            "Arr": [
                                item
                            ],
                            "code": "",
                            "name": "",
                            "type": 99
                        }],
                        "groupName": '',
                        "groupId":'',
                        "passType":''
                    })
                }

            })
            console.log(routes)
            var lineParams = JSON.parse(localStorage.getItem('lineParams'))
            $.ajax({
                url: '/emmp.PathPlanAction.do?CMD=save',
                type: 'POST',
                dataType:'json',
                // traditional:true,
                // async:false,
                // contentType: "application/json; charset=utf-8",
                data:{data1:encodeURI(JSON.stringify({
                        id:lineParams.id?lineParams.id:'',
                        type:2,
                        points:that.points,
                        remakes:that.remakes,
                        start_name:$('#start_name input').val(),
                        end_name:$('#end_name input').val(),
                        routes:routes,
                        avoids:[],
                        line_name:$('#lineName').val(),
                        distance:$('#distance').html()*1000
                    })).valueOf()
                },
                success: function(data) {
                    if(data.msg==='ok'){
                        _util.tipBox({
                            message:'保存成功！'
                        })
                        // history.go(-1);
                    }else if(data.msg==='该路线名称已存在，请修改路线名称'){
                        _util.tipBox({
                            message:'该路线名称已存在，请修改路线名称！'
                        })
                    }else{
                        _util.tipBox({
                            message:'保存失败！'
                        })
                    }
                }
            });
        },
        //点击×按钮
        delPoint:function(at){
            var that = this;

            switch (at) {
                case '0':
                    if(!!that.markerStart){
                        that.map.remove(that.markerStart)
                        that.markerStart=null;
                    }
                    if(!!that.polySta){
                        that.map.remove(that.polySta)
                        that.polySta=null;
                    }
                    that.originLngLat = [];
                    break;
                case '1':
                    if(!!that.markerEnd){
                        that.map.remove(that.markerEnd)
                        that.markerEnd=null;
                    }
                    if(!!that.polyEnd){
                        that.map.remove(that.polyEnd)
                        that.polyEnd=null;
                    }
                    that.endLngLat = [];
                    break;
                case '2':
                    if(!!that.marker1){
                        that.map.remove(that.marker1)
                        that.marker1=null;
                        if(that.dragPoints.length){
                            that.dragPoints.map(function (v,i) {
                                if(JSON.stringify(v)===JSON.stringify(that.pass1)){
                                    that.dragPoints.splice(i,1)
                                }
                            })
                        }
                    }
                    if(!!that.poly1){
                        that.map.remove(that.poly1)
                        that.poly1=null;
                    }
                    that.pass1 = [];
                    break;
                case '3':
                    if(!!that.marker2){
                        that.map.remove(that.marker2)
                        that.marker2=null;
                        if(that.dragPoints.length) {
                            console.log(that.dragPoints,that.pass2)
                            that.dragPoints.map(function (v, i) {
                                if (JSON.stringify(v) === JSON.stringify(that.pass2)) {
                                    that.dragPoints.splice(i, 1)
                                }
                            })
                        }
                    }
                    if(!!that.poly2){
                        that.map.remove(that.poly2)
                        that.poly2=null;
                    }
                    that.pass2 = [];
                    break;
                case '4':
                    if(!!that.marker3){
                        that.map.remove(that.marker3)
                        that.marker3=null;
                        if(that.dragPoints.length) {
                            that.dragPoints.map(function (v, i) {
                                if (JSON.stringify(v) === JSON.stringify(that.pass3)) {
                                    that.dragPoints.splice(i, 1)
                                }
                            })
                        }
                    }
                    if(!!that.poly3){
                        that.map.remove(that.poly3)
                        that.poly3=null;
                    }
                    that.pass3 = [];
                    break;
            }
            that.drawLine()
        },
        //下拉框选项选中
        selClick:function(at,val){
            var that = this;
            var lngLat,
                avoidA;
            that.data.map(function (v) {
                if(v.groupName === val){
                    v.area.map(function (item) {
                        item.type === 1 ? (lngLat = item.Arr[0]) : (avoidA = item.Arr);
                    })
                }
            })
            switch (at) {
                case '0':
                    if(!!that.markerStart){
                        that.map.remove(that.markerStart)
                        that.markerStart=null;
                    }
                    if(!!that.polySta){
                        that.map.remove(that.polySta)
                        that.polySta=null;
                    }
                    that.markerStart = new AMap.Marker({
                        content: that.startPng,
                        position:  that.deepClone(lngLat),
                        draggable:false,
                        zIndex:999
                    });
                    that.polySta = new AMap.Polygon({
                        path: that.deepClone(avoidA),
                        strokeColor: "#FF33FF",
                        strokeWeight: 6,
                        strokeOpacity: 0.5,
                        fillOpacity: 0.5,
                        fillColor: '#1791fc',
                        zIndex: 50,
                    })
                    that.map.add([that.markerStart,that.polySta]);
                    that.originLngLat = lngLat;
                    break;
                case '1':
                    if(!!that.markerEnd){
                        that.map.remove(that.markerEnd)
                        that.markerEnd=null;
                    }
                    if(!!that.polyEnd){
                        that.map.remove(that.polyEnd)
                        that.polyEnd=null;
                    }
                    that.markerEnd = new AMap.Marker({
                        content: that.endPng,
                        position: that.deepClone(lngLat),
                        draggable:false,
                        zIndex:999
                    });
                    that.polyEnd = new AMap.Polygon({
                        path: that.deepClone(avoidA),
                        strokeColor: "#FF33FF",
                        strokeWeight: 6,
                        strokeOpacity: 0.5,
                        fillOpacity: 0.5,
                        fillColor: '#1791fc',
                        zIndex: 50,
                    })
                    that.map.add([that.markerEnd,that.polyEnd]);
                    that.endLngLat = lngLat;
                    break;
                case '2':
                    if(!!that.marker1){
                        that.map.remove(that.marker1)
                        that.marker1=null;
                        if(that.dragPoints.length){
                            that.dragPoints.map(function (v,i) {
                                if(JSON.stringify(v)===JSON.stringify(that.pass1)){
                                    that.dragPoints.splice(i,1,lngLat)
                                }
                            })
                        }
                    }else{
                        if(that.dragPoints.length){
                            if(!!that.marker2){
                                var copy = that.deepClone(that.dragPoints);
                                copy.unshift(that.originLngLat)
                                var indexs = null;
                                copy.map(function (v,i) {
                                    if(JSON.stringify(v)==JSON.stringify(that.pass2)){
                                        indexs=i
                                    }
                                })
                                var copy1 = copy.slice(0,indexs);
                                var copy2 = copy.slice(indexs,copy.length)
                                var arr = copy1.map(function (v,i) {
                                    return {
                                        distance:AMap.GeometryUtil.distance(lngLat,v),
                                        po:i
                                    }
                                })
                                var min = Math.min.apply(null,arr.map(function (v) { return v.distance }))
                                arr.map(function (v) {
                                    if(v.distance==min){
                                        copy1.splice(v.po+1,0,lngLat)
                                    }
                                })
                                that.dragPoints = copy1.concat(copy2).shift()
                                return
                            }
                            if(!!that.marker3){
                                var copy = that.deepClone(that.dragPoints);
                                copy.unshift(that.originLngLat)
                                var indexs = null;
                                copy.map(function (v,i) {
                                    if(JSON.stringify(v)==JSON.stringify(that.pass3)){
                                        indexs=i
                                    }
                                })
                                var copy1 = copy.slice(0,indexs);
                                var copy2 = copy.slice(indexs,copy.length)
                                var arr = copy1.map(function (v,i) {
                                    return {
                                        distance:AMap.GeometryUtil.distance(lngLat,v),
                                        po:i
                                    }
                                })
                                var min = Math.min.apply(null,arr.map(function (v) { return v.distance }))
                                arr.map(function (v) {
                                    if(v.distance==min){
                                        copy1.splice(v.po+1,0,lngLat)
                                    }
                                })
                                that.dragPoints = copy1.concat(copy2).shift()
                                return
                            }
                            var copy = that.deepClone(that.dragPoints);
                            copy.unshift(that.originLngLat)
                            var arr = copy.map(function (v,i) {
                                return {
                                    distance:AMap.GeometryUtil.distance(lngLat,v),
                                    po:i
                                }
                            })
                            var min = Math.min.apply(null,arr.map(function (v) { return v.distance }))
                            arr.map(function (v) {
                                if(v.distance==min){
                                    copy.splice(v.po+1,0,lngLat)
                                }
                            })
                            that.dragPoints = copy.shift()
                        }
                    }
                    if(!!that.poly1){
                        that.map.remove(that.poly1)
                        that.poly1=null;
                    }
                    that.marker1 = new AMap.Marker({
                        content: that.passPng,
                        position:  that.deepClone(lngLat),
                        draggable:false,
                        zIndex:999
                    });
                    that.poly1 = new AMap.Polygon({
                        path: that.deepClone(avoidA),
                        strokeColor: "#FF33FF",
                        strokeWeight: 6,
                        strokeOpacity: 0.5,
                        fillOpacity: 0.5,
                        fillColor: '#1791fc',
                        zIndex: 50,
                    })
                    that.map.add([that.marker1,that.poly1]);
                    that.pass1 = lngLat;
                    break;
                case '3':
                    if(!!that.marker2){
                        that.map.remove(that.marker2)
                        that.marker2=null;
                        if(that.dragPoints.length){
                            that.dragPoints.map(function (v,i) {
                                if(JSON.stringify(v)===JSON.stringify(that.pass2)){
                                    that.dragPoints.splice(i,1,lngLat)
                                }
                            })
                        }
                    }else{
                        if(that.dragPoints.length){
                            if(!!that.marker1&&!!that.marker3){
                                var copy = that.deepClone(that.dragPoints);
                                var indexs1 = null,indexs2=null;
                                copy.map(function (v,i) {
                                    if(JSON.stringify(v)==JSON.stringify(that.pass1)){
                                        indexs1=i
                                    }
                                })
                                copy.map(function (v,i) {
                                    if(JSON.stringify(v)==JSON.stringify(that.pass3)){
                                        indexs2=i
                                    }
                                })
                                var copy1 = copy.slice(0,indexs1);
                                var copy2 = copy.slice(indexs1,indexs2)
                                var copy3 = copy.slice(indexs2,copy.length)
                                var arr = copy2.map(function (v,i) {
                                    return {
                                        distance:AMap.GeometryUtil.distance(lngLat,v),
                                        po:i
                                    }
                                })
                                var min = Math.min.apply(null,arr.map(function (v) { return v.distance }))
                                arr.map(function (v) {
                                    if(v.distance==min){
                                        copy2.splice(v.po+1,0,lngLat)
                                    }
                                })
                                that.dragPoints = copy1.concat(copy2).concat(copy3)
                                return
                            }
                            if(!!that.marker1){
                                var copy = that.deepClone(that.dragPoints);
                                var indexs = null;
                                copy.map(function (v,i) {
                                    if(JSON.stringify(v)==JSON.stringify(that.pass1)){
                                        indexs=i
                                    }
                                })
                                var copy1 = copy.slice(0,indexs);
                                var copy2 = copy.slice(indexs,copy.length)
                                var arr = copy2.map(function (v,i) {
                                    return {
                                        distance:AMap.GeometryUtil.distance(lngLat,v),
                                        po:i
                                    }
                                })
                                var min = Math.min.apply(null,arr.map(function (v) { return v.distance }))
                                arr.map(function (v) {
                                    if(v.distance==min){
                                        copy2.splice(v.po+1,0,lngLat)
                                    }
                                })
                                that.dragPoints = copy1.concat(copy2)
                                return
                            }
                            if(!!that.marker3){
                                var copy = that.deepClone(that.dragPoints);
                                copy.unshift(that.originLngLat)
                                var indexs = null;
                                copy.map(function (v,i) {
                                    if(JSON.stringify(v)==JSON.stringify(that.pass3)){
                                        indexs=i
                                    }
                                })
                                var copy1 = copy.slice(0,indexs);
                                var copy2 = copy.slice(indexs,copy.length)
                                var arr = copy1.map(function (v,i) {
                                    return {
                                        distance:AMap.GeometryUtil.distance(lngLat,v),
                                        po:i
                                    }
                                })
                                var min = Math.min.apply(null,arr.map(function (v) { return v.distance }))
                                arr.map(function (v) {
                                    if(v.distance==min){
                                        copy1.splice(v.po+1,0,lngLat)
                                    }
                                })
                                that.dragPoints = copy1.concat(copy2).shift()
                                return
                            }
                            var copy = that.deepClone(that.dragPoints);
                            copy.unshift(that.originLngLat)
                            var arr = copy.map(function (v,i) {
                                return {
                                    distance:AMap.GeometryUtil.distance(lngLat,v),
                                    po:i
                                }
                            })
                            var min = Math.min.apply(null,arr.map(function (v) { return v.distance }))
                            arr.map(function (v) {
                                if(v.distance==min){
                                    copy.splice(v.po+1,0,lngLat)
                                }
                            })
                            that.dragPoints = copy.shift()
                        }
                    }
                    if(!!that.poly2){
                        that.map.remove(that.poly2)
                        that.poly2=null;
                    }
                    that.marker2 = new AMap.Marker({
                        content: that.passPng,
                        position:  that.deepClone(lngLat),
                        draggable:false,
                        zIndex:999
                    });
                    that.poly2 = new AMap.Polygon({
                        path: that.deepClone(avoidA),
                        strokeColor: "#FF33FF",
                        strokeWeight: 6,
                        strokeOpacity: 0.5,
                        fillOpacity: 0.5,
                        fillColor: '#1791fc',
                        zIndex: 50,
                    })
                    that.map.add([that.marker2,that.poly2]);
                    that.pass2 = lngLat;
                    break;
                case '4':
                    if(!!that.marker3){
                        that.map.remove(that.marker3)
                        that.marker3=null;
                        if(that.dragPoints.length){
                            that.dragPoints.map(function (v,i) {
                                if(JSON.stringify(v)===JSON.stringify(that.pass3)){
                                    that.dragPoints.splice(i,1,lngLat)
                                }
                            })
                        }
                    }else{
                        if(that.dragPoints.length){
                            if(!!that.marker2){
                                var copy = that.deepClone(that.dragPoints);
                                var indexs = null;
                                copy.map(function (v,i) {
                                    if(JSON.stringify(v)==JSON.stringify(that.pass2)){
                                        indexs=i
                                    }
                                })
                                var copy1 = copy.slice(0,indexs);
                                var copy2 = copy.slice(indexs,copy.length)
                                var arr = copy2.map(function (v,i) {
                                    return {
                                        distance:AMap.GeometryUtil.distance(lngLat,v),
                                        po:i
                                    }
                                })
                                var min = Math.min.apply(null,arr.map(function (v) { return v.distance }))
                                arr.map(function (v) {
                                    if(v.distance==min){
                                        copy2.splice(v.po+1,0,lngLat)
                                    }
                                })
                                that.dragPoints = copy1.concat(copy2)
                                return
                            }
                            if(!!that.marker1){
                                var copy = that.deepClone(that.dragPoints);
                                var indexs = null;
                                copy.map(function (v,i) {
                                    if(JSON.stringify(v)==JSON.stringify(that.pass1)){
                                        indexs=i
                                    }
                                })
                                var copy1 = copy.slice(0,indexs);
                                var copy2 = copy.slice(indexs,copy.length)
                                var arr = copy2.map(function (v,i) {
                                    return {
                                        distance:AMap.GeometryUtil.distance(lngLat,v),
                                        po:i
                                    }
                                })
                                var min = Math.min.apply(null,arr.map(function (v) { return v.distance }))
                                arr.map(function (v) {
                                    if(v.distance==min){
                                        copy2.splice(v.po+1,0,lngLat)
                                    }
                                })
                                that.dragPoints = copy1.concat(copy2)
                                return
                            }
                            var copy = that.deepClone(that.dragPoints);
                            copy.unshift(that.originLngLat)
                            var arr = copy.map(function (v,i) {
                                return {
                                    distance:AMap.GeometryUtil.distance(lngLat,v),
                                    po:i
                                }
                            })
                            var min = Math.min.apply(null,arr.map(function (v) { return v.distance }))
                            arr.map(function (v) {
                                if(v.distance==min){
                                    copy.splice(v.po+1,0,lngLat)
                                }
                            })
                            that.dragPoints = copy.shift()
                        }
                    }
                    if(!!that.poly3){
                        that.map.remove(that.poly3)
                        that.poly3=null;
                    }
                    that.marker3 = new AMap.Marker({
                        content: that.passPng,
                        position:  that.deepClone(lngLat),
                        draggable:false,
                        zIndex:999
                    });
                    that.poly3 = new AMap.Polygon({
                        path: that.deepClone(avoidA),
                        strokeColor: "#FF33FF",
                        strokeWeight: 6,
                        strokeOpacity: 0.5,
                        fillOpacity: 0.5,
                        fillColor: '#1791fc',
                        zIndex: 50,
                    })
                    that.map.add([that.marker3,that.poly3]);
                    that.pass3 = lngLat;
                    break;
            }
            that.map.setFitView()
            that.drawLine()
        },
        //地图点击
        mapClick:function () {
            var that = this;
            var fn = function(ev) {
                var lngLat = [ev.lnglat.R, ev.lnglat.Q];
                switch (that.at) {
                    case '0':
                        if(!!that.markerStart){
                            that.map.remove(that.markerStart)
                            that.markerStart=null;
                        }
                        if(!!that.polySta){
                            that.map.remove(that.polySta)
                            that.polySta=null;
                        }
                        that.markerStart = new AMap.Marker({
                            content: that.startPng,
                            position:  that.deepClone(lngLat),
                            draggable:false,
                            zIndex:999
                        });
                        that.map.add(that.markerStart);
                        that.originLngLat = lngLat;
                        that.geocoderFn(lngLat);
                        break;
                    case '1':
                        if(!!that.markerEnd){
                            that.map.remove(that.markerEnd)
                            that.markerEnd=null;
                        }
                        if(!!that.polyEnd){
                            that.map.remove(that.polyEnd)
                            that.polyEnd=null;
                        }
                        that.markerEnd = new AMap.Marker({
                            content: that.endPng,
                            position:  that.deepClone(lngLat),
                            draggable:false,
                            zIndex:999
                        });
                        that.map.add(that.markerEnd);
                        that.endLngLat = lngLat;
                        that.geocoderFn(lngLat);
                        break;
                    case '2':
                        if(!!that.marker1){
                            that.map.remove(that.marker1)
                            that.marker1=null;
                            if(that.dragPoints.length){
                                that.dragPoints.map(function (v,i) {
                                    if(JSON.stringify(v)===JSON.stringify(that.pass1)){
                                        that.dragPoints.splice(i,1,lngLat)
                                    }
                                })
                            }
                        }else{
                            if(that.dragPoints.length){
                                if(!!that.marker2){
                                    var copy = that.deepClone(that.dragPoints);
                                    copy.unshift(that.originLngLat)
                                    var indexs = null;
                                    copy.map(function (v,i) {
                                        if(JSON.stringify(v)==JSON.stringify(that.pass2)){
                                            indexs=i
                                        }
                                    })
                                    var copy1 = copy.slice(0,indexs);
                                    var copy2 = copy.slice(indexs,copy.length)
                                    var arr = copy1.map(function (v,i) {
                                        return {
                                            distance:AMap.GeometryUtil.distance(lngLat,v),
                                            po:i
                                        }
                                    })
                                    var min = Math.min.apply(null,arr.map(function (v) { return v.distance }))
                                    arr.map(function (v) {
                                        if(v.distance==min){
                                            copy1.splice(v.po+1,0,lngLat)
                                        }
                                    })
                                    that.dragPoints = copy1.concat(copy2).shift()
                                    return
                                }
                                if(!!that.marker3){
                                    var copy = that.deepClone(that.dragPoints);
                                    copy.unshift(that.originLngLat)
                                    var indexs = null;
                                    copy.map(function (v,i) {
                                        if(JSON.stringify(v)==JSON.stringify(that.pass3)){
                                            indexs=i
                                        }
                                    })
                                    var copy1 = copy.slice(0,indexs);
                                    var copy2 = copy.slice(indexs,copy.length)
                                    var arr = copy1.map(function (v,i) {
                                        return {
                                            distance:AMap.GeometryUtil.distance(lngLat,v),
                                            po:i
                                        }
                                    })
                                    var min = Math.min.apply(null,arr.map(function (v) { return v.distance }))
                                    arr.map(function (v) {
                                        if(v.distance==min){
                                            copy1.splice(v.po+1,0,lngLat)
                                        }
                                    })
                                    that.dragPoints = copy1.concat(copy2).shift()
                                    return
                                }
                                var copy = that.deepClone(that.dragPoints);
                                copy.unshift(that.originLngLat)
                                var arr = copy.map(function (v,i) {
                                    return {
                                        distance:AMap.GeometryUtil.distance(lngLat,v),
                                        po:i
                                    }
                                })
                                var min = Math.min.apply(null,arr.map(function (v) { return v.distance }))
                                arr.map(function (v) {
                                    if(v.distance==min){
                                        copy.splice(v.po+1,0,lngLat)
                                    }
                                })
                                that.dragPoints = copy.shift()
                            }
                        }
                        if(!!that.poly1){
                            that.map.remove(that.poly1)
                            that.poly1=null;
                        }
                        that.marker1 = new AMap.Marker({
                            content: that.passPng,
                            position:  that.deepClone(lngLat),
                            draggable:false,
                            zIndex:999
                        });
                        that.map.add(that.marker1);
                        that.pass1 = lngLat;
                        that.geocoderFn(lngLat);
                        // that.dragPoints=[]
                        break;
                    case '3':
                        if(!!that.marker2){
                            that.map.remove(that.marker2)
                            that.marker2=null;
                            if(that.dragPoints.length){
                                that.dragPoints.map(function (v,i) {
                                    if(JSON.stringify(v)===JSON.stringify(that.pass2)){
                                        that.dragPoints.splice(i,1,lngLat)
                                    }
                                })
                            }
                        }else{
                            if(that.dragPoints.length){
                                if(!!that.marker1&&!!that.marker3){
                                    var copy = that.deepClone(that.dragPoints);
                                    var indexs1 = null,indexs2=null;
                                    copy.map(function (v,i) {
                                        if(JSON.stringify(v)==JSON.stringify(that.pass1)){
                                            indexs1=i
                                        }
                                    })
                                    copy.map(function (v,i) {
                                        if(JSON.stringify(v)==JSON.stringify(that.pass3)){
                                            indexs2=i
                                        }
                                    })
                                    var copy1 = copy.slice(0,indexs1);
                                    var copy2 = copy.slice(indexs1,indexs2)
                                    var copy3 = copy.slice(indexs2,copy.length)
                                    var arr = copy2.map(function (v,i) {
                                        return {
                                            distance:AMap.GeometryUtil.distance(lngLat,v),
                                            po:i
                                        }
                                    })
                                    var min = Math.min.apply(null,arr.map(function (v) { return v.distance }))
                                    arr.map(function (v) {
                                        if(v.distance==min){
                                            copy2.splice(v.po+1,0,lngLat)
                                        }
                                    })
                                    that.dragPoints = copy1.concat(copy2).concat(copy3)
                                    return
                                }
                                if(!!that.marker1){
                                    var copy = that.deepClone(that.dragPoints);
                                    var indexs = null;
                                    copy.map(function (v,i) {
                                        if(JSON.stringify(v)==JSON.stringify(that.pass1)){
                                            indexs=i
                                        }
                                    })
                                    var copy1 = copy.slice(0,indexs);
                                    var copy2 = copy.slice(indexs,copy.length)
                                    var arr = copy2.map(function (v,i) {
                                        return {
                                            distance:AMap.GeometryUtil.distance(lngLat,v),
                                            po:i
                                        }
                                    })
                                    var min = Math.min.apply(null,arr.map(function (v) { return v.distance }))
                                    arr.map(function (v) {
                                        if(v.distance==min){
                                            copy2.splice(v.po+1,0,lngLat)
                                        }
                                    })
                                    that.dragPoints = copy1.concat(copy2)
                                    return
                                }
                                if(!!that.marker3){
                                    var copy = that.deepClone(that.dragPoints);
                                    copy.unshift(that.originLngLat)
                                    var indexs = null;
                                    copy.map(function (v,i) {
                                        if(JSON.stringify(v)==JSON.stringify(that.pass3)){
                                            indexs=i
                                        }
                                    })
                                    var copy1 = copy.slice(0,indexs);
                                    var copy2 = copy.slice(indexs,copy.length)
                                    var arr = copy1.map(function (v,i) {
                                        return {
                                            distance:AMap.GeometryUtil.distance(lngLat,v),
                                            po:i
                                        }
                                    })
                                    var min = Math.min.apply(null,arr.map(function (v) { return v.distance }))
                                    arr.map(function (v) {
                                        if(v.distance==min){
                                            copy1.splice(v.po+1,0,lngLat)
                                        }
                                    })
                                    that.dragPoints = copy1.concat(copy2).shift()
                                    return
                                }
                                var copy = that.deepClone(that.dragPoints);
                                copy.unshift(that.originLngLat)
                                var arr = copy.map(function (v,i) {
                                    return {
                                        distance:AMap.GeometryUtil.distance(lngLat,v),
                                        po:i
                                    }
                                })
                                var min = Math.min.apply(null,arr.map(function (v) { return v.distance }))
                                arr.map(function (v) {
                                    if(v.distance==min){
                                        copy.splice(v.po+1,0,lngLat)
                                    }
                                })
                                that.dragPoints = copy.shift()
                            }
                        }
                        if(!!that.poly2){
                            that.map.remove(that.poly2)
                            that.poly2=null;
                        }
                        that.marker2 = new AMap.Marker({
                            content: that.passPng,
                            position:  that.deepClone(lngLat),
                            draggable:false,
                            zIndex:999
                        });
                        that.map.add(that.marker2);
                        that.pass2 = lngLat;
                        that.geocoderFn(lngLat);
                        // that.dragPoints=[]
                        break;
                    case '4':
                        if(!!that.marker3){
                            that.map.remove(that.marker3)
                            that.marker3=null;
                            if(that.dragPoints.length){
                                that.dragPoints.map(function (v,i) {
                                    if(JSON.stringify(v)===JSON.stringify(that.pass3)){
                                        that.dragPoints.splice(i,1,lngLat)
                                    }
                                })
                            }
                        }else{
                            if(that.dragPoints.length){
                                if(!!that.marker2){
                                    var copy = that.deepClone(that.dragPoints);
                                    var indexs = null;
                                    copy.map(function (v,i) {
                                        if(JSON.stringify(v)==JSON.stringify(that.pass2)){
                                            indexs=i
                                        }
                                    })
                                    var copy1 = copy.slice(0,indexs);
                                    var copy2 = copy.slice(indexs,copy.length)
                                    var arr = copy2.map(function (v,i) {
                                        return {
                                            distance:AMap.GeometryUtil.distance(lngLat,v),
                                            po:i
                                        }
                                    })
                                    var min = Math.min.apply(null,arr.map(function (v) { return v.distance }))
                                    arr.map(function (v) {
                                        if(v.distance==min){
                                            copy2.splice(v.po+1,0,lngLat)
                                        }
                                    })
                                    that.dragPoints = copy1.concat(copy2)
                                    return
                                }
                                if(!!that.marker1){
                                    var copy = that.deepClone(that.dragPoints);
                                    var indexs = null;
                                    copy.map(function (v,i) {
                                        if(JSON.stringify(v)==JSON.stringify(that.pass1)){
                                            indexs=i
                                        }
                                    })
                                    var copy1 = copy.slice(0,indexs);
                                    var copy2 = copy.slice(indexs,copy.length)
                                    var arr = copy2.map(function (v,i) {
                                        return {
                                            distance:AMap.GeometryUtil.distance(lngLat,v),
                                            po:i
                                        }
                                    })
                                    var min = Math.min.apply(null,arr.map(function (v) { return v.distance }))
                                    arr.map(function (v) {
                                        if(v.distance==min){
                                            copy2.splice(v.po+1,0,lngLat)
                                        }
                                    })
                                    that.dragPoints = copy1.concat(copy2)
                                    return
                                }
                                var copy = that.deepClone(that.dragPoints);
                                copy.unshift(that.originLngLat)
                                var arr = copy.map(function (v,i) {
                                    return {
                                        distance:AMap.GeometryUtil.distance(lngLat,v),
                                        po:i
                                    }
                                })
                                var min = Math.min.apply(null,arr.map(function (v) { return v.distance }))
                                arr.map(function (v) {
                                    if(v.distance==min){
                                        copy.splice(v.po+1,0,lngLat)
                                    }
                                })
                                that.dragPoints = copy.shift()
                            }
                        }
                        if(!!that.poly3){
                            that.map.remove(that.poly3)
                            that.poly3=null;
                        }
                        that.marker3 = new AMap.Marker({
                            content: that.passPng,
                            position:  that.deepClone(lngLat),
                            draggable:false,
                            zIndex:999
                        });
                        that.map.add(that.marker3);
                        that.pass3 = lngLat;
                        that.geocoderFn(lngLat);
                        // that.dragPoints=[]
                        break;
                }
                that.map.setFitView()
                that.drawLine()

                that.map.off('click',fn)
            }
            that.map.on('click', fn);
        },
        geocoderFn:function(lnglat){
            var that = this;
            var geocoder = new AMap.Geocoder();
            geocoder.getAddress(lnglat, function(status, result) {
                if (status === 'complete'&&result.regeocode) {
                    var address = result.regeocode.formattedAddress;
                    switch (that.at) {
                        case '0' :
                            $('.inputSel').eq(0).find('input').val(address);
                            break;
                        case '1' :
                            $('.inputSel').eq(4).find('input').val(address);
                            break;
                        case '2' :
                            $('.inputSel').eq(1).find('input').val(address);
                            break;
                        case '3':
                            $('.inputSel').eq(2).find('input').val(address);
                            break;
                        case '4' :
                            $('.inputSel').eq(3).find('input').val(address);
                            break;
                    }
                }else{
                    console.log('根据经纬度查询地址失败')
                }
            });
        },
        drawLineCopy:function(routes,remakes){
            var that = this;
            that.polyLine = new AMap.Polyline({
                path: that.deepClone(routes),
                isOutline: true,
                outlineColor: '#ffeeee',
                borderWeight: 2,
                strokeWeight: 5,
                strokeColor: '#0091ff',
                lineJoin: 'round'
            })

            that.map.add([that.polyLine])

            // 调整视野达到最佳显示区域
            that.map.setFitView()


            var str = '';
            remakes.map(function (v) {
                str += '<dl><dt class="glyphicon glyphicon-tree-deciduous"></dt><dd>'+v.remake+'</dd></dl>'
            })
            $('#dataBox').html(str);
            that.points = routes;
            that.remakes = remakes;
        },
        drawLine:function(){
            var that = this;
            console.log(that.dragPoints)
            if(!!that.driving){
                that.driving.destroy();
            }
            if(!!that.polyLine){
                that.map.remove(that.polyLine)
                that.polyLine=null;
            }
            if(that.originLngLat.length&&that.endLngLat.length){
                var paths = [];
                paths.push(that.originLngLat)
                if(that.dragPoints.length){
                    that.dragPoints.map(function (item) {
                        paths.push(item)
                    })
                }else{
                    if(that.pass1.length){
                        paths.push(that.pass1)
                    }
                    if(that.pass2.length){
                        paths.push(that.pass2)
                    }
                    if(that.pass3.length){
                        paths.push(that.pass3)
                    }
                }
                paths.push(that.endLngLat)
                //开启拖拽功能
                that.driving = new AMap.DragRoute(that.map, that.deepClone(paths), AMap.DrivingPolicy.LEAST_TIME,{
                    midMarkerOptions:{
                        content:'<img src="//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png" width="20"/>'
                    }
                }); //构造拖拽导航类
                that.driving.search(); //查询导航路径并开启拖拽导航
                that.driving.on('complete',function (res) {
                    that.dragPoints = res.data.waypoints.map(function (v) {
                        return [v.location.R,v.location.Q]
                    })
                    var res1 = res.data.routes[0];
                    parseRouteToPath(res1);
                })
            }
            function parseRouteToPath(route) {
                console.log(route)
                var distanceStr = (route.distance / 1000).toFixed(2);
                $('#distance').html(distanceStr);
                var path = [];
                var str = '',arr=[];
                route.steps.map(function (v) {
                    str += '<dl><dt class="glyphicon glyphicon-tree-deciduous"></dt><dd>'+v.instruction+'</dd></dl>'
                    arr.push({
                        remake:v.instruction,
                        area:[v.start_location.R,v.start_location.Q],
                    })

                    v.path.map(function (item) {
                        path.push([item.R,item.Q])
                    })
                })
                path.push(that.endLngLat)
                path.unshift(that.originLngLat)

                that.points = path;
                that.remakes = arr
                $('#dataBox').html(str);
            }
        },
        deepClone:function (pa) {
            return JSON.parse(JSON.stringify(pa))
        }
    }
    mapFn.init();

})