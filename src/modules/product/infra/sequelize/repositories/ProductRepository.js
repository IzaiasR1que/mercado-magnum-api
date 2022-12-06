const { sequelize } = __require('@models')
module.exports = new class ProductRepository {
    async create(data) {
        const product = await sequelize.Sequelize.User.create(data)
        return product
    }
}
