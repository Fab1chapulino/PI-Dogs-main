import {NavLink} from "react-router-dom";
import {searchDogs} from "../redux/thunkFunctions.js";
import {useState} from "react";
import {useDispatch} from "react-redux";
import  {useHistory} from "react-router-dom";

export default function Nav(){
    //States
    const [query, setQuery] = useState("");
    //hooks
    const dispatch = useDispatch();
    const history = useHistory();

    function handleInputChange(e){
        const {value} = e.target;
        setQuery(value);
    }
    function onSearch(e){
        const {code, type} = e;
        console.log(e)
        if((query.length && type==="click") || (query.length && code==="Enter")){
            dispatch(searchDogs(query));
            if(history.location.pathname !== "/search"){
                history.push("/search")
            } 
        }
    }

    return (<div>
        <NavLink to="/home/1">Home</NavLink>
        <NavLink to="/create">Create</NavLink>
        <input type="search" value={query} onChange={e=>handleInputChange(e)} onKeyDown={(e)=>onSearch(e)}/><label onClick={(e)=>onSearch(e)}>Search</label>
    </div>)
}