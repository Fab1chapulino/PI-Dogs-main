import {NavLink} from "react-router-dom";


export default function Landing(){
    return (<div>
        <h1>Welcome to Dogs Api.</h1>
        <NavLink to="/home">Home</NavLink>
    </div>)
}