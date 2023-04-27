import {useState, useEffect} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {postDogThunk} from "../redux/thunkFunctions.js"
import validate from "../validations.js";
import {useHistory} from "react-router-dom";

export default function Create(){
    //hooks
    const dispatch = useDispatch();
    const {message, temperaments} = useSelector(s=>s)
    const history = useHistory();
    //states
    const [submit, setSubmit]=useState(false);
   // const [temperaments, setTemperaments] = useState([]);
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
            console.log(errors)
        
    }

    function handleInputChange(e){
        const {id, value, name} = e.target;
        //console.log(name, "name")
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
        console.log(message, "message")
           if(message==="CANNOT POST DOG"){
                console.log(input)
                setErrors(validate(input))
            }else if(message==="POSTED DOG SUCCESFULLY"){
                history.push("/home/1")
                window.location.reload()
            }
    },[message])


    //Rendering
    return (<div>
        <h1>Este es el form create</h1>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div>
                <h2>Name</h2>
                <input type="text" id="name" name="name" value={input.name} onChange={(e)=>handleInputChange(e)}/>
                <p>{errors.name && errors.name}</p>
            </div>

            <div>
                <h2>Temperaments</h2>
                {
                temperaments.length &&
                    temperaments.map((temp,i)=>{
                    return ( <div key={i}>
                            <input name="temperaments" id={i+1} type="checkbox" value={temp} onChange={(e)=>handleInputChange(e)}/>
                            <label for={i+1}>{temp}</label>
                        </div>)
                    })
                }
                {errors.temperaments && errors.temperaments}
            </div>

            <div>
                <h2>Height(ft)</h2>
                <label>Min</label><br/>
                <input type="range" id="minHeight" min="0.2" max="2.95" step="0.1" name="height" value={input.height.minHeight} onChange={(e)=>handleInputChange(e)} />
                <span>{input.height.minHeight}</span>
                <br/>
                <label>Max</label><br/>
                <input type="range" id="maxHeight" min="0.2" max="2.95" step="0.1" name="height" value={input.height.maxHeight} onChange={(e)=>handleInputChange(e)}/>
                <span>{input.height.maxHeight}</span>
                <p>{errors.height && errors.height}</p>
            </div>
            

            <div>
                <h2>Weight(lb)</h2>
                <label>Min</label><br/>
                <input type="range" id="minWeight" min="2.2" max="220.5" step="0.1" name="weight" value={input.weight.minWeight} onChange={(e)=>handleInputChange(e)}/>
                <span>{input.weight.minWeight}</span>
                <br/>
                <label>Max</label><br/>
                <input type="range" id="maxWeight" min="2.2" max="220.5" step="0.1" name="weight" value={input.weight.maxWeight} onChange={(e)=>handleInputChange(e)}/>
                <span>{input.weight.maxWeight}</span>
                <p>{errors.weight && errors.weight}</p>
            </div>
            

            <div>
                <h2>Life Span(average)</h2>
                <label>Min</label><br/>
                <input type="range" id="minLife" min="5" max="16" step="1" name="life_span" value={input.life_span.minLife} onChange={(e)=>handleInputChange(e)}/>
                <span>{input.life_span.minLife}</span>
                <br/>
                <label>Max</label><br/>
                <input type="range" id="maxLife" min="5" max="16" step="1" name="life_span" value={input.life_span.maxLife} onChange={(e)=>handleInputChange(e)}/>
                <span>{input.life_span.maxLife}</span>
                <p>{errors.life_span && errors.life_span}</p>
            </div>
            

            <div>
                <label for="image">Image(url)</label>
                <input type="text" id="image" name="image" value={input.image} onChange={(e)=>handleInputChange(e)}/>
                <p>{errors.image && errors.image}</p>
            </div>
            <button type="submit">Dogmit</button>
        </form>
        
       
    </div>)
}

/* "name": "Affenpinscher",
    "image": "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
    "height": "9 - 11.5",
    "wight": "6 - 13",
    "temperaments": "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
    "life_span": "10 - 12 years" */