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
    function onSearch(){
        if(query.length){
            dispatch(searchDogs(query));
            if(history.location.pathname !== "/search"){
                history.push("/search")
            } 
        }
    }

    return (<div>
        <NavLink to="/home/1">Home</NavLink>
        <NavLink to="/create">Create</NavLink>
        <input type="search" value={query} onChange={e=>handleInputChange(e)}/><label onClick={onSearch}>Search</label>
    </div>)
}