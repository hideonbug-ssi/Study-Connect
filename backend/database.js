const sql = require('mysql2');

const connection = sql.createConnection({
    host: "server2.bsthun.com",
    port: "6105",
    user: "lab_1crbvd",
    password: "W7qNs6r3poAH4kQy",
    database: "lab_blank01_1c3ghqi",
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
  }
});

module.exports = connection;