const express = require('express')
const app = express()
const port = 3000

app.set('views', './views');
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.listen(port, () => {
    console.log(`Fronted started at http://localhost:${port}`)
});