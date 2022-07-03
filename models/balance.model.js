const {DataTypes} = require('sequelize');
const db = require('./index');

module.exports = (sequelize, Sequelize) => {
    const Balance = sequelize.define("balance", {
        userId: {
            type: DataTypes.INTEGER
        },
        creditBalance: {
            type: DataTypes.DECIMAL(20, 2),
            defaultValue: 0.00
        },
        winningBalance: {
            type: DataTypes.DECIMAL(20, 2),
            defaultValue: 0.00
        }
    }, {
      classMethods: {
        associate: function() {
            Balance.belongsTo(db.User, {
                as: "user",
                foreignKey: "userId",
                foreignKeyConstraint: true
            });
        }
      }
    });
    return Balance;
  };