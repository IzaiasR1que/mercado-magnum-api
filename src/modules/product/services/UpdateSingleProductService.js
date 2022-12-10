const AppError = __require('@shared/errors/AppError');

const ProductRepository = require('../infra/sequelize/repositories/ProductRepository');

module.exports = new class UpdateSingleProductService {
  async handle(data, id) {
    try {
      const {
        description, price, qnt, qnt_min, qnt_max,
      } = data;

      if (!description
                && !price
                && !qnt
                && !qnt_min
                && !qnt_max) {
        throw new AppError('Nenhum parâmetro válido foi inserido.', 400);
      }

      if (!id) throw new AppError('O ID do produto não foi especificado.', 400);

      await ProductRepository.update({
        description, price, qnt, qnt_max, qnt_min,
      }, id);
    } catch (err) {
      const isAppError = err instanceof AppError;
      throw new AppError(
        isAppError ? err.message : 'Não foi possível realizar a atualização do produto.',
        isAppError ? err.statusCode : 500,
      );
    }
  }
}();
