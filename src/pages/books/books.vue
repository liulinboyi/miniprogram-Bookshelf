<template>
  <div>
    <top title='我的书架' :show_bol='true'></top>
    <van-toast id="van-toast" />
    <van-tabs @change="onClick" swipeable>
    <van-tab title="我读的书">

    <div class="bookvant" v-for="(book,index) in bookvant" :key="index">
      <a :href="detailUrl + book._id +'&Permission=private' + '&title=' + book.title" @click="load">
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
    
    <div class="empty" v-if="empty">
      <img src="https://ws1.sinaimg.cn/large/8660d1bbly1fz1jveboc2j205k05kt8k.jpg" alt="">
      <div>空空如也<br>登录之后，添加点书吧</div>
    </div>
    </van-tab>
    <van-tab title="大家的书">

    <div class="bookvant" v-for="(book,index) in publicbookvant" :key="index">
      <a :href="detailUrl + book._id +'&Permission=public'  + '&title=' + book.title" @click="load">
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

      <div class="empty" v-if="publicempty">
      <img src="https://ws1.sinaimg.cn/large/8660d1bbly1fz1jveboc2j205k05kt8k.jpg" alt="">
      <div>空空如也<br>登录之后，添加点书吧</div>
    </div>

    </van-tab>
    </van-tabs>
    <!-- <div class="empty" v-if="empty">
      <img src="https://ws1.sinaimg.cn/large/8660d1bbly1fz1jveboc2j205k05kt8k.jpg" alt="">
      <div>空空如也<br>登录之后，添加点书吧</div>
    </div> -->
    <!-- <div class="bookvant" v-for="(book,index) in bookvant" :key="index">
      <a :href="detailUrl + book._id" @click="load">
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
    </div> -->

    <!-- <topswiper v-bind:top="tops"></topswiper>
        <card v-for="(book,index) in books" :key="index" :book="book"></card>
    <p class="text-footer" v-show="!more">没有更多数据</p>-->
    <!-- <card></card> -->
  </div>
</template>

<script>
import { get } from "@/util.js";
import card from "@/components/card.vue";
import topswiper from "@/components/topswiper.vue";
import Toast from '../../../static/vant/toast/toast.js';
export default {
  components: {
    card,
    topswiper
  },
  data() {
    return {
      books: [],
      page: 0,
      pagepublic:0,
      more: true,
      tops: [],
      swiper: [],
      loading: false,
      bookvant: [],
      publicbookvant:[],
      empty:false,
      publicempty:false,
      windowHeight:'auto',
      which:true,
      who:'我读的书',
      shuaxin: false
    };
  },
  computed: {
    detailUrl() {
      return "/pages/detail/main?id=";
    }
  },
  methods: {
    onClick(event){
      Toast.loading({
      mask: true,
      message: '加载中...',
      duration: '800'
    });
      if(event.mp.detail.title === "大家的书"){
        this.who = event.mp.detail.title
        if(this.which == true){
          if(this.shuaxin == false){
            this.cloudpublicbook()
          }
          
        }

        
      }else if(event.mp.detail.title === "我读的书"){
        this.who = event.mp.detail.title
      wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            if(this.more == true){
              if(this.shuaxin == false){
                this.cloudbook()
              }
              
            }
        }
      }
    })

      }
      console.log(event.mp.detail.title)
    },
    //init为了判断是否初始化 下拉刷新或者 滚动加载都是初始化 page都是0
    // async getList(init) {
    //   if (init) {
    //     this.page = 0;
    //     this.more = true;
    //   }
    //   wx.showNavigationBarLoading();
    //   const book = await get("/weapp/booklist", { page: this.page });
    //   // console.log(book.list)

    //   if (book.list.length < 10 && this.page > 0) {
    //     this.more = false;
    //   }
    //   if (init) {
    //     this.books = book.list;
    //     wx.stopPullDownRefresh(); //
    //   } else {
    //     this.books = this.books.concat(book.list);
    //   }
    //   wx.hideNavigationBarLoading();
    //   // console.log(this.nickName)
    //   // this.nickName = book.list
    //   console.log("getlist");
    // },
    // async getTop() {
    //   const tops = await get("/weapp/top");
    //   //    console.log(tops)
    //   this.tops = tops.list;
    // },
    // data(){
    //     for(var i=0;i<this.books.length;i++){
    //     console.log('data')
    //       console.log(books[i].user_info.nickName)
    //     }
    // }
    //     onPullDownRefresh(){
    // 　　console.log('--------下拉刷新-------')
    // 　　wx.showNavigationBarLoading() //在标题栏中显示加载
    cloudbook() {
      const db = wx.cloud.database();
      const book = db.collection("mybook");
      book.limit(10).orderBy('createTime', 'desc').get({
        success: res => {
          console.log("云开发", res);
          //   this.setData({
          //     booklist:res.data
          //   })
          if(res.data.length === 0){
            this.empty = true
          }else{
            this.empty = false
          }
          this.bookvant = res.data;
          console.log(this.bookvant);
        }
      });
    },
    cloudpublicbook(){
      const db = wx.cloud.database();
      const book = db.collection("publicbook");
      book.limit(10).orderBy('createTime', 'desc').get({
        success: res => {
          console.log("云开发", res);
          //   this.setData({
          //     booklist:res.data
          //   })
          if(res.data.length === 0){
            this.publicempty = true
          }else{
            this.publicempty = false
          }
          // this.publicempty = false
          this.publicbookvant = res.data;
          console.log(this.publicbookvant);
        }
      });
    },
    load() {
      this.$store.state.load = true;
      console.log(this.$store.state.load);
    }

    //     }
  },
   onLoad() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
             this.$store.state.personweixin = res.userInfo
             console.log("this.$store.state.personweixin",this.$store.state.personweixin)
            }
          })
        }
      }
    })
  },
  async onPullDownRefresh() {
    console.log("下拉刷新了");
    this.shuaxin = true
    this.cloudpublicbook()
    // this.getList(true);
    // this.getTop();
    // this.cloudbook();
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // this.empty = false
            this.cloudbook();
            this.cloudpublicbook()
            this.page = 0
            this.pagepublic = 0
            this.more = true
            this.which = true
        }
      }
    })
    // to doing..
    // 停止下拉刷新
    wx.stopPullDownRefresh();
  },
  // onload(){
  //     this.getList()
  // },

  // 上拉加载，拉到底部触发
  onReachBottom() {
    //判断是否还有更多
    if(this.who === "我读的书"){

    
    if(this.more){
     wx.showLoading({
        title: "加载中"
      });
    const db = wx.cloud.database();
    const book = db.collection("mybook");
    let page = this.page + 10
    console.log(page)
    book.skip(page).limit(10).orderBy('createTime', 'desc').get().then(res => {
      let new_data = res.data
      let old_data = this.bookvant
      if (res.data.length != 0) {
        this.bookvant = old_data.concat(new_data)
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

    }

if(this.who === "大家的书"){


if(this.which){

         wx.showLoading({
        title: "加载中"
      });
    const db = wx.cloud.database();
    const book = db.collection("publicbook");
    let pagepublic = this.pagepublic + 10
    console.log(pagepublic)
    book.skip(pagepublic).limit(10).orderBy('createTime', 'desc').get().then(res => {
      let new_data = res.data
      let old_data = this.publicbookvant
      if (res.data.length != 0) {
        this.publicbookvant = old_data.concat(new_data)
        this.pagepublic = pagepublic
        this.which = false
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


}


    // 到这底部在这里需要做什么事情
    // this.loadMore();
  },
  mounted() {
    
      Toast.loading({
      mask: true,
      message: '加载中...',
      duration: '1000'
    });
    // this.getList(true);
    // this.getTop();
 
    console.log("ok", this.detailUrl);
    console.log("vant", this.bookvant);
       wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // this.empty = false
            this.cloudbook();
        }else{
          this.empty = true
        setTimeout(function() {
          wx.hideLoading();
        }, 100);
        }
      }
    })
    try {
  const res = wx.getSystemInfoSync()
  console.log(res.model)
  console.log(res.pixelRatio)
  console.log(res.windowWidth)
  console.log(res.windowHeight)
  console.log(res.language)
  console.log(res.version)
  console.log(res.platform)
  this.windowHeight = res.windowHeight
} catch (e) {
  // Do something when catch error
}
  },
  updated() {
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //         setTimeout(function() {
    //       wx.hideLoading();
    //     }, 100);
    //     }
    //   }
    // })
          setTimeout(function() {
          wx.hideLoading();
        }, 100);
  },
  onTabItemTap() {
    if (this.$store.state.saoma) {
      console.log(this.$store.state.saoma);
      wx.startPullDownRefresh();
    }
    if (this.$store.state.loginbook) {
      console.log(this.$store.state.loginbook);
      wx.startPullDownRefresh();
    }
    this.$store.state.saoma = false;
    this.$store.state.loginbook = false;
    // this.loading = !this.loading
  },
  // onReachBottom() {
  //   if (!this.more) {
  //     //没有更多
  //     setTimeout(function() {
  //       wx.hideLoading();
  //     }, 0);
  //     return;
  //   } else {
  //     wx.showLoading({
  //       title: "加载中"
  //     });
  //   }
  //   this.page = this.page + 1;
  //   // this.getList();
  //   setTimeout(function() {
  //     wx.hideLoading();
  //   }, 500);
  // },
  created() {
    console.log('图书页面')
         wx.showLoading({
        title: "加载中"
      });
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
    // console.log(this.$store.state.count)
    // this.data()
  },
  // computed: {
  //     imageUrl(){
  //         let res = this.tops
  //         return [res.slice[0,3],res.slice[3,6],res.slice[6]]
  //     }
  // },
  watch: {
    tops: function(newval, oldval) {
      let res = newval;
      // console.log(res)
      this.swiper = [res.slice(0, 3), res.slice(3, 6), res.slice(6)];
      // console.log(this.swiper)
      // let res = this.Top
      // this.Top =  [res.slice[0,3],res.slice[3,6],res.slice[6]]
    }
  }
};
</script>
<style>
.empty{
  display:flex;
  flex-direction: column;
  align-items: center;
justify-content:center;
position:relative;
/* top:100rpx; */
text-align: center;

}
.empty image{
  width: 100px;
  height: 100px;
}
.topbar{
position: -webkit-sticky;
position: -moz-sticky;
position: -ms-sticky;
position: sticky;
top: 0;
z-index: 888;
text-align: center;
  width: 100%;
  /* height: 125rpx;
  line-height: 125rpx; */
    background-color: #e74040;
    /* padding-top: 35rpx; */
    padding: 35px 0 15px 0;
    font-size: 18px;
}
/* .van-card{
height: 240rpx!important;

}
.van-card__thumb{
    height: 240rpx!important;
} */
</style>
