module.exports = function(sequelize, DataTypes) {
    const Shelter = sequelize.define("Shelter", {
        name: DataTypes.STRING,
        city: DataTypes.STRING
    });
  
    Shelter.associate = function(models) {
        Shelter.hasMany(models.ShelterDogs, {
          onDelete: "cascade"
        });
      };

    return Shelter;
};