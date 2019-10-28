import { ShopCar, Product } from "../pages";

const initState = {
    details:[
        {
            product:{
                id:2,					//商品id
                productName:'匕首',    //商品名
                unitPrice:66,
                stock: 10,             	//库存
                imgUrl:'http://game.gtimg.cn/images/yxzj/img201606/itemimg/1112.jpg',         //图片资源
                description:'ssssssssssssssssssss'
            },
            selectNum:3,
            isChecked:true,
            singleTotal:198
        },
        {
            product:{
                id:3,					//商品id
                productName:'搏击全套',    //商品名
                unitPrice:66,
                stock: 23,             	//库存
                imgUrl:'http://game.gtimg.cn/images/yxzj/img201606/itemimg/1113.jpg',         //图片资源
                description:'ssssssssssssssssssss'
            },
            selectNum:1,
            isChecked:true,
            singleTotal:66
        },
        {
            product:{
                id:4,					//商品id
                productName:'吸血之镰',    //商品名
                unitPrice:66,
                stock: 44,             	//库存
                imgUrl:'http://game.gtimg.cn/images/yxzj/img201606/itemimg/1114.jpg',         //图片资源
                description:'ssssssssssssssssssss'
            },
            selectNum:2,
            isChecked:true,
            singleTotal:132

        }
    ],
    totalPrice:0
}
// orderForm action creater

export const SUM_TOTAL_PRODUCT = "Sum_total_product";
export const GENDERATE_ORDERS = 'Genderate_orders'



// 计算订单的总价 create action
export const sumTotalProduct = (detail) =>({
    type:SUM_TOTAL_PRODUCT,
    detail
})

export const genderateOrders = (details, totalPrice) =>({
    type:GENDERATE_ORDERS,
    details,
    totalPrice

})

export const sumTotal = (detail)=>dispatch =>{
    dispatch(sumTotalProduct(detail))
}

// reducer 接收到通知 更改state tree里的数据
export default function OrderFormReducer(state=initState, { type, ...payload }){
    let details = payload.details;
    let totalPrice = payload.totalPrice;
    switch (type) {
        // case SUM_TOTAL_PRODUCT:
        //     const products = payload.detail;
        //     const totalPrice = products.reduce((detail1,detail2) =>{
        //         return detail1.singleTotal + detail2.singleTotal;
        //     },0)
        //     return {
        //         ...state,
        //         totalPrice
        //     };
        case GENDERATE_ORDERS:
            return{
                ...state,
                details,
                totalPrice
            }
        default:
            return state
    }
}