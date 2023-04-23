import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import Results from "./Results";
import {useState, useEffect} from "react";

export default function Search(){
    //States
    const [results, setResults]= useState([])
    const searchDogs = useSelector( s=> s.searchDogs);
    //hooks
    const history = useHistory();
    //useEffects
    useEffect(()=>{
        setResults([...searchDogs])
    },[searchDogs])

    return (<div>
        <div>
        <button onClick={()=>history.go(-1)}>Go back</button>
        </div>
       {results.length && <Results results={results} />}
    </div>)
}