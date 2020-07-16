<template>
	<view class="content">
		<uni-nav-bar
			title='工时计算'
			shadow='true'
			:background-color='colorTitle'
		></uni-nav-bar>
		<view>
			<uni-calendar 
				:insert="true"
				:lunar="true" 
				:start-date="'2019-3-2'"
				:end-date="'2019-5-20'"
				@change="change"
				/>
		</view>
		<view v-if="day" class='time'>
			<view>
				上班时间：{{day.clockIn ? day.clockIn.slice(11) : ''}}
			</view>
			<view>
				下班时间：{{day.clockOut ? day.clockOut.slice(11) : ''}}
			</view>
			<view v-if="day.hasWork">
				工作时长：{{`${parseInt(day.hasWork / 60)}小时${day.hasWork % 60}分`}}
			</view>
			<view>
				<!-- 待补时长： -->
			</view>
		</view>
		<view class='clock'>
			<text class='clock-box' :class="[colorOr]" @click="clockIn">打卡</text>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex';
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	import uniNavBar from'@/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		components: {
			uniCalendar,
			uniNavBar
		},
		data() {
			return {
				day: null
			}
		},
		onLoad() {

		},
		computed: {
			...mapGetters(['clock', 'clockOr']),
			colorOr() {
				return this.clockOr === 'noWork' ? 'bg-no-work' : this.clockOr === 'working' ? 'bg-working' : 'bg-worked';
			},
			colorTitle() {
				return this.clockOr === 'noWork' ? '#1264bd' : this.clockOr === 'working' ? '#0ebb42' : '#db890e';
			}
		},
		created() {
			this.setNewDay();
		},
		methods: {
			change(e) {
				let time = e.fulldate;
				this.showDay(time);
			},
			showDay(time) {
				let data = JSON.parse(JSON.stringify(this.clock));
				this.day = data.filter(item=>{
					return item.clockIn.includes(time);
				})[0];
			},
			clockIn() {
				this.clockOr === 'noWork' ? this.clockEvent('ClockIn', '上班') : this.clockEvent('ClockOut', '下班');
			},
			// 打卡行为
			clockEvent(event, title) {
				const date = this.formatDateTime(new Date());
				this.$store.dispatch(event, date).then(()=>{
					uni.showToast({
						title: `${title}打卡成功`,
						mask: true,
						duration: 2000,
						success: ()=> {
							this.showDay(date.slice(0, 10));
						}
					});
				})
			},
			setNewDay() {
				let today = this.formatDateTime(new Date()).slice(0, 10);
				this.showDay(today);
				let has = this.clock.filter(item=>{
					return item.clockIn.includes(today);
				});
				if(!has.length) {
					this.$store.commit('WORKING', 'noWork');
				};
			},
			formatDateTime(date) {
				let y = date.getFullYear(); 
				let m = date.getMonth() + 1; 
				m = m < 10 ? ('0' + m) : m; 
				let d = date.getDate(); 
				d = d < 10 ? ('0' + d) : d; 
				let h = date.getHours(); 
				h=h < 10 ? ('0' + h) : h; 
				let minute = date.getMinutes(); 
				minute = minute < 10 ? ('0' + minute) : minute; 
				return y + '-' + m + '-' + d+' '+h+':'+minute; 
			},
		}
	}
</script>

<style lang='scss' scoped>
	$no-work-color1: #1264bd;
	$no-work-color2: #6aa8eb;
	$working-color1: #0ebb42;
	$working-color2: #6aeba4;
	$workede-color1: #db890e;
	$workede-color2: #ebcd6a;
	.content {
		.time {
			padding-left: 100rpx;
			padding-top: 50rpx;
		}
		.clock{
			margin-top: 100rpx;
			width: 100%;
			display: flex;
			justify-content: center;
			&-box{
				text-align: center;
				display: inline-block;
				width: 200rpx;
				height: 200rpx;
				border-radius: 50%;
				line-height: 200rpx;
				color: #fff;
			}
			.bg-no-work{
				background-image: radial-gradient($no-work-color1, $no-work-color2);
				box-shadow: 0 0 20rpx $no-work-color1;
				animation: ani-no 2s;
				animation-iteration-count: infinite;
			}
			@keyframes ani-no {
				50% {box-shadow: 0 0 40rpx $no-work-color1;}
				100% {box-shadow: 0 0 20rpx $no-work-color1;}
			}
			.bg-working{
				background-image: radial-gradient($working-color1, $working-color2);
				box-shadow: 0 0 20rpx $working-color1;
				animation: ani-ing 2s;
				animation-iteration-count: infinite;
			}
			@keyframes ani-ing {
				50% {box-shadow: 0 0 40rpx $working-color1;}
				100% {box-shadow: 0 0 20rpx $working-color1;}
			}
			.bg-worked{
				background-image: radial-gradient($workede-color1, $workede-color2);
				box-shadow: 0 0 20rpx $workede-color1;
				animation: ani-ed 2s;
				animation-iteration-count: infinite;
			}
			@keyframes ani-ed {
				50% {box-shadow: 0 0 40rpx $workede-color1;}
				100% {box-shadow: 0 0 20rpx $workede-color1;}
			}
		}
	}
</style>
