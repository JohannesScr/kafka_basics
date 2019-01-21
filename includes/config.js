const config = require('./config.json');
let env;
let params;


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


module.exports = {
    setup
};