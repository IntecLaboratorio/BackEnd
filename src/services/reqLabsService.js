import connection from '../repository/connection.js';

async function insertReqLabs(discipline, bloco_aula, periodo, data_req) {
  const connec = await connection.connect();

  const sql = 'INSERT INTO reqlab_tbl(fk_discipline, bloco_aula, periodo, data_req, verify) VALUES (?, ?, ?, ?, 0);';

  // verify = false;

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

async function findReqLabs() {
  const conn = await connection.connect();
  const sql = 'SELECT * FROM reqlab_tbl';
  const [rows] = await conn.query(sql);
  conn.end();

  return rows;
}

export default { insertReqLabs, updateReqLabs, deleteReqLabs, findReqLabs }