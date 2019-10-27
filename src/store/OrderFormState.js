import { ShopCar, Product } from "../pages";

const initState = {
    details:[],
    totalPrice:0
}
// orderForm action creater

export const SUM_TOTAL_PRODUCT = "Sum_total_product";
export const SUM_SINGLE_PRODUCT = "Sum_single_product";

// 计算单个商品的价格
export const  sumSingleProduct = (product,selectNum) =>({
    type: SUM_SINGLE_PRODUCT,
    product,
    selectNum
})

// 计算订单的总价 create action
export const sumTotalProduct = (detail) =>({
    type:SUM_TOTAL_PRODUCT,
    detail
})

//派发通知
export const sumSingle = (product,selectNum) =>dispatch =>{
    dispatch(sumSingleProduct(product,selectNum))
}
export const sumTotal = (detail)=>dispatch =>{
    dispatch(sumTotalProduct(detail))
}

// reducer 接收到通知 更改state tree里的数据
export default function OrderFormReducer(state=initState, { type, payload }){
    switch (type) {
        case SUM_TOTAL_PRODUCT:
            const products = payload.detail;
            const totalPrice = products.reduce((detail1,detail2) =>{
                return detail1.singleTotal + detail2.singleTotal;
            },0)
            return {
                ...state,
                totalPrice
            };
        case  SUM_SINGLE_PRODUCT:
            const unitPrice = payload.product.unitPrice;
            const selectNum = payload.selectNum;
            return {
                ...state,
                singleTotal: unitPrice * selectNum
            };
        default:
            return state
    }
}