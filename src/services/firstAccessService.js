import database from "../repository/connection.js";

async function selectFirstAccess(email) {
  const conn = await database.connect();
  const sql = 'select firstAccess from users_tbl where email = ?';
  const dataAccess = [email];
  const [rows] = await conn.query(sql, dataAccess);
  conn.end();
  return rows;
}

export default { selectFirstAccess };