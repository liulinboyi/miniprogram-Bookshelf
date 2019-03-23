<template>
    <div>
        <swiper class="swiper"
  indicator-dots="true"
  indicator-color="#ea5a49"
  autoplay="true"
  interval="5000"
  duration="1000"
  circular="true"
>
  <!-- <block wx:for="{{imgUrls}}">
    <swiper-item>
      <image src="{{item}}" class="slide-image" width="355" height="150" />
    </swiper-item>
  </block> -->
  <div v-for="(top,index) in imageUrl" :key="index">
    <swiper-item>
      <image
      @click="bookDetail(img)" 
      v-for="(img,i) in top"
      :key="i"
      mode="aspextFit" 
      :src="img.image" 
      class="slide-image" 
      width="355" 
      height="150" />
    </swiper-item>
  </div>
  <!-- <swiper-item 
    v-for="(img,i) in top"
      :key="i">
      <image 
      mode="aspextFit" 
      :src="img.image" 
      class="slide-image" 
      width="355" 
      height="150" />
    </swiper-item> -->
</swiper>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // top:[]
            // res:{},
            // tops:[]
            // Top:[]
            // top:this.tops
        }
    },
    props:{
        top:{
            type:Array,
            default(){
                return []
            }
        }
    },
    // watch: {
    //     tops:function(newval,oldval){
    //         this.res = newval
    //         // let res = this.Top
    //         // this.Top =  [res.slice[0,3],res.slice[3,6],res.slice[6]]
        
    //     }
    // },
    computed: {
        imageUrl(){
            let res = this.top
            return [res.slice(0,3),res.slice(3,6),res.slice(6)]
        }
    },
    mounted () {
        // console.log(this.imageUrl)
        

    },
    onLoad(){
        // console.log(this.top)
        // console.log(this.imageUrl)
    },
    methods: {
        bookDetail(img){
        this.$store.state.load = true
        console.log(this.$store.state.load)
           wx.navigateTo({
                url:'/pages/detail/main?id=' + img.id
            })
        }
    }
}
</script>
<style>
.swiper{
    margin-top: 5px;
}
.slide-image{
    width: 30%;
    height: 250rpx;
    margin: 0 1.6%;
}
</style>
