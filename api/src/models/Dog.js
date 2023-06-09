const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4, // Or DataTypes.UUIDV1
      primaryKey:true
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate:{
        notEmpty:true
      }
    },
    height:{
      type: DataTypes.STRING,
      allowNull:false
    },
    weight:{
      type: DataTypes.STRING,
      allowNull:false
    },
    life_span:{
      type: DataTypes.STRING,
      allowNull:false
    }
  },{
    timestamps:false
});
};
