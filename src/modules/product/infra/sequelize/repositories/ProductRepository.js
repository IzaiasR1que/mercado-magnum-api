const AppError = __require('@shared/errors/AppError');

const { sequelize } = __require('@models');
module.exports = new class ProductRepository {
  async create(data) {
    try {
      const product = await sequelize.models.Product.create(data);
      return product;
    } catch (err) {
      throw new AppError(`Não foi possível cadastrar o produto no banco de dados: ${err}`);
    }
  }

  async findAll() {
    try {
      const products = await sequelize.models.Product.findAll();
      return products;
    } catch (err) {
      throw new AppError(`Não foi possível encontrar os produtos no banco de dados: ${err}`);
    }
  }

  async findSingle(id) {
    try {
      const product = await sequelize.models.Product.findByPk(id);
      return product;
    } catch (err) {
      throw new AppError(`Não foi possível encontrar o produto no banco de dados: ${err}`);
    }
  }

  async update(data, id) {
    try {
      const product = await sequelize.models.Product.update(
        data,
        { where: { id } },
      );
      return product;
    } catch (err) {
      throw new AppError(`Não foi possível atualizar o produto no banco de dados: ${err}`);
    }
  }

  async delete(id) {
    try {
      const product = await sequelize.models.Product.destroy({
        where: { id },
      });
      return product;
    } catch (err) {
      throw new AppError(`Não foi possível excluir o produto no banco de dados: ${err}`);
    }
  }
}();
