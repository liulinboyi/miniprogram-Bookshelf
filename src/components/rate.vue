<template>
    <div class="rate">
        <div>☆☆☆☆☆</div>
        <div class="hollow" :style="style">★★★★★</div>
        <!-- ★☆ -->
    </div>
</template>
<script>
export default {
    // props:['value']
    props:{
        value:{type:[Number,String],default:'0'}
    },
    computed: {
        style(){
            return `width:${(this.value)*10}%`
            //采用百分比来打分
        }
    },
    created () {
        // console.log(this.value)
    }
}
</script>
<style>
    .rate{
        /* width: 5em; */
        position: relative;
        /* font-size: 20px; */
    }
    .rate div:nth-of-type(1){
        /* width: 5em; */
        color: #ea5149;
    }

    .hollow{
        position: absolute;
        display: inline-block;
        top: 0;
        left: 0em;
        right: 0;
        /* width: 3em; */
        overflow: hidden;
        color: #ea5149;
    }
</style>
