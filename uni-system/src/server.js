const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
//alterar em cada maquina 
const psw = 'Db_12345678';
const database = 'UniSystem'

const app = express();
const port = 4000;//pode ser necessario alterar

// Configuração do CORS
app.use(cors());
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: psw,
  database: database
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados.');
});

// Rota para buscar informações
app.get('/login/check/:user', (req, res) => {
  const user = req.params.user
  const sql = 'select * from users where user_name = ?';
  db.query(sql, [user], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao obter usuario e senha.');
    }
    console.log(`Busquei no banco de dados ${results}`)
    res.send(results);
  });
});


// Rota para inserir informações
app.post('/insert/user', (req, res) => {
  const {user_name, user_password} = req.body;
  const sql = 'INSERT INTO users (user_name, user_password) values (?, ?)';
  db.query(sql, [user_name, user_password], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao inserir dados.');
    }
    res.status(201).send('Item inserido com sucesso.');
  });
});

app.get('/get/professor/:userId', (req, res) => {
  const user_id = req.params.userId
  const sql = 'select * from professor where user_id = ?';
  db.query(sql, [user_id], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao obter professores');
    }
    console.log(`Busquei no banco de dados ${results}`)
    res.send(results);
  });
});

app.get('/get/estudante/:userId', (req, res) => {
  const user_id = req.params.userId
  const sql = 'select * from students where user_id = ?';
  db.query(sql, [user_id], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao obter estudantes');
    }
    console.log(`Busquei no banco de dados ${results}`)
    res.send(results);
  });
});

app.get('/get/disciplina/:userId', (req, res) => {
  const user_id = req.params.userId
  const sql = 'select * from courses where user_id = ?';
  db.query(sql, [user_id], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao obter disciplinas');
    }
    console.log(`Busquei no banco de dados ${results}`)
    res.send(results);
  });
});


app.get('/get/professorCourse/:userId/:professorId', (req, res) => {
  const user_id = req.params.userId
  const professor_id = req.params.professorId
  const sql = 'select professor_name from professor where user_id = ? and professor_id = ?';
  db.query(sql, [user_id, professor_id], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao obter disciplinas');
    }
    console.log(`Busquei no banco de dados ${results}`)
    res.send(results);
  });
});



// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
