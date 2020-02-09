const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const express = require('express');
const app = express();


const auto_comp = new autoComplete({
    selector: '#search-home',
    minChars: 0,
    source: function(term, suggest){
        term = term.toLowerCase();
        let choices = ['ActionScript', 'AppleScript', 'Asp'];
        let matches = [];
        for (let i=0; i<choices.length; i++)
            if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
        suggest(matches);
    }
});




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
// app.listen(3000, () => {
//   console.log('Server online...');
// });
