const { Dog } = require("../../db");

String.prototype.capitalize = function() {
    return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); });
  };

const postDog= async (req, res)=>{
    try{
        let {
            name,
            image,
            height,
            weight,
            life_span,
            temperaments
        } = req.body;
        if(!temperaments.length){
            throw new Error("CANNOT POST DOG")
        }
         
        /* temperaments=temperaments.map(temp=>parseInt(temp))
        console.log(temperaments,"temperaments") */

        name=name.capitalize();
        if(typeof height==="object")height=Object.values(height).join(" - ")
        if(typeof weight==="object")weight=Object.values(weight).join(" - ")
        if(typeof life_span==="object")life_span=Object.values(life_span).join(" - ")

        const newDog = await Dog.create({
            name,
            image,
            height,
            weight,
            life_span
        })
        await newDog.addTemperaments(temperaments)
        res.status(200).send("POSTED DOG SUCCESFULLY")
    }catch(err){
        console.log(err.message, "failed")
        res.status(400).send("CANNOT POST DOG")
    }
}
module.exports=postDog;