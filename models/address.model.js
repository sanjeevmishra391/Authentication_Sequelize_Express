const {DataTypes} = require('sequelize');
const db = require('./index');

module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define("address", {
        userId: {
            type: DataTypes.INTEGER
        },
        line1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        line2: {
            type: DataTypes.STRING
        },
        town: {
            type: DataTypes.STRING
        },
        zipcode: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        countryResidence: {
            type: DataTypes.STRING
        },
        nationality: {
            type: DataTypes.STRING
        }
    }, {
      classMethods: {
        associate: function() {
            Address.belongsTo(db.User, {
                as: "user",
                foreignKey: "userId",
                foreignKeyConstraint: true
            });
        }
      }
    });
    return Address;
  };