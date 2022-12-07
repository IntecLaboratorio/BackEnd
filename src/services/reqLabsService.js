import connection from '../repository/connection.js';

async function insertReqLabs(fk_discipline, bloco_aula, periodo, data_req, fk_status_reqLab, user_req) {
  const connec = await connection.connect();

  const sql = 'INSERT INTO reqlab_tbl(fk_discipline, bloco_aula, periodo, data_req, fk_status_reqLab, user_req, user_fin, data_abertura, data_fechamento) VALUES (?, ?, ?, ?, ?, null, now(), null);';

  const dataReqLabs = [fk_discipline, bloco_aula, periodo, data_req, fk_status_reqLab, user_req]

  await connec.query(sql, dataReqLabs);

connec.end();

}

async function updateReqLabs(fk_discipline, bloco_aula, periodo, data_req, fk_status_reqLab, user_req, id) {
  const connec = await connection.connect();

  const sql = "UPDATE reqlab_tbl SET user_fin = ?, fk_status_reqLab = ?, data_fechamento = NOW() WHERE id= ?;"

  const dataReqLabs = [fk_discipline, bloco_aula, periodo, data_req, fk_status_reqLab, user_req, id];

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

async function findReqLabs() {
  const conn = await connection.connect();
  const sql = 'SELECT * FROM reqlab_tbl';
  const [rows] = await conn.query(sql);
  conn.end();

  return rows;
}

export default { insertReqLabs, updateReqLabs, deleteReqLabs, findReqLabs }