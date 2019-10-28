import productList from '../pages/Home/mock'

export const REDUCE_STORE = 'Reduce_store'
// 减库存create action
export const reduceStore =(productId,saleNumer)=>({
    type:REDUCE_STORE,
    productId,
    saleNumer
})


export const reducerProductStore = (productId,saleNumer)=> dispatch =>{
    dispatch(reduceStore(productId,saleNumer));
}
//初始的商品数据
export default function ProductsReducer(state = productList, { type, ...payload }){
    switch (type){
        case REDUCE_STORE:
            const productList = state.productList.map((product)=>{
                if(product.id === payload.productId){
                    if(product.stock >= payload.saleNumer){
                        product.stock = product.stock - payload.saleNumer;
                    }
                }
                return product;
            })
            return productList;
        default:
            return state
    }
}