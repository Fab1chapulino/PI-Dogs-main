import {NavLink} from "react-router-dom";
import {searchDogs} from "../redux/thunkFunctions.js";
import {useState} from "react";
import {useDispatch} from "react-redux";
import  {useHistory} from "react-router-dom";
import styles from "../css/Nav.module.css";
import menuIcon from "./assets/menuIcon2.png"

export default function Nav(){
    //States
    const [query, setQuery] = useState("");
    const [show, setShow] = useState(true);
    //hooks
    const dispatch = useDispatch();
    const history = useHistory();

    function handleInputChange(e){
        const {value} = e.target;
        setQuery(value);
    }
    function onSearch(e){
        const {code, type} = e;
        console.log(e)
        if((query.length && type==="click") || (query.length && code==="Enter")){
            dispatch(searchDogs(query));
            if(history.location.pathname !== "/search"){
                history.push("/search")
            } 
        }
    }


    return (<div id={styles.Nav}>
        <div>
            <img src={menuIcon}  alt="menuIcon" id={styles.menuIcon} onClick={()=>setShow(!show)}/>
            <ul id={ show?styles.listShowed  : styles.listHiden}>
                <NavLink to="/home/1" className={history.location.pathname.includes("home")?styles.visited:styles.links}><li >Home</li></NavLink>
                <NavLink to="/create" className={history.location.pathname.includes("create")?styles.visited:styles.links}><li >Create</li></NavLink>
            </ul>
        </div>
        <div id={styles.inputSearch}>
            <input size="80" type="search" value={query} onChange={e=>handleInputChange(e)} onKeyDown={(e)=>onSearch(e)}/><label onClick={(e)=>onSearch(e)}>Search</label>
        </div>
    </div>)
}