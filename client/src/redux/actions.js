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
export function generateMessage(message){
    return {
        type:"GENERATE_MESSAGE",
        payload:message
    }
}
export function filterOrder(options){
    return {
        type:"FILTER/ORDER",
        payload:options
    }
}
/* export function order(orders){
    return {
        type:"ORDER",
        payload:orders
    }
} */