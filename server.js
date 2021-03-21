// Dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection'); 
const path = require('path'); 
const session = require('express-session'); 

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;


// Sets Handlebars as the default template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(
    session({
        secret: 'Super secret info',
        resave: false, 
        saveUninitialized: false,
})
)

app.use(
    express.json()
)

app.use(
    express.urlencoded({extended: true})
)

app.use(
    express.static(path.join(__dirname, "public"))
)

app.use(
    routes
)

app.listen(PORT, ()=> console.log(`server running on ${PORT}`))