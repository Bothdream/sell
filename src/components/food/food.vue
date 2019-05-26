<template>
  <div v-show="showFlag" class="food" transition="right" v-el:food>
     <div class="food-content">
     	<div class="image-header">
     		<img :src="food.image" >
	     	<div class="back" @click="hide">
	     		<i class="icon-arrow_lift"></i>
	     	</div>
     	</div>
     	<div class="content">
     		<h1 class="title">{{food.name}}</h1>
     		<div class="detail">
     			<span class="sell-count">月售{{food.sellCount}}份</span>
     			<span class="rating">好评率{{food.rating}}</span>
     		</div>
     		<div class="price">
     			 <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
     		</div>
	     	<div class="cartcontrol-wrapper">
	     		<cartcontrol :food="food"></cartcontrol>
	     	</div>
     		<div class="buy" v-show="!food.count || food.count===0" @click.stop.prevent="addFirst($event)" transition="fade">加入购物车</div>
     	</div>
     	<split v-show="food.info"></split>
     	<div class="info" v-show="food.info">
     		<h1 class="title">商品信息</h1>
     		<p class="text"> {{food.info}} </p>
     	</div>
     	<split></split>
     	<div class="rating">
     		<h1 class="title">商品评价</h1>
     		<ratingselect  :ratings="food.ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc"></ratingselect>
     	    <div class="rating-wrapper">
     	       <ul v-show="food.ratings && food.ratings.length">
     	       	   <li v-for="rating in food.ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
     	       	   	   <div class="user">
     	       	   	   	   <span class="name">{{rating.username}}</span>
     	       	   	   	   <img :src="rating.avatar" width="12" height="12" class="avatar">
     	       	   	   </div>
     	       	   	   <div class="time">{{rating.rateTime | formatDate}}</div>
     	       	   	   <p class="text">
     	       	   	   	   <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
     	       	   	   	   {{rating.text}}
     	       	   	   </p>
     	       	   </li>
     	       </ul>
     	       <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
     	    </div>
     	</div>
     </div>
  </div>
</template>

<script>
   import BScroll from 'better-scroll';
   import cartcontrol from 'components/cartcontrol/cartcontrol';
   import Vue from "vue";
   import {formatDate} from 'src/common/js/date'; //寻找模块的目录
   import split from 'components/split/split';
   import ratingselect from 'components/ratingselect/ratingselect';

   const POSITIVE = 0;
   const NEGATIVE = 1;
   const ALL = 2;
   export default {
   	   props:{
   	   	 food:{
   	   	 	type:Object
   	   	 }
   	   },
   	   data () {
   	   	 return {
            showFlag:false,
            selectType:ALL,
            onlyContent:true,
            desc:{
              all:"全部",
              positive:"推荐",
              negative:"吐槽"
            },
   	   	 };
   	   },
   	   methods: {
   	   	 needShow (type,text) {
             return (this.selectType === ALL ? true : type === this.selectType) && (this.onlyContent ? text:true);
   	   	 }, 
   	   	 addFirst (event) {
            if (!event._constructed) {
               return;
            } 
            //为对象添加属性
            Vue.set(this.food,"count",1);
            this.$dispatch("cart.add",event.target);
   	   	 },
   	   	 show () {
   	   	 	this.showFlag = true;
   	   	 	this.selectType = ALL;
   	   	 	this.onlyContent = false;
   	   	 	this.$nextTick(()=>{
	   	   	 	if (!this.bscroll) {
	                this.bscroll = new BScroll(this.$els.food,{
	                	click:true
	                });
	   	   	 	} else {
	   	   	 		this.bscroll.refresh();
	   	   	 	}
   	   	 	});
   	   	 },
   	   	 hide () {
   	   	 	this.showFlag = false;
   	   	 }
   	   },
   	   components: {
   	   	  cartcontrol,
   	   	  split,
   	   	  ratingselect
   	   },
   	   events: {
   	   	 'ratingtype.select'(el) {
            this.selectType = el; 
            this.$nextTick(()=>{
            	this.bscroll.refresh();
            });  	   	 	
   	   	 },
   	   	 'content.toggle'(content) {
   	   	 	this.onlyContent = content;
   	   	 	this.$nextTick(()=>{
            	this.bscroll.refresh();
            }); 
   	   	 }
   	   },
   	   filters: {
   	   	  formatDate (time) {
   	   	  	let date = new Date(time);
   	   	  	return formatDate(date,"yyyy-MM-dd hh:mm");
   	   	  }
   	   }
   };
</script>

<style lang="stylus" type="stylesheet/stylus">
    .food 
   	  position: fixed
   	  top:0
   	  bottom:48px
   	  z-index:30
   	  width:100%
   	  height:100%
   	  background:#fff
   	  .content
   	  	position: relative
   	  	padding:18px
   	  	.title 
   	  	  line-height:14px
   	  	  margin-bottom:8px
   	  	  font-size:14px
   	  	  font-weight:700
   	  	  color:rgb(7,17,27)
   	  	.detail
   	  	  margin-bottom:18px 
   	  	  line-height:10px 
   	  	  font-size:0
   	  	  .sell-count,.rating
   	  	  	font-size:10px
   	  	  	color:rgb(147,153,159)
   	  	  .sell-count 
   	  	  	margin-right:12px
   	  	.price
   	  	   font-weight:700
   	  	   line-height:24px 
   	  	   .now 
   	  	   	 margin-right:8px 
   	  	   	 font-size: 14px 
   	  	   	 color:rgb(240,20,20)
   	  	   .old 
   	  	   	 text-decoration:line-through 
   	  	   	 font-size:10px 
   	  	   	 color:rgb(147,153,159)
	  .cartcontrol-wrapper
	  	position: absolute 
	  	right:12px 
	  	bottom:12px
	  .buy
	  	position:absolute 
	  	right: 18px 
	  	bottom: 18px 
	  	z-index: 10 
	  	height:24px 
	  	line-height:24px 
	  	padding: 0 12px 
	  	box-sizing:border-box
	  	border-radius:12px
	  	font-size:10px
	  	color: #fff
	  	background:rgb(0,160,220)
	  	&.fade-transition
	  	   transition: all 0.2s
	  	   opacity: 1 
	  	&.fade-enter,&.fade-leave
	  	   opacity: 0 
	  &.right-transition
	  	left:0
	  	transition: all 0.5s ease
	  &.right-enter,&.right-leave
	  	left:-100%  
	  .image-header
	  	position:relative
	  	width:100%
	  	padding-top:100%
	  	height:0
	  	img 
	  	  position:absolute
	  	  left:0
	  	  top:0 
	  	  width:100%
	  	  height:100%	 
	  	.back
	  	  position:absolute
	  	  top:10px
	  	  left:0
	  	  .icon-arrow_lift
	  	  	display:inline-block
	  	  	padding:10px
	  	  	font-size:10px
	  	  	color:#fff
	  .info
	  	padding: 18px
	  	.title 
	  	   line-height:14px 
	  	   margin-bottom: 6px
	  	   font-size:14px
	  	   color:rgb(7,17,27)
	  	.text 
	  	   line-height:24px
	  	   padding:0 8px
	  	   font-size:12px
	  	   color:rgb(77,85,93)
	  .rating 
	  	   padding-top: 18px
	  	   .title 
	  	   	 line-height:14px
	  	   	 margin-left:18px
	  	   	 font-size:14px
	  	   	 color:rgb(7,17,27)
	  	   .rating-wrapper
	  	   	 padding: 0 18px
	  	   	 .rating-item
	  	   	    position: relative
	  	   	    padding: 16px 0
	  	   	    border-bottom: 1px solid rgba(7,17,27,0.1)
	  	   	  .user  
	  	   	  	position: absolute
	  	   	  	right: 0
	  	   	  	top: 16px
	  	   	  	font-size: 0
	  	   	  	line-height: 12px
	  	   	  	.name 
	  	   	  	  font-size:10px
	  	   	  	  color:rgb(147,153,159)
	  	   	  	  margin-right:6px
	  	   	  	  display: inline-block
	  	   	  	  vertical-align: top 
	  	   	  	.avatar 
	  	   	  	  border-radius: 50%
	  	   	  .time 
	  	   	  	 font-size: 10px
	  	   	  	 line-height: 12px
	  	   	  	 color: rgb(147,153,159)
	  	   	  	 margin-bottom: 6px
	  	   	  .text
	  	   	  	 font-size: 12px
	  	   	  	 color:rgb(7,17,27)
	  	   	  	 line-height: 16px  
	  	   	  	 span
	  	   	  	   font-size: 12px
	  	   	  	   line-height: 16px
	  	   	  	   margin-right: 4px
	  	   	  	   &.icon-thumb_down 
	  	   	  	   	 color:rgb(147,153,159)
	  	   	  	   &.icon-thumb_up 
	  	   	  	   	 color:rgb(0,160,220)
	  .no-rating 
	  	 padding: 16px 0	
	  	 font-size: 12px
	  	 color: rgb(147,153,159)   	  	
</style>
