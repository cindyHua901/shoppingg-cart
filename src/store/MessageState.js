export const SHOW_MESSAGE= "Show_message";  //显示信息
export const CLOSE_MESSAGE= "Close_message";  //隐藏信息
export const showMessage = () =>({
    type:SHOW_MESSAGE
})
export const closeMessage = () =>({
    type:CLOSE_MESSAGE,
})
export default function MessageReducer(state = {msgOpen: false}, { type, ...payload }){
    switch (type) {
        case SHOW_MESSAGE:
            return {
                msgOpen: true,
            };
        case CLOSE_MESSAGE:
            return {
                msgOpen:false,
            }
        default:
            return state
    }
}

