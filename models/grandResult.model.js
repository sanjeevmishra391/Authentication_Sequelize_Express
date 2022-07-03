const {DataTypes} = require('sequelize');
const db = require('./index');

module.exports = (sequelize, Sequelize) => {
    const GrandResult = sequelize.define("grand_result", {
        grandDrawId: {
            type: DataTypes.INTEGER
        },
        grandMatchId: {
            type: DataTypes.INTEGER
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
            GrandResult.belongsTo(db.GrandDraw, {
                as: "grand_draw",
                foreignKey: "grandDrawId",
                foreignKeyConstraint: true
            });
        },
        associate: function() {
            GrandResult.belongsTo(db.GrandMatch, {
                as: "grand_match",
                foreignKey: "grandMatchId",
                foreignKeyConstraint: true
            });
        },
        associate: function() {
            GrandResult.belongsTo(db.User, {
                as: "user",
                foreignKey: "userId",
                foreignKeyConstraint: true
            });
        },
        associate: function() {
            GrandResult.belongsTo(db.Ticket, {
                as: "ticket",
                foreignKey: "ticketId",
                foreignKeyConstraint: true
            });
        }
      }
    });
    return GrandResult;
  };