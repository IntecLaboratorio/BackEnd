import database from "../repository/connection.js";

async function selectEmail(email) {
  const conn = await database.connect();
  const sql = 'select email from users_tbl where email = ?';
  const dataSelectEmail = [email];
  const [rows] = await conn.query(sql, dataSelectEmail);
  conn.end();
  return rows;
}

export default { selectEmail };