import connection from "../repository/connection.js";

async function findStatusManutencao() {
  const conn = await connection.connect();
  const sql = 'SELECT * FROM statusManutencao_tbl';
  const [rows] = await conn.query(sql);
  conn.end();

  return rows;
}


export default {  findStatusManutencao }