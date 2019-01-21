let kafka = require('kafka-node');
let kProducer = kafka.Producer;
let kclient = new kafka.KafkaClient({autoConnect: true});
let kproducer = new kProducer(kclient);


/** @function setupKafka
 * @description setup connection to Kafka
 * */
const setupKafka = () => {
    kproducer.on('ready', () => {
        console.log('Kafka connected');
    });

    kproducer.on('error', (err) => {
        console.warn('Unable to connect to Kafka');
        console.warn(JSON.stringify(err, null, 4));

        process.exit();
    });
};


/** @function kafkaConnect
 * @description add kafka producer to the request object to make it accessible through
 * the request object.
 * */
const kafkaConnect = (req, res, next) => {
    req.kproducer = kproducer;

    return next();
};


module.exports = {
    setupKafka,
    kafkaConnect
};