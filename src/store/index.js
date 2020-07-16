import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import work from './modules/work';

Vue.use(Vuex);

const store = new Vuex.Store({
	getters,
	modules: {
		work
	}
})

export default store
