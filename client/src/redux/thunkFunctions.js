import {getDogsByName, getDogs, generateError,generateMessage, geTemperaments} from "./actions.js";
import axios from "axios";

export function searchDogs(query){
    return async function(dispatch, getState){
        try{
            const {data} = await axios.get(`http://localhost:3001/dogs/name?query=${query}`);
            //console.log(data);
            dispatch(getDogsByName(data));
         }catch(error){
            dispatch(generateError({
                message:error.response.data,
                component:"search",
                status:error.response.status
            }))
        } 
      
    }
}
export async function getDogsThunk(dispatch, getState){
    try{
        const {data} = await axios.get("http://localhost:3001/dogs")
        dispatch(getDogs(data))
    }catch(err){
        dispatch(generateError({
            message:err.response.data,
            component:"Cards",
            status:err.response.status
        }))
    }
}
export function postDogThunk(breed){
    return async function(dispatch, getState){
        try{
            const {data} = await axios.post("http://localhost:3001/dogs", breed);
            dispatch(getDogsThunk)
            dispatch(generateMessage({
                content:data,
                component:"CreateForm",
                status:200
            }))
        }catch(err){
            console.log(err, "err")
            dispatch(generateError({
                message:err.response.data,
                component:"CreateForm",
                status:err.response.status
            }))
        }
    }
}
export async function getTemperamentsThunk(dispatch, getState){
    try{
        const {data} = await axios.get("http://localhost:3001/temperaments")
        let tempNames = data.map( diet => diet.name)
        console.log(tempNames)
        dispatch(geTemperaments(tempNames))
    }catch(err){
        console.log(err.message)
    }
}