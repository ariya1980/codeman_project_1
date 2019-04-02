const Sequelize = require('sequelize')
const CategorysModel = require('./category')
const UsersModel = require('./users')
const DrinksModel = require('./drink')
const sequelize = new Sequelize('postgres://localhost:5431/beverage')

const connect = async function(){
    try{
        //await sequelize.authenticate()
        await sequelize.sync({force: true})
        console.log('Connected to database')
    }catch(e){
        console.log('Can not connect to database')
    }
}

module.exports = {
    connect,
    Users: UsersModel(sequelize,Sequelize),
    Categorys: CategorysModel(sequelize,Sequelize),
    Drinks: DrinksModel(sequelize,Sequelize)
}