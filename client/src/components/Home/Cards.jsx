import Card from "./Card";
import styles from "../../css/Home.module.css";

export default function Cards({dogs}){
    return (
        <div>
            {
                dogs.map( (dog,i) => {
                    return (<div key={i}>
                        <Card id={dog.id} name={dog.name} image={dog.image} temperaments={dog.temperaments} weight={dog.weight} />
                    </div>)
                })
            }
        </div>
    )
}