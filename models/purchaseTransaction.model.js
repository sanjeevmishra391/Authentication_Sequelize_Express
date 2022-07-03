const {DataTypes } = require('sequelize');
const db = require('./index');

module.exports = (sequelize, Sequelize) => {
    const PurchaseTransaction = sequelize.define("purchase_transaction", {
        transactionId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER
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
            PurchaseTransaction.belongsTo(db.Transaction, {
                as: "transaction",
                foreignKey: "transactionId",
                foreignKeyConstraint: true
            });
        },
        associate: function() {
            PurchaseTransaction.belongsTo(db.Product, {
                as: "product",
                foreignKey: "productId",
                foreignKeyConstraint: true
            });
        }
      }
    });
    return PurchaseTransaction;
  };