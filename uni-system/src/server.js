const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
//alterar em cada maquina 
const psw = 'Chucrute2280';
const database = 'unisystem'

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



// Rota para inserir informações
app.post('/insert/user', (req, res) => {
  const {user_name, user_password} = req.body;
  const sql = 'INSERT INTO users (user_name, user_password) SELECT ?, ? WHERE NOT EXISTS (SELECT 1 FROM users WHERE user_name = ?)';
  db.query(sql, [user_name, user_password, user_name], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao inserir dados.');
    }
    if (result.affectedRows === 0) {
      return res.status(409).send('Usuário já existe.');
    }
    res.status(201).send('Item inserido com sucesso.');
  });
});

app.post('/insert/professor/', (req, res) => {
  const {user_id, professor_name, professor_email, dept_name} = req.body;
  const sql = 'INSERT INTO professor (user_id, professor_name, professor_email, dept_name, deleted) values (?, ?, ?, ?, ?)';
  db.query(sql, [user_id, professor_name, professor_email, dept_name, 0], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao inserir dados.');
    }
    res.status(201).send('Item inserido com sucesso.');
  });
});

app.post('/insert/estudante/', (req, res) => {
  const {user_id, student_name, student_email} = req.body;
  const sql = 'INSERT INTO students (user_id, student_name, student_email) values (?, ?, ?)';
  db.query(sql, [user_id, student_name, student_email], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao inserir dados.');
    }
    res.status(201).send('Item inserido com sucesso.');
  });
});

app.post('/insert/disciplina/', (req, res) => {
  const {user_id, course_name, professor_id, class_room, class_time, class_weekday} = req.body;
  const sql = 'INSERT INTO courses (user_id, course_name, professor_id, class_room, class_time, class_weekday) values (?, ?, ?, ?, ?, ?)'
  db.query(sql, [user_id, course_name, professor_id, class_room, class_time, class_weekday], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao inserir dados.');
    }
    res.status(201).send('Item inserido com sucesso.');
  });
})

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

app.get('/get/professores/:user', (req, res) => {
  const user_id = req.params.user;
  const sql = 'select * from professor where user_id = ?';
  db.query(sql, [user_id], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao obter professores');
    }
    console.log(`Busquei no banco de dados ${results}`)
    res.send(results);
  });
});

app.get('/get/estudantes/:userId', (req, res) => {
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

app.get('/get/estudante/:userId/:studentId', (req, res) => {
  const user_id = req.params.userId
  const student_id = req.params.studentId
  const sql = 'select student_name from students where user_id = ? and student_id = ?';
  db.query(sql, [user_id, student_id], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao obter estudante');
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

app.get('/get/takesByStudent/:studentId', (req, res) => {
  const student_id = req.params.studentId
  const sql = 'select take_id from takes where student_id = ?';
  db.query(sql, [student_id], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao obter cursos');
    }
    console.log(`Busquei no banco de dados ${results}`)
    res.send(results);
  });
})

app.get('/get/tests/:takeId', (req, res) => {
  let take_id_str = req.params.takeId
  const take_id = take_id_str.split(',').map(id => parseInt(id, 10));
  const placeholders = take_id.map(() => '?').join(',')
  const sql = `select tst.take_id, test_id, course_name, grade, test_name from tests tst join takes tks join courses crs where tst.take_id in (${placeholders}) and tst.take_id = tks.take_id and crs.course_id = tks.course_id`;
  db.query(sql, take_id, (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao obter provas');
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

//Rotas para fazer update
app.put('/update/estudante/:userId', (req, res) => {
  const user_id = req.params.userId;
  const { student_id, student_name } = req.body;
  const sql = 'UPDATE students SET student_name = ? WHERE user_id = ? and student_id = ?';

  db.query(sql, [student_name, user_id, student_id], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao atualizar o aluno');
    }
    res.send('Aluno atualizado com sucesso');
  });
});

//Rotas para deletar
app.delete('/delete/professor/:id', (req, res) => {
  const professorId = req.params.id
  console.log(professorId)
  const sql = `
              DELETE FROM professor 
              WHERE professor_id = ? 
              AND NOT EXISTS (
              SELECT 1 
              FROM courses 
              WHERE courses.professor_id = ?
            )
          `;
  db.query(sql, [professorId, professorId], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao deletar professor');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send(`Professor com ID ${professorId} não pode ser deletado ou não existe.`);
    }
    res.send(`Professor com ID ${professorId} deletado com sucesso.`);
  });
});



// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
