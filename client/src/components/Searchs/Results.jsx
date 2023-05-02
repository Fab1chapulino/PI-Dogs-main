import Result from "./Result.jsx";
import styles from "../../css/Search.module.css";

export default function Results({results}){
    return (<div id={styles.results}>
        {
            results.map((result,i)=>{
                return (<div key={i} className={styles.Cards}>
                        <Result id={result.id} name={result.name} temperaments={result.temperaments} weight={result.weight}/>
                    </div>)
            })
        }
        
    </div>)
}