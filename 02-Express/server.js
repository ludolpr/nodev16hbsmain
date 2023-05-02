// Import module
const express = require('express')
const app = express()
const port = 3000
const path = require('path')

/*
 * Routes 
 *********/

// Première route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Deuxièmes route
app.get('/contact', (req, res) => {
  res.send('Page Contact !')
})

// Render HTML
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
});

// On demarre notre app en lui demandant d'être à l'écoute du port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
