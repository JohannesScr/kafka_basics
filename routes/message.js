/** @function post_message
 * @description send message to kafka
 * */
const post_message = (req, res) => {
    req.result.message = 'post_message was successful';
    req.result.data = req.body;

    let payload = [
        {
            topic: 'test',
            messages: ['message body'], // multi messages should be a array, single message can be just a string or a KeyedMessage instance
            key: 'theKey', // string or buffer, only needed when using keyed partitioner
            partition: 0, // default 0
            attributes: 0, // default: 0
            timestamp: Date.now() // <-- defaults to Date.now() (only available with kafka v0.10+)
        }
    ];

    req.kproducer.send(payload, (err, data) => {
        if (err) {
            console.warn(JSON.stringify(err, null, 4));
        }

        console.log(JSON.stringify(data, null, 4));
    });

    res.send(req.result);
};

module.exports = {
    post_message
};