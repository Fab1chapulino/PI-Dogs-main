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

        name=name.capitalize();

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
        console.log(err.message)
        res.status(400).send("CANNOT POST DOG")
    }
}
module.exports=postDog;