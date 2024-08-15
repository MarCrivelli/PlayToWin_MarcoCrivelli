const conn = require("../db/conn");
const {DataTypes} = require("sequelize");
const Usuario = require("./Usuario");

const Conquista = conn.define("Conquista", {
    titulo: {
        type: DataTypes.STRING(16),
        //"allowNull: false" fala que a informação não pode faltar
        allowNull: false
    },
    jogo: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    descricao:{
        type: DataTypes.STRING(3),
        allowNull: false
    },
},{
    /*  Define que o nome da tabela criada será "Cartoes". Isso é necessário pois caso o contrário a tabela será criada apenas adicionando um "s", 
       ficando "Conquistas" 
    */
    tableName: "Conquistas",
});

//cada usuário pode ter várias conquistas
Usuario.hasMany(Conquista);

module.exports = Conquista;