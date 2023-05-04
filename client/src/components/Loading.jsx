import styles from "../css/Loading.module.css";
import cheemsMamadisimo from "./assets/cheemsMamadisimo.png";
import cheems from "./assets/blueCheems.jpg";

export default function Loading(){
    return (<div id={styles.loading}> 
        <h1>Loading...</h1>
        <img src={cheemsMamadisimo} alt="Dog with muscles" id={styles.cheemsMamado}/>
        <img src={cheems} alt="Dog with anxiety" id={styles.cheems}/>
    </div>)
}