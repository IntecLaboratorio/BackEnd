import database from "../repository/connection.js";

async function procurarAceite() {
  const conn = await database.connect();
  const sql = 'select * from reqlab_tbl';
  const [rows] = await conn.query(sql);
  conn.end();

  return rows;
}

async function updateAceite(id) {
  const conn = await database.connect();
  const sql = 'UPDATE reqlab_tbl SET fk_status_reqlab = 1 WHERE id = ?';
  const dataAccess = [id];
  await conn.query(sql, dataAccess);
  conn.end();
  return;
}

export default { procurarAceite, updateAceite };