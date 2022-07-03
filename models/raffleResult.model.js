const {DataTypes} = require('sequelize');
const db = require('./index');

module.exports = (sequelize, Sequelize) => {
    const RaffleResult = sequelize.define("raffle_result", {
        raffleDrawId: {
            type: DataTypes.INTEGER
        },
        amount: {
            type: DataTypes.DECIMAL(20, 2)
        },
        userId: {
            type: DataTypes.INTEGER
        },
        ticketId: {
            type: DataTypes.INTEGER
        }
    }, {
      classMethods: {
        associate: function() {
            RaffleResult.belongsTo(db.RaffleDraw, {
                as: "raffle_draw",
                foreignKey: "raffleDrawId",
                foreignKeyConstraint: true
            });
        },
        associate: function() {
            RaffleResult.belongsTo(db.User, {
                as: "user",
                foreignKey: "userId",
                foreignKeyConstraint: true
            });
        },
        associate: function() {
            RaffleResult.belongsTo(db.Ticket, {
                as: "ticket",
                foreignKey: "ticketId",
                foreignKeyConstraint: true
            });
        }
      }
    });
    return RaffleResult;
  };