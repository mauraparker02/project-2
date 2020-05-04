module.exports = function(sequelize, DataTypes) {
    var Location = sequelize.define("Location", {
        City: DataTypes.STRING
    });
  
    Location.associate = function(models) {
        Location.belongsTo(models.Breed, {
        foreignKey: {
            allowNull: false
        }
        });
    };
  
return Location;
};