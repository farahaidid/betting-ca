import USERS from "../../api/users.api"

const initialState = {
   user: null,
   loggedIn: false,
   accessToken: null
}

const state = { ...initialState }

const getters = {
   USER: s => s.user,
   LOGGED_IN: s => s.loggedIn,
}

const mutations = {
   SET_AUTH_STATE: (state, payload) => {
      Object.keys(payload).forEach(key => state[key] = payload[key])
   },
   RESET_AUTH_STATE: state => {
      let newState = { ...initialState }
      Object.keys(newState).forEach(key => state[key] = newState[key])
   }
}

const actions = {
   FETCH_PROFILE: async ({ commit, state: { loggedIn, user: { _id }, accessToken } }) => {
      if (!loggedIn) {
         commit('RESET_AUTH_STATE')
         return { error: true, message: "NOT LOGGED IN" }
      }
      let { error, message, user } = await USERS.FETCH_PROFILE({ id: _id, token: accessToken })
      if (error) return { error, message }
      commit('SET_AUTH_STATE', { user })
      commit('SET_STATE', { balance: user.balance, bets: user.bets }, { root: true })
      return { error, message }
   },
   UPDATE_USER: async ({ dispatch, state }, payload) => {
      let { error, message } = await USERS.UPDATE_USER(state.user._id, state.accessToken, payload)
      if (error) return { error, message }
      dispatch('FETCH_PROFILE')
   },
   SIGN_IN: async ({ commit }, payload) => {
      let { error, user, accessToken, message } = await USERS.SIGN_IN(payload)
      if (error) return { error, message }
      commit('SET_AUTH_STATE', { user, accessToken, loggedIn: true })
      return { error: false, message: "SIGNED_IN" }
   },
   SIGN_UP: async ({ }, payload) => await USERS.SIGN_UP(payload)

}

export default {
   namespaced: true,
   state, getters, mutations, actions
}