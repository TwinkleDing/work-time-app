<template>
	<view :style="{ height: statusBarHeight, background: color }" class="uni-status-bar">
		<slot />
	</view>
</template>

<script>
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px'
	export default{
		name: 'UniStatusBar',
		props: {
			color: {
				type: String,
				default: '#fff'
			}
		},
		data() {
			return {
				statusBarHeight: statusBarHeight
			}
		}
	};
</script>

<style lang="scss" scoped>
	.uni-status-bar {
		width: 100vw;
		height: 20px;
		position: fixed;
		top: 0;
		left: 0;
		// background: #ff80ab;
		z-index: 100;
		height: var(--status-bar-height);
	}
</style>
