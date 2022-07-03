const {DataTypes} = require('sequelize');
const db = require('./index');

module.exports = (sequelize, Sequelize) => {
    const PasswordReset = sequelize.define('password_reset', {
            email: DataTypes.STRING,
            token: DataTypes.STRING
        }, {
        classMethods: {
            associate: function() {
                VerificationToken.belongsTo(db.User, {
                    as: "user",
                    foreignKey: "email",
                    foreignKeyConstraint: true
                });
            }
        }
    });
    return PasswordReset;
};