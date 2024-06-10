require("dotenv").config();
const conn = require("./db/conn");

const Usuario = require("./models/Usuario");
const express = require ("express");
const handlebars = require("express-handlebars");
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

app.get("/usuarios/:id/atualizar", (req, res) =>{
  const id = req.params.id;
  const usuario = Usuario.findByPk(id, {raw: true});
  res.render("formUsuario", {usuario})
}) 

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