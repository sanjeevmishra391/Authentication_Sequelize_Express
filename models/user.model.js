const {DataTypes} = require('sequelize');
const db = require('./index');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
          isEmail: {msg: "It must be a valid Email address"},
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dob: {
        type: DataTypes.DATE
      },
      countryCode: {
        type: DataTypes.STRING
      },
      mobile: {
        type: DataTypes.INTEGER
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      classMethods: {
        associate: function() {
         User.hasOne(db.VerificationToken, {
              as: 'verificationtoken',
              foreignKey: 'userId',
              foreignKeyConstraint: true,
            });
        }, 
        associate: function() {
          User.hasOne(db.PasswordReset, {
               as: 'passwordreset',
               foreignKey: 'email',
               foreignKeyConstraint: true,
             });
         }
      }
    });
    return User;
  };