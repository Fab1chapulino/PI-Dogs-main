import Cards from "./Cards";
import Options from "./Options";
import {useSelector} from "react-redux";
import {useState, useEffect} from "react";
import {useParams, NavLink, useHistory} from "react-router-dom";

export default function Home(){
    const left="<";
    const right=">";

    //states
    const [pages, setPages]=useState([]);
    const [pagesCP, setPagesCP]=useState([]);
    //hooks
    const history = useHistory();
    const allDogs = useSelector(s=>s.allDogs);
    let {page}  = useParams();
    page=parseInt(page);
    const dogs = allDogs.slice((page-1)*8, page*8)

    //useEffects
    useEffect(()=>{
        let pagesVariable = [];
        for(let i=1; i<=Math.ceil(allDogs.length/8); i++){
            pagesVariable.push(i)
        }
        setPagesCP([...pagesVariable])
    },[allDogs])

     useEffect(()=>{
        if(pagesCP.slice(page-1, page+6).length<7){
            console.log(pagesCP.slice(page-1, page+6).length)
            setPages([...pagesCP.slice(pagesCP.length-7, pagesCP.length)])
        }else{
            setPages([...pagesCP.slice(page-1, page+6)])
        }

    },[pagesCP]) 
    
    //Extra Logic
    function goLeft(){
        console.log(pages)
       if(page!==1){
        if(page===pages[0]){    
            setPages([...pagesCP.slice(page-2, page+5)])
        }  
        history.push(`/home/${page-1}`)
       } 
    }
    function goRight(){
        console.log(pages)
        if( page !== Math.ceil(allDogs.length/8) ){
            if(page===pages[pages.length-1]){
                setPages([...pagesCP.slice(page-6, page+1)])
            }  
            history.push(`/home/${page+1}`)
        }
    }


    return (<div>
        <Options />
            <div>
                <span onClick={goLeft}>{left}</span>
                {
                    
                    pages.map((page)=>{
                        return <span key={page}><NavLink to={`/home/${page}`}>{page}</NavLink></span>
                    })
                }
                <span onClick={goRight}>{right}</span>
            </div>
        
        {dogs.length && <Cards dogs={dogs}/>}

            <div>
                <span  onClick={goLeft}>{left}</span>
                {
                    
                    pages.map((page)=>{
                        return <span key={page}><NavLink to={`/home/${page}`}>{page}</NavLink></span>
                    })
                }
                <span onClick={goRight}>{right}</span>
            </div>
    </div>)
}