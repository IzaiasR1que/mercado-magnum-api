const AppError = __require('@shared/errors/AppError');

const ProductRepository = require('../infra/sequelize/repositories/ProductRepository');

module.exports = new class ListSingleProductService {
  async handle(id) {
    try {
      if (!id) throw new AppError('O ID do produto não foi especificado.', 400);
      const product = await ProductRepository.findSingle(id);
      return product;
    } catch (err) {
      const isAppError = err instanceof AppError;
      throw new AppError(
        isAppError ? err.message : 'Não foi possível realizar a consulta do produto.',
        isAppError ? err.statusCode : 500,
      );
    }
  }
}();
