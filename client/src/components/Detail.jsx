import {useState, useEffect} from "react";
import axios from "axios";
import {useParams, useHistory} from "react-router-dom";

export default function Detail(){
    //hooks
    const [detail, setDetail]=useState({});
    const {id}=useParams();
    const history = useHistory();
    //states
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(()=>{
        async function getDetail(){
            try{
                const {data}= await axios.get(`http://localhost:3001/dogs/detail/${id}`)
            console.log(data)
            if(typeof data.id==="string") data.temperaments= data.temperaments.map(temp=>temp.name).join(", ")
            setDetail({
                ...data
            })
            }catch(err){
                console.log(err.response.data)
                setErrorMessage(err.response.data)
            }
        }
        
          
        getDetail()
    },[])
    
    return (<div>
        {errorMessage.length
        ?<h1>{errorMessage}</h1>
        :<div>
            {/* <img src={detail.image} alt={detail.name}/> */}
            <button onClick={()=>history.go(-1)}>go Back</button>
            <h1>{detail.name}</h1>
            <p>Weight:{detail.weight}</p>
            <p>Height:{detail.height}</p>
            <p>Temperaments:{detail.temperaments}</p>
            <p>Life Span:{detail.life_span}</p>
        </div>
        }
        
    </div>)
}