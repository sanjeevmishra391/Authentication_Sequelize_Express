const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const GrandDraw = sequelize.define("grand_draw", {
        drawDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        winningTicket: {
            type: DataTypes.JSON,
            allowNull: true
        },
        totalAmount: {
            type: DataTypes.DECIMAL(20, 2),
            defaultValue: 0.00
        }
    });
    return GrandDraw;
  };