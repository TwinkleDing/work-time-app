import {setStorage, getStorage, removeStorage} from '@/util/store';
const work = {
  state: {
		clock: getStorage('clock') || [],
		clockOr:  getStorage('clockOr') || 'noWork',
	},
	mutations: {
		CLOCK_IN: (state, data) => {
			const item = {
				clockIn: data
			}
			state.clock.push(item);
			state.clockOr = 'working';
			setStorage('clock', state.clock);
			setStorage('clockOr', state.clockOr);
		},
		CLOCK_OUT: (state, data) => {
			// 获取最后一次打卡信息
			let last = state.clock[state.clock.length - 1];
			// 设置下班打卡时间或者更新
			last.clockOut = data;
			// 设置为已下班状态
			state.clockOr = 'worked';
			/* 工时计算 */
			// 获取最后一次的上班打卡时间
			let a = last.clockIn.slice(11);
			// 获取最新的下班打卡时间
			let b = data.slice(11);
			// 设置不计工时时间
			let j;
			// 设置规定上班时间
			let ruleIn = '08:00';
			// 设置规定下班时间
			let ruleOut = '17:30';
			// 判断如果早于8点则从8点开始算
			if(parseInt(a.slice(0, 2)) < 8) {
				a = `${last.clockIn.slice(0, 10)} ruleIn`;
			}
			// 判断是不是在17.30-18点之间打的卡，是的话设置下班打卡时间结束为17：30
			if(parseInt(b.slice(0, 2)) === 17 && parseInt(b.slice(3) > 30)) {
				b = `${last.clockIn.slice(0, 10)} ruleOut`;
			}
			// 判断是不是在上午打的上班，下午打的下班，-90
			if(parseInt(a.slice(0, 2)) < 12 && parseInt(b.slice(0, 2)) > 13) {
				j = 90;
				// 判断是不是在6点之后打的卡，是的话再-30
				if(parseInt(b.slice(0, 2)) > 18) {
					j = 120;
				}
			}
			let aTime = parseInt(a.slice(0, 2)) * 60 + parseInt(a.slice(3));
			let bTime = parseInt(b.slice(0, 2)) * 60 + parseInt(b.slice(3));
			let time = bTime - aTime - j;
			last.hasWork = time;
			// last.waitWork = 
			state.clock[state.clock.length - 1] = last;
			setStorage('clock', state.clock);
			setStorage('clockOr', state.clockOr);
		},
		WORKING: (state, data) => {
			state.clockOr = data;
			setStorage('clockOr', state.clockOr);
		}
	},
	actions: {
		ClockIn({commit}, clockIn) {
			return new Promise((resolve) => {
				commit('CLOCK_IN', clockIn);
				resolve();
			})
		},
		ClockOut({commit}, clockIn) {
			return new Promise((resolve) => {
				commit('CLOCK_OUT', clockIn);
				resolve();
			})
		},
	}
};

export default work;