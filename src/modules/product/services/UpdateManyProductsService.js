/* eslint-disable no-restricted-syntax */
const AppError = __require('@shared/errors/AppError');

const ProductRepository = require('../infra/sequelize/repositories/ProductRepository');

module.exports = new class UpdateManyProductsService {
  async handle(data) {
    try {
      if (data.length === 0) throw new AppError('Nenhum objeto foi especificado.');

      for await (const product of data) {
        const {
          id, description, price, qnt, qnt_min, qnt_max,
        } = product;

        if (!description
                    && !price
                    && !qnt
                    && !qnt_min
                    && !qnt_max) {
          throw new AppError(`Nenhum parâmetro válido foi inserido para o produto de index: ${i}.`, 400);
        }

        if (!id) throw new AppError(`Não foi possível encontrar o ID do produto: ${description}.`, 400);

        await ProductRepository.update({
          description, price, qnt, qnt_max, qnt_min,
        }, id);
      }
    } catch (err) {
      const isAppError = err instanceof AppError;
      throw new AppError(
        isAppError ? err.message : 'Não foi possível realizar a atualização dos produtos.',
        isAppError ? err.statusCode : 500,
      );
    }
  }
}();
