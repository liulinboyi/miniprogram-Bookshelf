// import Vue from 'vue'
import pageFactory from 'mpvue-page-factory'
import App from './detail.vue'

Page(pageFactory(App))
// import App from './index'


// const app = new Vue(App)
// Vue.mixin({
//     beforeMount () {
//       if (this.initData) {
//         Object.assign(this, JSON.parse(this.initData))
//       } else {
//         this.initData = JSON.stringify(this.$data)
//       }
//     }
//   })
// app.$mount()
