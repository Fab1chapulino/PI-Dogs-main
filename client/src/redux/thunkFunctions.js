import {getDogsByName,
     getDogs,
    generateError,
    generateMessage,
    geTemperaments,
    } from "./actions.js";
import axios from "axios";

export function searchDogs(query){
    return async function(dispatch, getState){
        try{
            const state = getState();
            const {data} = await axios.get(`/dogs/name?query=${query}`);

            const breeds = data.filter( b => state.allDogsCopy.some( element => element.id===b.id))

            if(!breeds.length) throw new Error("Sorry, We Coudn't find that breed")

            dispatch(getDogsByName(breeds));
            

         }catch(error){
            if(error.response){
                dispatch(generateError({
                    message:error.response.data,
                    component:"search",
                    status:error.response.status
                }))
            }else{
                dispatch(generateError({
                    message:error.message,
                    component:"search",
                    status:400
                }))
            }
            
        } 
      
    }
}
export async function getDogsThunk(dispatch, getState){
    try{
        const {data} = await axios.get("/dogs")
        console.log(data)
        dispatch(getDogs(data))
        dispatch(generateError({
            message:'',
            component:"Cards",
            status:200
        }))
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
            const {data} = await axios.post("/dogs", breed);
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
        const {data} = await axios.get("/temperaments")
        let tempNames = data.map( diet => diet.name)
        console.log(tempNames)
        dispatch(geTemperaments(tempNames))
    }catch(err){
        console.log(err.message)
    }
}