import {
    Home, OrderForm,ShopCar
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
    component:OrderForm,
    title:'订单',
    exact:true,
    isMenu: true
}]

export default routes;