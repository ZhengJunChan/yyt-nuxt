import Vue from 'vue'
import Vuex from 'vuex'

import wx from './wx'
import app from './app'
import user from './user'
import player from './player'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    player,
    // vux,
    wx,
    user,
    app
  }
})

export default store
