const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
//alterar em cada maquina 
const psw = 'Db_12345678';
const database = 'university'

const app = express();
const port = 4000;

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
app.get('/api/items', (req, res) => {
    const sql = 'select * from student limit 1';
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).send('Erro ao obter dados.');
      }
      res.json(results);
    });
  });



// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});