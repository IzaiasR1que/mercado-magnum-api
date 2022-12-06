const path = require('path');

global.__require = function(module) {
  const customPaths = [
  ['@models', path.join(__dirname, '../models')],
  ['@shared', path.join(__dirname, 'shared')],
  ['@modules', path.join(__dirname, 'modules')]]
  const cPath = customPaths.find(path => path[0] === module.split('/')[0])

  return cPath ? require(path.join(cPath[1], module.split('/').slice(1).join('/'))) 
  : require(path.join(__dirname, module))
}

const { AppError } = __require('@shared/errors/AppError');
const express = require('express')
require('dotenv').config()

const { sequelize } = __require('@models')

const Router = __require('@shared/infra/http/routes')

const app = express()

app.use(express.json());
app.use(require('cors')())

//Test sequelize connection
app.use(async (req, res, next) => {
  try {
      await sequelize.authenticate();
      console.log('Conexão com o banco de dados estabelecida com sucesso!');
      return next()
    } catch (error) {
      return next(new AppError(`Não foi possível estabelecer conexão com o banco de dados: ${error}`))
    }
})


app.use(Router)


app.use((error, req, res, next) => {
  if(error instanceof AppError) {
      return res.status(error.statusCode).json({status: 'Error', message: error.message})
    }
    return res.status(500).json({status: 'Unknown Error', message: 'Erro desconhecido'})
})

app.use((payload) => {
  sequelize.close()
  return payload
})

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`😎 Server listening on port ${port}`);
});
