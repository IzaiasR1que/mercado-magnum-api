const {Sequelize, DataTypes} = require('sequelize');

//Connection
const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

//Models
exports.Product = sequelize.define('Product', {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING
    },
    price: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    qnt: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    qnt_min: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    qnt_max: {
        allowNull: false,
        type: DataTypes.INTEGER
    }
})

exports.User = sequelize.define('User', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    acess_key: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports.sequelize = sequelize
