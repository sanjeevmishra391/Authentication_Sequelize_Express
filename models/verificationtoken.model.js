const {DataTypes} = require('sequelize');
const db = require('./index');

module.exports = (sequelize, Sequelize) => {
    const VerificationToken = sequelize.define('verification_token', {
            userId: DataTypes.INTEGER,
            token: DataTypes.STRING
        }, {
        classMethods: {
            associate: function() {
                VerificationToken.belongsTo(db.User, {
                    as: "user",
                    foreignKey: "userId",
                    foreignKeyConstraint: true
                });
            }
        }
    });
    return VerificationToken;
};