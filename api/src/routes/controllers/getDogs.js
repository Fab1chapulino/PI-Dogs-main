require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios");
const {Dog, Temperament}= require("../../db");

module.exports= async (req,res)=>{
    try{
        const {data}= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

        const apiDogs=data.map(dog=>{
            return {
                id:dog.id,
                name:dog.name,
                image:dog.image.url,
                temperaments:dog.temperament,
                weight:dog.weight.imperial
            }
        })
        console.log(apiDogs.length, "apiDogs")

        const dbDogs = await Dog.findAll({
            attributes:["id","name", "image", "weight"],
            include:{
                model:Temperament,
                attributes:["name"],
                through:{
                    attributes:[]
                }
            }
        })

        res.status(200).json(dbDogs.concat(apiDogs))
    }catch(err){
        res.status(500).send("CANNOT GET DOGS");
    }
}