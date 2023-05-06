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
    //const [searches, setSearches] = useState(null)
    //hooks
    const history = useHistory();
    const {searchDogs, error} = useSelector( s=> s);
    //useEffects
    /* useEffect(()=>{
        const {search} = history.location;
        setResults([...searchDogs])
        setSearches(parseInt(search[search.length-1])*-1)
        console.log(history)
    },[]) */
    function goBack(){
        const {search} = history.location;
        const numOfSearches = parseInt(search[search.length-1])*-1;
        history.go(numOfSearches)
    }


    return (<div id={results.length?styles.Search:styles.searchLoading}>

        <div id={styles.goBackContenetor}>
                <button onClick={()=> goBack} id={styles.goBack}>Go back</button>
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