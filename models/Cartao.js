const conn = require("../db/conn");
const {DataTypes} = require("sequelize");
const Usuario = require("./models/Usuario");
const Cartao = require("./models/Cartao")

const Cartao = conn.define("Cartao", {
    numero: {
        type: DataTypes.STRING(16),
        //"allowNull: false" fala que a informação não pode faltar
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    cvv:{
        type: DataTypes.STRING(3),
        allowNull: false
    },
},{
    //Define que o nome da tabela criada será "Cartoes". Isso é necessário pois caso o contrário a tabela será criada apenas adicionando um "s", 
    //ficando "Cartaos"
    tableName: "Cartoes",
});

//cada cartão pertence a um usuário
Cartao.belongsTo(Usuario);
//cada usuário pode ter vários cartões
Usuario.hasMany(Cartao);

module.exports = Cartao;