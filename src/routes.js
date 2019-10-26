import {
    Home, Product,Categroy,ShopCar
} from './pages'
const routes=[{
    path:'/home',
    component:Home,
    title:'商品页面',  
    isMenu: true//链接
},{
    path:'/shopCart',
    component:ShopCar,
    title:'购物车',
    isMenu: true
},{
    path:'/orderform',
    component:Product,
    title:'订单',
    exact:true,
    isMenu: true
},{
    path:'/home/:cateId',
    component:Categroy,
    title:'分类'
}]

export default routes;