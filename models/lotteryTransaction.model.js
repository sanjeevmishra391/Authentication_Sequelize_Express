const {DataTypes } = require('sequelize');
const db = require('./index');

module.exports = (sequelize, Sequelize) => {
    const LotteryTransaction = sequelize.define("lottery_transaction", {
        transactionId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        lotteryType: {
            type: DataTypes.ENUM('grand', 'raffle')
        },
        lotteryId: {
            type: DataTypes.INTEGER
        }
    }, {
      classMethods: {
        associate: function() {
            LotteryTransaction.belongsTo(db.Transaction, {
                as: "transaction",
                foreignKey: "transactionId",
                foreignKeyConstraint: true
            });
        }
      }
    });
    return LotteryTransaction;
  };