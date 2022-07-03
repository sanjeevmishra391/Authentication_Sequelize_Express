const {DataTypes} = require('sequelize');
const db = require('./index');

module.exports = (sequelize, Sequelize) => {
    const GrandMatch = sequelize.define("grand_match", {
        grandDrawId: {
            type: DataTypes.INTEGER
        },
        matchCount: {
            type: DataTypes.INTEGER
        },
        prizePool: {
            type: DataTypes.DECIMAL(20, 2)
        }
    }, {
      classMethods: {
        associate: function() {
            GrandMatch.belongsTo(db.GrandDraw, {
                as: "grand_draw",
                foreignKey: "grandDrawId",
                foreignKeyConstraint: true
            });
        }
      }
    });
    return GrandMatch;
  };