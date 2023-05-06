import {useState, useEffect} from "react";
import axios from "axios";
import {useParams, useHistory} from "react-router-dom";
import styles from "../css/Detail.module.css";
import stylesSearch from "../css/Search.module.css";

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
                const {data}= await axios.get(`https://pi-dogs-main-production-24db.up.railway.app/dogs/detail/${id}`)
            console.log(data)
            if(typeof data.id==="string") data.temperaments= data.temperaments.map(temp=>temp.name).join(", ")
            setDetail({
                ...data
            })
            }catch(err){
                console.log(err.response)
                setErrorMessage(err.response)
            }
        }
        
          
        getDetail()
    },[])
    
    return (<div>
        {errorMessage.data
        ?<h1>{errorMessage.data}</h1>
        :<div id={styles.detailContenetor}>
            <div id={stylesSearch.goBackContenetor}>
                <button onClick={()=>history.go(-1)} id={stylesSearch.goBack}>Go back</button>
            </div>
            
            <div id={styles.detail}>
                <div id={styles.imgContenetor}>
                    <img src={detail.image} alt={detail.name} id={styles.img}/>
                </div>
                

                <div id={styles.flexDetail}>
                    <h1 id={styles.name}>{detail.name}</h1>
                    <p><b>Weight(lb): </b>{detail.weight}</p>
                    <p><b>Height(ft): </b>{detail.height}</p>
                    <p><b>Life Span: </b>{detail.life_span}</p>
                    <p id={styles.temperaments}><b>Temperaments: </b>{detail.temperaments}</p>

                    <h2>Comparision Details</h2>
                    <p><b>The oldest dog</b> alive is 30 years old</p>
                    <p><b>The heaviest breed</b> weights up to 220lb</p>
                    <p><b>The tallest breed</b> is up to 2.25ft long</p>
                </div>
            </div>
     
        </div>
        }
        
    </div>)
}