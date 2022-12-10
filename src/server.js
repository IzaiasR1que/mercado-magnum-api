/* global __require */

const path = require('path');

global.__require = function __require(module) {
  const customPaths = [
    ['@models', path.join(__dirname, '../models')],
    ['@shared', path.join(__dirname, 'shared')],
    ['@modules', path.join(__dirname, 'modules')]];
  const cPath = customPaths.find((pathName) => pathName[0] === module.split('/')[0]);

  return cPath ? require(path.join(cPath[1], module.split('/').slice(1).join('/')))
    : require(path.join(__dirname, module));
};

const AppError = __require('@shared/errors/AppError');
const express = require('express');
require('dotenv').config();

const { sequelize } = __require('@models');

const Router = __require('@shared/infra/http/routes');

const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Test sequelize connection
app.use(async (req, res, next) => {
  try {
    await sequelize.authenticate();
    return next();
  } catch (error) {
    return next(res
      .status(500)
      .json({
        status: 'Error',
        message: `Não foi possível estabelecer conexão com o banco de dados: ${error}`,
      }));
  }
});

app.use(Router);

// Errors tratment
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ status: 'Error', message: error.message });
  }

  return res
    .status(500)
    .json({ status: 'Unknown Error', message: 'An error has occurred' });
});

const port = process.env.PORT || 3030;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`😎 Server listening on port ${port}`);
});
