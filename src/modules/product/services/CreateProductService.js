const ProductRepository = require('../infra/sequelize/repositories/ProductRepository')

const { AppError } = __require('@shared/errors/AppError');
module.exports = new class CreateProductService {
    async handle(request, response) {
        const {description, price, qnt, qnt_min, qnt_max} = request.body

        if( !description 
            || !price 
            || !qnt 
            || !qnt_min 
            || !qnt_max) {
            throw new AppError('Alguns parâmetros estão ausentes')
        }

        await ProductRepository.create({description: 'Hello'})
    }
}
