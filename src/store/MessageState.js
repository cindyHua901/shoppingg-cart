const initialState = {
    msgOpen: false,
    productName:'',
    selecNum:0
}

export const SHOW_MESSAGE= "Show_message";  //显示信息
export const CLOSE_MESSAGE= "Close_message";  //隐藏信息
export const showMessage = (productName,selectNum) =>({
    type:SHOW_MESSAGE,
    productName,
    selectNum
})
export const closeMessage = () =>({
    type:CLOSE_MESSAGE,
})
export default function MessageReducer(state = initialState, { type, ...payload }){
    switch (type) {
        case SHOW_MESSAGE:
            return {
                msgOpen: true,
                productName: payload.productName,
                selectNum: payload.selectNum
            };
        case CLOSE_MESSAGE:
            return {
                ...state,
                msgOpen:false,
            }
        default:
            return state
    }
}

