import Cards from "./Cards";
import Options from "./Options";
import Dogos from "./Dogos"
import Loading from "../Loading.jsx";
import {useSelector} from "react-redux";
import {useState, useEffect} from "react";
import {useParams, NavLink, useHistory} from "react-router-dom";
import styles from "../../css/Home.module.css";

export default function Home(){
    const left="<";
    const right=">";

    
    //states
    const [pages, setPages]=useState([]);
    const [pagesCP, setPagesCP]=useState([]);
    //hooks
    const history = useHistory();
    const {allDogs, allDogsCopy } = useSelector(s=>s);
    let {page}  = useParams();

    //Getting eight breeds
    page=parseInt(page);
    const dogs = allDogs.slice((page-1)*8, page*8)

    //useEffects
    useEffect(()=>{
        //Set the number of pages
        let pagesVariable = [];
        for(let i=1; i<=Math.ceil(allDogs.length/8); i++){
            pagesVariable.push(i)
        }
        setPagesCP([...pagesVariable])
    },[allDogs])

     useEffect(()=>{
        if(pagesCP.slice(page-1, page+6).length<7){
            setPages([...pagesCP.slice(pagesCP.length-7, pagesCP.length)])
        }else{
            setPages([...pagesCP.slice(page-1, page+6)])
        } 
    },[pagesCP])
    
    //Extra Logic
    function goLeft(){
       if(page!==1){
        if(page===pages[0]){    
            setPages([...pagesCP.slice(page-2, page+5)])
        }  
        history.push(`/home/${page-1}`)
       } 
    }
    function goRight(){
        if( page !== Math.ceil(allDogs.length/8) ){
            if(page===pages[pages.length-1]){
                setPages([...pagesCP.slice(page-6, page+1)])
            }  
            history.push(`/home/${page+1}`)
        }
    }

    return (<div>
        <Dogos/>
        <div id={styles.Home}>
        
         <Options />
         {allDogsCopy.length
         ?<div id={styles.Cards}>
             {/* ------------------Pages_Slider------------------ */}
             <div id={styles.slider}>
                    <span onClick={goLeft} className={styles.changePage}>{left}</span>
                    <div className={styles.pagesContenetor}>
                        {
                        
                            pages.map((param)=>{
                                return <NavLink to={`/home/${param}`} key={param} className={page===param?styles.pageSelected:styles.pages}>
                                    {param}
                                    </NavLink>
                            })
                        }
                    </div>
                    
                    <span onClick={goRight} className={styles.changePage}>{right}</span>
             </div>
                
                {/* -----------------Cards-------------- */}
                {dogs.length
                ?dogs.length && <Cards dogs={dogs}/>
                :<h1 id={styles.message}>Didn't find breeds on this page</h1>}

                {/* ------------------Pages_Slider------------- */}
             <div id={styles.slider}>
                    <span  onClick={goLeft} className={styles.changePage}>{left}</span>
                    <div className={styles.pagesContenetor}>
                        {
                            pages.map((param)=>{
                                return <NavLink key={param} to={`/home/${param}`} className={page===param?styles.pageSelected:styles.pages}>{param}</NavLink>
                            })
                        }
                    </div>
                    
                    <span onClick={goRight} className={styles.changePage}>{right}</span>
             </div>
          </div>

          

          :<Loading/>}
          
            
        </div>
    </div>)
}