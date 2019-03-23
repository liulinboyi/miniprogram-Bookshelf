<template>
    <div class="bookinfo" v-if="bookinfo">
        <div v-for="(bookinfo,i) in bookinfo" :key="i">

        <div class="back">
            <img :src="bookinfo.images.small" alt="" srcset="">
        </div>
         <div class="backin">
             <div class="back_main">
                 <img :src="bookinfo.images.small" alt="" srcset="" mode="aspectFit">
                <p>{{ bookinfo.title }}</p>
                <p>{{ bookinfo.author }}</p>
             </div>
             
         </div>
    <div class="bookinfo-main">
        <div class="bookinfo-mainleft">
        <span><img :src="bookinfo.userinfo.avatarUrl" alt="" srcset="">{{ bookinfo.userinfo.nickName }}</span>
        <span>{{ bookinfo.publisher }}</span>
        </div>
        <div class="bookinfo-mainright">
        <span>{{ bookinfo.rating.average }}<rate :value="bookinfo.rating.average" v-if="bookinfo"></rate></span>
        <span>{{ bookinfo.price }}</span>
        </div>
    </div>
    <div class="tagsmain">
    <div class="tagsfadein">
    <div class="tagsin" v-for="(tag,index) in tags" :key="index"  @click="tab(index)">
    {{ tag }}
    <div class="tagshide" v-if="index == show ? true : false" @click.stop="tabhide()">
        <!-- <div class="tagshide"> -->
        {{ tag }}
    </div>
    </div>
    </div>
    <!-- <div class="tagsout">
    
    <div class="tags" v-for="(tag,index) in tags" :key="index" v-show="index == show ? true : false">
    {{ tag }}
    </div>
    </div> -->
    </div>
    <div class="summary_main">

    <div class="summary" v-for="(s,index) in summary" :key="index">
        &nbsp;&nbsp;&nbsp;&nbsp;{{ s }}
    </div>
    <!-- <div class="summary">
        {{ summary }}
    </div> -->

    </div>
    
    
    </div>
    
    </div>
</template>
<script>
// const dataArr = []
import rate from '@/components/rate.vue'
export default {
    props:['bookinfo','tags','userinfo','summary'],
    data() {
        return {
            show:null,
           tuhsu:{}
            // avatarUrl:null,
            // userInfo:{nickName:'昵称'}
            // tags:[]
            // tag:[]
        }
    },
    components: {
        rate
    },
    // computed: {
    //     tag(){
    //         let res = this.tags.split(',')
    //         return res
    //     }
    // },
   mounted() {
      
        // Object.assign(this.$data, this.$options.data())
        // this.tag = this.tags
        // if(this.tag){
        //     console.log('true')
        // }else{
        //     console.log('false')
        // }
        // console.log(this.tags)
        // dataArr.push({ ...this.$data })
    },
    onLunch(){
        // Object.assign(this.$data, this.$options.data())
    //      this.show = null
    //    console.log('show',this.show)
    },
    onLoad() {//组件或者页面重新加载会执行此生命周期
    // Object.assign(this.$data, this.$options.data())
    // // fetch some data
    // dataArr.push({ ...this.$data })
    this.show = null
       console.log('show',this.show)
    },
    onReady(){
    //     wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //             this.avatarUrl = res.userInfo.avatarUrl,
    //             this.userInfo = res.userInfo
    //         }
    //       })
    //     }
    //   }
    // })
    },
    // onUnload () {
    // dataArr.pop()
    // const dataNum = dataArr.length
    // if (!dataNum) return
    // Object.assign(this.$data, dataArr[dataNum - 1])
    // },
    created() {
        console.log("bookinfo ok",this.bookinfo)
        console.log(this.tags)
        // console.log(this.$store.state.tags)
    },
    methods: {
        tab(index){
            this.show = index
            console.log('index',index)
            console.log('show',this.show)
        },
        tabhide(){
            this.show = null
        }
        // show(index){
        //     // this.$el.querySelectorALL(".tags")[index].style.display="inline-block"
        //     console.log(document.querySelectorAll('.tags'))
        // }
    },
    onLoad: function(options) {
    // 获取用户信息
    
  },
    // computed: {
    //     tagsshow(){

    //     }
    // }
}
</script>
<style>
.summary_main{
    font-size: 30rpx;
    padding: 10rpx 15rpx;
}
.bookinfo-mainright span:nth-of-type(2){
    text-align: right;
}
.rate{
    display: inline-block
}
.bookinfo-mainleft span:nth-of-type(1) img{
    width: 1em;
    height: 1em;
    border-radius: 50%;
    vertical-align: center;
}
.bookinfo-mainleft span:nth-of-type(1){
    vertical-align: center;
    display: flex;
    align-items: center;
}
.tagshide{
    border: 1rpx #ea5a49 solid;
    border-radius: 1em;
    /* padding: 0 .6em; */
    position: absolute;
    left: 0;
    right: 0;    
    /* top: 4em; */
    width: 100%;
    background-color: #ea5a49;
    z-index: 2;
    color: #fff;
    /* display: inline-block; */
}
.tagsmain{
    position: relative;
    color: #ea5a49;
}
.tagsfadein{
        display: inline-block;
    text-align: center;
    word-wrap: break-word;
    /* position: absolute; */
}
.tagsin{
    display:inline-block;
/* display: flex; */
/* flex-direction: column; */
/* justify-content: space-between; */
border:1rpx #ea5a49 solid;
font-size:30rpx;
/* width:6em; */
height:1.5em;
text-align:center;
line-height:1.5em;
border-radius: 1em;
padding: 0 .6em;
position: relative;
margin: 10rpx 10rpx 10rpx 0;
}
.tagsout{
    display: inline-block;
    text-align: center;
    word-wrap: break-word;
    position: absolute;
    top: 1.2em;
    z-index: 2;
    /* padding: 0 .2em; */

    /* position: relative;
    left: 50%; */
    /* display: flex;
    flex-direction: column;
    justify-content: space-between; */
}
.tags{
 
    background-color:#ed5a45;
    position: relative;
/* position: relative;
right: 50%; */
/* float: left; */
display:inline-block;
/* display: flex; */
/* flex-direction: column; */
/* justify-content: space-between; */
border:1rpx #ea5a49 solid;
font-size:30rpx;
/* width:6em; */
height:1.5em;
text-align:center;
line-height:1.5em;
border-radius: 1em;
padding: 0 .6em;
   /* display: none; */
}
.bookinfo{
/* height: 240rpx; */
position: relative;
}
.back{
    width: 100%;
    filter: blur(15px);
    position: absolute;
    overflow: hidden;
}
.back image:nth-of-type(1){
    position: relative;
    width: 100%;
    opacity: .3;
}
.backin{
    /* margin: 0 auto; */
    /* height: 300rpx; */
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500rpx;
}
.back_main{
    display: flex;
    /* justify-content: space-between; */
    flex-direction: column;
    text-align: center;
    font-size: 15px;
}
.backin image{
    width: 200rpx;
    height: 350rpx;
    z-index: 2;
    margin: 0 auto;
}
.back-main p{
    /* height: 30rpx; */

}
.bookinfo-main{
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    margin-top: 30rpx;
    margin-left: 20rpx;
    margin-right: 20rpx;
}
.bookinfo-mainleft{
    display: flex;
    flex-direction: column;
    justify-content: space-between;

}
.bookinfo-mainright{
    display: flex;
    flex-direction: column;
    
}
</style>

