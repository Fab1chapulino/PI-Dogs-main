import {NavLink} from "react-router-dom";

export default function Card({id, name, image, temperaments, weight}){
    if(typeof id==="string") temperaments=temperaments.map( temp => temp.name).join(", ")
    return (<div>
        <NavLink to={`/detail/${id}`}>
          {/*   <img src={image} alt={name}/> */}
            <h2>{name}</h2>
            <p>weight(lb):{weight}</p>
            <p>temperaments:{temperaments}</p>
        </NavLink>
        
    </div>)
}