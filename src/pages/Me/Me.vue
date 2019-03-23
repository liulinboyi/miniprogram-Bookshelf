<template>
  <div>
    <div class="container">
      <div class="userinfo">
        <img :src="userInfo.avatarUrl" alt>
        <p>{{ userInfo.nickName }}</p>
      </div>
    </div>
    <YearProgres></YearProgres>
    <!-- <button>登录</button> -->
    <!-- <button open-type="getUserInfo" lang="zh_CN" @click="doLogin()" bindgetuserinfo="doLogin">获取用户信息</button> -->
    <!-- <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfo1">获取权限</button> -->
    <!-- <button open-type="getUserInfo" @getuserinfo="doLogin" @click="doLogin()">获取权限</button> -->
    <button v-show="!flag" class="btn" @click="scanBook">添加我的书</button>
    <button v-show="!flag" class="btn" @click="scanBookPublic">分享给大家</button>
    <button
      v-show="flag"
      class="btn"
      open-type="getUserInfo"
      @getuserinfo="bindGetUserInfo"
      @click="getUserInfo1"
    >登录</button>
    <button class="btn" @click="showabout">关于小程序</button>
    <van-popup
  :show="show"
  position="right"
  custom-class="right"
  overlay="true"
  safe-area-inset-bottom="true"
  @close="onClose"
>
  关于小程序
  <van-collapse :value="activeName" data-key="activeName" accordion @change="onChange">
  <van-collapse-item title="使用帮助" name="1">
    <p>使用微信登录，就可以使用添加图书功能。</p>
    <p>添加我的书，扫图书ISBN码，添加图书。</p>
    <p>分享给大家，扫图书ISBN码，可以与大家分享你最近在读什么书。</p>
  </van-collapse-item>
  <van-collapse-item title="小程序介绍" name="2">
    此款小程序旨在分享图书，记录读书
  </van-collapse-item>
  <van-collapse-item title="用什么开发" name="3">
    此款小程序使用mpvue<img class="mpvue" src="https://ws1.sinaimg.cn/large/8660d1bbly1fz1pe7yieij20cs0csmxs.jpg" alt="">(一个使用 Vue.js 开发小程序的前端框架)开发。Vant Weapp<img class="mpvue" src="https://ws1.sinaimg.cn/large/8660d1bbly1fz1sh0en32j204c04cwec.jpg" alt="">(轻量、可靠的小程序 UI 组件库)。同时使用了小程序云开发以及腾讯云 云学院课程的学习。感谢以上技术的支持！
  </van-collapse-item>
  <van-collapse-item title="用户隐私和数据安全" name="4">
  <p>您点击登陆后，即表示您同意并允许本小程序获取并使用您的昵称以及头像，在小程序中使用。</p>
  <p>您登陆后，点击"添加我的书"，即表示您同意并允许小程序使用您扫图书ISBN码查询图书，并由后台查询并存储您的查询记录以及结果，您的查询结果仅供您自己查看。</p>
  <p>您登陆后，点击"分享给大家"，即表示您同意并允许小程序使用您扫图书ISBN码查询图书，并由后台查询并存储您的查询记录以及结果，您此操作的查询结果，作为"大家的书"栏目展示，在我的分享里面同样也可以看到。</p>
  <p>您的数据可以通过反馈联系我们删除，或者后续推出删除功能。</p>
  </van-collapse-item>
  <van-collapse-item title="免责声明" name="5">
  您使用本小程序表示您同意，您对本小程序的使用行为以及后果必须自行承担相应风险以及责任。
  </van-collapse-item>
</van-collapse>
<!-- <navigator
    target="miniProgram"
    open-type="navigate"
    :app-id="appId"
    :extra-data="extraData"
    version="release">
    吐个槽社区
</navigator> -->
  <van-button open-type="navigate" type="default" @click="tominipro()" class="demo-margin-right">吐槽</van-button>
  <van-button open-type='feedback'  type="default" class="demo-margin-right">反馈</van-button>
  <van-button type="default" @click="toggleRightPopup" class="demo-margin-right">返回</van-button>
</van-popup>

    <!-- <button v-show="flag" class="btn" open-type="getUserInfo" @getuserinfo="login">登录</button> -->
  </div>
</template>

<script>
import qcloud from "wafer2-client-sdk";
import config from "../../config.js";
import { showSuccess, post, showModal } from "../../util.js";
import YearProgres from "@/components/YearProgres.vue";
export default {

  components: {
    YearProgres
  },
  // created(){

  // // this.doLogin()
  // let user = wx.getStorageInfoSync('userinfo')
  // console.log(user)
  // if(!user){

  // }
  // },

  // onload(){
  //     // 这个时候 不行，可能与生命周期有关系
  //     // this.getSetting()
  //   },
  //   mounted(){
  //     // 一进来看看用户是否授权过
  //     this.getSetting()
  //   },
  //   methods: {
  //     getSetting(){
  //       wx.getSetting({
  //         success: function(res){
  //           if (res.authSetting['scope.userInfo']) {
  //             wx.getUserInfo({
  //               success: function(res) {
  //                 console.log(res.userInfo)
  //                 //用户已经授权过
  //                 console.log('用户已经授权过')
  //               }
  //             })
  //           }else{
  //             console.log('用户还未授权过')
  //           }
  //         }
  //       })

  //     },
  //     getUserInfo1(){
  //       console.log('click事件首先触发')
  //       // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
  //       // console.log(wx.canIUse('button.open-type.getUserInfo'))
  //       if(wx.canIUse('button.open-type.getUserInfo')){
  //         // 用户版本可用
  //       }else{
  //         console.log('请升级微信版本')
  //       }
  //     },
  //     bindGetUserInfo(e) {
  //       // console.log(e.mp.detail.rawData)
  //       if (e.mp.detail.rawData){
  //         //用户按了允许授权按钮
  //         console.log('用户按了允许授权按钮')
  //       } else {
  //         //用户按了拒绝按钮
  //         console.log('用户按了拒绝按钮')
  //       }
  //     },

  //   }

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

  data() {
    return {
      userInfo: {
        avatarUrl:
          "https://ws1.sinaimg.cn/large/8660d1bbly1fyshs6y9goj205k05kweh.jpg",
        nickName: "欢迎使用！"
      },
      touxiang: "",
      flag: true,
      logged: null,
      openid:'',
      show: false,
      activeName: '',
      // appId: "wx8abaf00ee8c3202e",
      // extraData: {
      //       // 把1221数字换成你的产品ID，否则会跳到别的产品
      //       id : "52396",
      //       // 自定义参数，具体参考文档
      //   }
    };
  },

  created() {
    console.log('个人中心页面')
    this.$store.state.personweixin = this.userInfo;
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
      const value = wx.getStorageSync("user");
      if (value) {
        this.userInfo = value;
        this.$store.state.personweixin = value;
        this.touxiang = value.avatarUrl;
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
  mounted () {
    console.log(this.activeName)
          wx.cloud.callFunction({
            name: 'login',
            complete: res => {
                console.log('callFunction test result: ', res.result.openid)
                this.openid = res.result.openid
            }
            })
  },
  methods: {
    //     onGetUserInfo: function(e) {
    //   if (!this.logged && e.detail.userInfo) {
    //         console.log(e)
    //     this.logged = true
    //     this.userInfo = e.detail.userInfo
    //     wx.hideLoading()
    //   }
    // },
    //     onGetUserInfo(e) {
    //   if (!this.logged && this.userInfo) {
    //     // this.setData({
    //     //   logged: true,
    //     //   avatarUrl: e.detail.userInfo.avatarUrl,
    //     //   userInfo: e.detail.userInfo
    //     // })
    //         console.log(e)
    //     this.logged = true
    //     this.userInfo = e.detail.userInfo
    //     wx.hideLoading()
    //   }

    // },
    tominipro(){
      wx.navigateToMiniProgram({
          appId: 'wx8abaf00ee8c3202e', // 目标为吐个槽社区小程序AppID(固定)
          extraData: {  // 需要传递的参数
              id: '52396',  // 把1221数字换成你的产品ID，否则会不成功
          },
          fail(err){
            console.log(err)
          }
      });
    },
    onChange(event) {
      console.log(event)
    this.activeName = event.mp.detail
    console.log(this.activeName)
    },
    toggleRightPopup() {
    this.show = !this.show
    },
    showabout(){
    this.show = true;
    },
    onClose() {
    this.show = false;
    },
    login() {
      wx.showLoading({
        title: "登录中"
      });
      let user = wx.getStorageInfoSync("user");
      // console.log(user);
      if (!user) {
        console.log("!user");
      }
      console.log("触发");
      qcloud.setLoginUrl(config.loginUrl);
      const session = qcloud.Session.get();
      console.log(session);
      if (session) {
        // 第二次登录
        // 或者本地已经有登录态
        // 可使用本函数更新登录态
        qcloud.loginWithCode({
          success: res => {
            console.log(this);
            wx.setStorageSync("user", res);
            // this.setData({ userInfo: res, logged: true })
            console.log(res);
            showSuccess("您已经登陆过了");
          },
          fail: err => {
            console.error("222", err);
            showSuccess("稍等");
          }
        });
      } else {
        this.onGetUserInfo();
        // 首次登录
        // qcloud.login({
        //   success: res => {
        //     wx.hideLoading()
        //        console.log(this)
        //     wx.setStorageSync('user',res);
        //     // this.setData({ userInfo: res, logged: true })
        //     console.log(res)
        //     showSuccess('登陆成功')
        //     this.flag = false;
        //     try {
        //     const value = wx.getStorageSync('user')
        //     if (value) {
        //         this.userInfo = value
        //         this.$store.state.personweixin = value
        //         this.touxiang = value.avatarUrl
        //         console.log(value)
        //         console.log(this.userInfo)
        //         // Do something with return value
        //     }
        //     } catch (e) {
        //     // Do something when catch error
        //     }
        //   },
        //   fail: err => {
        //     console.log(err)
        //     showSuccess('稍等')
        //   }
        // })
      }
    },
    getUserInfo(e) {
      console.log("111", e.mp.detail.userInfo);
    },
    //扫码添加图书
    async addBook(isbn) {
      console.log("addBook");

      const res = await post("/weapp/addbook", {
        isbn,
        openid: this.userInfo.openId
      });
      console.log(res);
      wx.hideLoading();
      showModal("添加成功", `《${res.data.title}》添加成功`);
      this.$store.state.saoma = true;
      console.log(this.$store.state.saoma);
      // if(res.code === 0 && res.data.title){
      //   showSuccess('添加成功',`${res.data.title}添加成功`)
      // }
    },
    // addBook(){
    //   console.log('添加')
    // },
    scanBook() {
      var that = this;
      console.log("点击了扫码");
      wx.showLoading({
        title: "扫码中"
      });
      wx.scanCode({
        onlyFromCamera: false,
        success(res) {
          console.log("扫码");
          console.log(res);
          console.log(res.result);
          if (parseFloat(res.result).toString() == "NaN") {
            //必须是数字而且必须13位
            //alert("请输入数字……");注掉，放到调用时，由调用者弹出提示。
            // 　　　　return false;
            wx.hideLoading();
            console.log("不是数字");
            showModal("添加失败", "您扫描的不是图书ISBN码");
          } else if (res.result.toString().length === 13) {
            console.log(that);
            console.log("数字");
            // that.addBook(res.result)

            wx.hideLoading();

            wx.showLoading({
              title: "添加中"
            });
            wx.cloud.callFunction({
                // 要调用的云函数名称
                name: "bookinfo",
                // 传递给云函数的event参数
                data: {
                  isbn: res.result
                }
              })
              .then(res => {
                var boookobj = res.result;
                console.log(boookobj)
                const db = wx.cloud.database();
                const book = db.collection("mybook");
                book.where({
                    title: boookobj.title,
                    _openid: that.openid
                  })
                  .get({
                    success: book => {
                      console.log(book.data);
                      if (book.data.length == 0) {
                        const db = wx.cloud.database();
                        const book = db.collection("mybook");
                        boookobj.createTime = (new Date()).getTime();
                        book.add({
                            // data 字段表示需新增的 JSON 数据
                            data: boookobj
                          })
                          .then(res => {
                            // wx.showToast({
                            //   title: "添加成功",
                            //   icon: "success",
                            //   duration: 1500
                            // });
                            wx.hideLoading();
                            console.log(res);
                            showModal("添加成功", `《${boookobj.title}》添加成功`);
                            that.$store.state.saoma = true;
                            console.log(that.$store.state.saoma);
                            console.log(res);
                          });
                      }else{
                        wx.hideLoading();
                        showModal("添加失败", "您已经添加过了");
                        // wx.showToast({
                        //       title: "添加失败",
                        //       icon: "none",
                        //       duration: 1500
                        //     });
                      }
                      // console.log(this)
                      // this.setData({
                      //   data:book.data
                      // })
                      // var data = book.data
                      // this.setData({
                      //   booklist: res.data
                      // })
                    }
                  }),

                console.log(boookobj)
              })
              .catch(err => {
                wx.showToast({
                  title: "添加失败",
                  icon: "none",
                  duration: 1500
                });
                console.error(err);
              });

            // 　　　　return true;
          } else {
            wx.hideLoading();
            console.log("不是13位数字");
            showModal("添加失败", "您扫描的不是图书ISBN码");
          }
          // if(res.result){
          //   // wx.hideLoading()
          //   console.log(that)
          //   that.addBook(res.result)
          // }
        },
        fail() {
          wx.hideLoading(); //失败取消提示弹窗
        }
      });
    },
    scanBookPublic(){
      var that = this;
      console.log("点击了扫码");
      wx.showLoading({
        title: "扫码中"
      });
      wx.scanCode({
        onlyFromCamera: false,
        success(res) {
          console.log("扫码");
          console.log(res);
          console.log(res.result);
          if (parseFloat(res.result).toString() == "NaN") {
            //必须是数字而且必须13位
            //alert("请输入数字……");注掉，放到调用时，由调用者弹出提示。
            // 　　　　return false;
            wx.hideLoading();
            console.log("不是数字");
            showModal("添加失败", "您扫描的不是图书ISBN码");
          } else if (res.result.toString().length === 13) {
            console.log(that);
            console.log("数字");
            // that.addBook(res.result)

            wx.hideLoading();

            wx.showLoading({
              title: "添加中"
            });
            wx.cloud.callFunction({
                // 要调用的云函数名称
                name: "bookinfo",
                // 传递给云函数的event参数
                data: {
                  isbn: res.result
                }
              })
              .then(res => {
                var boookobj = res.result;
                console.log(boookobj)
                const db = wx.cloud.database();
                const book = db.collection("publicbook");
                book.where({
                    title: boookobj.title
                  })
                  .get({
                    success: book => {
                      console.log(book.data);
                      if (book.data.length == 0) {
                        const db = wx.cloud.database();
                        const book = db.collection("publicbook");
                        boookobj.createTime = (new Date()).getTime();
                        boookobj.userinfo = that.$store.state.personweixin
                        book.add({
                            // data 字段表示需新增的 JSON 数据
                            data: boookobj
                          })
                          .then(res => {
                            // wx.showToast({
                            //   title: "添加成功",
                            //   icon: "success",
                            //   duration: 1500
                            // });
                            wx.hideLoading();
                            console.log(res);
                            showModal("添加成功", `《${boookobj.title}》添加成功`);
                            that.$store.state.fenxiang = true;
                            console.log(that.$store.state.fenxiang);
                            console.log(res);
                          });
                      }else{
                        wx.hideLoading();
                        showModal("添加失败", "已经有人添加过了");
                        // wx.showToast({
                        //       title: "添加失败",
                        //       icon: "none",
                        //       duration: 1500
                        //     });
                      }
                      // console.log(this)
                      // this.setData({
                      //   data:book.data
                      // })
                      // var data = book.data
                      // this.setData({
                      //   booklist: res.data
                      // })
                    }
                  }),

                console.log(boookobj)
              })
              .catch(err => {
                wx.showToast({
                  title: "添加失败",
                  icon: "none",
                  duration: 1500
                });
                console.error(err);
              });

            // 　　　　return true;
          } else {
            wx.hideLoading();
            console.log("不是13位数字");
            showModal("添加失败", "您扫描的不是图书ISBN码");
          }
          // if(res.result){
          //   // wx.hideLoading()
          //   console.log(that)
          //   that.addBook(res.result)
          // }
        },
        fail() {
          wx.hideLoading(); //失败取消提示弹窗
        }
      });
    },
    getSetting() {
      wx.getSetting({
        success: function(res) {
          if (res.authSetting["scope.userInfo"]) {
            wx.getUserInfo({
              success: function(res) {
                console.log(res.userInfo);
                //用户已经授权过
                console.log("用户已经授权过");
              }
            });
          } else {
            console.log("用户还未授权过");
            this.getUserInfo1();
          }
        }
      });
    },
    getUserInfo1() {
      console.log("click事件首先触发");
      // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
      // console.log(wx.canIUse('button.open-type.getUserInfo'))
      if (wx.canIUse("button.open-type.getUserInfo")) {
        try {
          const value = wx.getStorageSync("user");
          if (value) {
            this.userInfo = value;
            this.touxiang = value.avatarUrl;
            console.log(value);
            console.log(this.userInfo);
            // Do something with return value
          }
        } catch (e) {
          // Do something when catch error
        }
        // 用户版本可用
      } else {
        console.log("请升级微信版本");
      }
    },
    bindGetUserInfo(e) {
      wx.showLoading({
        title: "登录中"
      });
      // console.log(e.mp.detail.rawData)
      if (e.mp.detail.rawData) {
        wx.setStorageSync("user", e.mp.detail.userInfo);
        this.userInfo = e.mp.detail.userInfo;
        this.$store.state.personweixin = e.mp.detail.userInfo;
        this.$store.state.loginbook = true
        this.$store.state.logincommon = true
        console.log(e.mp.detail);
        //用户按了允许授权按钮
        wx.hideLoading();
        console.log("用户按了允许授权按钮");
        this.flag = false;
      } else {
        wx.hideLoading();
        //用户按了拒绝按钮
        console.log("用户按了拒绝按钮");
      }
    }
  }
};
</script>
<style>
.mpvue{
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.demo-margin-right{
  width:18.7%;
margin:0 auto;
margin-top:50rpx;
}
.right {
  width: 100%;
  height: 100%;
  padding: 20px;
}
.container {
  padding: 0 30rpx;
  margin-bottom: 20%;
}
.userinfo {
  margin-top: 100rpx;
  text-align: center;
}
.userinfo img {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}
button:nth-of-type(1) {
  width: 35%;
  margin-bottom: 20rpx;
  font-size: 30rpx;
}
button:nth-of-type(2) {
  width: 35%;
  margin-bottom: 20rpx;
  font-size: 30rpx;
}
button:nth-of-type(3) {
  width: 35%;
  margin-bottom: 20rpx;
  font-size: 30rpx;
}
button:nth-of-type(4) {
  width: 35%;
  font-size: 30rpx;
}
</style>
