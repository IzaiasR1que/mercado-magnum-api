const Router = require('express')();

const ProductRouter = __require('@modules/product/infra/http/routes/product.routes');

Router.use('/product', ProductRouter);

module.exports = Router;
