import {useState, useEffect} from "react";
import axios from "axios";
import {useParams, useHistory} from "react-router-dom";

export default function Detail(){
    //hooks
    const [detail, setDetail]=useState({});
    const {id}=useParams();
    const history = useHistory();

    useEffect(()=>{
        async function getDetail(){
            const {data}= await axios.get(`http://localhost:3001/dogs/detail/${id}`)
            console.log(data)
            if(typeof data.id==="string") data.temperaments= data.temperaments.map(temp=>temp.name).join(", ")
            setDetail({
                ...data
            })
        }
        getDetail()
    },[])
    
    return (<div>
        {/* <img src={detail.image} alt={detail.name}/> */}
        <button onClick={()=>history.go(-1)}>go Back</button>
        <h1>{detail.name}</h1>
        <p>Weight:{detail.weight}</p>
        <p>Height:{detail.height}</p>
        <p>Temperaments:{detail.temperaments}</p>
        <p>Life Span:{detail.life_span}</p>
    </div>)
}