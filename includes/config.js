const config = require('./config.json');
let env;
let params;

let kafka = require('kafka-node');
let kProducer = kafka.Producer;
let kclient = new kafka.KafkaClient({autoConnect: true});
let kproducer = new kProducer(kclient);

const setup = () => {
    if (process.env.ENV) {
        env = process.env.ENV;
    } else {
        env = "development";
        params = config[env];

        Object.keys(params).forEach(key => {
            process.env[key.toUpperCase()] = params[key];
        });
    }
};

const setupKafka = () => {
    kproducer.on('ready', function () {
        // producer.send(payloads, function (err, data) {
        //     console.log(data);
        // });
        console.log('Kafka connected');
    });

    kproducer.on('error', function (err) {
        console.warn('Unable to connect to Kafka');
        console.warn(JSON.stringify(err, null, 4));

        process.exit();
    });
};

const kafkaConnect = (req, res, next) => {
    req.kproducer = kproducer;

    return next();
};

module.exports = {
    setup,
    setupKafka,
    kafkaConnect
};