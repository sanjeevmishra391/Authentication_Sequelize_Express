const {DataTypes} = require('sequelize');
const db = require('./index');

module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
        userId: {
            type: DataTypes.INTEGER
        },
        transactionWallet: { // money was debited or credited
            type: DataTypes.ENUM('credit', 'debit'),
            allowNull: false
        },
        transactionType: {
            type: DataTypes.ENUM('deposit', 'buy', 'lottery', 'withdraw')
        },
        amount: {
            type: DataTypes.DECIMAL(20, 2),
            allowNull: false
        },
        totalBalance: {
            type: DataTypes.DECIMAL(20, 2),
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
      classMethods: {
        associate: function() {
            Transaction.belongsTo(db.User, {
                as: "user",
                foreignKey: "userId",
                foreignKeyConstraint: true
            });
        }
      }
    });
    return Transaction;
  };