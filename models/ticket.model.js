const {DataTypes} = require('sequelize');
const db = require('./index');

module.exports = (sequelize, Sequelize) => {
    const Ticket = sequelize.define("ticket", {
        userId: {
            type: DataTypes.INTEGER
        },
        purchasedOn: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        drawDate: {
            type: DataTypes.DATEONLY
        },
        numbers: {
            type: DataTypes.JSON,
            allowNull: true
        }
    }, {
      classMethods: {
        associate: function() {
            Ticket.belongsTo(db.User, {
                as: "user",
                foreignKey: "userId",
                foreignKeyConstraint: true
            });
        }
      }
    });
    return Ticket;
  };