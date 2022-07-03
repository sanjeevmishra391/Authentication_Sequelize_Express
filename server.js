require('dotenv').config();
const express = require('express');
var passport   = require('passport')
var session    = require('express-session')
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./models/index');
var corsOptions = {
  origin: "http://localhost:3000",
  credentials:true,
  optionSuccessStatus:200
};

// db connection
(async function () {
  try {
    await db.sequelize.authenticate();
    // await db.sequelize.sync();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// bringing in routes
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const productRoutes = require("./routes/product.route");
const drawRoutes = require("./routes/draw.route");
const transactionRoutes = require("./routes/transaction.route");

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(session({ 
  secret: process.env.ACCESS_TOKEN_SECRET,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  resave: false, 
  saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session()); 

// defining routes
app.use('/', authRoutes);
app.use('/user', userRoutes);
app.use('/products', productRoutes);
app.use('/draw', drawRoutes);
app.use('/transaction', transactionRoutes);

require('./config/passport.config')(passport)

// listen to port
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening to the port ${port}`);
});