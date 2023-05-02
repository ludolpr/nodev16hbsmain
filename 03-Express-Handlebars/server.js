const express = require('express');
const { engine }= require('express-handlebars');

const app = express();
const PORT_NODE = 3000;

/*
 * Configuration Handlebars 
 ***************************/

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

/*
 * Routes 
 *********/

//Première route
app.get('/', (req, res) => {
    res.render('home');
});

//Deuxième route
app.get('/contact', (req, res) => {
    res.render('contact');
});

// On demarre notre app en lui demandant d'être à l'écoute du port
app.listen(PORT_NODE, () => console.log(`Server start on localhost:${PORT_NODE} 🚀`));