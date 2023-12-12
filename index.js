const app = require('./app');
const config = require('./config/env');
const cache = require('cache-all');

cache.init({
    ttl: config.ttl
});

app.listen(config.port, () => {
    console.log(`Server has been started on ${config.port}`);
});