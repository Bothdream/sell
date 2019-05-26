<template>
  <div class="seller" v-el:seller>
     <div class="seller-content">
     	<div class="overview">
     		<h1 class="titles">{{seller.name}}</h1>
     		<div class="descs">
     			<star :size="36" :score="seller.score" class="star"></star>
     			<span class="text">({{seller.ratingCount}})</span>
     			<span class="text">月售{{seller.sellCount}}单</span>
     		</div>
     		<ul class="remark">
     			<li class="block">
     				<h2>起送价</h2>
     				<div class="content">
     					<span class="stress">{{seller.minPrice}}</span>元
     				</div>
     			</li>
     			<li class="block">
     				<h2>商家配送</h2>
     				<div class="content">
     					<span class="stress">{{seller.deliveryPrice}}</span>元
     				</div>
     			</li>
     			<li class="block">
     				<h2>平均配送时间</h2>
     				<div class="content">
     					<span class="stress">{{seller.deliveryTime}}</span>分钟
     				</div>
     			</li>
     		</ul>
        <div class="love" @click="toggleLove">
          <span class="icon-favorite" :class="{'love-active':love}"></span>
          <p class="love-text">{{loveText[love]}}</p>
        </div>
     	</div>
     	<split></split>
     	<div class="bulletin">
     		<h1 class="title">公告与活动</h1>
     		<div class="content-wrapper">
     			<p class="content">{{seller.bulletin}}</p>
     		</div>
        <ul v-if="seller.supports" class="supports">
             <li v-for="item in seller.supports" class="support">
               <span class="icon" :class="classMap[item.type]"></span>
               <span class="text">{{item.description}}</span>
             </li>
        </ul>
     	</div>
      <split></split>
      <div class="pics">
          <h1 class="names"> 商家实景</h1>
             <div class="pic-wrapper" v-el:pic>
                <ul class="pic-list" v-el:pic-list>
                   <li class="pic-item" v-for="pic in seller.pics">
                      <img :src="pic" width="120" height="90">
                   </li>
                </ul>
             </div>
      </div>
      <split></split>
      <div class="sellerInfo">
          <h1 class="sellerTitle">商家信息</h1>
          <ul>
             <li v-for="info in seller.infos" class="info-item">{{info}}</li>
          </ul>
      </div>
      <split></split>
     </div>
  </div>
</template>
<script>
   import star from "components/star/star";
   import split from  "components/split/split";
   import BScroll from "better-scroll";
   import {saveTolocal,readFromlocal} from "src/common/js/store"
   export default {
   	  props: {
   	  	 seller:{
   	  	 	type:Object
   	  	 }
   	  },
      watch: {
         'seller'() {
            this._initScroll();
         }
      },
      data () {
         return {
            love:(()=>{
              return readFromlocal(this.seller.id,'love',false);
            })(),
            loveText: {
              true:"已收藏",
              false: "收藏"
            }
         }
      },
      created () {
         this.classMap = ["decrease","discount","special","invoice","guarantee"];
      },
      ready () {
         this._initScroll();
         if (this.seller.pics) {
            let pic = 120;
            let margin = 6;
            let width = (pic + margin) * this.seller.pics.length - margin;
            this.$els.picList.style.width = width + 'px';
         }
         this.$nextTick(()=>{
            this.picScroll = new BScroll(this.$els.pic,{
               click:true,
               scrollX:true,
               eventPassthrough:'vertical'
            });
         });
      },
      methods: {
        _initScroll() {
           if (!this.scroll) {
             this.scroll = new BScroll(this.$els.seller,{
                click:true 
             });
           } else {
              this.scroll.refresh();
           }
        },
        toggleLove(event) {
           if (!event._constructed) {
             return;
           }
           this.love = !this.love;
           saveTolocal(this.seller.id,"love",this.love);
        }
      },
   	  components: {
   	  	star,
   	  	split
   	  }
   }
</script>

<style lang="stylus" type="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.seller
   position: absolute
   top: 174px
   bottom: 0 
   left: 0
   width:100% 
   overflow: hidden
.overview 
    padding: 18px 18px 0 18px
    position:relative
   .love 
      position: absolute
      top: 18px
      right: 18px
      width:50px
      text-align: center
      cursor:pointer
      .icon-favorite
         display:inline-block
         font-size: 24px 
         line-height: 24px
         color: rgba(147,153,159,0.4)
         &.love-active
            color: rgb(240,20,20)
      .love-text
         font-size: 10px
         line-height: 10px 
         color: rgb(77,85,93)
         margin-top: 4px
   .titles 
   	  font-size: 14px
   	  line-height:14px
   	  color:rgb(7,17,27)
   	  margin-bottom: 8px
   .descs 
   	  border-bottom: 1px solid rgba(7,17,27,0.1)
   	  font-size: 0
   	  .star,.text
   	  	display: inline-block 
   	  	font-size: 10px
   	  	line-height: 18px
   	  	vertical-align: top
   	  .star 
   	  	 margin-right: 8px
   	  	 margin-bottom: 18px
   	  .text
   	  	 &:last-child
   	  	   margin-left: 12px
   .remark
   	   display: flex
   	  .block 
   	  	 flex:1
   	  	 padding:0 18px	
   	  	 margin: 18px 0
   	  	 text-align:center
   	  	 border-right:1px solid rgba(7,17,27,0.1)
   	  	 &:last-child
   	  	 	border-width: 0
   	  	 h2 
   	  	   font-size: 10px
   	  	   line-height: 10px
   	  	   color: rgb(147,153,159)
   	  	 .content 
   	  	 	margin-top:4px
   	  	 	font-size: 10px
   	  	 	.stress
   	  	 	   font-size:24px
   	  	 	   font-weight:200
   	  	 	   color:rgb(7,17,27)
   	  	 	   line-height: 24px
.bulletin
	padding: 18px 18px 0 18px
	.title
	   font-size: 14px
	   color:rgb(7,17,27)
	   line-height: 14px
	.content-wrapper
	   padding: 8px 12px 12px 12px
	   border-bottom: 1px solid rgba(7,17,27,0.1)
	   .content 
	   	  font-size: 12px
	   	  font-weight: 200
	   	  line-height: 24px
	   	  color: rgb(240,20,20)
  .supports 
     .support 
       padding: 16px 12px
       border-bottom: 1px solid rgba(7,17,27,0.1) 
       font-size:0
       &:last-child
          border-width:0
       .icon
          display:inline-block
          vertical-align: top 
          width: 16px
          height: 16px
          margin-right: 6px
          background-size: 16px 16px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.guarantee
            bg-image('guarantee_1')
          &.invoice
            bg-image('invoice_1')
          &.special
            bg-image('special_1')
       .text 
          display:inline-block
          vertical-align:top
          font-size: 12px
          color: rgb(7,17,27)
          font-size: 200
          line-height: 16px
.pics 
    padding: 18px
    .names 
       font-size: 14px
       line-height: 14px
       color: rgb(7,17,27)
       margin-bottom: 12px
    .pic-wrapper
       width:100% 
       overflow: hidden
       white-space: nowrap
       .pic-list
         font-size: 0
         .pic-item
            display: inline-block
            margin-right:6px
            &:last-child
              margin-right: 0
.sellerInfo
   padding: 18px 18px 0 18px
   .sellerTitle
      font-size: 14px
      line-height: 14px
      color:rgb(7,17,27)
      padding-bottom: 12px
      border-bottom: 1px solid rgba(7,17,27,0.1)
   .info-item
      padding: 16px 12px
      border-bottom: 1px solid rgba(7,17,27,0.1)
      font-size:12px
      font-weight:200
      color:rgb(7,17,27)
      line-height: 16px
      &:last-child
         border-width: 0
</style>
