const express = require('express');
const ngrok = require('ngrok');
const logger = require('./logger');

const app = express();
const argv = require('minimist')(process.argv.slice(2));

// get the intended port number, user port 3000 if not provided
const port = argv.port || process.env.PORT || 3000;

// app start
app.listen(port, (err) => {
    if(err) {
        return logger.error(err.message);
    }

    // connect ngrok in dev mode
    if(ngrok) {
        ngrok.connect(port, (innerErr, url) => {
            if(innerErr) {
                return logger.error(innerErr);
            }

            logger.appStarted(port, url);
        });
    }
    else {
        logger.appStarted(port);
    }
});