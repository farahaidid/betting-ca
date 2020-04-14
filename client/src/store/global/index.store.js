const initialState = {
   balance: 20,
   bets: 3
}

export const state = { ...initialState }

export const getters = {
   BALANCE: s => s.balance,
   BETS: s => s.bets,
}

export const mutations = {
   SET_STATE: (state, payload) => {
      Object.keys(payload).forEach(key => state[key] = payload[key])
   }
}

export default {
   state, getters, mutations
}