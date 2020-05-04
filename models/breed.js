module.exports = function(sequelize, DataTypes) {
    var Breed = sequelize.define("Breed", {
        Breed: DataTypes.STRING
    });
  
    Breed.associate = function(models) {
        Breed.HasOne(models.Location)
    };
return Breed;
};
  