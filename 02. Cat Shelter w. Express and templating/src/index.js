import express from 'express';

const app = express();
const PORT = 5060;

app.get('/', (req, res) => {
    res.status(200);
    res.send('It works!');
})

app.listen(PORT, () => console.log('Server is listening on http://localhost:5060...'))