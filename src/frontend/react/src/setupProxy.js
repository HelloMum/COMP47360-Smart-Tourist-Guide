const { legacyCreateProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    legacyCreateProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
  app.use(
    "/api2",
    legacyCreateProxyMiddleware({
      target: "http://localhost:4000", // this is an example of a different port but not used in this project
      changeOrigin: true,
    })
  );
};
