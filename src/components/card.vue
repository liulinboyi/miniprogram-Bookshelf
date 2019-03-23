<template>
<a :href="detailUrl" @click="load">
<div class="card">
      <div class="thumb">
        <img @click.stop="preview(book)" :src="book.image" class="image" alt="" mode="aspectFit" lazy-load="true">
        <div class="thumb_main">
          <div class="detail">
         《{{ book.title }}》
          </div>
          <div class="detail">
          &nbsp;- {{ book.author }}
          </div>
          <div class="detail">
          &nbsp;- {{ book.publisher }}
          </div>
        </div>
        
      </div>
      <div class="right">
      
        <div class="discuss">
          {{ book.rate }}分 <rate :value="book.rate"></rate>
        </div>
        <div class="discuss text-primary">
           浏览量:{{ book.count }}
        </div>
        <div class="discuss">
          <img :src="book.user_info.avatarUrl" alt="" srcset="" mode="scaleToFill">
          <span>{{ book.user_info.nickName }}</span>
        </div>
      </div>
      
</div>
</a>

</template>

<script>
import rate from '@/components/rate.vue'
export default {
 props:['book'],
 components: {
   rate
 },
 computed: {
   detailUrl(){
     return '/pages/detail/main?id=' + this.book.id
   }
 },
 methods: {
   preview(book){
     wx.previewImage({
       urls:[book.image]
     })
   },
   load(){
     this.$store.state.load = true
     console.log(this.$store.state.load)
   }
 },
}
</script>

<style>
.thumb{
  /* width: 100rpx; */
  height: 150rpx;
  display: flex;
  /* flex-direction: column; */

}
.thumb image{
  height: 100%;
  width: 150rpx;
}
.card{
  display: flex;
  justify-content: space-between;
  border: 1px solid rgba(230, 230, 230, 0.3);
  margin-bottom: 10rpx;
  margin-left: 15rpx;
  margin-right: 15rpx;
  /* border-radius: 20rpx; */
  font-size: 14px;
}
.right{
  display: flex;
  flex-direction: column;
/* justify-content: center; */
}
.discuss{
  text-align: right;
}
.discuss:nth-of-type(1){
  display: flex;
  width: 200rpx;
  justify-content: space-between;
}
.discuss:nth-of-type(3) img{
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
}
.discuss:nth-of-type(3){
  /* height: 40rpx; */
  /* width: 200rpx; */
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
}
.detail{
width:350rpx;
overflow:hidden;
white-space:nowrap;
text-overflow: ellipsis;
}
.thumb_main .detail:nth-of-type(1){
  color: rgb(226, 25, 24);
}
.text-primary{
  color: rgb(226, 25, 24);
}
</style>
