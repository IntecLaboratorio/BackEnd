import database from "../repository/connection.js";

async function selectLogin(email, password) {
  const conn = await database.connect();
  const sql = 'select email, name_user, fk_typeUser from users_tbl where email = ? and senha = ?';
  const dataLogin = [email, password];

  const [rows] = await conn.query(sql, dataLogin);
  conn.end();
  return rows;
}

export default { selectLogin };