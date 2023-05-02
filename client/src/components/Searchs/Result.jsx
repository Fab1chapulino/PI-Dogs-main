import {NavLink} from "react-router-dom";
import styles from "../../css/Search.module.css";

export default function Result ({id, name, temperaments, weight}){
    return (<div className={styles.card}>
        <NavLink to={`/detail/${id}`} className={styles.Links}>
            <h2>{name}</h2>
            {
                typeof id==="number"
                ?<p><b>Temperaments:</b>{temperaments}</p>
                :<p><b>Temperaments:</b>{temperaments.map(temp=>temp.name).join(", ")}</p>
            }
        </NavLink>
        
    </div>)
}