import database from "../repository/connection.js";

async function selectPassword(email, senha) {
  const conn = await database.connect();
  const sql = 'select senha from users_tbl where email = ? and senha = ?';
  const dataAccess = [email, senha];
  const [rows] = await conn.query(sql, dataAccess);
  conn.end();
  return rows;
}

export default { selectPassword };