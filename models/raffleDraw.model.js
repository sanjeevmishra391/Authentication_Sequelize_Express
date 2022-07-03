const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const RaffleDraw = sequelize.define("raffle_draw", {
        drawDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        totalAmount: {
            type: DataTypes.DECIMAL(20, 2)
        }
    });
    return RaffleDraw;
  };