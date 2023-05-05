import Card from "./Card";

export default function Cards({dogs}){
    console.log(dogs[0].temperaments, "From db")
    console.log(dogs[1].temperaments, "From Api")
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