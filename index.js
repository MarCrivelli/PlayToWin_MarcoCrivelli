require("dotenv").config();
const conn = require("./db/conn");

const Usuario = require("./models/Usuario");
const express = require ("express");
const handlebars = require("express-handlebars");
const Cartao = require("./models/cartao");
const Usuario = require("./models/Usuario");
const app = express();

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get("/usuarios/novo", (req, res) => {
  res.render('formUsuario');
});

app.get("/", (req, res) => {
  res.render('home');
});

app.get("/usuarios", async (req, res) => {
  const usuarios = await Usuario.findALL({raw: true})
  res.render(usuarios);
});

app.post("/usuarios/novo", async (req, res) => {
  const nickname = req.body.nickname;
  const nome = req.body.nome;

  const dadosUsuario = {
    nickname,
    nome,
  };
  const usuario = await Usuario.create(dadosUsuario);
  res.send("Usuário inserido sob o id " + usuario.id);
});

app.get("/jogos/novo", (req, res) => {
  res.sendFile('${__dirname}/views/formJogo.html');
});

app.post("/jogos/novo", async (req, res) => {
  const titulo = req.body.titulo;
  const descricao = req.body.descricao;
  const precoBase = req.body.precoBase;

  const dadosJogo = {
    titulo,
    descricao,
    precoBase,
  };
  const jogo = await Usuario.create(dadosJogo);
  res.send("Jogo inserido sob o id " + jogo.id);
});

app.get("/usuarios/:id/atualizar", async (req, res) =>{
  const id = req.params.id;
  const usuario = await Usuario.findByPk(id, {raw: true});
  res.render("formUsuario", {usuario})
}); 

app.post("/usuarios/:id/atualizar", async (req, res) =>{
  const id = req.params.id;
  const dadosUsuario = {
    nickname: req.body.nickname,
    nome: req.body.nome,
  }
  const registrosAfetados = await Usuario.update(dadosUsuario, {where: {id: id}});
  
  if(registrosAfetados > 0){
    res.redirect("/usuarios");
  }else{
    res.send("Erro ao atualizar usuário!")
  }
}); 

app.post("/usuarios/excluir", async (req, res) => {
  const id = req.body.id;

  const registrosAfetados = await Usuario.destroy({where: {id: id}});
  
  if(registrosAfetados > 0){
    res.redirect("/usuarios");
  }else{
    res.send("Erro ao excluir usuário!")
  }
})

//Rota Cartões
app.get("/usuarios/:id/cartoes", async(req, res)=> {
     const id = parseInt(req.params.id);
     let cartoes = usuario.Cartaos;
     cartoes = cartoes.map((cartao) => cartao.toJson)
     const usuario = await Usuario.findByPk(id, 
      {include:["Cartaos"] });
      usuario.Cartaos
     res.render("cartoes", {id});
});

app.get ("usuarios/:id/novoCartao", async (req, res) =>{
  const id = parseInt(req.params.id);
  res.render("formCartao", {
    usuario: usuario.toJson(),
    cartoes,
  });
});

app.post ("usuarios/:id/novoCartao", async (req, res) =>{
  const id = parseInt(req.params.id);
  const dadosCartao={
    numero: req.body.numero,
    nome: req.body.nome,
    cvv: req.body.cvv,
    UsuarioId: id,
  };
  await Cartao.create(dadosCartao);
  res.redirect(`/usuarios/${id}/cartoes`)
});



app.listen(8000, () => {
  console.log("Server rodando na porta 8000!");
});

conn 
 .sync()
  .then(() => {
    console.log("Banco de daos conectado e estrutura sincronizada!");
  })
  .catch((err) => {
    console.log("Erro ao conectar/sincronizar o banco de dados: " + err)
  });