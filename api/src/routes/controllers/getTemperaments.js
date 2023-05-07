require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios");
const {Temperament}= require("../../db");

const getTemperaments = async (req, res)=>{
    try{
        
        const getAllTemperaments=await Temperament.findAll();
        //If there are not temps in DB
        if(!getAllTemperaments.length){
            let temperaments = [];

            //Getting temps from api
            const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
            for (let i=0; i<data.length; i++){
                if(data[i].temperament){
                    temperaments=temperaments.concat(data[i].temperament.split(", "))
                }else{
                    continue
                }
            }
            //Creating a set of all temps so they don't repeat themselves
            const setTemperaments = new Set(temperaments);
            temperaments = [...setTemperaments];
            //Preparing temps for DB
            temperaments = temperaments.map( temp => {
                return {name:temp}
            });

            const bulkTemperaments = await Temperament.bulkCreate(temperaments);
            res.status(200).json(bulkTemperaments)
        }else{
            res.status(200).json(getAllTemperaments)
        }
    //Errors
    }catch(err){
        console.log(err.message)
        res.status(500).send("Cannot GET TEMPERAMENTS")
    }
}
module.exports = getTemperaments;