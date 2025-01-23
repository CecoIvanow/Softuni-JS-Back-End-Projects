import express from 'express';
import handlebars from "express-handlebars";
import router from './routes.js'
import movieRatingHelper from './helpers/rating-helper.js';
import mongoose from 'mongoose';
import 'dotenv/config'

const app = express();
const port = 5050;

app.engine('hbs', handlebars.engine( {
    helpers: {
        movieRating: movieRatingHelper
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    }
} ));

const URI = process.env.DATABASE_URI;

try {
    mongoose.connect(URI);

    console.log('Connected to database');
} catch (error) {
    console.error('Could not connect to database');
    console.error(error.message);
}

app.use('/static', express.static('src/public'));
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(router);

app.listen(port, () => console.log('Server is listening on http://localhost:5050...'));