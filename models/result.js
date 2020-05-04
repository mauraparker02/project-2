module.exports = function(sequelize, DataTypes) {
    const Result = sequelize.define("Result", {
        breed: DataTypes.STRING,
        city: DataTypes.STRING
    });
  
return Result;
};
  