import axios from 'axios'
import { createStore } from 'vuex'

export const store = {
  state() {
    return {
      user: undefined
    }
  },
  mutations: {
    updateUser(state, user) {
      state.user = user 
    }
  },
  actions: {
    login: async ({ commit }, { username, password }) => {
      const response = await axios.post('/login', { username, password })
      commit('updateUser', response.data)
    }
  }
}
