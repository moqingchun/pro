<template>
    <el-dialog
        class="modal-J mapModal"
        title="地图选址"
        :visible.sync="mapShowCopy"
        @close="closeModal"
    >
        <baidu-map
            ak="F454f8a5efe5e577997931cc01de3974"
            scroll-wheel-zoom
            :center="{lng:bmapCopy.fieldLongitude,lat:bmapCopy.fieldLatitude}"
            :zoom="15"
            @ready="readyHandler"
            @click="mapClick"
        >
            <bm-view style="width: 100%; height:400px; flex: 1"></bm-view>

            <bm-control :offset="{width: 10, height: 10}">
                <bm-auto-complete v-model="keywords" :sugStyle="{zIndex: 9999}" @confirm="sureOne">
                    <el-input v-model="keywords" placeholder="请输入" clearable></el-input>
                </bm-auto-complete>
            </bm-control>

            <bm-marker
                :position="{lng:bmapCopy.fieldLongitude,lat:bmapCopy.fieldLatitude}"
                :title="title"
                animation="BMAP_ANIMATION_BOUNCE"
            ></bm-marker>

            <bm-local-search
                :keyword="keywords"
                auto-viewport
                :panel="false"
                @searchcomplete="checkOver"
            ></bm-local-search>
        </baidu-map>

        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmFn">确 定</el-button>
            <el-button class="cancelBut" @click="closeModal">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import {
    BaiduMap,
    BmView,
    BmControl,
    BmMarker,
    BmAutoComplete,
    BmLocalSearch
} from "vue-baidu-map";

export default {
    components: {
        BaiduMap,
        BmView,
        BmControl,
        BmMarker,
        BmAutoComplete,
        BmLocalSearch
    },
    props: {
        Bmap: {
            type: Object,
            default: () => {
                return {
                    provinceId: "",
                    cityId: "",
                    areaId: "",
                    entpAddress: "",
                    fieldLatitude: 39.915,
                    fieldLongitude: 116.404
                };
            }
        },
        mapShow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            title: "",
            keywords: "",
            mapBody: null,
            areaCode: [
                { id: "110000", provinceName: "北京市" },
                { id: "120000", provinceName: "天津市" },
                { id: "130000", provinceName: "河北省" },
                { id: "140000", provinceName: "山西省" },
                { id: "150000", provinceName: "内蒙古自治区" },
                { id: "210000", provinceName: "辽宁省" },
                { id: "220000", provinceName: "吉林省" },
                { id: "230000", provinceName: "黑龙江省" },
                { id: "310000", provinceName: "上海市" },
                { id: "320000", provinceName: "江苏省" },
                { id: "330000", provinceName: "浙江省" },
                { id: "340000", provinceName: "安徽省" },
                { id: "350000", provinceName: "福建省" },
                { id: "360000", provinceName: "江西省" },
                { id: "370000", provinceName: "山东省" },
                { id: "410000", provinceName: "河南省" },
                { id: "420000", provinceName: "湖北省" },
                { id: "430000", provinceName: "湖南省" },
                { id: "440000", provinceName: "广东省" },
                { id: "450000", provinceName: "广西壮族自治区" },
                { id: "460000", provinceName: "海南省" },
                { id: "500000", provinceName: "重庆市" },
                { id: "510000", provinceName: "四川省" },
                { id: "520000", provinceName: "贵州省" },
                { id: "530000", provinceName: "云南省" },
                { id: "540000", provinceName: "西藏自治区" },
                { id: "610000", provinceName: "陕西省" },
                { id: "620000", provinceName: "甘肃省" },
                { id: "630000", provinceName: "青海省" },
                { id: "640000", provinceName: "宁夏回族自治区" },
                { id: "650000", provinceName: "新疆维吾尔自治区" },
                { id: "710000", provinceName: "台湾省" },
                { id: "810000", provinceName: "香港" },
                { id: "820000", provinceName: "澳门" }
                // { id: "999999", provinceName: "国外" }
            ]
        };
    },
    computed: {
        bmapCopy: {
            get() {
                return this.Bmap;
            },
            set(val) {
                console.log(val);
            }
        },
        mapShowCopy: {
            get() {
                return this.mapShow;
            },
            set(val) {
                console.log(val);
            }
        }
    },
    methods: {
        confirmFn() {
            this.$emit("confirmModal", this.bmapCopy);
        },
        closeModal() {
            this.$emit("closeModal");
        },
        readyHandler({ BMap, map }) {
            console.log(map);
            this.mapBody = BMap;
            this.keywords = this.bmapCopy.entpAddress;
        },
        mapClick(e) {
            if (this.mapBody) {
                const geoCoder = new this.mapBody.Geocoder();
                geoCoder.getLocation(e.point, res => {
                    this.keywords = res.address;
                });
            }
        },
        sureOne({ type, target, item }) {
            console.log(type, target, item);
            // 取地址
            this.bmapCopy.areaId = item.value.district;
        },
        checkOver(e) {
            // 取经纬度
            if (e) {
                let res = e.Ir[0];
                console.log(e);
                this.title = e.keyword;
                this.bmapCopy.entpAddress = e.keyword;
                this.bmapCopy.fieldLongitude = res.point.lng;
                this.bmapCopy.fieldLatitude = res.point.lat;
                if (
                    this.areaCode
                        .map(v => {
                            return v.provinceName;
                        })
                        .indexOf(e.province) !== -1
                ) {
                    this.bmapCopy.provinceId = e.province;
                    this.bmapCopy.cityId = e.city;
                } else {
                    this.bmapCopy.provinceId = "国外";
                    this.bmapCopy.cityId = "";
                    this.bmapCopy.areaId = "";
                }
            }
        }
    }
};
</script>

>
<style lang="scss">
.mapModal {
    .el-dialog {
        width: 50%;
        .el-input {
            margin-bottom: 20px;
        }
    }
}
</style>
