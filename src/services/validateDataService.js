import connection from "../repository/connection.js";

async function searchDate(data_req, periodo, bloco_aula) {
  const conn = await connection.connect();
  const sql = 'select * from reqlab_tbl where data_req = ? AND periodo = ? AND bloco_aula = ?';
  const data = [data_req, periodo, bloco_aula];
  const [rows] = await conn.query(sql, data);
  conn.end();
  return rows;
}

export default { searchDate }