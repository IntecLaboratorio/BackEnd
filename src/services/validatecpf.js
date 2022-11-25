import database from "../repository/connection.js";

async function selectCpf(cpf) {
  const conn = await database.connect();
  const sql = 'select cpf from users_tbl where cpf = ?';
  const dataSelectCpf = [cpf];
  const [rows] = await conn.query(sql, dataSelectCpf);
  conn.end();
  return rows;
}

export default { selectCpf };