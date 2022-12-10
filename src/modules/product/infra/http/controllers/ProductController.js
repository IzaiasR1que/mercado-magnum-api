const CreateProductService = __require('@modules/product/services/CreateProductService');
const DeleteProductService = __require('@modules/product/services/DeleteProductService');
const UpdateSingleProductService = __require('@modules/product/services/UpdateSingleProductService');
const UpdateManyProductsService = __require('@modules/product/services/UpdateManyProductsService');
const FindAllProductsService = __require('@modules/product/services/ListAllProductsService');
const FindSingleProductService = __require('@modules/product/services/ListSingleProductService');
class ProductController {
  async findAll(req, res, next) {
    try {
      const products = await FindAllProductsService.handle();
      return res.status(products.length > 0 ? 200 : 404).json(products.length > 0 ? products : { message: 'Não há produtos cadastrados.' });
    } catch (err) {
      return next(err);
    }
  }

  async findSingle(req, res, next) {
    try {
      const product = await FindSingleProductService.handle(req.params.id);
      return res.status(product ? 200 : 404).json(product || { message: 'O produto informado não existe.' });
    } catch (err) {
      return next(err);
    }
  }

  async create(req, res, next) {
    try {
      await CreateProductService.handle(req.body);
      return res.status(200).json({ status: 'Sucesso', message: 'Produto cadastrado com sucesso!' });
    } catch (err) {
      return next(err);
    }
  }

  async updateSingle(req, res, next) {
    try {
      await UpdateSingleProductService.handle(req.body, req.params.id);
      return res.status(200).json({ status: 'Sucesso', message: 'Produto atualizado com sucesso!' });
    } catch (err) {
      return next(err);
    }
  }

  async updateMany(req, res, next) {
    try {
      await UpdateManyProductsService.handle(req.body);
      return res.status(200).json({ status: 'Sucesso', message: 'Produtos atualizados com sucesso!' });
    } catch (err) {
      return next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await DeleteProductService.handle(req.params.id);
      return res.status(200).json({ status: 'Sucesso', message: 'Produto excluído com sucesso!' });
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new ProductController();
