export function getDogsByName(dogs){
    return {
        type:"SEARCH_DOGS",
        payload:dogs
    }
}
export function getDogs(dogs){
    return {
        type:"GET_DOGS",
        payload:dogs
    }
}