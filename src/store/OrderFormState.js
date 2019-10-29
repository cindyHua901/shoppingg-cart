

const initState = {
    forms:[]
}

// forms:[
//     {
//         formID:"",
//         details:[],
//         totalPrice:0
//     }
// ]
// orderForm action creater

export const SUM_TOTAL_PRODUCT = "Sum_total_product";
export const GENDERATE_ORDERS = 'Genderate_orders'
export const PAYFOR = "Pay"


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

export const payFor = (details) =>({
    type:PAYFOR,
    details
})

export const sumTotal = (detail)=>dispatch =>{
    dispatch(sumTotalProduct(detail))
}


function getRendomFormID (){
    let formID ="";
    let timestamp=new Date().getTime();
    var characterBox =['A','B','C','D','E','F','G','H','I','G','H','W','X','Y',"Z"];
    for(var i=0; i<4; i++){
        formID += characterBox[Math.ceil(Math.random()*14)];
    }
    formID += timestamp;
    return formID
}
export default function OrderFormReducer(state=initState, { type, ...payload }){
    let details = payload.details;
    let totalPrice = payload.totalPrice;
    switch (type) {
        case GENDERATE_ORDERS:               //生成订单
            const newForm = {
                formID:getRendomFormID(),
                details,
                totalPrice
            }
            state.forms = [...state.forms,newForm]
            return{
                forms:state.forms
            };
        default:
            return state

    }
}