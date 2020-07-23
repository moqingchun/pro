

<template>
  <div class="index">
    <div class="content">
      {{$t('home')}}
    </div>
	
	<van-button loading loading-text="登录中..." size="large" color="#7232dd"/>
	<van-cell title="活动" is-link to="login" value="查看更多"/>
	
  </div>
</template>

<script>
export default {
  name: 'Index',
  methods: {
  }
}
</script>
<style scoped lang="scss">
  .index{
    position: relative;
    .content{
			color: #fff;
    }
	
  }
</style>
