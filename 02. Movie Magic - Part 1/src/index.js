import express from 'express';
import handlebars from "express-handlebars";
import router from './routes.js'

const app = express();
const port = 5050;

app.engine('hbs', handlebars.engine());
app.use('/static', express.static('src/public'));

app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(router);

app.listen(port, () => console.log('Server is listening on http://localhost:5050...'));