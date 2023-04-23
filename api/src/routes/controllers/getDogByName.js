require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios");
const {Dog, Temperament}= require("../../db");
const applySearch = require('../../utils.js')

module.exports = async (req, res)=>{
    try{
        const {query}= req.query
        const {data}= await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${query}&&api_key=${API_KEY}`)
        const apiDogs=data.map(dog=>{
            return {
                id:dog.id,
                name:dog.name,
                //image:dog.image.url,
                temperaments:dog.temperament,
                weight:dog.weight.imperial
            }
        })
        const dbDogs = await applySearch(query);
        const dogs = dbDogs.concat(apiDogs);
        if(dogs.length){
            res.status(200).json(dogs)
        }else{
            throw new Error("COUDN'T FIND DOGS")
        }

    }catch(err){
        res.status(400).send(err.message)
    }
}