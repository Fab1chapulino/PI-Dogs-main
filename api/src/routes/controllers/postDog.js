const { Dog, Temperament } = require("../../db");

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
        /* const findDog = await Dog.findOne({
            attributes:["id","name", "weight", "image"],
            where:{
                name:name
            },
            include:{
                model:Temperament,
                attributes:["name"],
                through:{
                    attributes:[]
                }
            }
        }) */
        res.status(200).json("POSTED DOG SUCCESFULLY")
    }catch(err){
        const {message} = err
        if(message.includes("llave duplicada")){
            res.status(400).send("It already exists that breed")

        }else if(message.includes("Validation error")){

            res.status(400).send("CANNOT POST DOG")
        }else{
            res.status(500).send("CONNECTION ERROR. Please refresh the page")
        }
        console.log(err.message, "failed")
        
    }
}
module.exports=postDog;