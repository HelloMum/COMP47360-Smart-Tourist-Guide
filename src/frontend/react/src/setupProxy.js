const { legacyCreateProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        legacyCreateProxyMiddleware({
            target: 'http://backend:8080',
            changeOrigin: true,
        })
    );
    app.use(
        '/api2',
        legacyCreateProxyMiddleware({
            target: 'http://scrappers:8081', // this is an example of a different port but not used in this project
            changeOrigin: true,
        })
    );
};