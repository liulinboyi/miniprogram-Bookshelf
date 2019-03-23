<template>
  <div>
     <van-toast id="van-toast" />
    <div class="bookvant" v-for="(book,index) in publicbookvant" :key="index">
      <a :href="'/pages/detail/main?id=' + book._id +'&Permission=public' + '&title=' + book.title" @click="load">
        <van-card
          tag="扫码添加"
          :price="book.price"
          :desc="book.author"
          :title="book.title"
          :thumb="book.image"
          thumb-mode="aspectFit"
          lazy-load="true"
          link-type="navigateTo"
        >
          <view slot="tags">
            <van-tag type="primary" v-for="(tag,i) in book.tags" :key="i">{{ tag.name }}</van-tag>
          </view>
        </van-card>
      </a>
    </div>
  </div>
</template>

<script>
import Toast from '../../../static/vant/toast/toast.js';
export default {
  onReachBottom(){
    if(this.more){
     wx.showLoading({
        title: "加载中"
      });
    const db = wx.cloud.database();
    const book = db.collection("publicbook");
    let page = this.page + 10
    console.log(page)
    book.skip(page).limit(10).orderBy('createTime', 'desc').get().then(res => {
      let new_data = res.data
      let old_data = this.publicbookvant
      if (res.data.length != 0) {
        this.publicbookvant = old_data.concat(new_data)
        this.page = page
        this.more = false
            setTimeout(function() {
          wx.hideLoading();
        }, 100);
        // this.setData({
        //   products: old_data.concat(new_data),
        //   page: page
        // }, res => {
        //   console.log(res)
        //   console.log("触底了")
        // })
      }else{
            setTimeout(function() {
          wx.hideLoading();
        }, 100);
      }

      console.log(res.data)

    }).catch(err => {
        setTimeout(function() {
          wx.hideLoading();
        }, 100);
      console.log(err)
    })

    }
  },
    data() {
        return {
            publicbookvant:[],
            more: true,
            page:0
            // openid: null
        }
    },
    onLunch(){
        wx.cloud.callFunction({
            name: 'login',
            complete: res => {
                console.log('callFunction test result: ', res.result.openid)
                this.$store.state.openid = res.result.openid
            }
            })
    },
    methods: {
    cloudpublicbook(){
      const db = wx.cloud.database();
      const book = db.collection("publicbook");

            // console.log(this.openid)
      book.limit(10).orderBy('createTime', 'desc').where({
                    _openid: this.$store.state.openid
                  }).get({
        success: res => {
          console.log("云开发", res);
          //   this.setData({
          //     booklist:res.data
          //   })
        //   this.publicempty = false
          this.publicbookvant = res.data;
          console.log(this.publicbookvant);
          console.log(this.$store.state.openid)
        }
      });

    },
    },
    created () {
      console.log('我的分享页')
    },
    mounted () {
    Toast.loading({
      mask: true,
      message: '加载中...',
      duration: '1000'
    });
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            this.cloudpublicbook()
        }
      }
    })
       
    },
    onTabItemTap() {
    if (this.$store.state.fenxiang) {
      console.log(this.$store.state.fenxiang);
      wx.startPullDownRefresh();
    }
    if (this.$store.state.logincommon) {
      console.log(this.$store.state.logincommon);
      wx.startPullDownRefresh();
    }
    // if (this.$store.state.login) {
    //   console.log(this.$store.state.login);
    //   wx.startPullDownRefresh();
    // }
    this.$store.state.fenxiang = false;
    this.$store.state.logincommon = false;
    // this.$store.state.login = false;
    // this.loading = !this.loading
  },
    async onPullDownRefresh() {
    console.log("下拉刷新了");
    
                wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            this.more = true
            this.page = 0
            this.cloudpublicbook()
        }
      }
    })
    // this.getList(true);
    // this.getTop();
    // this.cloudbook();
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       this.empty = false
    //         this.cloudbook();
    //         this.page = 0
    //         this.more = true
    //     }
    //   }
    // })
    // to doing..
    // 停止下拉刷新
    wx.stopPullDownRefresh();
  },
    computed: {
        // openid(){
        //    let res = 

        //     return res
        // }
    },
};
</script>
<style>
</style>
