const Express = require('express');
const CORS = require('cors');
const bodyParser = require('body-parser');

const {setup} = require('./includes/config.js');
const {setupKafka, kafkaConnect} = require('./includes/kafka_setup');
const {addResultObject, logRequest} = require('./middleware/request_setup');
const {post_message} = require('./routes/message');


// # SETUP
setup();
setupKafka();


let PORT = process.env.NODE_SERVER_PORT;
let app = Express();


app.use(CORS({
    origin: true,
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'OPTIONS'],
    optionsSuccessStatus: 200,
    credentials: true
}));
app.use(bodyParser.json());


// # MIDDLEWARE
app.use(logRequest);
app.use(addResultObject);
app.use(kafkaConnect);


// # ROUTES

// ## MESSAGE
app.post('/message', post_message);


// # START SERVER
app.listen(PORT, () => {
    console.log(`Express Kafka App 01 server listening on port ${PORT}`);
});