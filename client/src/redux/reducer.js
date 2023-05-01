const initialState={
    allDogs:[],
    allDogsCopy:[],

    alphaAscend:[],
    alphaDescend:[],
    weightAscend:[],
    weightDescend:[],

    temperaments:[],

    searchDogs:[],

    error:{
        message:"",
        component:"",
        status:null
    },
    message:{
        content:"",
        component:"",
        status:null
    },
    options_config:{
        temps:[],
        origin:"",
        order:[]
    }
}

export default function rootReducer( state=initialState, {type, payload} ){
    switch(type){
        case "SEARCH_DOGS":
            return {
                ...state,
                searchDogs:[...payload]
            }
        case "GET_DOGS":
            const db_dogs=[...payload.filter( dog => typeof dog.id === "string").map( dog => {
                return {
                    ...dog,
                    temperaments:[...dog.temperaments.map(temp => temp.name)].join(", ")
                }
            })]
            const api_dogs=[...payload.filter( dog => typeof dog.id === "number")]
            const dogs=db_dogs.concat(api_dogs);


            return {
                ...state,
                allDogs:[...dogs],
                allDogsCopy:[...dogs],

                

                alphaAscend:[...dogs.sort((a,b)=>{
                    let first = a;
                    let second = b;
                        if(first.name<second.name)return -1;
                        if(first.name>second.name)return 1;
                        return 0;
                })],

                alphaDescend:[...dogs.sort((a,b)=>{
                    let first = a;
                    let second = b;
                        if(first.name<second.name)return 1;
                        if(first.name>second.name)return -1;
                        return 0;
                })],

                weightAscend:[...dogs.sort((a,b)=>{
                    let first = parseFloat(a.weight.split(" ")[0]);
                    let second = parseFloat(b.weight.split(" ")[0])
                        return first-second
                })],

                weightDescend:[...dogs.sort((a,b)=>{
                    let first = parseFloat(a.weight.split(" ")[0]);
                    let second = parseFloat(b.weight.split(" ")[0])
                        return second-first
                })],

            }
        case "GENERATE_ERROR":
            console.log(payload, "<--------Error")
            return {
                ...state,
                error:{
                    ...payload
                }
            }
        case "GENERATE_MESSAGE":
            return {
                ...state,
                message:{
                    ...payload
                }
            }
        case "FILTER/ORDER":
            const {temps, origin, order} = payload;
            const {allDogsCopy} = state;
            let appliedFilters = [...order];

            if(!appliedFilters.length) appliedFilters = [...allDogsCopy]
                temps.forEach(temp=>{
                        appliedFilters = appliedFilters.filter( e => e.temperaments && e.temperaments.includes(temp))
                    })

                switch (origin){
                    case "Created":
                    let created = appliedFilters.filter( e => typeof e.id === "string");
                    return {
                        ...state,
                        allDogs:[...created],
                        options_config:{
                            temps:[...temps],
                            origin:origin,
                            order:[...order]
                        }
                    }
                    case "Not Created":
                        let notCreated = appliedFilters.filter( e => typeof e.id === "number");
                        return {
                            ...state,
                            allDogs:[...notCreated],
                            options_config:{
                                temps:[...temps],
                                origin:origin,
                                order:[...order]
                            }
                        }
                    default:
                        return {
                            ...state,
                            allDogs:[...appliedFilters],
                            options_config:{
                                temps:[...temps],
                                origin:origin,
                                order:[...order]
                            }
                        }
                }
        case "GET_TEMPERAMENTS":
            return {
                ...state,
                temperaments:[...payload]
            }
        default:
            return state;
    }
}