global.__require = function(module) {
  return require(__dirname + '/' + module)
}

const { AppError } = __require('shared/errors/AppError');
const express = require('express')
require('dotenv').config()

const {sequelize} = __require('shared/infra/sequelize/index.js')

const Router = __require('shared/infra/http/routes/index')

const app = express()

app.use(express.json());
app.use(require('cors')())

//Test sequelize connection
app.use(async (req, res, next) => {
  try {
      await sequelize.authenticate();
      console.log('Conexão com o banco de dados estabelecida com sucesso!');

      await sequelize.sync()
    } catch (error) {
      return next(new AppError(`Não foi possível estabelecer conexão com o banco de dados: ${error}`))
    }
})

app.use((error, req, res, next) => {
  if(error instanceof AppError) {
      return res.status(error.statusCode).json({status: 'Error', message: error.message})
    }
  return res.status(500).json({status: 'Unknown Error', message: 'Erro desconhecido'})
})

app.use(Router)

app.use((payload) => {
  sequelize.close()
  return payload
})

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`😎 Server listening on port ${port}`);
});
