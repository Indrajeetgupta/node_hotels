const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000

//middleware function
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.orignalUrl}`);
  next();
}

//auththentication
app.use(logRequest);
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});


app.get('/', function (req, res)  {
  res.send('welcome to our hotels');
})


const personRoutes = require('./routes/PersonRoutes');
const MenuItemRoutes = require('./routes/MenuItemRoutes');

app.use('/person', personRoutes);
app.use('/menuItem', MenuItemRoutes);


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
