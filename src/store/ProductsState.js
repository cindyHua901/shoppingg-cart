export const initialState = {
    productList:[{
        id:1,					//商品id
        productName:'name1',    //商品名
        unitPrice:66,
        stock: 10,             	//库存
        imgUrl:'url',         //图片资源
        description:'ssssssssss'
    },{
        id:2,					//商品id
        productName:'name2',    //商品名
        unitPrice:66,
        stock: 10,             	//库存
        imgUrl:'url',
        description:'ssssssssss'
    },{
        id:3,					//商品id
        productName:'name3',    //商品名
        unitPrice:66,
        stock: 10,             	//库存
        imgUrl:'url',
        description:'ssssssssss'
    },{
        id:4,					//商品id
        productName:'name4',    //商品名
        unitPrice:66,
        stock: 10,             	//库存
        imgUrl:'url',
        description:'ssssssssss'
    }]
}

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

export default function ProductsReducer(state = initialState, { type, ...payload }){
    switch (type){
        case REDUCE_STORE:
            const productList = state.productList.map((product)=>{
                if(product.id === payload.id){
                    payload.stock = payload.stock - payload.saleNumer;
                }
                return product;
            })
            return productList;
        default:
            return state
    }
}