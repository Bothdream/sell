<template>
	<div class="star" :class="starType">
		<span v-for="itemClass in itemClasses" :class="itemClass" class="star-item" track-by="$index"></span>
	</div>
</template>
<script type="text/javascript">
    const LENGTH = 5;
    const ON = "on";
    const HALF = "half";
    const OFF = "off";
	export default {
       props:{
       	  size:{ //父组件上的属性
             type:Number
       	  },
       	  score:{//父组件上的属性
             type:Number
       	  }
       },
       computed:{
          starType () {
             return "star-" + this.size;
          },
          itemClasses () {
             let result = [];
             let score = Math.floor(this.score * 2) / 2; 
             let hasDecimal = score % 1 !==0;
             let interger = Math.floor(score);
             for (let i = 0; i < interger; i++) {
                 result.push(ON);
             }
             if(hasDecimal){
                result.push(HALF);
             }
             while (result.length < LENGTH) {
             	 result.push(OFF);
             }
             return result;
          }
       }
	}
</script>
<style lang="stylus" type="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
	.star
	   font-size:0px
	  .star-item
	     display:inline-block
	     background-repeat:no-repeat
     &.star-48
       .star-item
	       width:20px
	       height:20px
	       margin-right:22px
	       background-size:20px 20px
	       &:last-child
	      	   margin-right:0px
	       &.on 
	      	   bg-image("star48_on")
	       &.half 
	         bg-image("star48_half")
	       &.off 
	      	   bg-image("star48_off")
     &.star-36
       .star-item
      	   width:15px
      	   height:15px
      	   margin-right:6px
      	   background-size:15px 15px
      	   &:last-child
      	  	 margin-right:0px
      	   &.on 
      	  	 bg-image("star36_on")
      	   &.half 
      	  	 bg-image("star36_half")
      	   &.off 
      	  	 bg-image("star36_off")
     &.star-24
       .star-item
      	   width:10px
      	   height:10px
      	   margin-right:3px
      	   background-size:10px 10px
      	   &:last-child
      	  	 margin-right:0px
      	   &.on 
      	  	 bg-image("star24_on")
      	   &.half 
      	  	 bg-image("star24_half")
      	   &.off 
      	  	 bg-image("star24_off")
</style>