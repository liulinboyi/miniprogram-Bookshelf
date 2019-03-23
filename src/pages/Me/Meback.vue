<template>
    <div>
        <div class="container">
            <div class="userinfo">
                <img :src="userInfo.avatarUrl" alt="">
                <p>{{ userInfo.nickName }}</p>
            </div>
            
        </div>
        <YearProgres></YearProgres>
        <!-- <button>登录</button> -->
        <!-- <button open-type="getUserInfo" lang="zh_CN" @click="doLogin()" bindgetuserinfo="doLogin">获取用户信息</button> -->
        <!-- <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfo1">获取权限</button> -->
        <!-- <button open-type="getUserInfo" @getuserinfo="doLogin" @click="doLogin()">获取权限</button> -->
        <button v-show="!flag" class="btn" @click="scanBook">添加图书</button>
        <!-- <button v-show="flag" class="btn" open-type="getUserInfo" @getuserinfo="login" @click="getUserInfo1">登录</button> -->
        <button v-show="flag" class="btn" open-type="getUserInfo" @getuserinfo="login">登录</button>

    </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import config from '../../config.js'
import { showSuccess, post, showModal } from '../../util.js'
import YearProgres from '@/components/YearProgres.vue'
export default {
components:{
    YearProgres
},
// created(){
    
// // this.doLogin()
// let user = wx.getStorageInfoSync('userinfo')
// console.log(user)
// if(!user){
    
// }
// },

// // onload(){
// //     // 这个时候 不行，可能与生命周期有关系
// //     // this.getSetting()
// //   },
// //   mounted(){
// //     // 一进来看看用户是否授权过
// //     this.getSetting()
// //   },
// //   methods: {
// //     getSetting(){
// //       wx.getSetting({
// //         success: function(res){
// //           if (res.authSetting['scope.userInfo']) {
// //             wx.getUserInfo({
// //               success: function(res) {
// //                 console.log(res.userInfo)
// //                 //用户已经授权过
// //                 console.log('用户已经授权过')
// //               }
// //             })
// //           }else{
// //             console.log('用户还未授权过')
// //           }
// //         }
// //       })

// //     },
// //     getUserInfo1(){
// //       console.log('click事件首先触发')
// //       // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
// //       // console.log(wx.canIUse('button.open-type.getUserInfo'))
// //       if(wx.canIUse('button.open-type.getUserInfo')){
// //         // 用户版本可用
// //       }else{
// //         console.log('请升级微信版本')
// //       }
// //     },
// //     bindGetUserInfo(e) {
// //       // console.log(e.mp.detail.rawData)
// //       if (e.mp.detail.rawData){
// //         //用户按了允许授权按钮
// //         console.log('用户按了允许授权按钮')
// //       } else {
// //         //用户按了拒绝按钮
// //         console.log('用户按了拒绝按钮')
// //       }
// //     },

// //   }



// methods: {
    

//     doLogin: function() {
//     // qcloud.setLoginUrl(config.loginUrl);
//     // console.log(config.loginUrl)

//     // qcloud.login({
//     // success: function (userInfo) {
//     //     console.log('登录成功', userInfo);
//     //     wx.setStorageSync('userinfo',userInfo);
//     //     showSuccess('登陆成功')
//     // },
//     // fail: function (err) {
//     //     console.log('登录失败', err);
//     //     showSuccess('登录失败')
//     // }
//     // });


//     qcloud.setLoginUrl(config.loginUrl);
//     const session = qcloud.Session.get()

//     if (session) {
//         // 第二次登录
//         // 或者本地已经有登录态
//         // 可使用本函数更新登录态
//         console.log('第二次登录')
//         qcloud.loginWithCode({
//             success: res => {
//                 this.setData({ userInfo: res, logged: true })
//                 util.showSuccess('登录成功')
//             },
//             fail: err => {
//                 console.error(err)
//                 util.showModel('登录错误', err.message)
//             }
//         })
//     } else {
//         // 首次登录
//         console.log('第一次登录')
//         qcloud.login({
//             success: res => {
//                 console.log(res)
//                 this.setData({ userInfo: res, logged: true })
//                 util.showSuccess('登录成功')
//             },
//             fail: err => {
//                 console.error(err)
//                 util.showModel('登录错误', err.message)
//             }
//         })
//     }
// }


// },


data(){
    return{
        userInfo:{
          avatarUrl:'https://ws1.sinaimg.cn/large/8660d1bbly1fyshs6y9goj205k05kweh.jpg',
          nickName:'欢迎使用！'
        },
        touxiang:'',
        flag:true
    }
},

created () {
    // this.login()
    // wx.getStorageInfo({
    // success(res) {
    //     console.log(res.keys)
    //     console.log(res.currentSize)
    //     console.log(res.limitSize)
    // }
    // })
    // this.userInfo = wx.getStorageInfoSync({key:'user'})
    // console.log(wx.getStorageInfoSync({key:'user'}))
    try {
    const value = wx.getStorageSync('user')
    if (value) {
        this.userInfo = value
        this.$store.state.personweixin = value
        this.touxiang = value.avatarUrl
        // console.log(value)
        // console.log(this.userInfo)
        this.flag = false;
        // Do something with return value
    }
    } catch (e) {
    // Do something when catch error
    }
    // console.log(userInfo)
    // this.getSetting()
  },
  methods: {
    login () {
              wx.showLoading({
          title: '登录中',
        })
    let user = wx.getStorageInfoSync('user');
    // console.log(user);
    if(!user){
        console.log("!user")
    }
      console.log('触发');
      qcloud.setLoginUrl(config.loginUrl)
      const session = qcloud.Session.get()
      console.log(session)
      if (session) {
        // 第二次登录
        // 或者本地已经有登录态
        // 可使用本函数更新登录态
        qcloud.loginWithCode({
          success: res => {
              console.log(this)
              wx.setStorageSync('user',res);
            // this.setData({ userInfo: res, logged: true })
            console.log(res)
            showSuccess('您已经登陆过了')
          },
          fail: err => {
            console.error('222', err)
            showSuccess('稍等')
          }
        })
      } else {

        // 首次登录
        qcloud.login({
          success: res => {
            wx.hideLoading()
               console.log(this)
            wx.setStorageSync('user',res);
            // this.setData({ userInfo: res, logged: true })
            console.log(res)
            showSuccess('登陆成功')
            this.flag = false;
            try {
            const value = wx.getStorageSync('user')
            if (value) {
                this.userInfo = value
                this.$store.state.personweixin = value
                this.touxiang = value.avatarUrl
                console.log(value)
                console.log(this.userInfo)
                // Do something with return value
            }
            } catch (e) {
            // Do something when catch error
            }
          },
          fail: err => {
            console.log(err)
            showSuccess('稍等')
          }
        })
      }
    },
    getUserInfo (e) {
      console.log('111', e.mp.detail.userInfo)
    },
    //扫码添加图书
    async addBook(isbn){
      
      console.log('addBook')
      
      const res = await post('/weapp/addbook',{
        isbn,
        openid: this.userInfo.openId
      })
      console.log(res)
      wx.hideLoading()
      showModal('添加成功',`《${res.data.title}》添加成功`)
      this.$store.state.saoma = true
      console.log(this.$store.state.saoma)
      // if(res.code === 0 && res.data.title){
      //   showSuccess('添加成功',`${res.data.title}添加成功`)
      // }
    },
    // addBook(){
    //   console.log('添加')
    // },
    scanBook(){
      var that = this
        console.log("点击了扫码")
        wx.showLoading({
          title: '扫码中',
        })
        wx.scanCode({
            onlyFromCamera:false,
            success(res){
                console.log("扫码")
                console.log(res)
                console.log(res.result)
                if (parseFloat(res.result).toString() == "NaN") {
                  //必须是数字而且必须13位
              　　　　//alert("请输入数字……");注掉，放到调用时，由调用者弹出提示。
              // 　　　　return false;
                  wx.hideLoading()
                  console.log('不是数字')
                  showModal('添加失败','您扫描的不是图书ISBN码')
              　　} else if(res.result.toString().length === 13){
                  console.log(that)
                  console.log('数字')
                  that.addBook(res.result)
                  
              // 　　　　return true;
              　　}else{
                  wx.hideLoading()
                  console.log('不是13位数字')
                  showModal('添加失败','您扫描的不是图书ISBN码')

                  }
                // if(res.result){
                //   // wx.hideLoading()
                //   console.log(that)
                //   that.addBook(res.result)
                // }
            },
            fail(){
              wx.hideLoading()//失败取消提示弹窗
            }

        })
    },

    getSetting(){
      wx.getSetting({
        success: function(res){
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function(res) {
                console.log(res.userInfo)
                //用户已经授权过
                console.log('用户已经授权过')
              }
            })
          }else{
            console.log('用户还未授权过')
            this.getUserInfo1()
          }
        }
      })

    },
    getUserInfo1(){
      console.log('click事件首先触发')
      // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
      // console.log(wx.canIUse('button.open-type.getUserInfo'))
      if(wx.canIUse('button.open-type.getUserInfo')){

              try {
    const value = wx.getStorageSync('user')
    if (value) {
        this.userInfo = value
        this.touxiang = value.avatarUrl
        console.log(value)
        console.log(this.userInfo)
        // Do something with return value
    }
    } catch (e) {
    // Do something when catch error
    }
        // 用户版本可用
      }else{
        console.log('请升级微信版本')
      }
    },
    bindGetUserInfo(e) {
      // console.log(e.mp.detail.rawData)
      if (e.mp.detail.rawData){
        //用户按了允许授权按钮
        console.log('用户按了允许授权按钮')
      } else {
        //用户按了拒绝按钮
        console.log('用户按了拒绝按钮')
      }
    }





  }







}
</script>
<style scope>

.container{
    padding: 0 30rpx;
    margin-bottom: 20%;
}
.userinfo{
    margin-top: 100rpx;
    text-align: center;

}
.userinfo img{
    width: 128rpx;
    height: 128rpx;
    margin: 20rpx;
    border-radius: 50%;
}
button:nth-of-type(1){
    width: 35%;
    margin-bottom: 20rpx;
}
button:nth-of-type(2){
    width: 35%;
}

</style>
