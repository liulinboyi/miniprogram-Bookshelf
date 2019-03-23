<script>
import { get } from './util.js'
import config from './config.js'
import qcloud from 'wafer2-client-sdk'
import { store, mapState, mapMutations } from 'vuex'
export default {
//   created () {
//     // // 调用API从本地缓存中获取数据
//     // const logs = wx.getStorageSync('logs') || []
//     // logs.unshift(Date.now())
//     // wx.setStorageSync('logs', logs)

//     // console.log('app created and cache logs by setStorageSync')
//   wx.request({
//   url: config.host+'/weapp/demo',
//   // data: {

//   // },
//   success(res) {
//     console.log(res.data)
//   }
// })
//     console.log("小程序启动了")
//   }

  async created () {
    // const res = await get('/weapp/demo')
    // console.log('demo', res)

//     // 设置登录地址
// qcloud.setLoginUrl('config.loginUrl');
// qcloud.login({
//     success: function (userInfo) {
//         console.log('登录成功', userInfo);
//     },
//     fail: function (err) {
//         console.log('登录失败', err);
//     }
// });

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    
        wx.cloud.callFunction({
            name: 'login',
            complete: res => {
                console.log('callFunction test result: ', res.result.openid)
                this.$store.state.openid = res.result.openid
            }
            })

this.$store.state.count = 'ok'
console.log(this.$store.state.tags)
  // console.log(this.$store.state.count)
    console.log('小程序启动了')
  }
}
</script>

<style>
.text-footer{
  text-align: center;
  font-size: 12px;
  margin-bottom: 5px;
}
.btn{
  color: white;
  background-color: #ea5a49;
}
.btn:active{
  background-color: #fa5a49
}
view{
  -webkit-overflow-scrolling:touch;
}
</style>
