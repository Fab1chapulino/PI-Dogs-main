const {Dog, Temperament}= require("../../db");

module.exports = async (req, res)=>{
    try{
        console.log("pasa por aqui")
        const {id} = req.params;
        const deletedDog = await Dog.destroy({
            where:{
                id:id
            }
        })
        console.log(deletedDog, "LALALALAL")
        res.status(200).send("Deleted breed successfully")
    }catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }
}