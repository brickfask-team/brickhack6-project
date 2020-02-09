const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const express = require('express');
const app = express();

// App Setup
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// Express Setup
app.use(express.static(`${__dirname}/public`));

// Routes
const indexRoutes = require('./routes/index');
app.use(indexRoutes);

// Server Connection
app.listen(3000, () => {
  console.log('Server online...');
});
