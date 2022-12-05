export class CreateProductService {
    async handle(request, response) {
        const {description, price, qnt, qnt_min, qnt_max} = request.body

        if(!description || !price || !qnt || !qnt_min || !qnt_max) {
            throw new Error('Alguns parâmetros estão ausentes')
        }
    }
}
