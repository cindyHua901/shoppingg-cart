// shopCar action creater

export const ADD_PRODUCT= "Add_product";  //添加数量
export const ADD_SELECTNUM = "Add_SelectNum";  //添加数量
export const REDUCE_SELECTNUM= "Reduce_SelectNum";  //减少数量
export const DELETE_PRODUCT = "Delete_product";  // 删除商品
export const CHECK_PRODUCT = 'check_product';  //在购物车选择商品 -->生成订单

//添加到购物车
export const addProductAction = (product,selectNum) =>({
    type:ADD_PRODUCT,
    product,
    selectNum
})
//增加购物车里单品的数量 +1
export const addSelectNumAction = (productId) =>({
    type:ADD_SELECTNUM,
    productId
})

//减少购物车里单品的数量 -1
export const reduceSelectNumAction = (productId) =>({
    type:REDUCE_SELECTNUM,
    productId
})

export const deleteProductAction = (productId) =>({
    type:DELETE_PRODUCT,
    productId
})

//勾选商品 ->生成订单
export const checkProductAction = (productId) =>({
    type:CHECK_PRODUCT,
    productId
})
// ---------action reactor
export const addProduct = (product,selectNum) =>dispatch =>{
    dispatch(addProductAction(product,selectNum))
}

export const addSelectNum = (productId) =>dispatch =>{
    dispatch(addSelectNumAction(productId))
}


export const reduceSelectNum = (productId) =>dispatch =>{
    dispatch(reduceSelectNumAction(productId))
}


export const deleteProduct = (productId) =>dispatch =>{
    dispatch(deleteProductAction(productId))
}

export const checkProduct = (productId) =>dispatch =>{
    dispatch(checkProductAction(productId))
}

export default function ShopCarReducer(state={}, { type, ...payload }){
    const product = payload.product;
    const selectNum = payload.selectNum;     //注意这里是否有问题
    const productId = payload.productId;
    let details = state.details;
    switch (type) {
        case ADD_PRODUCT:
            return{
                ...state,
                details:[...state.detail,{
                    product,
                    selectNum,
                    isChecked: false
                }]
            };
        case ADD_SELECTNUM:            // note 每次购物车里 数量的时候都通知重新计算单品价格及 总价
            details = details.map((detail)=>{
                            if( detail.product.id === productId && detail.product.stock > detail.selectNum){
                                detail.selectNum ++;
                            }
                            return detail;
            })
            return{
                ...state,
                details
            };
        case REDUCE_SELECTNUM:
            details = details.map((detail)=>{
                            if( detail.product.id === productId && detail.selectNum >0){
                                detail.selectNum --;
                            }
                            return detail;
            })
            return{
                ...state,
                details
            };
        case DELETE_PRODUCT:         //从购物车里删除某个单品
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
                ...this.state,
                details,
                totalPrice
            }
        default:
            return state
    }
}