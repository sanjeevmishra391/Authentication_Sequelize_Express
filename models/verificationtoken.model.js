const {DataTypes} = require('sequelize');
const {User} = require('./index');
module.exports = (sequelize, Sequelize) => {
    const VerificationToken = sequelize.define('verificationtoken', {
            userId: DataTypes.INTEGER,
            token: DataTypes.STRING
        }, {
        classMethods: {
            associate: function() {
                VerificationToken.belongsTo(User, {
                    as: "user",
                    foreignKey: "userId",
                    foreignKeyConstraint: true
                });
            }
        }
    });
    return VerificationToken;
};