const initialState={
    allDogs:[],
    searchDogs:[]
}

export default function rootReducer( state=initialState, {type, payload} ){
    switch(type){
        case "GET_DOGS":
            return {
                ...state,
                searchDogs:[...payload]
            }
        default:
            return state;
    }
}