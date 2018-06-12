import { ApiUtil } from '@/utils'

export const state = () => ({
  // 是否登录
  isLogined: false,
  isRequiredInfo: false,
  // 用户信息
  infos: {
    uid: 0,
    logintoken: ''
  }
})

export const mutations = {
  setUserInfo: (state, info) => {
      state.infos = info
    }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('setUserInfo', req.session.authUser)
    }
  },
  async getUserInfos({ commit }, { username, password }) {
    try {
      const { data } = await ApiUtil.get('/v2/api/member.member/read')
      commit('setUserInfo', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  // async login({ commit }, { username, password }) {
  //   try {
  //     const { data } = await axios.post('/api/login', { username, password })
  //     commit('SET_USER', data)
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       throw new Error('Bad credentials')
  //     }
  //     throw error
  //   }
  // },
  async logout({ commit }) {
    // await axios.post('/api/logout')
    commit('setUserInfo', null)
  }
}
