import { createStore } from 'vuex'

export default createStore({
  state: {
    search: '',
    sort: {
        sortByDevId: true,
        sortByStatus: false,
        sortByLow: true, 
    },
    pagekey: null
  },
  mutations: {
    setState(state, { key, value }){
      state[key] = value
    },
  },
  modules: {
  }
})
