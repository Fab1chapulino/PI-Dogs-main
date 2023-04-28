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
export function generateError(error){
    return {
        type:"GENERATE_ERROR",
        payload:error
    }
}
export function generateMessage(content){
    return {
        type:"GENERATE_MESSAGE",
        payload:content
    }
}
export function filterOrder(options){
    return {
        type:"FILTER/ORDER",
        payload:options
    }
}
export function geTemperaments(temps){
    return {
        type:"GET_TEMPERAMENTS",
        payload:temps
    }
}
