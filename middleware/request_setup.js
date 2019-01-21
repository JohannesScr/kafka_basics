const addResultObject = (req, res, next) => {
    req.result = {
        http_code: 200,
        message: '',
        data: {},
        errors: []
    };

    return next();
};


const logRequest = (req, res, next) => {
    console.log('###>' ,req.method, '=>', req.url);
    return next();
};


module.exports = {
    addResultObject,
    logRequest
};