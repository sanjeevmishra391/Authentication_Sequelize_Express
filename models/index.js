const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {Sequelize: Sequelize, sequelize: sequelize};

db.Product = require("./product.model")(sequelize, Sequelize);

db.User = require("./user.model")(sequelize, Sequelize);
db.Address = require("./address.model")(sequelize, Sequelize);
db.VerificationToken = require("./verificationToken.model")(sequelize, Sequelize);
db.PasswordReset = require("./passwordReset.model")(sequelize, Sequelize);

db.Balance = require("./balance.model")(sequelize, Sequelize);
db.Transaction = require("./transaction.model")(sequelize, Sequelize);
db.WalletTransaction = require("./walletTransaction.model")(sequelize, Sequelize);
db.LotteryTransaction = require("./lotteryTransaction.model")(sequelize, Sequelize);
db.PurchaseTransaction = require("./purchaseTransaction.model")(sequelize, Sequelize);

db.Ticket = require("./ticket.model")(sequelize, Sequelize);

db.GrandDraw = require("./grandDraw.model")(sequelize, Sequelize);
db.GrandMatch = require("./grandMatch.model")(sequelize, Sequelize);
db.GrandResult = require("./grandResult.model")(sequelize, Sequelize);
db.RaffleDraw = require("./raffleDraw.model")(sequelize, Sequelize);
db.RaffleResult = require("./raffleResult.model")(sequelize, Sequelize);

module.exports = db;