const initialState={
    allDogs:[],
    searchDogs:[],
    message:""
}

export default function rootReducer( state=initialState, {type, payload} ){
    switch(type){
        case "SEARCH_DOGS":
            return {
                ...state,
                searchDogs:[...payload]
            }
        case "GET_DOGS":
            return {
                ...state,
                allDogs:[...payload]
            }
        case "GENERATE_MESSAGE":
            console.log(payload)
            return {
                ...state,
                message:payload
            }
        default:
            return state;
    }
}