const { createProxyMiddleware } = require('http-proxy-middleware');

const API_URL = process.env.REACT_APP_API_URL;
const API_ENDPOINT = '/api';

module.exports = function (app) {
    app.use(
        API_ENDPOINT,
        createProxyMiddleware({
            target: API_URL,
            changeOrigin: true,
            pathRewrite: function (path, req) {
                return path.replace(API_ENDPOINT, '');
            }
        })
    )
};
