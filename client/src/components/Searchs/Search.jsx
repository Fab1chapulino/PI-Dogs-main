import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import Results from "./Results";
import {useState, useEffect} from "react";
import styles from "../../css/Search.module.css";
import Loading from "../Loading.jsx";
import cheemsLlorando from "../assets/CheemsLlorando.jpg";
import {setNumOfSearches} from "../../redux/actions.js";

export default function Search(){
    //States
    const [results, setResults]= useState([])
    const [searches, setSearches] = useState(null)
    //hooks
    const history = useHistory();
    const dispatch = useDispatch();
    const {searchDogs, error} = useSelector( s=> s);


    //useEffects
    useEffect(()=>{
        if(history.location.pathname.includes("/search")){
            const {search} = history.location;
            setSearches(parseInt(search[search.length-1])*-1)
        }
    },[history.location]) 

    useEffect(()=>{
        setResults([...searchDogs])
    },[searchDogs])

    return (<div id={styles.Search}>

        <div id={styles.goBackContenetor}>
                <button onClick={()=> { dispatch(setNumOfSearches(1)); history.go(searches)}} id={styles.goBack}>Go back</button>
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