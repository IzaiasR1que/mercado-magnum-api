const AppError = __require('@shared/errors/AppError');

const ProductRepository = require('../infra/sequelize/repositories/ProductRepository');

module.exports = new class CreateProductService {
  async handle(data) {
    try {
      const {
        description, price, qnt, qnt_min, qnt_max,
      } = data;

      if (!description
            || !price
            || !qnt
            || !qnt_min
            || !qnt_max) {
        throw new AppError('Alguns parâmetros estão ausentes', 400);
      }

      const product = await ProductRepository.create({
        description, price, qnt, qnt_min, qnt_max,
      });
      return product;
    } catch (err) {
      const isAppError = err instanceof AppError;
      throw new AppError(
        isAppError ? err.message : 'Não foi possível realizar o cadastro do produto.',
        isAppError ? err.statusCode : 500,
      );
    }
  }
}();
