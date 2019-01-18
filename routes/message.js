
/** @function post_message
 * @description send message to kafka
 * */
const post_message = (req, res) => {
    req.result.message = 'post_message was successful';
    req.result.data = req.body;

    res.send(req.result);
};

module.exports = {
    post_message
};