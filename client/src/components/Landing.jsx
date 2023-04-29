import {NavLink} from "react-router-dom";
import styles from "../css/Landing.module.css";
import blueCheems from "./assets/blueCheems.jpg"


export default function Landing(){
    return (<div className={styles.Landing}>
        <div className={styles.landing_center}>
            <div className={styles.welcome}>
                <h1>Welcome to Dogos.</h1>
                <NavLink to="/home/1" className={styles.goHome}>Home</NavLink>
            </div>
            <div>
                <img src={blueCheems} alt="blueCheems" className={styles.img}/>
            </div>
        </div>
            
    </div>)
}