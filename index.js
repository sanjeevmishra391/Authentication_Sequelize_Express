require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./models/index');
var corsOptions = {
  origin: "https:localhost:3301"
};

// db connection
(async function () {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// bringing in routes
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const productRoutes = require("./routes/product.route");

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors(corsOptions));

// defining routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/products', productRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening to the port ${port}`);
});