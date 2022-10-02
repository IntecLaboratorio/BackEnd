import database from "../repository/connection.js";

async function selectLogin(email, password) {
  const conn = await database.connect();
  console.log(email, password);
  const sql = 'SELECT email, senha FROM users_tbl WHERE email = ? AND senha = ?;';
  const dataLogin = [email, password];

  const [rows] = await conn.query(sql, dataLogin);
  conn.end();
  return rows;
}

export default { selectLogin };