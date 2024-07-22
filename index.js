const express = require('express');
const faker = require('faker');
const mysql = require('mysql2');
const app = express()
const port = 3000
const config = {
	host: 'mysql',
	user: 'root',
	password: 'root',
	database: 'nodedb'
}

const connection = mysql.createConnection(config);

const createTable = `CREATE TABLE IF NOT EXISTS people (id int not null auto_increment, name varchar(255), primary key(id))`;
connection.query(createTable, (err) => {
  if (err) throw err;
  console.log('Tabela criada ou já existente');
});

const insertRandomName = () => {
  const randomName = faker.name.firstName();
  const sql = `INSERT INTO people(name) VALUES(?)`;
  connection.query(sql, [randomName], (err) => {
    if (err) throw err;
    console.log(`Nome ${randomName} inserido com sucesso`);
  });
};

insertRandomName();

app.get('/', (req, res) => {
  const sql = `SELECT name FROM people`;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    const namesList = results.map(row => `<li>${row.name}</li>`).join('');
    res.send(`<h1>Full Cycle Rocks!</h1><ul>${namesList}</ul>`);
  });
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})