const ProductRouter = require('express')();

const ProductController = __require('@modules/product/infra/http/controllers/ProductController');

ProductRouter.post('/', ProductController.create);
ProductRouter.get('/', ProductController.findAll);
ProductRouter.get('/:id', ProductController.findSingle);
ProductRouter.put('/', ProductController.updateMany);
ProductRouter.put('/:id', ProductController.updateSingle);
ProductRouter.delete('/:id', ProductController.delete);

module.exports = ProductRouter;
