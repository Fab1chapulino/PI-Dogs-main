require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios");
const {Temperament}= require("../../db");

const getTemperaments = async (req, res)=>{
    try{
        const getAllTemperaments=await Temperament.findAll();
        if(!getAllTemperaments.length){
            let temperaments = [];
            const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
            for (let i=0; i<data.length; i++){
                if(data[i].temperament){
                    temperaments=temperaments.concat(data[i].temperament.split(", "))
                }else{
                    continue
                }
            }
            
            const setTemperaments = new Set(temperaments);
            temperaments = [...setTemperaments];
            temperaments = temperaments.map( temp => {
                return {name:temp}
            });
            console.log(temperaments)

            const bulkTemperaments = await Temperament.bulkCreate(temperaments);
            res.status(200).json(bulkTemperaments)
        }else{
            res.status(200).json(getAllTemperaments)
        }
    }catch(err){
        console.log(err.message)
        res.status(500).send("Cannot GET TEMPERAMENTS")
    }
}
module.exports = getTemperaments;