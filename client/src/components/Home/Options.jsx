import {useState, useEffect} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {filterOrder} from "../../redux/actions.js";

export default function Options(){
    //hooks
    const dispatch = useDispatch();
    const {alphaAscend, alphaDescend, weightAscend, weightDescend} = useSelector( s => s)
    //States
    const [temps, setTemps] = useState([])
    const [filters_orders, setFilters_Orders] = useState({
        temps:[],
        origin:"Show All",
        order:[]
    })

    function handleFiltersOrders(e, orderApplied=[]){
       // console.log(filters, "<--- filters")
        const {name, value, checked} = e.target;

        switch(name){
            case "temps":
            checked?
            setFilters_Orders({
                ...filters_orders,
                temps:[...filters_orders.temps, value]
            }) :
            setFilters_Orders({
                ...filters_orders,
                temps:[...filters_orders.temps.filter( temp => temp!==value)]
            })  
            break;

            case "origin":
                setFilters_Orders({
                    ...filters_orders,
                    origin:value
                })
            break;

            default:
                setFilters_Orders({...filters_orders})
        } 

        setFilters_Orders({
            ...filters_orders,
            order:[...orderApplied]
        })
    }

     /* ----------------------useEffect------------------- */
     useEffect(()=>{
        async function fetchDiets(){
            const {data} = await axios.get("http://localhost:3001/temperaments");
            console.log(data)
            let tempNames = data.map( diet => diet.name)
            setTemps(tempNames.slice(0, 7))
        }
        fetchDiets()
    },[])

    useEffect(()=>{
        dispatch(filterOrder(filters_orders))
    },[filters_orders]) 

    return (<div>
        {/* Filters */}
         <h3>Filters</h3>
          <div >
             <div >
                    <div><label id="diets">By diets</label></div>  
                    <div>
                        <select name="origin" onChange={(e)=>handleFiltersOrders(e)}>
                        <option value="Show All">Show All</option>
                        <option value="Created">Created</option>
                        <option value="Not Created">Not Created</option>
                        </select>
                    </div>
              </div>
                <div>
                    {temps.length && temps.map( (temp, i) => {
                        return <div key={i}>
                            <input type="checkbox" name="temps" id={temp} value={temp} onChange={(e)=> handleFiltersOrders(e)}/>
                            <label for={temp}>{temp}</label>
                        </div>
                    })}
                </div>
          </div>
          
              {/* Orders */}
        <div>
         <h3>Order By</h3>
         <div>
            <button name="alphaAscend" onClick={(e)=>handleFiltersOrders(e, alphaAscend)}>Alphabetically</button><br/>
            <button name="alphaDescend" onClick={(e)=>handleFiltersOrders(e, alphaDescend)}>Alphabetically-reverse</button><br/>
            <button name="weightAscend" onClick={(e)=>handleFiltersOrders(e, weightAscend)}>Weight-Ascending</button><br/>
            <button name="weightDescend" onClick={(e)=>handleFiltersOrders(e, weightDescend)}>Weight-Descending</button><br/>
            <button name="defaultOrder" onClick={(e)=>handleFiltersOrders(e, [])}>Default</button>
         </div>
            

        </div>
    </div>)
}