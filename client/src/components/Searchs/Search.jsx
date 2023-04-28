import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import Results from "./Results";
import {useState, useEffect} from "react";

export default function Search(){
    //States
    const [results, setResults]= useState([])
    const {searchDogs, error} = useSelector( s=> s);
    //hooks
    const history = useHistory();
    //useEffects
    useEffect(()=>{
        setResults([...searchDogs])
    },[searchDogs])

    return (<div>
        {
            
        error.component==="search" && error.status===400
        ?<h1>{error.message}</h1>
        :<div>
            <div>
                <button onClick={()=>history.go(-1)}>Go back</button>
            </div>
            <div>
                {results.length && <Results results={results} />}
            </div>
        </div>
       
        }
        
    </div>)
}