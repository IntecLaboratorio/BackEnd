import connection from '../repository/connection.js';

async function insertReqLabs(discipline, bloco_aula, periodo, data_req) {
  const connec = await connection.connect();

  const sql = 'INSERT INTO reqlab_tbl(fk_discipline, bloco_aula, periodo, data_req, verify) VALUES (?, ?, ?, ?, 0);';

  const dataReqLabs = [discipline, bloco_aula, periodo, data_req]

  await connec.query(sql, dataReqLabs);

connec.end();

}

async function updateReqLabs(discipline, bloco_aula, periodo, data_req, id) {
  const connec = await connection.connect();

  const sql = "UPDATE reqlab_tbl SET fk_discipline = ?, bloco_aula = ?, periodo = ?, data_req = ?, verify = 0 WHERE id= ?;"

  const dataReqLabs = [discipline, bloco_aula, periodo, data_req, id];

  await connec.query(sql, dataReqLabs);

  connec.end();
}

async function deleteReqLabs(id) {
  const connec = await connection.connect();

  const sql = "DELETE FROM reqlab_tbl WHERE id = ?;";
  await connec.query(sql, id);
  connec.end();
  return;
}

async function findReqLabs(id) {
  const conn = await connection.connect();
  const sql = id == 0 ? 'SELECT * FROM reqlab_tbl' : 'SELECT * FROM reqlab_tbl WHERE fk_status_manutencao = ?';
  const [rows] = await conn.query(sql, id);
  conn.end();

  return rows;
}

export default { insertReqLabs, updateReqLabs, deleteReqLabs, findReqLabs }