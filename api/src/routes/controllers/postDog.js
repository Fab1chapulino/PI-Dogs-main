const { Dog, Temperament } = require("../../db");

//Capitalize the words' first letter
String.prototype.capitalize = function() {
    return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); });
  };

const postDog= async (req, res)=>{
    try{
        //Getting data from req.body
        let {
            name,
            image,
            height,
            weight,
            life_span,
            temperaments
        } = req.body;

        //Capitalize the breed name
        name=name.capitalize();

        //Turn "height", "weight" and "life_span" properties into strings
        height=Object.values(height).join(" - ");
        weight=Object.values(weight).join(" - ");
        life_span=Object.values(life_span).join(" - ");

        //Create an instance of "Dog" model
        const newDog = await Dog.create({
            name,
            image,
            height,
            weight,
            life_span
        })
        await newDog.addTemperaments(temperaments)

        //Send a success message
        res.status(200).json("POSTED DOG SUCCESFULLY")
    
    //errors
    }catch(err){
        const {message} = err
        if(message.includes("llave duplicada")){
            res.status(400).send("It already exists that breed")

        }else if(message.includes("Validation error")){

            res.status(400).send("CANNOT POST DOG")
            
        }else{
            res.status(500).send("CONNECTION ERROR. Please refresh the page")
        }
        
    }
}
module.exports=postDog;