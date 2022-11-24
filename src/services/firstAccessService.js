import database from "../repository/connection.js";

async function selectFirstAccess(email) {
  const conn = await database.connect();
  const sql = 'select firstAccess from users_tbl where email = ?';
  const dataAccess = [email];
  const [rows] = await conn.query(sql, dataAccess);
  conn.end();
  return rows;
}

async function updateFirstAccess(email) {
  const conn = await database.connect();
  const sql = 'UPDATE users_tbl SET firstAccess = 0 WHERE email = ?';
  const dataAccess = [email];
  await conn.query(sql, dataAccess);
  conn.end();
  return;
}

export default { selectFirstAccess, updateFirstAccess };