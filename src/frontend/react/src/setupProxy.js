const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';
    console.log('Proxying to backend URL:', backendUrl);

    app.use(
        '/api',
        createProxyMiddleware({
            target: backendUrl,
            changeOrigin: true,
            pathRewrite: {
                '^/api': '', // Remove the /api prefix when forwarding requests
            },
        })
    );
};
