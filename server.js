const express = require('express')
const app = express()
const port = 3000
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req, res)  {
  res.send('welcom to my hotels... How i can help you ?, we have list of menus')
})


const personRoutes = require('./routes/PersonRoutes');
const MenuItemRoutes = require('./routes/MenuItemRoutes');

app.use('/person', personRoutes);

app.use('/menuItem', MenuItemRoutes);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
