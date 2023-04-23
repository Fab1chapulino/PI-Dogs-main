import {getDogs} from "./actions.js";
import axios from "axios";

export function searchDogs(query){
    return async function(dispatch, getState){
        try{
            const {data} = await axios.get(`http://localhost:3001/dogs/name?query=${query}`);
            console.log(data);
            dispatch(getDogs(data));
        }catch(err){
            console.log(err.message)
        }
      
    }
}