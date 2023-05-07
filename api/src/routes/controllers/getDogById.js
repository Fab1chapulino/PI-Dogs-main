require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios");
const {Dog, Temperament}= require("../../db");


module.exports = async (req,res)=>{
    try{
        const {id}=req.params;
        //In case is a Not Created breed
        if(id.length<36){
            const {data} = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
            const detail = data.find( doggie => doggie.id==id);
            //Lazy Loading
            const dog = {
                name:detail.name,
                image:detail.image.url,
                height:detail.height.imperial,
                weight:detail.weight.imperial,
                temperaments:detail.temperament,
                life_span:detail.life_span
            }
            res.status(200).json(dog);
        }else{
            //In case is Created breed
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
        //Errors
    }catch(err){
        console.log(err.message)
        res.status(500).send("CONNECTION ERROR");
    }
}