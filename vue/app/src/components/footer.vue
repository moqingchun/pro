

<template>
	<div class="footer">
		<ul>
			<li v-for="(items,index) in footList" :key=index @click="tabChange(index)">
				<i :class="{active: index == nowIndex}"></i>
				<p :class="{active: index == nowIndex}">{{ items.name }}</p>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'Footer',
		data() {
			return {
				nowIndex: 0
			}
		},
		methods: {
			tabChange(eq) {
				this.nowIndex = eq;
				this.$router.push({
					path: this.footList[eq]['path']
				})
			}
		},
		computed: {
			footList() {
				return [{
						name: this.$t('home'),
						path: "/index"
					},
					{
						name: this.$t('market'),
						path: "/market"
					},
					{
						name: this.$t('mine'),
						path: "/personal"
					}
				]
			}
		},
		created() {
			let _Path = this.$route.path;
			if (_Path === '/index') this.nowIndex = 0;
			if (_Path === '/market' || _Path === '/market/aaa') this.nowIndex = 1;
			if (_Path === '/personal') this.nowIndex = 2;
		}
	}
</script>
<style lang="scss" scoped>
	.footer {
		width: 100%;
		height: 1rem;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background: #252529;

		ul {
			width: 100%;
			display: flex;

			li {
				line-height: 0.45rem;
				flex: 1;

				i {
					display: inline-block;
					width: 0.4rem;
					height: 0.4rem;
				}

				&:nth-child(1) {
					i {
						background-image: url("../assets/images/home_1.png");
						background-size: 100% 100%;
						background-repeat: no-repeat;

						&.active {
							background-image: url("../assets/images/home.png");
						}
					}
				}

				&:nth-child(2) {
					i {
						background-image: url("../assets/images/market_1.png");
						background-size: 100% 100%;
						background-repeat: no-repeat;

						&.active {
							background-image: url("../assets/images/market.png");
						}
					}
				}

				&:nth-child(3) {
					i {
						background-image: url("../assets/images/group_1.png");
						background-size: 100% 100%;
						background-repeat: no-repeat;

						&.active {
							background-image: url("../assets/images/group.png");
						}
					}
				}

				p {
					color: #615b54;
					font-size: 0.22rem;

					&.active {
						color: #e18a00;
					}
				}
			}
		}
	}
</style>
