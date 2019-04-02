module.exports = function(sequelize,type){
    return sequelize.define('category',{
        category : {
            type: type.STRING,
            unique: true
        },
        username: {
            type: type.STRING,
        }
    })
}