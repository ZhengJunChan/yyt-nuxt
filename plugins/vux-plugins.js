import Vue from 'vue'
import { AlertPlugin, LoadingPlugin, ToastPlugin, TransferDom } from 'vux'

Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)

Vue.directive('transfer-dom', TransferDom)
