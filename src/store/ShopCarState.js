
const initialState = {
    shopCart:{
    details:[],
    isAllChecked:false,
    totalPrice: 0,
}
}
// shopCar action creater

export const ADD_PRODUCT= "Add_product";  //添加商品
export const DELETE_PRODUCT = "Delete_product";  // 删除商品
export const CHANG_PRODUCT_NUMBER = "Change_number";  //更数量
export const SUM_SINGLEPRICE = "Sum_SinglePrice";  // 同一商品的价格
export const SUM_TOTALPRICE = 'Sum_TotalPrice';    //计算所有勾选商品的总价
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
export const changeNumberAction = (productId) =>({
    type:CHECK_PRODUCT,
    productId
})

export const deleteProductAction = (productId) =>({
    type:DELETE_PRODUCT,
    productId
})

export const sumTotalPrice = () =>({
    type:SUM_TOTALPRICE
})

export const sumSinglePrice = (productId,selectNum) =>({
    type:SUM_SINGLEPRICE,
    productId,
    selectNum
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
// ---------dispatch
export const addProduct = (product,selectNum) =>dispatch =>{
    dispatch(addProductAction(product,selectNum))
}

export const changeNumber = (productId) =>dispatch =>{
    dispatch(changeNumber(productId))
}


export const deleteProduct = (productId) => dispatch =>{
    dispatch(deleteProductAction(productId))
}

export const checkProduct = (productId) => dispatch =>{
    dispatch(checkProductAction(productId))
}

export const sumTotal = () => dispatch =>{
    dispatch(sumTotalPrice())
}
export const sumSingle = (productId,selectNum) => dispatch =>{
    dispatch(sumSinglePrice(productId,selectNum))
}
export const checkSingleProduct = (productId)=>dispatch =>{
    dispatch(isChecked(productId));
}
export const checkAllProduct =() =>dispatch =>{
    dispatch(checkedAll())
}

export default function ShopCarReducer(state = initialState, { type, ...payload }){
    const product = payload.product;
    const selectNum = payload.selectNum;     //注意这里是否有问题
    const productId = payload.productId;
    let details = state.shopCart.details;
    let totalPrice = state.shopCart.totalPrice;
    let isAllChecked = state.shopCart.isAllChecked;
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
                    isChecked: false
                }]
            }
            return{
                ...state,
                details
            };
        case CHANG_PRODUCT_NUMBER:            // note 每次购物车里 数量的时候都通知重新计算单品价格及 总价
            details = details.map(detail => {
                if(productId === detail.product.id){
                    detail.isChecked = !detail.isChecked ;
                }
                return detail;
            });
            return {
                ...state,
                details,
            }
        case DELETE_PRODUCT:         //从购物车里删除某个单品  ok
            let totalPrice = 0;
            details = details.filter((detail) =>{
                return detail.product.id !== productId;
            })
            for(var i=0; i < details.length; i++){
                if(details[i].isChecked){
                    totalPrice += details[i].singleTotal
                }
            }
            return {
                ...state,
                details,
                totalPrice
            };
        case SUM_SINGLEPRICE: 
            details = details.map( detail =>{
                if(detail.product.id === productId){
                    detail.selectNum = selectNum;
                    detail.singleTotal = detail.selectNum * detail.product.unitPrice;
                }
            });
            return {
                ...state,
                 details,
            };
        case SUM_TOTALPRICE:
                totalPrice = 0;
                for(let i=0; i < details.length; i++){
                    if(details[i].isChecked){
                        totalPrice += details[i].singleTotal
                    }
                }
                return {
                    ...state, details,
                    totalPrice
                };

        case IS_ALLCHECKED: 
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
            const count = details.filter(detail =>{
                            return detail.isChecked
                        }).length;
            if(count === details.length){
                isAllChecked = true;
            }
            return{
                details,
                isAllChecked,
                totalPrice,
            };
        default:
            return state
    }
}