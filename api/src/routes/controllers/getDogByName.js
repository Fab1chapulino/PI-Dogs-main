require('dotenv').config();
const { API_KEY } = process.env;

const axios = require("axios");
const {Dog, Temperament}= require("../../db");
const applySearch = require('../../utils.js')

module.exports = async (req, res)=>{
    try{
        //Get query search from req.query
        const {query}= req.query
        //Searching breeds from api
        const {data}= await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${query}&&api_key=${API_KEY}`)
        let apiDogs=data.map(dog=>{
            return {
                id:dog.id,
                name:dog.name,
                temperaments:dog.temperament,
                weight:dog.weight.imperial
            }
        })
        //Only need those with temperaments
        apiDogs = apiDogs.filter( dog => dog.temperaments)

        //Searching breeds from DB
        const dbDogs = await applySearch(query);

        //joining both results
        const dogs = dbDogs.concat(apiDogs);

        if(dogs.length){
            res.status(200).json(dogs)
        }else{
            throw new Error("SORRY, WE COUDN'T FIND THAT BREED")
        }

    }catch(err){
        const {message} = err;
        switch(message){
            case "SORRY, WE COUDN'T FIND THAT BREED":
                res.status(400).send(message)
            break;
            default:
                console.log(message)
                res.status(500).send("CONNECTION ERROR. Please reload page")
        }
    }
}