const AppError = __require('@shared/errors/AppError');

const ProductRepository = __require('@modules/product/infra/sequelize/repositories/ProductRepository');
module.exports = new class ListAllProductsService {
  async handle() {
    try {
      const products = await ProductRepository.findAll();
      return products;
    } catch {
      throw new AppError('Não foi possível realizar a consulta dos produtos.');
    }
  }
}();
