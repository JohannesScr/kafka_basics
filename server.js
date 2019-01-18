const Express = require('express');
const CORS = require('cors');
const bodyParser = require('body-parser');

const {setup, setupKafka, kafkaConnect} = require('./includes/config.js');
const {add_result_object, log_request} = require('./middleware/small_functions');
const {post_message} = require('./routes/message');

// setup
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


// middleware
app.use(add_result_object);
app.use(kafkaConnect);
app.use(log_request);


// routes
app.post('/message', post_message);


// start server
app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});