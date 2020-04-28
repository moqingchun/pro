<template>
	<el-dialog title="地图" :visible.sync="mapModal" :destroy-on-close="true" @close="closeModal">
		<baidu-map class="bm-view" ak="F454f8a5efe5e577997931cc01de3974" scroll-wheel-zoom :center="Bmap.center" :zoom="Bmap.zoom">
			<bm-marker :position="Bmap.center" animation="BMAP_ANIMATION_BOUNCE">

			</bm-marker>
		</baidu-map>
		<div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="closeModal">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import {
		BaiduMap,
		BmMarker
	} from 'vue-baidu-map';
	export default {
		name: "",
		props: {
			mapModal: {
				type: Boolean,
				default: false
			},
			Bmap: {
				type: Object,
				default: function(){
					return {}
				}
			}
		},
		components: {
			BaiduMap,
			BmMarker
		},
		methods:{
			closeModal(){
				this.$emit('closeModal')
			}
		},
		mounted(){
			
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
