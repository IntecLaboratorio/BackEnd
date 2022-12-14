import database from "../repository/connection.js";

async function insertUser(id_corporate, type_user, name_user, email, password, verify) {
  const conn = await database.connect();

  const sql = 'INSERT INTO users_tbl(fk_id_corporate, fk_typeUser, name_user, email, senha, verify, firstAccess) VALUES(?,?,?,?,?,?, 1);';
  const dataUser = [id_corporate, type_user, name_user, email, password, verify];
  console.log(dataUser);

  await conn.query(sql, dataUser);

  conn.end();
}

async function findUser() {
  const conn = await database.connect();
  const sql = 'SELECT * FROM users_tbl';
  const [rows] = await conn.query(sql);
  conn.end();

  return rows;
}
async function upadateUser(id_corporate, type_user, name_user, email, password, verify, id) {
  const conn = await database.connect();

  const sql = 'UPDATE users_tbl SET fk_id_corporate = ?, fk_address = ?, fk_typeUser = ?, name_user = ?, email = ?, senha = ?, verify = ? WHERE id = ?';

  const dataUser = [id_corporate, type_user, name_user, email, password, verify, id];
  await conn.query(sql, dataUser);
  conn.end();
  return;
}

async function deleteUser(id) {
  const conn = await database.connect();
  const sql = 'DELETE FROM users_tbl WHERE id = ?';
  await conn.query(sql, id);
  conn.end();
  return;
}

export default { insertUser, findUser, upadateUser, deleteUser };