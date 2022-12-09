import connection from '../repository/connection.js';

async function insertReqLabs(fk_discipline, lab, bloco_aula, periodo, data_req, user_req) {
  const connec = await connection.connect();

  const sql = 'INSERT INTO reqlab_tbl(fk_discipline, lab, bloco_aula, periodo, data_req, fk_status_reqLab, user_req, user_fin, data_abertura, data_fechamento) VALUES (?, ?, ?, ?, ?, 1, ?, null, NOW(), NULL);';

  const dataReqLabs = [fk_discipline, lab, bloco_aula, periodo, data_req, user_req]

  await connec.query(sql, dataReqLabs);

connec.end();

}

async function updateReqLabs(status_reqLab, user_fin, id) {
  const connec = await connection.connect();

  const sql = "UPDATE reqlab_tbl SET fk_status_reqLab = ?, user_fin = ?, data_fechamento = NOW() WHERE id= ?;"

  const dataView = [status_reqLab, user_fin, id];

  await connec.query(sql, dataView);

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

  const sql =  id == 0 ? 'SELECT * FROM reqlab_tbl' : 'SELECT * FROM reqlab_tbl WHERE fk_status_reqLab = ?';

  const [rows] = await conn.query(sql, id);

  conn.end();

  return rows;
}


export default { insertReqLabs, updateReqLabs, deleteReqLabs, findReqLabs }