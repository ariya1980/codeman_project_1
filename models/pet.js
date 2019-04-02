module.exports = function(sequelize,type){
    return sequelize.define('pet',{
        name : {
            type: type.STRING,
            unique: true
        },
        fullness: {
            type: type.INTEGER,
            defaultValue: 1
        }
    })
}