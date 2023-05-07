require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios");
const {Dog, Temperament}= require("../../db");

module.exports= async (req,res)=>{
    try{
        //Fetching breeds from api
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

        //Getting breeds from DB
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

        res.status(200).json(dbDogs.reverse().concat(apiDogs))
    //Errors
    }catch(err){
        console.log(err.message)
        res.status(500).send("CONNECTION ERROR. Please refresh the page.");
    }
}