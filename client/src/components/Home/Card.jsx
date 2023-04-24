export default function Card({id, name, image, temperaments, weight}){
    return (<div>
        <img src={image} alt={name}/>
        <h2>{name}</h2>
        <p>weight(lb):{weight}</p>
        <p>temperaments:{temperaments}</p>
    </div>)
}