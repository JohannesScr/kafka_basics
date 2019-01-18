const Express = require('express');
const CORS = require('cors');
const bodyParser = require('body-parser');
// const logger = require('logger');

const {setup} = require('./includes/config.js');

setup();

let PORT = process.env.NODE_SERVER_PORT;
let app = Express();

// app.use(logger);
app.use(CORS({
    origin: true,
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'OPTIONS'],
    optionsSuccessStatus: 200,
    credentials: true
}));
app.use(bodyParser.json());

app.listen(() => {
    console.log(`Express server listening on port ${PORT}`);
});