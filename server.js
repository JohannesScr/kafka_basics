let Express = require('express');

let PORT = 3000;
let app = Express();


app.listen(() => {
    console.log(`Express server listening on port ${PORT}`);
});