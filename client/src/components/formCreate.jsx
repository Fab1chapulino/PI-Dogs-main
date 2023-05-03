import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {postDogThunk} from "../redux/thunkFunctions.js";
import validate from "../validations.js";
import {useHistory} from "react-router-dom";
import styles from "../css/Create.module.css";
import Dogos from "./Home/Dogos.jsx";

export default function Create(){
    //hooks
    const dispatch = useDispatch();
    const {error,message, temperaments} = useSelector(s=>s)
    const history = useHistory();
    //states
    const [submit, setSubmit]=useState(false);
    const [errors, setErrors] = useState({
        name:"",
        image:"",
        temperaments:"",
        height:"",
        weight:"",
        life_span:""
    }) 
    const [input, setInput] = useState({
        name:"",
        image:"",
        temperaments:[],
        weight:{
            minWeight:"2.2",
            maxWeight:"220.5"
        },
        height:{
            minHeight:"0.2",
            maxHeight:"2.95"
        },
        life_span:{
            minLife:"5",
            maxLife:"16"
        }
    })
    
    function generateErrors(e){
        const {id, value, name}= e.target;
        /* Temperaments */
        if(name ==="temperaments"){
            e.target.checked
            ?
            setErrors({
                ...errors,
                [name]:validate({
                    [name]:[...input[name], id]
                })[name]
            })
            :
            setErrors({
                    ...errors,
                    [name]:validate({
                        [name]:[...input[name].filter(temp=>temp !== id)]
                    })[name]
                })
                        /* Ranges */
        }else if(name==="weight" || name==="height" || name==="life_span"){
                setErrors({
                    ...errors,
                    [name]:validate({
                        [name]:{
                            ...input[name],
                            [id]:value
                        }
                    })[name]
                })
            }else{
                /* name and image*/
                setErrors({
                    ...errors,
                    [name]:validate({
                        [name]:value
                    })[name]
                })
            }
    }

    function handleInputChange(e){
        const {id, value, name} = e.target;
        if(name==="temperaments"){
            //console.log(value, "value")
            e.target.checked
            ?setInput({
                ...input,
                [name]:[...input[name], id]
            })
            :setInput({
                ...input,
                [name]:[...input[name].filter(temp=>temp !== id)]
            })
        }else if(name==="weight" || name==="height" || name==="life_span"){
            setInput({
                ...input,
                [name]:{
                    ...input[name],
                    [id]:value
                }
            })
        }else{
            setInput({
                ...input,
                [id]:value
            })
        }
        generateErrors(e);
    }
    function handleSubmit(e){
        e.preventDefault();
        setErrors({
            ...validate(input)
        })
        if(submit) dispatch(postDogThunk(input))
    }

    /* -----------------useEffects-------------------- */
    useEffect(()=>{
        if(Object.values(errors).find(v=>v.length)){
            setSubmit(false)
        }else{
            setSubmit(true)
        }
    },[errors])

    useEffect(()=>{
        if(message.component === "CreateForm" && message.status===200 && submit){
                history.push("/home/1")
            }
    },[message])

    useEffect(()=>{
            if(error.status === 400){
                setErrors(validate(input))
            }
    },[error])

    //Rendering
    return (<div id={styles.FormCreate}>
        {error.component==="CreateForm" && error.status === 400?<h2 id={styles.errorMessage}>
            {error.message} <span onClick={()=> document.getElementById(styles.errorMessage).style.display="none"}> x</span></h2> :null}
        
        <div id={styles.form}>
            <button onClick={()=>history.goBack()} id={styles.goBack}>Go back</button>
            <h1 id={styles.title}>Create a breed.</h1>

            {/* ----------Form --------------*/}
            <form onSubmit={(e)=>handleSubmit(e)}>
                
                <div>
                    <h2 className={styles.subTitles}>Name.</h2>
                    <input type="text" id="name" name="name" value={input.name} onChange={(e)=>handleInputChange(e)}/>
                    <p className={styles.errors}>{errors.name && errors.name}</p>
                </div>

                <div>
                    <h2 className={styles.subTitles}>Temperaments.</h2>
                    <div id={styles.tempsFather}>
                        <div id={styles.temps}>
                            {
                            temperaments.length &&
                                temperaments.map((temp,i)=>{
                                return ( <div key={i}>
                                        <input name="temperaments" id={i+1} type="checkbox" value={temp} onChange={(e)=>handleInputChange(e)}/>
                                        <label for={i+1}>{temp}</label>
                                    </div>)
                                })
                            }
                        </div>

                    </div>
                    
                    <p className={styles.errors}>{errors.temperaments && errors.temperaments}</p>
                </div>
                
                <div>
                    <h2 className={styles.subTitles}>Height(ft).</h2>
                    <label>Min.</label><br/>
                    <input type="range" id="minHeight" min="0.2" max="2.95" step="0.1" name="height" value={input.height.minHeight} onChange={(e)=>handleInputChange(e)} />
                    <span>{input.height.minHeight}</span>
                    <br/>
                    <label>Max.</label><br/>
                    <input type="range" id="maxHeight" min="0.2" max="2.95" step="0.1" name="height" value={input.height.maxHeight} onChange={(e)=>handleInputChange(e)}/>
                    <span>{input.height.maxHeight}</span>
                    <p className={styles.errors}>{errors.height && errors.height}</p>
                </div>
                

                <div>
                    <h2 className={styles.subTitles}>Weight(lb).</h2>
                    <label>Min.</label><br/>
                    <input type="range" id="minWeight" min="2.2" max="220.5" step="0.1" name="weight" value={input.weight.minWeight} onChange={(e)=>handleInputChange(e)}/>
                    <span>{input.weight.minWeight}</span>
                    <br/>
                    <label>Max.</label><br/>
                    <input type="range" id="maxWeight" min="2.2" max="220.5" step="0.1" name="weight" value={input.weight.maxWeight} onChange={(e)=>handleInputChange(e)}/>
                    <span>{input.weight.maxWeight}</span>
                    <p className={styles.errors}>{errors.weight && errors.weight}</p>
                </div>
                

                <div>
                    <h2 className={styles.subTitles}>Life Span(average).</h2>
                    <label>Min.</label><br/>
                    <input type="range" id="minLife" min="5" max="16" step="1" name="life_span" value={input.life_span.minLife} onChange={(e)=>handleInputChange(e)}/>
                    <span>{input.life_span.minLife}</span>
                    <br/>
                    <label>Max.</label><br/>
                    <input type="range" id="maxLife" min="5" max="16" step="1" name="life_span" value={input.life_span.maxLife} onChange={(e)=>handleInputChange(e)}/>
                    <span>{input.life_span.maxLife}</span>
                    <p className={styles.errors}>{errors.life_span && errors.life_span}</p>
                </div>
                

                <div>
                    <label for="image">Image(url)</label>
                    <input type="text" id="image" name="image" value={input.image} onChange={(e)=>handleInputChange(e)}/>
                    <p className={styles.errors}>{errors.image && errors.image}</p>
                </div>
                <button id={styles.submit} disabled={error.status===500?"true":"false"}>Dogmit</button>
            </form>
        </div>
        
        <div id={styles.dogos}>
            
        </div>
        
       
    </div>)
}