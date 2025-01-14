import express from 'express';
import handlebars from 'express-handlebars';

import { initCats } from './logic/homePageLogic.js';

const app = express();
const PORT = 5000;

app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');

app.use(express.static('content'));

app.get('/', async (req, res) => {
    const cats = await initCats();
    res.render('homePage', { layout: 'secondary', cats });
})

app.get('/cats/add-breed', (req, res) => {
    res.render('addBreed')
})

app.get('/cats/add-cat', (req, res) => {
    res.render('addCat')
})

app.get('/edit/:catId', (req, res) => {
    res.render('editCat');
})

app.get('/shelter/:catId', (req, res) => {
    res.render('catShelter');
})

app.listen(PORT, () => console.log('Server is listening on http://localhost:5000...'))