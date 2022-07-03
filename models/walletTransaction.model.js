const {DataTypes } = require('sequelize');
const db = require('./index');

module.exports = (sequelize, Sequelize) => {
    const WalletTransaction = sequelize.define("wallet_transaction", {
        transactionId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        mediumOfTransaction: {
            type: DataTypes.STRING
        },
        account: {
            type: DataTypes.STRING
        }
    }, {
      classMethods: {
        associate: function() {
            WalletTransaction.belongsTo(db.Transaction, {
                as: "transaction",
                foreignKey: "transactionId",
                foreignKeyConstraint: true
            });
        }
      }
    });
    return WalletTransaction;
  };