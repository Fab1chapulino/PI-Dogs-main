import {NavLink} from "react-router-dom";
import styles from "../../css/Card.module.css"

export default function Card({id, name, image, temperaments, weight}){
    //if(typeof id==="string") temperaments=temperaments.map( temp => temp.name).join(", ")
    return (<div className={styles.Card}>
        <NavLink to={`/detail/${id}`} className={styles.links}>
            <img src={image} alt={name} id={styles.img}/>
            <div>
                <h2>{name}</h2>
                <p><b>weight(lb):</b> {weight}</p>
                <p><b>temperaments:</b> {temperaments}</p>
            </div>
            
        </NavLink>
        
    </div>)
}