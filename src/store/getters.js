import work from './modules/work';
const getters = {
  clock: (state) => work.state.clock,
  clockOr: (state) => work.state.clockOr,
};
export default getters;