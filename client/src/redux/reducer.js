const initialState={
    allDogs:[],
    searchDogs:[]
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
        default:
            return state;
    }
}