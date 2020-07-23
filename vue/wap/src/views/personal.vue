

<template>
	<div class="personal">
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
	.personal {
		height: 100vh;
		overflow: scroll;
		background: #191c23;
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

					
					span {
						vertical-align: middle;
						margin: 0 0 0 -.4rem;
					}
				}
			}
		}
	}
</style>
