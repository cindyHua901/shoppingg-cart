
const initialState = {
        details:[],
        isAllChecked: true,
}
// shopCar action creater

export const ADD_PRODUCT= "Add_product";  //添加商品
export const DELETE_PRODUCT = "Delete_product";  // 删除商品
export const CHANG_PRODUCT_NUMBER = "Change_number";  //更数量
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
// 删除某个商品
export const deleteProductAction = (productId) =>({
    type:DELETE_PRODUCT,
    productId
})
//商品是否被勾选
export const isChecked = (productId) =>({
    type:IS_CHECKED,
    productId
})
// 是否全选
export const checkedAll = () =>({
    type:IS_ALLCHECKED
})

//勾选商品 ->生成订单
export const checkProductAction = (productId) =>({
    type:CHECK_PRODUCT,
    productId
})




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
    const selectNum = payload.selectNum;     
    const productId = payload.productId;
    let details = state.details;
    let isAllChecked = state.isAllChecked;

    switch (type) {
        case ADD_PRODUCT:                     //添加商品到购物车
            let isInCart = false;
            for(let i=0;i<details.length;i++){
                if(details[i].product.id === product.id){
                    details[i].selectNum += selectNum;
                    isInCart = true;
                }

            }
            // alert( `在购物车里有同一商品？${isInCart} ${product.id}`);
            if(!isInCart){
                details = [...state.details,{
                    product,
                    selectNum,
                    isChecked: true
                }]
            }
            return{
                ...state,
                details,
            };
        case CHANG_PRODUCT_NUMBER:           //改变商品的数量
            details = details.map(detail => {
                if(productId === detail.product.id){
                    detail.selectNum = selectNum * 1;
                }
                return detail;
            });
            return {
                ...state,
                details,
            }
        case DELETE_PRODUCT:         //从购物车里删除某个单品  
            details = details.filter((detail) =>{
                return detail.product.id !== productId;
            })
            return {
                ...state,
                details,
            };
            case IS_CHECKED:        //更改购物车里单品的checkbox状态
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
                isAllChecked: productCheckedNumber(details)
            }
        case IS_ALLCHECKED:  //更改购物车 全选checkbox 的状态
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
            };
        default:
            return state
    }
}