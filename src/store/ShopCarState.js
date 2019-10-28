import { StepConnector } from "@material-ui/core";
import { sumTotalProduct } from "./OrderFormState";

const initialState = {
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
        isAllChecked: true,
        totalPrice: 492,       //遍历购物车被选中的产品 reduce singleTotal 计算总和

}
// shopCar action creater

export const ADD_PRODUCT= "Add_product";  //添加商品
export const DELETE_PRODUCT = "Delete_product";  // 删除商品
export const CHANG_PRODUCT_NUMBER = "Change_number";  //更数量
export const SUM_SINGLEPRICE = "Sum_SinglePrice";  // 同一商品的价格
export const SUM_TOTAL_PRICE = 'Sum_TotalPrice';    //计算所有勾选商品的总价
export const IS_ALLCHECKED = 'Is_allchecked';     //勾选所有商品
export const IS_CHECKED = 'Is_checked';          //勾选某一商品
export const CHECK_PRODUCT = 'check_product';  //提交订单

//添加到购物车
export const addProductAction = (product,selectNum) =>({
    type:ADD_PRODUCT,
    product,
    selectNum
})
//改变购物车里某一商品的数量
export const changeNumberAction = (productId,selectNum) =>({
    type:CHANG_PRODUCT_NUMBER,
    productId,
    selectNum
})

export const deleteProductAction = (productId) =>({
    type:DELETE_PRODUCT,
    productId
})

export const isChecked = (productId) =>({
    type:IS_CHECKED,
    productId
})

export const checkedAll = () =>({
    type:IS_ALLCHECKED
})

//勾选商品 ->生成订单
export const checkProductAction = (productId) =>({
    type:CHECK_PRODUCT,
    productId
})

function sumTotalprice(details){
    let totalPrice = 0;
    for(let i=0; i< details.length; i++){
        if(details[i].isChecked){
            totalPrice += details[i].singleTotal;
        }
    }
    console.log(totalPrice)
    return totalPrice;
}


function productCheckedNumber(details){
    let isAllChecked = false;
    const count = details.filter(detail =>{
                    return detail.isChecked
                    }).length;
        if(count === details.length){
        isAllChecked = true;
        }else{
        isAllChecked = false;
        }
    return isAllChecked;
}

export default function ShopCarReducer(state = initialState, { type, ...payload }){
    const product = payload.product;
    const selectNum = payload.selectNum;     //注意这里是否有问题
    const productId = payload.productId;
    let details = state.details;
    let totalPrice = state.totalPrice;
    let isAllChecked = state.isAllChecked;
    console.log(payload);
    switch (type) {
        case ADD_PRODUCT:
            let isInCart = false;
            for(let i=0;i<details.length;i++){
                if(details[i].product.id === productId){
                    details[i].selectNum += selectNum;
                    isInCart = true;
                }

            }
            if(!isInCart){
                details = [...state.details,{
                    product,
                    selectNum,
                    singleTotal:product.unitPrice * selectNum,
                    isChecked: true
                }]
            }
            return{
                ...state,
                details,
                totalPrice: sumTotalprice(details)
            };
        case CHANG_PRODUCT_NUMBER:            // note 每次购物车里 数量的时候都通知重新计算单品价格及 总价
            details = details.map(detail => {
                if(productId === detail.product.id){
                    detail.selectNum = selectNum * 1;
                    detail.singleTotal = detail.product.unitPrice * selectNum;
                }
                return detail;
            });
            return {
                ...state,
                details,
                totalPrice:sumTotalprice(details)
            }
        case DELETE_PRODUCT:         //从购物车里删除某个单品  ok
            details = details.filter((detail) =>{
                return detail.product.id !== productId;
            })
            return {
                ...state,
                details,
                totalPrice:sumTotalprice(details)
            };
        case IS_CHECKED:
                details = state.details.map(detail => {
                    if(productId === detail.product.id){
                        detail.isChecked = !detail.isChecked ;
                    }
                    return detail;
                });
                const count = details.filter(detail =>{
                                    return detail.isChecked
                            }).length;
                        if(count === details.length){
                            isAllChecked = true;
                        }else{
                            isAllChecked = false;
                        }
                return {
                    ...state,
                    details,
                    isAllChecked: productCheckedNumber(details),
                    totalPrice: sumTotalprice(details)
                }
        case IS_ALLCHECKED: 
             let totalPrice = 0;
            isAllChecked = !isAllChecked;
            if(isAllChecked){
                details = details.map(detail =>{
                    detail.isChecked = true;
                    return detail;
                })
            }else{
                details = details.map(detail =>{
                        detail.isChecked = false;
                        return detail;
                    })
            }
            return{
                ...state,
                details,
                isAllChecked,
                totalPrice:sumTotalprice(details),
            };
        case SUM_TOTAL_PRICE:
            console.log('sumTotalPrice ....')
            return{
                ...state,
                totalPrice:sumTotalprice(details),
            }
        default:
            return state
    }
}