import {getDogsByName, getDogs, generateMessage, geTemperaments} from "./actions.js";
import axios from "axios";

export function searchDogs(query){
    return async function(dispatch, getState){
        try{
            const {data} = await axios.get(`http://localhost:3001/dogs/name?query=${query}`);
            //console.log(data);
            dispatch(getDogsByName(data));
        }catch(err){
            console.log(err.message)
        }
      
    }
}
export async function getDogsThunk(dispatch, getState){
    try{
        const {data} = await axios.get("http://localhost:3001/dogs")
        console.log(data)
        dispatch(getDogs(data))
    }catch(err){
        console.log(err.message)
    }
}
export function postDogThunk(breed){
    return async function(dispatch, getState){
        try{
            const {data} = await axios.post("http://localhost:3001/dogs", breed);
            console.log(data,"data")
            dispatch(generateMessage(data))
        }catch(err){
            console.log(err, "err")
            dispatch(generateMessage("CANNOT POST DOG"))
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