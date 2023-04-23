import {NavLink} from "react-router-dom";

export default function Nav(){
    return (<div>
        <NavLink to="/Home">Home</NavLink>
        <NavLink to="/create">Create</NavLink>
        <input type="search"/><span>Search</span>
    </div>)
}