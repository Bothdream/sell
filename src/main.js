import Vue from 'vue';
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import Goods from "./components/goods/goods";
import Seller from "./components/seller/seller";
import Ratings from "./components/ratings/ratings";
import App from './App';
import './common/stylus/index.styl'
/* eslint-disable no-new */
Vue.use(VueRouter);
Vue.use(VueResource);

// Vue.extend()基础构造函数，用于创建一个子类，参数是一个vue的组件，
//data选项必须是函数
let app = Vue.extend(App);
// 路由实例
let router = new VueRouter({
	// 配置默认链接被激活后的类名
	linkActiveClass:"active"
});

router.map({
	'/goods':{
		component:Goods
	},
	'/seller':{
		component:Seller
	},
	'/ratings':{
		component:Ratings
	}
});
router.start(app,"#app");
router.go("/goods");