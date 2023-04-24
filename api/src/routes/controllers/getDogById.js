require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios");
const {Dog, Temperament}= require("../../db");


module.exports = async (req,res)=>{
    try{
        const {id}=req.params;
        if(id.length<36){
            const {data} = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
            const detail = data.find( doggie => doggie.id==id);
            console.log(detail, "detail")
            const dog = {
                name:detail.name,
                image:detail.image.url,
                height:detail.height.imperial,
                wight:detail.weight.imperial,
                temperaments:detail.temperament,
                life_span:detail.life_span
            }
            res.status(200).json(dog);
        }else{
            const dog = await Dog.findOne({
                where:{
                    id:id
                },
                include:{
                    model:Temperament,
                    attributes:["name"],
                    through:{
                        attributes:[]
                    }
                }
    
            });
            res.status(200).json(dog);
        }
        
    }catch(err){
        console.log(err.message)
        res.status(500).send("CANNOT GET DOG");
    }
}
/* ID.
-  Imagen.
-  Nombre.
-  Altura.
-  Peso.
-  Temperamentos.
-  Años de vida. */