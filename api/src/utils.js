const { Dog, Temperament}= require('./db');
const { Op }=require("sequelize");

String.prototype.capitalize = function() {
    return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); });
  };

const applySearch = async function(query){
   try {
    query = query.trim().split(' ').filter( e => e !== "").join(' ').capitalize();

    const firstDogs = await Dog.findAll({
        attributes:["id", "name", "weight"],
        where:{
            name:query
        },
        include:{
            model:Temperament,
            attributes:["name"],
            through:{
                attributes:[]
            }
        }
    })
    if(firstDogs.length)return firstDogs;

    query=query.split(' ');
    const secondDogs = await Dog.findAll({
        attributes:["id", "name", "weight"],
        where:{
            name:{
                [Op.and]:{
                    [Op.startsWith]:query[0],
                    [Op.endsWith]:query[query.length-1]
                }
            }
        },
        include:{
            model:Temperament,
            attributes:["name"],
            through:{
                attributes:[]
            }
        }
    });
    if(secondDogs.length) return secondDogs

    const thirdDogs = await Dog.findAll({
        attributes:["id", "name", "weight"],
        where:{
            name:{
                [Op.startsWith]:query[0].slice(0, 3)
            }
        },
        include:{
            model:Temperament,
            attributes:["name"],
            through:{
                attributes:[]
            }
        }
    })
    return thirdDogs;
    }catch(err){
        console.log(err.message)
    }
}
module.exports=applySearch;