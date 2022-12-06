const Router = require('express')()

const CreateProductService = __require('@modules/product/services/CreateProductService')

Router.get('/user', (req, res, next) => {
    CreateProductService.handle(req)
    return next(res.status(200).json({message: 'Success!'}))
})

module.exports = Router
