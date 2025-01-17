import express from 'express';
import handlebars from "express-handlebars";

const app = express();
const port = 5050;

app.engine('hbs', handlebars.engine());

app.set('view engine', 'hbs');
app.set('views', './src/views');

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(port, () => console.log('Server is listening on http://localhost:5050...'));