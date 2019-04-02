module.exports = function(sequelize,type){
    return sequelize.define('drink',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username : {
            type: type.STRING
        },
        drinkname : {
            type: type.STRING
        },
        imageUrl: {
            type: type.STRING
        },
        comment: {
            type: type.STRING
        },
        category: {
            type: type.STRING
        }
    })
}

