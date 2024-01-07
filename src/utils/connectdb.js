import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  // password: "Janglidalam29J",
  database: "gmedia_democase",
});

connection.connect(function (err) {
  if (err) {
    console.log("Failed connection to database", new Error(err));
    process.exit();
  }
  console.log("Connected to database");
});

export default connection;
