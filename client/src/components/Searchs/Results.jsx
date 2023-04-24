import Result from "./Result.jsx";

export default function Results({results}){
    return (<div>
        {
            results.map((result,i)=>{
                return (<div key={i}>
                        <Result id={result.id} name={result.name} temperaments={result.temperaments} weight={result.weight}/>
                    </div>)
            })
        }
        
    </div>)
}