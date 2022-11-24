import database from "../repository/connection.js";

async function selectPassword(email, senhaAtual) {
  const conn = await database.connect();
  const sql = 'select senha from users_tbl where email = ? and senha = ?';
  const dataSelectPassword = [email, senhaAtual];
  const [rows] = await conn.query(sql, dataSelectPassword);
  conn.end();
  return rows;
}

async function updatePassword(senha, email) {
  const conn = await database.connect();
  const sql = 'UPDATE users_tbl SET senha = ? WHERE email = ?';
  const dataPassword = [senha, email];
  await conn.query(sql, dataPassword);
  conn.end();
  return;
}

export default { selectPassword, updatePassword };