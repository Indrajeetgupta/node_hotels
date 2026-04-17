const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000

app.get('/', function (req, res)  {
  res.send('welcom to my hotels... How i can help you ?, we have list of menus')
})


const personRoutes = require('./routes/PersonRoutes');
const MenuItemRoutes = require('./routes/MenuItemRoutes');

app.use('/person', personRoutes);

app.use('/menuItem', MenuItemRoutes);




app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
