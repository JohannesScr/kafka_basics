const add_result_object = (req, res, next) => {
    req.result = {
        http_code: 200,
        message: '',
        data: {},
        errors: []
    };

    return next();
};

const log_request = (req, res, next) => {
    console.log(req.method, req.url);
    return next();
};

module.exports = {
    add_result_object,
    log_request
};