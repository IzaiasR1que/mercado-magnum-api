const Router = require('express')()

Router.get('/user', (req, res, next) => {
    return next(res.status(200).json({message: 'Success!'}))
})

module.exports = Router
