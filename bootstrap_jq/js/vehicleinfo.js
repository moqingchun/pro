$(function () {
    var _b = {
        globalId: '',
        formData: new FormData(),
        rangeData: null,
        typeData: null,
        init: function () {
            this.getsyxz()
            this.getProductname()
            this.getvehiclebrand()
            this.getvehiclemodel()

            this.tableData();
            this.handleFn();

        },
        handleFn: function () {
            var _this = this;
            $('#searchBtn').click(function () {
                $('#table').bootstrapTable('refresh')
            })
            $('#reset').click(function () {
                $('#license').val('')
                $('#licensecolor').selectpicker('val', '')
                $('#syxz').selectpicker('val', '')
                $('#cyclesettingstatus').selectpicker('val', '')
                $('#filingstatus').selectpicker('val', '')
                $('#table').bootstrapTable('refresh')
            })

            $(".datetimepicker").datetimepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                todayBtn: true,
                language: 'zh-CN',
                minView: 2
            });

            $('#syxzmodal').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
                _this.getType($(this).val())
            });

            //上传图片
            $('.file_body').on('change', function (e) {
                var files = e.target.files;
                console.log(files)
                if (!files.length) return;
                var dom = $(this);
                _this.showFile(dom, files[0])
                var cn = $(this).parent().attr('cn');
                switch (cn) {
                    case '1':
                        _this.formData.set('travellicense_photo', files[0], files[0].name);
                        break;
                    case '2':
                        _this.formData.set('roadtransportnumber_photo', files[0], files[0].name);
                        break;
                    case '3':
                        _this.formData.set('vehiclebody_photo', files[0], files[0].name);
                        break;
                }
            })
            $('.preview_del .preview').click(function () {
                var url = $(this).parent().siblings('.file_img').attr('src')
                _lbr.imgShow(url)
            })
            $('.preview_del .del').click(function () {
                var cn = $(this).parents('.file_box').attr('cn');
                $(this).parents('.fileimg_box').hide();
                $(this).parent().siblings('.file_img').attr('src', '')
                $(this).parent().parent().siblings('.file_mark').css({
                    'display': 'flex'
                })
                switch (cn) {
                    case '1':
                        _this.formData.set('travellicense_photo', '');
                        break;
                    case '2':
                        _this.formData.set('roadtransportnumber_photo', '');
                        break;
                    case '3':
                        _this.formData.set('vehiclebody_photo', '');
                        break;
                }
            })


            $('#myModal').on('hidden.bs.modal ', function () {
                _this.globalId = ''
                //输入框清空
                $("#myModal input[type='text']").each(function () {
                    $(this).val('');
                })
                //下拉菜单清空
                $("#myModal .selectpicker").each(function () {
                    $(this).selectpicker('val', '');
                })
                //单选框清空
                $("#myModal input[type='checkbox']").each(function () {
                    $(this).prop('checked', false)
                })
                $("#myModal input[type='radio']").each(function () {
                    $(this).prop('checked', false)
                })
                // 图片
                $('.file_img').each(function () {
                    $(this).parent().hide();
                    $(this).attr('src', '');
                    $(this).parent().siblings('.file_mark').css({
                        'display': 'flex'
                    })
                })
                _this.formData.set('travellicense_photo', '');
                _this.formData.set('roadtransportnumber_photo', '');
                _this.formData.set('vehiclebody_photo', '');

            });
            $('#erweiModal').on('hidden.bs.modal ', function () {
                $("#set input[type='text']").each(function () {
                    $(this).val('');
                })
                $("#set .selectpicker").each(function () {
                    $(this).selectpicker('val', '');
                })
                $("#set textarea").each(function () {
                    $(this).val('');
                })

                $('#erweiTable').bootstrapTable('destroy')

            });

            $('#addBtn').click(function () {
                $('.addOrEdit').html('新增')
                $('#myModal').modal()
            })

            $('#saveBtn').click(function () {
                _this.saveFn()
            })
            $('#erweiSave').click(function () {
                _this.erweiSave()
            })
        },
        showFile: function (dom, file) {
            if (!file) return;
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                // console.log(e)
                dom.siblings('.fileimg_box').show()
                dom.siblings('.fileimg_box').find('.file_img').attr('src', e.target.result)
                dom.siblings('.file_mark').hide()
            }
        },
        saveFn: function () {

            if (!_lbr.requiredTip('#formBox', '.requiredS')) {
                return;
            }

            var _this = this;
            var range = ''
            $('#range_box input').each(function () {
                if ($(this).prop('checked')) {
                    range += $(this).val() + ','
                }
            })
            _this.formData.set("params", JSON.stringify({
                id: _this.globalId,
                status: 1,
                license: $('#licenseM').val(),
                licensecolor: $('#licensecolorM').val(),
                vehicleusetype: $('#syxzmodal').val(),
                operationstatus: $('#operationstatusM').val(),
                vehiclebodycolor: $('#vehiclebodycolorM').val(),
                roadtransportnumber: $('#roadtransportnumberM').val(),
                framenumber: $('#framenumberM').val(),
                roadtransportregdate: $('#roadtransportregdateM').val(),
                productiondate: $('#productiondateM').val(),
                roadtransportgetdate: $('#roadtransportgetdateM').val(),
                enabledate: $('#enabledateM').val(),
                roadtransportvaliddate: $('#roadtransportvaliddateM').val(),
                forcedretirementdate: $('#forcedretirementdateM').val(),
                travellicenseregdate: $('#travellicenseregdateM').val(),
                contacts: $('#contactsM').val(),
                travellicensegetdate: $('#travellicensegetdateM').val(),
                contactsphone: $('#contactsphoneM').val(),
                travellicensevaliddate: $('#travellicensevaliddateM').val(),
                businessscope: range,
                vehicleownercontacts: $('#vehicleownercontacts').val(),
                vehicleownercontactsphone: $('#vehicleownercontactsphoneM').val(),
                vehicletype: $('#vehicletype').val(),
                transportmedium: $('#transportmediumM').val(),
                passengerrank: $('#passengerrankM').val(),
                checkloadcustomer: $('#checkloadcustomerM').val(),
                containertypequantity: $('#containertypequantityM').val(),
                loadofdangerousgoodsname: $('#loadofdangerousgoodsnameM').val(),
                refrigeratedtruck: $('#refrigeratedtruckM').val(),
                thenumberofrefrigerator: $('#thenumberofrefrigeratorM').val(),
                effectivevolumeoftank: $('#effectivevolumeoftankM').val(),
                tankmaterial: $('#tankmaterialM').val(),
                productname: $('#productnameM').val(),
                vehiclebrand: $('#vehiclebrandM').val(),
                vehiclemodel: $('#vehiclemodelM').val(),
                domesticimport: $('#domesticimportM').val(),
                gabaritsizelenght: $('#gabaritsizelenghtM').val(),
                trafficbrakingmode: $("input[name='trafficbrakingmode']:checked").val(),
                gabaritsizewidth: $('#gabaritsizewidthM').val(),
                frontwheel: $("input[name='frontwheel']:checked").val(),
                gabaritsizeheight: $('#gabaritsizeheightM').val(),
                rearwheel: $("input[name='rearwheel']:checked").val(),
                packboxsizelength: $('#packboxsizelengthM').val(),
                holdbreakdevice: $("input[name='holdbreakdevice']:checked").val(),
                packboxsizewidth: $('#packboxsizewidthM').val(),
                transmissionform: $("input[name='transmissionform']:checked").val(),
                packboxinsizeheight: $('#packboxinsizeheightM').val(),
                retarder: $("input[name='retarder']:checked").val(),
                quasitotalmass: $('#quasitotalmassM').val(),
                airconditioningsystem: $("input[name='airconditioningsystem']:checked").val(),
                mass: $('#massM').val(),
                vehicletyrecount: $('#vehicletyrecountM').val(),
                curbweight: $('#curbweightM').val(),
                vehicletyretype: $('#vehicletyretypeM').val(),
                qcheckloadmass: $('#qcheckloadmassM').val(),
                turnshape: $('#turnshapeM').val(),
                frontbehindvehicledistance: $('#frontbehindvehicledistanceM').val(),
                wheelbase: $('#wheelbaseM').val(),
                rearaxleleafcount: $('#rearaxleleafcountM').val(),
                axlenumber: $('#axlenumberM').val(),
                chassismodel: $('#chassismodelM').val(),
                suapensiontype: $('#suapensiontypeM').val(),
                enginetypenumber: $('#enginetypenumberM').val(),
                emissionstandard: $('#emissionstandardM').val(),
                enginenumber: $('#enginenumberM').val(),
                fueltype: $('#fueltypeM').val(),
                displacementpower: $('#displacementpowerM').val(),
                batterytype: $('#batterytypeM').val(),
                enginenetpower: $('#enginenetpowerM').val(),
                drivemotormodel: $('#drivemotormodelM').val(),
                motorpower: $('#motorpowerM').val(),
            }));
            if (_this.globalId) {
                $.ajax({
                    url: '/api/vehicle/update',
                    type: 'post',
                    dataType: 'json',
                    contentType: false,
                    cache: false,
                    processData: false,
                    data: _this.formData,
                    success: function (data) {
                        if (data.state == 0) {
                            _lbr.tipBox({
                                message: data.message
                            })
                            $('#myModal').modal('hide')
                            $('#table').bootstrapTable('refresh')
                        }
                    },
                    error: function (err) {
                        console.log(err)
                    }
                });
                return;
            }
            $.ajax({
                url: '/api/vehicle/save',
                type: 'post',
                dataType: 'json',
                contentType: false,
                cache: false,
                processData: false,
                data: _this.formData,
                success: function (data) {
                    _lbr.tipBox({
                        message: data.message
                    })
                    if (data.state !== 0) {
                        return;
                    }
                    $('#myModal').modal('hide')
                    $('#table').bootstrapTable('refresh')
                },
                error: function (err) {
                    console.log(err)
                }
            });
        },
        editFn: function (id) {
            var _this = this;
            _this.globalId = id;
            $.ajax({
                url: '/api/vehicle/getVehicleById',
                type: 'post',
                dataType: 'json',
                data: {
                    id: id
                },
                success: function (data) {
                    $('#licenseM').val(data.data.license) //车牌号
                    $('#licensecolorM').selectpicker('val', data.data.licensecolor) //车牌颜色
                    $('#syxzmodal').selectpicker('val', data.data.vehicleusetype) //车辆使用性质
                    $('#operationstatusM').val(data.data.operationstatus) //车辆运营状态
                    $('#vehiclebodycolorM').val(data.data.vehiclebodycolor) //车身颜色
                    $('#roadtransportnumberM').val(data.data.roadtransportnumber) //道路运输证号
                    $('#framenumberM').val(data.data.framenumber) //车架号
                    $('#roadtransportregdateM').val(data.data.roadtransportregdate ? _lbr.timeFormate(new Date(data.data.roadtransportregdate), 'YYYY-MM-DD') : '') //道路运输证注册日期
                    $('#productiondateM').val(data.data.productiondate ? _lbr.timeFormate(new Date(data.data.productiondate), 'YYYY-MM-DD') : '') //车辆出厂日期
                    $('#roadtransportgetdateM').val(data.data.roadtransportgetdate ? _lbr.timeFormate(new Date(data.data.roadtransportgetdate), 'YYYY-MM-DD') : '') //道路运输证发证日期
                    $('#enabledateM').val(data.data.enabledate ? _lbr.timeFormate(new Date(data.data.enabledate), 'YYYY-MM-DD') : '') //启用日期
                    $('#roadtransportvaliddateM').val(data.data.roadtransportvaliddate ? _lbr.timeFormate(new Date(data.data.roadtransportvaliddate), 'YYYY-MM-DD') : '') //道路运输证审验有效期
                    $('#forcedretirementdateM').val(data.data.forcedretirementdate ? _lbr.timeFormate(new Date(data.data.forcedretirementdate), 'YYYY-MM-DD') : '') //强制报废日期
                    $('#travellicenseregdateM').val(data.data.travellicenseregdate ? _lbr.timeFormate(new Date(data.data.travellicenseregdate), 'YYYY-MM-DD') : '') //行驶证注册日期
                    $('#contactsM').val(data.data.contacts) //联系人
                    $('#travellicensevaliddateM').val(data.data.travellicensegetdate ? _lbr.timeFormate(new Date(data.data.travellicensegetdate), 'YYYY-MM-DD') : '') //行驶证发证日期
                    $('#contactsphoneM').val(data.data.contactsphone) //联系手机
                    $('#travellicensevaliddateM').val(data.data.travellicensevaliddate ? _lbr.timeFormate(new Date(data.data.travellicensevaliddate), 'YYYY-MM-DD') : '') //行驶证检验有效期

                    _this.rangeData = data.data.businessScopeVos;
                    _this.typeData = data.data.vehicletype

                    $('#vehicleownercontactsM').val(data.data.vehicleownercontacts)
                    $('#vehicleownercontactsphoneM').val(data.data.vehicleownercontactsphone)
                    $('#transportmediumM').val(data.data.transportmedium)
                    $('#passengerrankM').selectpicker('val', data.data.passengerrank)
                    $('#checkloadcustomerM').val(data.data.checkloadcustomer)
                    $('#containertypequantityM').val(data.data.containertypequantity)
                    $('#loadofdangerousgoodsnameM').val(data.data.loadofdangerousgoodsname)
                    $('#refrigeratedtruckM').selectpicker('val', data.data.refrigeratedtruck)
                    $('#thenumberofrefrigeratorM').selectpicker('val', data.data.thenumberofrefrigerator)
                    $('#effectivevolumeoftankM').val(data.data.effectivevolumeoftank)
                    $('#tankmaterialM').val(data.data.tankmaterial)
                    $('#productnameM').selectpicker('val', data.data.productname)
                    $('#vehiclebrandM').selectpicker('val', data.data.vehiclebrand)
                    $('#vehiclemodelM').selectpicker('val', data.data.vehiclemodel)
                    $('#domesticimportM').selectpicker('val', data.data.domesticimport)
                    $('#gabaritsizelenghtM').val(data.data.gabaritsizelenght)
                    data.data.trafficbrakingmode != null ? $("input[name='trafficbrakingmode'][value='" + data.data.trafficbrakingmode + "']").prop("checked", true) : $("input[name='trafficbrakingmode']").prop("checked", false);
                    $('#gabaritsizewidthM').val(data.data.gabaritsizewidth)
                    data.data.frontwheel != null ? $("input[name='frontwheel'][value='" + data.data.frontwheel + "']").prop("checked", true) : $("input[name='frontwheel']").prop("checked", false);
                    $('#gabaritsizeheightM').val(data.data.gabaritsizeheight)
                    data.data.rearwheel != null ? $("input[name='rearwheel'][value='" + data.data.rearwheel + "']").prop("checked", true) : $("input[name='rearwheel']").prop("checked", false);
                    $('#packboxsizelengthM').val(data.data.packboxsizelength)
                    data.data.holdbreakdevice != null ? $("input[name='holdbreakdevice'][value='" + data.data.holdbreakdevice + "']").prop("checked", true) : $("input[name='holdbreakdevice']").prop("checked", false);
                    $('#packboxsizewidthM').val(data.data.packboxsizewidth)
                    data.data.transmissionform != null ? $("input[name='transmissionform'][value='" + data.data.transmissionform + "']").prop("checked", true) : $("input[name='transmissionform']").prop("checked", false);
                    $('#packboxinsizeheightM').val(data.data.packboxinsizeheight)
                    data.data.retarder != null ? $("input[name='retarder'][value='" + data.data.retarder + "']").prop("checked", true) : $("input[name='retarder']").prop("checked", false);
                    $('#quasitotalmassM').val(data.data.quasitotalmass)
                    data.data.airconditioningsystem != null ? $("input[name='airconditioningsystem'][value='" + data.data.airconditioningsystem + "']").prop("checked", true) : $("input[name='airconditioningsystem']").prop("checked", false);
                    $('#massM').val(data.data.mass)
                    $('#vehicletyrecountM').val(data.data.vehicletyrecount)
                    $('#curbweightM').val(data.data.curbweight)
                    $('#vehicletyretypeM').selectpicker('val', data.data.vehicletyretype)
                    $('#qcheckloadmassM').val(data.data.qcheckloadmass)
                    $('#turnshapeM').val(data.data.turnshape)
                    $('#frontbehindvehicledistanceM').val(data.data.frontbehindvehicledistance)
                    $('#wheelbaseM').val(data.data.wheelbase)
                    $('#rearaxleleafcountM').val(data.data.rearaxleleafcount)
                    $('#axlenumberM').val(data.data.axlenumber)
                    $('#chassismodelM').val(data.data.chassismodel)
                    $('#suapensiontypeM').val(data.data.suapensiontype)
                    $('#enginetypenumberM').val(data.data.enginetypenumber)
                    $('#emissionstandardM').selectpicker('val', data.data.emissionstandard)
                    $('#enginenumberM').val(data.data.enginenumber)
                    $('#fueltypeM').selectpicker('val', data.data.fueltype)
                    $('#displacementpowerM').val(data.data.displacementpower)
                    $('#batterytypeM').val(data.data.batterytype)
                    $('#enginenetpowerM').val(data.data.enginenetpower)
                    $('#drivemotormodelM').val(data.data.drivemotormodel)
                    $('#motorpowerM').val(data.data.motorpower)

                    data.data.images.length && data.data.images.map(function (vi) {
                        if (vi.code == 'travellicense_photo') {
                            $('#img1').attr('src', '/api/vehicle/getImage?vehicleid=' + vi.vehicleid + '&imageCode=travellicense_photo').parent().show().siblings('.file_mark').hide()
                        } else if (vi.code == 'roadtransportnumber_photo') {
                            $('#img2').attr('src', '/api/vehicle/getImage?vehicleid=' + vi.vehicleid + '&imageCode=roadtransportnumber_photo').parent().show().siblings('.file_mark').hide()
                        } else if (vi.code == 'vehiclebody_photo') {
                            $('#img3').attr('src', '/api/vehicle/getImage?vehicleid=' + vi.vehicleid + '&imageCode=vehiclebody_photo').parent().show().siblings('.file_mark').hide()
                        }
                    })

                },
                error: function (err) {
                    console.log(err)
                }
            });

        },
        erweiSave: function () {

            if (!_lbr.requiredTip('#set', '.requiredS')) {
                return;
            }
            var _this = this;
            $.ajax({
                url: '/api/cycleSetting/save',
                type: 'post',
                dataType: 'json',
                // contentType: 'application/x-www-form-urlencoded',
                data: {
                    params: JSON.stringify({
                        vehicleid: _this.vid,
                        license: $('#licenseS').val(),
                        licensecolor: $('#licensecolorS').val(),
                        lev2maintainmileage: $('#lev2maintainmileageS').val(),
                        lev2maintaindate: $('#lev2maintaindateS').val(),
                        day: $('#dayS').val(),
                        mileage: $('#mileageS').val(),
                        fileaccording: $('#fileaccordingS').val(),
                        note: $('#noteS').val(),
                    })
                },
                success: function (data) {
                    _lbr.tipBox({
                        message: data.message
                    })
                    if (data.state !== 0) {
                        return
                    }
                    $('#erweiModal').modal('hide')
                },
                error: function (err) {
                    console.log(err)
                }
            });
        },
        erweiEdit: function (row) {
            var _this = this;
            _this.vid = row.id;
            _this.ewEditor(row)
            _this.erweiTable(row.id)
        },
        ewEditor: function (row) {
            $.ajax({
                url: '/api/cycleSetting/getByVehicleId',
                type: 'post',
                dataType: 'json',
                data: {
                    vehicleid: row.id
                },
                success: function (data) {
                    $('#licenseS').val(row.license) //车牌号
                    $('#licensecolorS').val(row.licensecolor) //车牌颜色
                    $('#lev2maintainmileageS').val(data.data.lev2maintainmileage)
                    $('#lev2maintaindateS').val(data.data.lev2maintaindatestr)
                    $('#dayS').val(data.data.day)
                    $('#mileageS').val(data.data.mileage)
                    $('#fileaccordingS').val(data.data.fileaccording)
                    $('#noteS').val(data.data.note)
                },
                error: function (err) {
                    console.log(err)
                }
            });
        },
        // 制造厂名
        getProductname: function () {
            $.ajax({
                url: '/api/dict/productname',
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    var str = '<option value="">---</option>';
                    data.map(function (v) {
                        str += '<option value="' + v.id + '">' + v.name + '</option>';
                    })
                    $('#productnameM').append(str)
                    $('#productnameM').selectpicker("refresh")
                },
                error: function (err) {
                    console.log(err)
                }
            });
        },
        // 车辆品牌
        getvehiclebrand: function () {
            $.ajax({
                url: '/api/dict/vehiclebrand',
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    var str = '<option value="">---</option>';
                    data.map(function (v) {
                        str += '<option value="' + v.id + '">' + v.name + '</option>';
                    })
                    $('#vehiclebrandM').append(str)
                    $('#vehiclebrandM').selectpicker("refresh")
                },
                error: function (err) {
                    console.log(err)
                }
            });
        },
        // 车辆型号
        getvehiclemodel: function () {
            $.ajax({
                url: '/api/dict/vehiclemodel',
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    var str = '<option value="">---</option>';
                    data.map(function (v) {
                        str += '<option value="' + v.id + '">' + v.name + '</option>';
                    })
                    $('#vehiclemodelM').append(str)
                    $('#vehiclemodelM').selectpicker("refresh")
                },
                error: function (err) {
                    console.log(err)
                }
            });
        },
        // 使用性质下拉框
        getsyxz: function () {
            $.ajax({
                url: '/api/dict/getVehicleUseType',
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    var str = '<option value="">全部</option>',
                        str1 = '<option value="">---</option>';
                    data.map(function (v) {
                        str += '<option value="' + v.code + '">' + v.name + '</option>';
                        str1 += '<option value="' + v.code + '">' + v.name + '</option>';
                    })
                    $('#syxz').append(str)
                    $('#syxz').selectpicker("refresh")
                    $('#syxzmodal').append(str1)
                    $('#syxzmodal').selectpicker("refresh")
                },
                error: function (err) {
                    console.log(err)
                }
            });
        },
        // 使用性质与类型，经营范围的级联
        getType: function (code) {
            var _this = this;
            $.ajax({
                url: '/api/dict/getVehicleTypeByCode?code=' + code,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    var str = '<option value="">---</option>';
                    data.map(function (v) {
                        str += '<option value="' + v.code + '">' + v.name + '</option>'
                    })
                    $('#vehicletype').html(str)
                    $('#vehicletype').selectpicker("refresh");
                    if (_this.typeData) {
                        $('#vehicletype').selectpicker('val', _this.typeData);
                        _this.typeData = '';
                    }

                },
                error: function (err) {
                    console.log(err)
                }
            });
            $.ajax({
                url: '/api/dict/getBusinessScopeByVehicleusetype?vehicleusetype=' + code,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    var htm = '';
                    data.length && data.map(function (v) {
                        htm += '<div class="flex_box1"><div class="lable">' + v.name + ':</div><div class="flex_sup">';
                        v.children.length && v.children.map(function (item) {
                            htm += '<label class="checkbox-inline"><input type="checkbox" value="' + item.code + '">' + item.name + '</label>';
                        })
                        htm += '</div></div>'
                    })
                    $('#range_box').html(htm)
                    if (_this.rangeData.length) {
                        _this.rangeData.map(function (v) {
                            v.voChidrenList.length && v.voChidrenList.map(function (item) {
                                if (item.selected) {
                                    $('#range_box input[value="' + item.code + '"]').prop('checked', true)
                                }
                            })
                        })
                        _this.rangeData = ''
                    }

                },
                error: function (err) {
                    console.log(err)
                }
            });
        },
        // 查询表格
        tableData: function () {
            var _this = this;
            $('#table').bootstrapTable({
                url: '/api/vehicle/queryByPage',
                method: 'post',
                queryParams: queryParams,
                responseHandler: responseHandler,
                pagination: true,
                pageSize: 10,
                pageNumber: 1,
                pageList: [10, 20, 50],
                sidePagination: 'server',
                classes: "table table-bordered table-hover",
                fixedColumns: true,
                fixedNumber: 1,
                fixedRightNumber: 1,
                loadingFontSize: 16,
                columns: [{
                        title: "车牌",
                        align: "center",
                        width: 160,
                        formatter: function (value, row, index) {
                            return row.license + '(' + row.licensecolor + ')'
                        }
                    }, {
                        field: "vehicleusetypename",
                        title: "车辆使用性质",
                        align: "center",
                        width: 160
                    }, {
                        field: "roadtransportnumber",
                        title: "道路运输证号",
                        align: "center",
                        width: 200
                    },
                    {
                        field: "filingstatus",
                        title: "建档状态",
                        align: "center",
                        width: 86,
                        formatter: function (value) {
                            if (value == "1") {
                                return '<div style="text-align:center; background:#52c41a; color:white">完成</div>';
                            }
                            return '<div style="text-align:center; background:#ff4d4f; color:#FFF">未完成</div>';
                        }
                    },
                    {
                        field: "basicstatus",
                        title: "车辆基础信息",
                        align: "center",
                        width: 120,
                        formatter: function (value) {
                            if (value == "1") {
                                return '<div style="text-align:center; background:#52c41a; color:white">完成</div>';
                            }
                            return '<div style="text-align:center; background:#ff4d4f; color:#FFF">未完成</div>';
                        }
                    }, {
                        title: "二维周期设定(天/万公里)",
                        align: "center",
                        width: 182,
                        formatter: function (value, row, index) {

                            // 挂车不显示二维周期状态
                            if (row.license.indexOf('挂') != -1) {
                                return '<div style="text-align:center; background:#bbbbbb; color:white;">-</div>';
                            }
                            if (row.cyclesettingstatus == 1) {
                                var text = '';
                                if (row.maintainday) {
                                    text += row.maintainday;
                                } else {
                                    text += '--';
                                }
                                text += '&nbsp;/&nbsp;';
                                if (row.maintainmileage) {
                                    text += row.maintainmileage;
                                } else {
                                    text += '--';
                                }
                                return '<div style="cursor:hand; text-align:center; background:#52c41a; color:white">' + text + '</div>';
                            }

                            return '<div style="cursor:hand; text-align:center; background:#ff4d4f; color:#FFF">未设定</div>';
                        }
                    }, {
                        field: "lev2Maintain",
                        title: "二级维护状态(二维日期/二维里程)",
                        align: "center",
                        width: 242,
                        formatter: function (value) {
                            if (value) {
                                // 挂车不显示二维状态
                                if (value.license.indexOf('挂') != -1) {
                                    return '<div style="text-align:center; background:#bbbbbb; color:white">-</div>';
                                }
                                var text = '';
                                if (value.lastmaintaindatestr) {
                                    text += value.lastmaintaindatestr;
                                } else {
                                    text += '--';
                                }
                                text += '&nbsp;/&nbsp;';
                                if (value.lastmaintainmileage != null) {
                                    text += value.lastmaintainmileage;
                                } else {
                                    text += '--';
                                }
                                if (value.lev2maintainstatus == '0') {
                                    // 正常
                                    return '<div style="cursor:hand; text-align:center; background:#52c41a; color:white">' + text + '</div>';
                                } else if (value.lev2maintainstatus == '1') {
                                    // 预警
                                    return '<div style="cursor:hand; text-align:center; background:#fdb941; color:white">' + text + '</div>';
                                } else if (value.lev2maintainstatus == '2') {
                                    // 超期
                                    return '<div style="cursor:hand; text-align:center; background:#ff4d4f; color:white">' + text + '</div>';
                                } else if (value.lev2maintainstatus == '3') {
                                    // 未知
                                    return '<div style="cursor:hand; text-align:center; background:#bbbbbb; color:white">' + text + '</div>';
                                }
                            }
                            return '<div style="cursor:hand; text-align:center; background:#bbbbbb; color:white">--&nbsp;/&nbsp;--</div>';
                        }
                    }, {
                        field: "gradeEvaluation",
                        title: "等级评定状态(检测日期/技术等级)",
                        align: "center",
                        width: 242,
                        formatter: function (value) {
                            if (value) {
                                // 挂车不显示等评状态
                                if (value.license.indexOf('挂') != -1) {
                                    return '<div style="text-align:center; background:#bbbbbb; color:white;">-</div>';
                                }
                                text = '';
                                if (value.lastevaluationdatestr) {
                                    text += value.lastevaluationdatestr;
                                } else {
                                    text += '--';
                                }
                                text += '&nbsp;/&nbsp;';
                                if (value.lastevaluationtechlevel) {
                                    if (value.lastevaluationtechlevel == '1') {
                                        text += '一级';
                                    } else if (value.lastevaluationtechlevel == '2') {
                                        text += '二级';
                                    } else if (value.lastevaluationtechlevel == '3') {
                                        text += '三级';
                                    } else if (value.lastevaluationtechlevel == '4') {
                                        text += '四级';
                                    } else if (value.lastevaluationtechlevel == '5') {
                                        text += '五级';
                                    } else {
                                        text += '--';
                                    }
                                } else {
                                    text += '--';
                                }
                                if (value.gradeevaluationstatus == '0') {
                                    return '<div style="text-align:center; background:#52c41a; color:white">' + text + '</div>';
                                    //return '正常';
                                } else if (value.gradeevaluationstatus == '1') {
                                    return '<div style="text-align:center; background:#fdb941; color:white">' + text + '</div>';
                                    //return '预警';
                                } else if (value.gradeevaluationstatus == '2') {
                                    return '<div style="text-align:center; background:#ff4d4f; color:white">' + text + '</div>';
                                    //return '超期';
                                } else {
                                    text = '--&nbsp;/&nbsp;--';
                                    return '<div style="text-align:center; background:#bbbbbb; color:white">' + text + '</div>';
                                    //return '未知';
                                }
                            }
                            return '<div style="text-align:center; background:#bbbbbb; color:white">--&nbsp;/&nbsp;--</div>';
                        }
                    }, {
                        field: "roadtransportstatus",
                        title: "道路运输证状态(审验有效期)",
                        align: "center",
                        width: 208,
                        formatter: function (value, row, index) {
                            var roadtransportvaliddate = row.roadtransportvaliddate;
                            if (roadtransportvaliddate != null && roadtransportvaliddate != undefined && roadtransportvaliddate != "") {
                                var t = new Date(roadtransportvaliddate);
                                roadtransportvaliddate = _lbr.timeFormate(t, 'YYYY-MM-DD');
                            } else {
                                roadtransportvaliddate = "--";
                            }
                            if (value == "1") {
                                return '<div style="text-align:center; background:#52c41a; color:white">' + roadtransportvaliddate + '</div>'; //正常
                            } else if (value == "-1") {
                                return '<div style="text-align:center; background:#fdb941; color:#FFF">' + roadtransportvaliddate + '</div>'; //预警
                            }
                            return '<div style="text-align:center; background:#ff4d4f; color:#FFF">' + roadtransportvaliddate + '</div>'; //超期
                        }
                    }, {
                        field: "travellicensestatus",
                        title: "行驶证状态(检验有效期)",
                        align: "center",
                        width: 186,
                        formatter: function (value, row, index) {
                            var travellicensevaliddate = row.travellicensevaliddate;
                            if (travellicensevaliddate != null && travellicensevaliddate != undefined && travellicensevaliddate != "") {
                                var t = new Date(travellicensevaliddate);
                                travellicensevaliddate = _lbr.timeFormate(t, 'YYYY-MM-DD');
                            } else {
                                travellicensevaliddate = "--";
                            }
                            if (value == "1") {
                                return '<div style="text-align:center; background:#52c41a; color:white">' + travellicensevaliddate + '</div>'; //正常
                            } else if (value == "-1") {
                                return '<div style="text-align:center; background:#fdb941; color:#FFF">' + travellicensevaliddate + '</div>'; //预警
                            }
                            return '<div style="text-align:center; background:#ff4d4f; color:#FFF">' + travellicensevaliddate + '</div>'; //超期
                        }
                    },
                    // {
                    //     field: "gpsstatus",
                    //     title: "卫星定位状态",
                    //     align: "center",
                    //     formatter: function(value){
                    //         if(value == "1"){
                    //             return '<div style="text-align:center; background:#52c41a; color:white">正常</div>';
                    //         }else if(value == "0"){
                    //             return '<div style="text-align:center; background:#ff4d4f; color:#FFF">异常</div>';
                    //         }
                    //         return '<div style="text-align:center; background:#bbbbbb; color:#FFF">未接入</div>';
                    //     }
                    // },
                    {
                        field: 'operate',
                        title: '操作',
                        align: 'center',
                        width: 312,
                        events: {
                            'click .edit': function (e, value, row, index) {
                                _this.editFn(row.id)
                                $('.addOrEdit').html('编辑')
                                $('#myModal').modal()
                            },
                            'click .set': function (e, value, row, index) {
                                _this.erweiEdit(row)
                                $('#erweiModal').modal()
                            },
                            'click .positon': function (e, value, row, index) {
                                console.log("卫星定位装置:" + row.id);
                            },
                            'click .export': function (e, value, row, index) {
                                console.log("导出:" + row.id);
                            },

                        },
                        formatter: operateFormatter
                    }
                ]
            });

            function queryParams(params) {
                return {
                    pageSize: params.limit,
                    pageNum: (params.offset / params.limit) + 1,
                    businessstate: 1,
                    status: 1,
                    license: $('#license').val(),
                    licensecolor: $('#licensecolor').val(),
                    vehicleusetype: $('#syxz').val(),
                    cyclesettingstatus: $('#cyclesettingstatus').val(),
                    filingstatus: $('#filingstatus').val(),
                }
            }

            function responseHandler(res) {
                return {
                    rows: res.data.content,
                    total: res.data.total
                }
            }

            function operateFormatter(value, row, index) {
                return '<a class="edit">编辑</a>' + ' | ' +
                    '<a class="set">二维周期设定</a>' + ' | ' +
                    '<a class="positon">卫星定位装置</a>' + ' | ' +
                    '<a class="export">导出档案</a>';
            }
        },

        // 二维周期表格
        erweiTable: function (vid) {
            $('#erweiTable').bootstrapTable({
                url: '/api/cycleSetting/queryCycleSettingHistory',
                method: 'post',
                contentType: "application/x-www-form-urlencoded",
                // dataType: "json",
                queryParams: queryParams,
                responseHandler: responseHandler,
                // pagination: true,
                // pageSize: 5,
                // pageNumber: 1,
                // pageList: [5, 20, 50],
                // sidePagination: 'server',
                classes: "table table-bordered table-hover",
                loadingFontSize: 16,
                columns: [{
                        field: "createdate",
                        title: "设定时间",
                        align: "center",
                        width: 150
                    }, {
                        field: "mileage",
                        title: "维护周期公里数(万公里)",
                        align: "center",
                        width: 170
                    }, {
                        field: "day",
                        title: "维护周期天数(天)",
                        align: "center",
                        width: 130
                    },
                    {
                        field: "lev2maintainmileage",
                        title: "二级维护里程初始值",
                        align: "center",
                        width: 150
                    },
                    {
                        field: "lev2maintaindatestr",
                        title: "二级维护日期初始值",
                        align: "center",
                        width: 150
                    }, {
                        field: "fileaccording",
                        title: "依据",
                        align: "center",
                        width: 200
                    }, {
                        field: "note",
                        title: "备注",
                        align: "center",
                        width: 200
                    },
                ]
            });

            function queryParams(params) {
                return {
                    vehicleid: vid
                }
            }

            function responseHandler(res) {
                return {
                    rows: res.data,
                }
            }

        },
    }
    _b.init()
})