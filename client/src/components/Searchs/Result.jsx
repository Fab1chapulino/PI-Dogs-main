import {NavLink} from "react-router-dom";

export default function Result ({id, name, temperaments, weight}){
    return (<div>
        <NavLink to={`/detail/${id}`}>
            <h2>{name}</h2>
            {
                typeof id==="number"
                ?<p>Temperaments:{temperaments}</p>
                :<p>Temperaments:{temperaments.map(temp=>temp.name).join(", ")}</p>
            }
        </NavLink>
        
    </div>)
}