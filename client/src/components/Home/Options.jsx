import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {filterOrder} from "../../redux/actions.js";

export default function Options(){
    //hooks
    const dispatch = useDispatch();
    const {alphaAscend, alphaDescend, weightAscend, weightDescend, temperaments, options_config} = useSelector( s => s)

    //States
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
            case "order":
                setFilters_Orders({
                    ...filters_orders,
                    order:[...orderApplied]
                })
            break;
            default:
                setFilters_Orders({...filters_orders})
        } 
    }

     /* ----------------------useEffect------------------- */
     useEffect(()=>{
        console.log(options_config, "<------options_config")
        setFilters_Orders(options_config)
     },[])

    useEffect(()=>{
        console.log(filters_orders, "<-----filters_orders")
        dispatch(filterOrder(filters_orders))
    },[filters_orders]) 

    return (<div>
        {/* Filters */}
         <h3>Filters</h3>
          <div >
             <div >
                    <div><label id="diets">By diets</label></div>  
                    <div>
                        <select name="origin" onChange={(e)=>handleFiltersOrders(e)} defaultValue={filters_orders.origin}>
                        <option value="Show All">Show All</option>
                        <option value="Created">Created</option>
                        <option value="Not Created">Not Created</option>
                        </select>
                    </div>
              </div>
                <div>
                    {temperaments.length && temperaments.map( (temp, i) => {
                        return <div key={i}>
                            {filters_orders.temps.includes(temp)
                            ?<input type="checkbox" name="temps" id={temp} value={temp}  checked onChange={(e)=> handleFiltersOrders(e)}/>
                            :<input type="checkbox" name="temps" id={temp} value={temp} onChange={(e)=> handleFiltersOrders(e)}/>
                        }
                            
                            <label for={temp}>{temp}</label>
                        </div>
                    })}
                </div>
          </div>
          
              {/* Orders */}
        <div>
         <h3>Order By</h3>
         <div>
            <button name="order" onClick={(e)=>handleFiltersOrders(e, alphaAscend)}>Alphabetically</button><br/>
            <button name="order" onClick={(e)=>handleFiltersOrders(e, alphaDescend)}>Alphabetically-reverse</button><br/>
            <button name="order" onClick={(e)=>handleFiltersOrders(e, weightAscend)}>Weight-Ascending</button><br/>
            <button name="order" onClick={(e)=>handleFiltersOrders(e, weightDescend)}>Weight-Descending</button><br/>
            <button name="order" onClick={(e)=>handleFiltersOrders(e, [])}>Default</button>
         </div>
            

        </div>
    </div>)
}