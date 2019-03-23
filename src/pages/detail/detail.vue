<template>
    <div>
        <BallPulse :size="size" :color="color" v-if="showball"></BallPulse>
        <!-- <BallPulse :size="size" :color="color" v-if="false"></BallPulse> -->
        <!-- <top :title='title' :show_bol='false' :my_class="true"></top> -->
        <bookinfo :bookinfo="detailvant" :tags="tags" :userinfo="userInfo" :summary="summary"></bookinfo>
    </div>
</template>
<script>
import {get} from '@/util.js'
import bookinfo from '@/components/bookinfo.vue'
import { store, mapState, mapMutations } from 'vuex'
import BallPulse from 'mpvue-loading/src/loaders/ball-pulse'

export default {
    data () {
        return {
            bookid:'',
            bookinfo:{},
            tags:[],
            size:'1em',
            color: '#ea5a49',
            userinfo:{},
            summary:[],
            detailvant:[],
            userInfoint:{},
            showball:true,
            title:"图书",
            Permission:''
            
        }
    },
    components: {
        bookinfo,
        BallPulse
    },
    methods: {
       async getDetail(){
           const info = await get('/weapp/bookdetail',{id:this.bookid})
           this.bookinfo = info.book
        //    this.userinfo = info.user_info
           this.summary = info.summary
           console.log(info)
           this.tags = info.book.tags.split(',')
        // this.tags = info.book.tags
           console.log(this.tags)
           wx.setNavigationBarTitle({
               title:info.book.title
               })
        //    console.log(info)
           this.$store.state.tags = info.book.tags
       },
       fuzhi(){
           this.$store.state.load = false
       },
               
        //云函数 
        cloudbook(Per){
        const db = wx.cloud.database()
        const book = db.collection(Per)
        book.where({
            _id: this.bookid
          }).get({
        success:(res) => {
          console.log("云开发",res)


        //           wx.getSetting({
        // success: res => {
        // if (res.authSetting['scope.userInfo']) {
        //   // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        //   wx.getUserInfo({
        //     success: res => {
        //         // this.avatarUrl = res.userInfo.avatarUrl,
        //         this.userInfoint = res.userInfo
        //         console.log("微信头像获取")
 
        //         this.fuzhi()
        // console.log(this.$store.state.load)
        //         // console.log("userInfoint",this.userInfoint)
        //             }
        //         })
        //         }
        //     }
        //     })
        //   wx.cloud.callFunction({
        //     name: 'login',
        //     complete: res => {
        //         console.log('callFunction test result: ', res)
        //     }
        //     })

        //   this.setData({
        //     booklist:res.data
        //   })
        // res.data.push(this.userInfoint)
        if(Per === "mybook"){
            res.data[0]['userinfo'] = this.$store.state.personweixin
        }
        
        this.detailvant = res.data
        this.$store.state.load = false
        this.showball = false
        this.summary = res.data[0].summary.split('\n')
        this.title = res.data[0].title
        // this.detailvant = Object.assign({},res.data[0],this.userInfoint)
        console.log("mounted")
        // console.log("detailvant",this.detailvant)
        // console.log("summary",this.summary)
        }
      })
        }
    },
    mounted() {
        // Object.assign(this.$data, this.$options.data())
        this.bookid = this.$root.$mp.query.id
        this.Permission = this.$root.$mp.query.Permission
        console.log(this.$root)
        console.log("bookid",this.bookid)
        console.log("this.Permission",this.Permission)
        // this.getDetail()
        
        if(this.Permission === 'public'){
            this.cloudbook('publicbook')
        }else if(this.Permission === 'private'){
            this.cloudbook('mybook')
        }
        //动态设置标题
        wx.setNavigationBarTitle({
        title: decodeURI(this.$root.$mp.query.title)
        })
        console.log('进入',this.$root)
        //云函数
        
        // setTimeout(,500)
        //开启分享
        if(this.Permission === 'public'){
            wx.showShareMenu({
            withShareTicket: false
            })
        }

        // constants.log("mounted detailvant",this.detailvant)
        
    },
    if(){

    },
    // onShareAppMessage(res){

    //     if (res.from === 'menu') {
    //             // 来自页面内转发按钮
    //             console.log(res)
    //             console.log('点击分享')
    //             }
    // if(this.$root.$mp.query.Permission === "private"){
    // return {
    //   title: this.detailvant[0].title,
    //   path: '/pages/detail/main?id=' + this.$root.$mp.query.id + +'&Permission=private',
    // //   imageUrl: this.detailvant[0].image
    // }
    // }else if(this.$root.$mp.query.Permission === "public"){
    // return {
    //   title: this.detailvant[0].title,
    //   path: '/pages/detail/main?id=' + this.$root.$mp.query.id + +'&Permission=public',
    // //   imageUrl: this.detailvant[0].image
    // }
    // }

		
	// },

    onReady() {
console.log("onReady")

    },
    created(){
        console.log('详情页')
    },
    beforeCreate () {

    },
    computed: {
        loading(){
            let res = this.$store.state.load
            return res
        },
        userInfo(){
            let res = this.userInfoint
            return res
        },
        detailvant(){
            return Object.assign({},this.detailvant,this.userInfoint)
        }
    },
}
</script>
<style>
.vue-loaders{
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #fff;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
}
.tabar{
    opacity: 0!important;
}
</style>
