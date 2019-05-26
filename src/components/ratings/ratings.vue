<template>
  <div class="ratings" v-el:rating>
     <div class="ratings-content">
     	<div class="overview">
     		<div class="overview-left">
     			<h1 class="scores">{{seller.score}}</h1>
     			<div class="title">综合评分</div>
     			<div class="rank"> 高于周边商家{{seller.rankRate}}%</div>
     		</div>
     		<div class="overview-right">
     		    <div class="score-wrapper">
     		    	 <span class="title">服务态度</span>
     			     <star :size="36" :score="seller.serviceScore"></star>
     			     <span class="score">{{seller.serviceScore}}</span>
     		    </div>
     			<div class="score-wrapper">
     		    	 <span class="title">商品评分</span>
     			     <star :size="36" :score="seller.foodScore" class="star"></star>
     			     <span class="score">{{seller.foodScore}}</span>
     		    </div>
     		    <div class="delivery-wrapper">
     		    	<span class="title">送达时间</span>
     		    	<span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
     		    </div>
     		</div>
     	</div>
        <split></split>
        <ratingselect  :ratings="ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc"></ratingselect>
        <div class="rating-wrapper">
        	<ul>
        		 <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating)">
        		 	<div class="avatar">
        		 		<img width="28" height="28" :src="rating.avatar"/>
        		 	</div>
        		 	<div class="content">
        		 		<h1 class="name">{{rating.username}}</h1>
        		 		<div class="star-wrapper">
        		 			<star :size="24" :score="rating.score" class="star"></star>
        		 			<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
        		 		</div>
        		 		<p class="text">{{rating.text}}</p>
        		 		<div class="recommend" v-show="rating.recommend&&rating.recommend.length">
        		 			<span class="icon-thumb_up"></span>
        		 			<span v-for="item in rating.recommend" class="recommend-item">{{item}}</span>
        		 		</div>
        		 		<div class="time">
        		 			{{rating.rateTime | formatDate}}
        		 		</div>
        		 	</div>
        		 </li>
        	</ul>
        </div>
     </div>
  </div>
</template>

<script>
   import star from "components/star/star";
   import split from "components/split/split";
   import ratingselect from "components/ratingselect/ratingselect";
   import BScroll from "better-scroll";
   import {formatDate} from "src/common/js/date";
   const POSITIVE = 0;
   const NEGATIVE = 1;
   const ALL = 2;
   const ERR_OK = 0;
   export default {
   	  data () {
          return {
          	selectType: ALL,
          	onlyContent: true,
          	ratings:[]
          }
   	  },
   	  props:{
   	  	seller: {
   	  		type:Object
   	  	}
   	  },
   	  created () {
        this.$http.get("/api/ratings").then((response)=>{
             response = response.body;
             if(response.errno === ERR_OK ) {
                this.ratings = response.data;
                this.$nextTick(()=>{
                	this.scroll = new BScroll(this.$els.rating,{
                		click:true
                	});
                });
             }
        })
   	  },
   	  methods: {
   	  	needShow (rating) {
             return (this.selectType === ALL ? true : rating.rateType === this.selectType)&&(this.onlyContent ? rating.text: true);
   	  	}
   	  },
   	  components: {
   	  	star,
   	  	split,
   	  	ratingselect
   	  },
   	  filters: {
   	  	 formatDate (time) {
            let date = new Date(time);
   	   	  	return formatDate(date,"yyyy-MM-dd hh:mm");
   	  	 }
   	  },
   	  events: {
   	  	'ratingtype.select'(el) {
           this.selectType = el;
           this.$nextTick(()=>{
           	   this.scroll.refresh();
           });
   	  	},
   	  	'content.toggle'(content) {
           this.onlyContent = content;
           this.$nextTick(()=>{
           	   this.scroll.refresh();
           });
   	  	}
   	  }
   }
</script>

<style lang="stylus" type="stylesheet/stylus">
.ratings
 	position: absolute
 	top: 174px
 	bottom:0
 	left:0 
 	width:100%
 	overflow:hidden
  .overview
     display:flex
     padding: 18px 0
    .overview-left
     	flex: 0 0 137px
     	width: 137px 
     	border-right: 1px solid rgba(7,17,27,0.1)
     	text-align: center
     	@media only screen and (max-width:320px)
     	  flex: 0 0 120px 
     	  width: 120px
      .scores 
          line-height:28px
          font-size: 24px
          color:rgb(255,153,0)
      .title 
      	  font-size: 12px
      	  color:rgb(7,17,27)
      	  line-height: 12px
      	  margin-top: 6px
      	  margin-bottom: 8px 
      .rank 
      	  font-size: 10px
      	  line-height: 10px
      	  color: rgb(147,153,159)
      	  margin-bottom: 6px
    .overview-right
        flex:1	
        padding-left:24px
        @media only screen and (max-width:320px)
           padding-left:6px
       .score-wrapper
       	  margin-bottom: 8px
       	  font-size: 0
       	  color: rgb(7,17,27)
       	 .title 
       	 	display:inline-block
       	 	vertical-align: top
       	 	font-size: 12px
       	 	margin-right:12px
       	 	line-height:18px
       	 .score 
       	 	display:inline-block
       	 	vertical-align:top 
       	 	font-size: 12px
       	 	color: rgb(255,153,0)
       	 	line-height:18px
       	 .deliveryTime
       	 	color:rgb(147,153,159)
       	 	font-size: 12px
       	 .star 
       	 	display:inline-block
       	 	vertical-align: top
       	 	margin-right:12px
.rating-wrapper
   padding: 0 18px
   .rating-item
   	 padding: 18px 0
   	 position: relative
   	 border-bottom: 1px solid rgba(7,17,27,0.1)
   	 .avatar
   	 	display: inline-block
   	 	position: absolute
   	 	left: 0
   	 	top: 18px
   	 	img 
   	 	   border-radius: 50%
   	 .content 
   	 	margin-left:40px
   	 	position: relative
   	 	.name 
   	 	   font-size: 10px
   	 	   color:rgb(7,17,27)
   	 	   line-height:12px
   	 	.star-wrapper
   	 	   margin: 4px 0 6px 0
   	 	   .star 
   	 	   	  margin-right:0
   	 	   .delivery 
   	 	   	  display:inline-block
   	 	   	  vertical-align: top
   	 	   	  margin-left: 6px
   	 	   	  font-size: 10px 
   	 	   	  font-weight: 200
   	 	   	  color:rgb(147,153,159)
   	 	   	  line-height:12px
   	 	.text 
   	 	   font-size: 12px
   	 	   color:rgb(7,17,27)
   	 	   line-height:18px
   	 	   margin-bottom: 8px
   	 	.recommend
   	 	    font-size: 0
   	 	   .icon-thumb_up
   	 	   	  display:inline-block
   	 	   	  vertical-align:top
   	 	   	  font-size: 12px
   	 	   	  color:rgb(0,160,220)
   	 	   	  line-height:16px
   	 	   .recommend-item 
   	 	   	  display:inline-block
   	 	   	  vertical-align:top
   	 	   	  font-size: 9px
   	 	   	  color:rgb(147,153,159)
   	 	   	  line-height:16px
   	 	   	  margin-left:8px
   	 	   	  margin-bottom: 2px
   	 	   	  padding: 0 6px
   	 	   	  border:1px solid rgba(7,17,27,0.1)
   	 	   	  border-radius: 2px
   	 	   	  background:#fff
   	 	.time 
   	 		position: absolute
   	 		top: 0
   	 		right: 0
   	 		font-size: 10px
   	 		font-weight: 200
   	 		line-height:12px
   	 		color:rgb(147,153,159)
</style>
