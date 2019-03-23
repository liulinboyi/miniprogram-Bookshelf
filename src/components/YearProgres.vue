<template>
    <div>
        <div class="progress">
            <progress :percent="percent" color="#ea5a49" stroke-width="20rpx" border-radius="10rpx" active="true" />
            <p>{{ year }}已经过去了{{ days }}天{{ percent }}%</p>
        </div>
        
    </div>
</template>
<script>
export default {
    methods: {
        isleepYear(){
            const year = new Date().getFullYear
            if(year % 400 ===0 || year % 4 === 0 && year % 100 !== 0){
                return true
            }else{
                return false
            }
        },
        getDayOfYead(){
            return this.isleepYear() ? 366 : 365
        }
    },
    computed: {
        year(){
            return new Date().getFullYear()
        },
        days(){
            let start = new Date()
            start.setMonth(0)
            start.setDate(1)
            // start就是今年第一天
            //今天的时间戳减去第一天的时间戳
            let offSet =  new Date().getTime() - start.getTime()
            return parseInt(offSet/1000/60/60/24) + 1
        },
        percent(){
          return (this.days*100/this.getDayOfYead()).toFixed(1)
        }
    }
}
</script>

<style scoped>
.progress{
    margin-bottom: 20%;
}
progress{
    width: 80%;
    margin: 0 auto;
}
.progress p{
 width: 80%;
 text-align: center;
 margin: 0 auto;
}
</style>
