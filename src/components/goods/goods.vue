<template>
  <div class="goods">
      <div class="menu-wrapper" v-el:menu-wrapper>
         <ul>
           <li v-for="good in goods" class="menu-item" :class="{'current':currentIndex === $index}" @click="selectMenu($index)">
              <span class="text border-1px">
                <span class="icon" v-show="good.type > 0" :class="classMap[good.type]"></span>{{good.name}}
              </span>
           </li>
         </ul>
      </div>
      <div class="goods-wrapper" v-el:goods-wrapper>
         <ul>
           <li v-for="item in goods" class="food-list food-list-hook">
             <h1 class="title">{{item.name}}</h1>
             <ul>
                <li v-for="food in item.foods" class="food-item" @click="checkFood(food,$event)">
                   <div class="icon">
                      <img :src="food.icon" width="57" height="57">
                   </div>
                   <div class="content">
                     <h2 class="name">
                        {{food.name}}
                     </h2>
                     <p class="desc">{{food.description}}</p>
                     <div class="extra">
                        <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                     </div>
                     <div class="price">
                        <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                     </div>
                     <div class="cartcontrol-wrapper">
                        <cartcontrol :food="food"></cartcontrol>
                     </div>
                   </div>
                   
                </li>
             </ul>
           </li>
         </ul>
      </div>
      <shopcart v-ref:shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
      <food :food="selectedFood" v-ref:food></food>
  </div>
</template>

<script>
   import BScroll from 'better-scroll';
   import shopcart from 'components/shopcart/shopcart';
   import cartcontrol from 'components/cartcontrol/cartcontrol';
   import food from 'components/food/food';
   const ERR_OK = 0;
   export default {
      props:{
        seller:{
          type:Object
        }
      },
      data () {
         return {
            goods:[],
            listHeight: [],
            scrollY:0,
            selectedFood:{}
         };
      },
      computed: {
         currentIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
               let height1 = this.listHeight[i];
               let height2 = this.listHeight[i + 1];
               if(!height2 || this.scrollY >= height1 && this.scrollY < height2){
                 return i;
               }
            }
            return 0;
         },
         selectFoods() {
           let foods = [];
           this.goods.forEach((good)=>{
              good.foods.forEach((food)=>{
                 if(food.count){
                    foods.push(food);
                 }
              });
           });
           return foods;
         }
      },
   	  created (){
        this.classMap = ["decrease","discount","special","invoice","guarantee"];
        this.$http.get("/api/goods").then((response)=>{
           response = response.body;
           if(response.errno === ERR_OK){
              this.goods = response.data;
              // dom渲染以后
              this.$nextTick(()=>{
                 this._initScroll();
                 this._calculateHeight();
                }
              );
           }
        });
      },
      methods: {
        checkFood(food,event) {
          if(!event._constructed) {
              return;
          }
          this.selectedFood = food;  
          //调用子组件的show方法
          this.$refs.food.show();
        },
        _initScroll() {
          this.menuScroll = new BScroll(this.$els.menuWrapper,{
            click:true
          });
          this.goodsScroll = new BScroll(this.$els.goodsWrapper,{
             probeType:3,
             click:true
          });
          this.goodsScroll.on('scroll',(pos)=>{
              this.scrollY = Math.abs(Math.round(pos.y));
          });
        },
        _calculateHeight() {
          let foodList= this.$els.goodsWrapper.getElementsByClassName('food-list-hook');
          let height = 0;
          this.listHeight.push(height);
          for (let i = 0; i < foodList.length; i++) {
              height += foodList[i].clientHeight;
              this.listHeight.push(height);
          }
        },
        selectMenu(index) {
          let foodList = this.$els.goodsWrapper.getElementsByClassName('food-list-hook');
          let el = foodList[index];
          this.goodsScroll.scrollToElement(el,300);
        },
        _drop(target) {
            //体验优化，异步执行下落动画
            this.$nextTick(()=>{
              this.$refs.shopcart.drop(target);
            });
        }
      },
      components:{
        shopcart,
        cartcontrol,
        food
      },
      events: {
        'cart.add'(target) {
          this._drop(target);
        }
      }
   }
</script>

<style lang="stylus" type="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  @import '../../common/stylus/base.styl'
 .goods
    display:flex
    position:absolute
    top:174px
    bottom:48px
    width:100%
    overflow:hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px /*兼容安卓设备*/
      background-color:#f3f5f7
      .menu-item
        display:table
        width:56px
        height:54px
        padding: 0 12px
        &.current
          position:relative
          z-index:10 
          margin-top: -1px 
          font-weight: 700 
          background:#fff 
          .text 
            border-none()
        .text
          display:table-cell
          width:56px
          font-size:12px
          font-weight:200
          line-height:14px  
          border-1px(rgba(7,17,27,0.1))
          vertical-align:middle
          .icon
            display:inline-block
            width:12px
            height:12px
            margin-right:2px
            background-size:12px 12px
            background-repeat:no-repeat
            vertical-align:top
            &.decrease 
             bg-image('decrease_3')
            &.discount 
             bg-image('discount_3')
            &.guarantee 
             bg-image('guarantee_3')
            &.invoice 
             bg-image('invoice_3')
            &.special 
             bg-image('special_3')
    .goods-wrapper
      flex:1  
      .title
        height:26px
        font-size:12px
        color:rgb(147,153,159)
        line-height:26px
        padding-left:14px
        background-color: #f3f5f7
        border-left:2px solid #d9dde1
      .food-item
        display: flex
        margin: 18px  
        padding-bottom: 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()  
          margin-bottom: 0px
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin-top:2px
            font-size:14px
            color:rgb(7,17,27)
            line-height:14px
          .desc,.extra
            font-size:10px
            color:rgb(147,153,159)
            line-height:10px
            margin-top:10px
          .extra 
            .count 
              margin-right:12px
          .price
            font-weight:700
            line-height:24px
            .now
               font-size:14px
               color:rgb(255,0,0)
            .old 
               font-size:10px
               color:rgb(147,153,159)   
               text-decoration:line-through
          .cartcontrol-wrapper
            position:absolute
            right:0
            bottom: 12px     
</style>
