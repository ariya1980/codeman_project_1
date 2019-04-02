module.exports = function(sequelize,type){
    return sequelize.define('users',{
        username : {
            type: type.STRING,
            unique: true
        },
        password: {
            type: type.STRING
        }
    })
}