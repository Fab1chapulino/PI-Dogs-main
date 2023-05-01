import {NavLink} from "react-router-dom";
import styles from "../css/Landing.module.css";
import blueCheems from "./assets/blueCheems.jpg"


export default function Landing(){
    return (<div id={styles.Landing}>
        <div id={styles.landing_center}>
            <div id={styles.welcome}>
                <h1>Welcome to Dogos.</h1>
                <NavLink to="/home/1" id={styles.goHome}>Home</NavLink>
            </div>
            <div>
                <img src={blueCheems} alt="blueCheems" id={styles.img}/>
            </div>
        </div>
            
    </div>)
}