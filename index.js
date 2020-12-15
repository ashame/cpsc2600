const express = require('express');
const path = require('path');

const db = require('./db');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

if (process.env.NODE_ENV != 'production') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

app.use('/api/v1', require('./api/v1'));
app.use('/', express.static(path.join(__dirname, "public")));

app.get('/*', (_req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.use((req, res, next) => {
    res.status(404);
    const error = new Error(`Not found - ${req.originalUrl}`);
    next(error);
})

app.use((err, req, res, next) => {
    const status = res.statusCode != 200 ? res.statusCode : 500;
    res.status(status).send(`
        <h2>Error ${res.statusCode}</h2>
        <h3>Oops! There was an error completing your request</h3>
    `);
})

db.once('open', () => app.listen(PORT, () => console.log(`LISTENING on PORT ${PORT}`)));