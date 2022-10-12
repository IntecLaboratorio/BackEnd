import database from "../repository/connection.js";

async function selectLogin(type_user, email, password) {
  const conn = await database.connect();
  console.log(email, password);
  const sql = 'SELECT fk_typeUser, email, senha FROM users_tbl WHERE fk_typeUser = ? AND email = ? AND senha = ?';
  const dataLogin = [type_user, email, password];

  const [rows] = await conn.query(sql, dataLogin);
  conn.end();
  return rows;
}

export default { selectLogin };