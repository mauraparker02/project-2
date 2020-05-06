module.exports = function(sequelize, DataTypes) {
    const ShelterDogs = sequelize.define("ShelterDogs", {
        dogName: DataTypes.STRING,
        breed: DataTypes.STRING
    });

    ShelterDogs.associate = function(models) {
        ShelterDogs.belongsTo(models.Shelter, {
          foreignKey: {
            allowNull: false
          }
        });
    }
    return ShelterDogs;
};