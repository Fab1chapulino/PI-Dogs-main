import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import Results from "./Results";
import {useState, useEffect} from "react";
import styles from "../../css/Search.module.css";
import Loading from "../Loading.jsx";
import cheemsLlorando from "../assets/CheemsLlorando.jpg"

export default function Search(){
    //States
    const [results, setResults]= useState([])
    const {searchDogs, error} = useSelector( s=> s);
    //hooks
    const history = useHistory();
    //useEffects
    useEffect(()=>{
        setResults([...searchDogs])
        console.log(results)
    },[searchDogs])


    return (<div id={results.length?styles.Search:styles.searchLoading
    }>

        <div id={styles.goBackContenetor}>
                <button onClick={()=>history.go(-1)} id={styles.goBack}>Go back</button>
        </div>
        {
            
            error.component==="search" && error.status===400
            ?<div id={styles.errorMessage}>
                <h1 >{error.message}</h1>
                <img src={cheemsLlorando} alt="cheems crying"/>
                <p>Create a new one in the Create section!</p>
            </div>
            : results.length?<div>
                
                <div>
                    {results.length && <Results results={results} />}
                </div>
            </div> : <Loading />
       
         }
        
    </div>)
}