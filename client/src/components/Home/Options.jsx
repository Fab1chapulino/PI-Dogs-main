import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {filterOrder} from "../../redux/actions.js";
import styles from "../../css/Options.module.css";

export default function Options(){
    //hooks
    const dispatch = useDispatch();
    const {alphaAscend, alphaDescend, weightAscend, weightDescend, temperaments, options_config} = useSelector( s => s)

    //States
    const [filters_orders, setFilters_Orders] = useState({
        temps:options_config.temps,
        origin:options_config.origin,
        order:options_config.order
        
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
        setFilters_Orders(options_config)
     },[])

    useEffect(()=>{
        dispatch(filterOrder(filters_orders))
    },[filters_orders]) 

    return (<div id={styles.OptionsFather}>
        <div id={styles.options}>
                    {/* Filters */}
            <h3 className={styles.titles}>Filters</h3>
            <div >
                <div >
                        <h4 id="diets" className={styles.subTitles}>By Origin</h4>
                        <div>
                            <select name="origin" onChange={(e)=>handleFiltersOrders(e)} defaultValue={filters_orders.origin} className={styles.selectAndOrders}>
                            <option value="Show All">Show All</option>
                            <option value="Created">Created</option>
                            <option value="Not Created">Not Created</option>
                            </select>
                        </div>
                </div>
                    <div>
                        <h4 className={styles.subTitles}>By Temperaments</h4>
                        <div id={styles.tempsFather}>

                            <div id={styles.temperaments}>

                                {temperaments.length && temperaments.map( (temp, i) => {
                                    return <div key={i} id={styles.temps}>
                                        {filters_orders.temps.includes(temp)
                                        ?<input type="checkbox" name="temps" id={temp} value={temp}  checked onChange={(e)=> handleFiltersOrders(e)}/>
                                        :<input type="checkbox" name="temps" id={temp} value={temp} onChange={(e)=> handleFiltersOrders(e)}/>
                                    }
                                        <label for={temp}>{temp}</label>
                                    </div>
                                })}
                            </div>
                        </div>
                        
                        
                    </div>
            </div>
            
                {/* Orders */}
          <div>
            <h3 className={styles.titles}>Order</h3>
            <div>
                <button name="order" onClick={(e)=>handleFiltersOrders(e, alphaAscend)} className={filters_orders.order.slice(0, 3).includes(...alphaAscend.slice(0, 3))?styles.selectedOrder : styles.selectAndOrders}>
                    Alphabetically
                </button><br/>
                <button name="order" onClick={(e)=>handleFiltersOrders(e, alphaDescend)} className={filters_orders.order.slice(0, 3).includes(...alphaDescend.slice(0, 3))?styles.selectedOrder : styles.selectAndOrders}>Alphabetically-reverse</button><br/>
                <button name="order" onClick={(e)=>handleFiltersOrders(e, weightAscend)} className={filters_orders.order.slice(0, 3).includes(...weightAscend.slice(0, 3))?styles.selectedOrder : styles.selectAndOrders}>Weight-Ascending</button><br/>
                <button name="order" onClick={(e)=>handleFiltersOrders(e, weightDescend)} className={filters_orders.order.slice(0, 3).includes(...weightDescend.slice(0, 3))?styles.selectedOrder : styles.selectAndOrders}>Weight-Descending</button><br/>
                <button name="order" onClick={(e)=>handleFiltersOrders(e, [])} className={!filters_orders.order.length?styles.selectedOrder : styles.selectAndOrders}>Default</button>
            </div>
                

            </div>
        </div>
        
    </div>)
}