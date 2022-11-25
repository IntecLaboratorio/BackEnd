import database from "../repository/connection.js";

async function selectRg(rg) {
  const conn = await database.connect();
  const sql = 'select rg from users_tbl where rg = ?';
  const dataSelectRg = [rg];
  const [rows] = await conn.query(sql, dataSelectRg);
  conn.end();
  return rows;
}

export default { selectRg };