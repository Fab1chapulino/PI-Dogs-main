const { Dog, Temperament}= require('./db');
const { Op }=require("sequelize");

String.prototype.capitalize = function() {
    return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); });
  };

const applySearch = async function(query){
   try {
    query = query.trim().split(' ').filter( e => e !== "").join(' ').capitalize();

    const firstRecipe = await Dog.findAll({
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
    //if(firstRecipe.length)return firstRecipe.concat(true)

    query=query.split(' ');
    const secondRecipe = await Dog.findAll({
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
    //if(secondRecipe.length) return secondRecipe.concat(true)

    const thirdRecipe = await Dog.findAll({
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
    return firstRecipe.concat(secondRecipe.concat(thirdRecipe))
    }catch(err){
        console.log(err.message)
    }
}
module.exports=applySearch;