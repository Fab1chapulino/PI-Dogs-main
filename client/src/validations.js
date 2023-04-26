export default function validate(input){
    let errors={
        name:"",
        image:"",
        temperaments:"",
        height:"",
        weight:"",
        life_span:""
    }
    const name = /^[a-zA-Z ]*$/;
    const url = /(http|https|ftp|ftps):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3}(\/\S*)?/;
    const format =/.*(png|jpg|jpeg)$/;

    /* Name */
    if(input.name !== undefined){
        if(input.name.length<2){
            errors={
                ...errors,
                name:"The name is too short."
            }
        }else if(input.name.length>25){
            errors={
                ...errors,
                name:"Name can't have more than 25 caracters."
            }
        }else if(!name.test(input.name)){
            errors={
                ...errors,
                name:"Only letters are allowed for breed's name."
            }
        }
    }
   
    /* Image */
    if(input.image !== undefined){
        if(!input.image.length){
            errors={
                ...errors,
                image:"You can't submit an empty field."
        }
        }else if(!url.test(input.image)){
            errors={
                ...errors,
                image:"You must write a valid url."
            }
        }else if(!format.test(input.image)){
            errors={
                ...errors,
                image:"Only png, jpg and jpeg formats are allowed."
            }
        }
    }
    
    /* temperaments */
    if(input.temperaments !== undefined){
        if(!input.temperaments.length){
            errors={
                ...errors,
                temperaments:"Choose at least one"
            }
        }
    }
    /* height */
    if(input.height !== undefined ){
        let {minHeight, maxHeight}=input.height;
        minHeight=parseFloat(minHeight);
        maxHeight=parseFloat(maxHeight);

        if(minHeight>=maxHeight){
            errors={
                ...errors,
                height:"Min can't be either greater than nor equal to Max"
            }
        }
    }
    /* Weight */
    if(input.weight !== undefined){
        let {minWeight, maxWeight}=input.weight;
        minWeight=parseFloat(minWeight);
        maxWeight=parseFloat(maxWeight);

        if(minWeight>=maxWeight){
            errors={
                ...errors,
                weight:"Min can't be either greater than nor equal to Max"
            }
        }
    }
    if(input.life_span !== undefined){
        let {minLife, maxLife}=input.life_span;
        minLife=parseInt(minLife);
        maxLife=parseInt(maxLife);

        if(minLife>=maxLife){
            errors={
                ...errors,
                life_span:"Min can't be either greater than nor equal to Max"
            }
        }
    }
    return errors;
}