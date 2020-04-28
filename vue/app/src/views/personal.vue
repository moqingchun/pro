

<template>
	<div id="page">
		<div class="list">
			<ul>
				<li class="bor-b" @click="languageCFunc">
					<span>{{ $t('languageSetting') }}</span>
				</li>
				<li class="bor-b" @click="toLogin">
					<span>{{ $t('login') }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Personal',
		data() {
			return {
			}
		},
		methods: {
			languageCFunc() {
				this.$i18n.locale = !localStorage.getItem('Languages') ? 'zh' : localStorage.getItem('Languages') == 'en' ? 'zh' : 'en';
				localStorage.setItem('Languages', this.$i18n.locale)
			},
			toLogin(){
				this.$router.push({
					path:'/login'
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	#page {
		width: 100%;
		height: 100vh;
		overflow: scroll;
		background: #191c23;

		.header {
			padding: .5rem .3rem 0;
			height: 3.25rem;
			background: #212126;
			box-sizing: border-box;
			display: flex;

			.headerImg {
				width: 1rem;
				height: 1rem;
				overflow: hidden;
				border-radius: .5rem;
				background-image: url(../assets/images/header.png);
				background-size: 100% 100%;
				background-repeat: no-repeat;
				background-position: center center;
			}

			.headerName {
				flex: 1;
				color: #c2b5a5;
				text-align: left;
				margin: 0 0 0 .2rem;

				.name {
					font-size: .34rem;
					line-height: .6rem;
				}

				.acount {
					font-size: .26rem;
					line-height: .4rem;
				}
			}

			.return {
				width: 1rem;
				height: 1rem;
				background-image: url(../assets/images/arrow_right_white.png);
				background-size: 40% 40%;
				background-repeat: no-repeat;
				background-position: center right;
			}
		}

		.totalAcount {
			margin: -1.4rem .3rem;
			height: 2.8rem;
			padding: .3rem;
			border-radius: 10px;
			text-align: left;
			background: #d58c2a;
			box-sizing: border-box;
			position: relative;
		}

		.list {
			margin: 1.7rem .3rem 1rem;
			background: #212126;
			border-radius: 10px;

			ul {
				padding: .2rem 0;
				margin: 0 0 0 .5rem;

				li {
					width: 100%;
					height: .9rem;
					line-height: .9rem;
					color: #615b54;
					font-size: .3rem;
					text-align: left;
					margin: .1rem 0 0 0;

					a {
						display: inline-block;
						color: #666;
						width: 100%;
						height: 100%;
						text-decoration: none;
					}

					i {
						display: inline-block;
						width: 1rem;
						height: 1rem;
						vertical-align: middle;
						background-size: 40% 40%;
						background-repeat: no-repeat;
						background-position: center left;

						&.icon_aboutus {
							background-image: url(../assets/images/ic_a.png);
						}

						&.icon_options {
							background-image: url(../assets/images/icon_options.png);
						}

						&.icon_language {
							background-image: url(../assets/images/ic_b.png);
						}

						&.icon_change {
							background-image: url(../assets/images/ic_c.png);
						}

						&.icon_extend {
							background-image: url(../assets/images/ic_d.png);
						}
					}

					span {
						vertical-align: middle;
						margin: 0 0 0 -.4rem;
					}
				}
			}
		}
	}
</style>
