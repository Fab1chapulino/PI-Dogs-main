export default function Result ({id, name, temperaments, weight}){
    console.log(name, "name")
    console.log(temperaments, "temperament")
    return (<div>
        <h2>{name}</h2>
        {
            typeof id==="number"
            ?<p>Temperaments:{temperaments}</p>
            :<p>Temperaments:{temperaments.map(temp=>temp.name).join(", ")}</p>
        }
    </div>)
}