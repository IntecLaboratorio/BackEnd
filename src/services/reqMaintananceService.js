import connection from "../repository/connection.js ";

async function insertReqMaintanance(type_assent, room, num_room, observation, num_assent, user_req) {
    
    const connec = await connection.connect();

    const sql = "INSERT INTO maintananceRequerement_tbl (type_assent, room, num_room, requerement_date, observation, num_assent, user_req, user_fin, whatWasDone, fk_status_manutencao, data_abertura, data_fechamento) VALUES (?, ?, ?, CURDATE(), ?, ?, ?,  null, '', 1, NOW(), null)";

    const dtReqMaintanance = [type_assent, room, num_room, observation, num_assent, user_req];

    console.log('Teste Back' + dtReqMaintanance)

    await connec.query(sql, dtReqMaintanance);

    connec.end();
}

async function updateReqMaintanance(user_fin, whatWasDone, status_manutencao, id) {
    const conn = await connection.connect();
    const sql = 'UPDATE maintananceRequerement_tbl SET user_fin = ?, whatWasDone = ?, fk_status_manutencao = ?, data_fechamento = NOW() WHERE id = ?';
    const dataAccess = [user_fin, whatWasDone, status_manutencao, id];
    await conn.query(sql, dataAccess);
    conn.end();
    return;
  }

async function viewReqMaintanance(id) {
    const conn = await connection.connect();

    const sql =  id == 0 ? 'SELECT * FROM maintananceRequerement_tbl' : 'SELECT * FROM maintananceRequerement_tbl WHERE fk_status_manutencao = ?';

    const [rows] = await conn.query(sql, id);

    conn.end();

    return rows;
}

async function deleteMaintanace(id) {
    const connec = await connection.connect();
  
    const sql = "DELETE FROM maintananceRequerement_tbl WHERE id = ?;";
    await connec.query(sql, id);
    connec.end();
    return;
  }

export default {insertReqMaintanance, viewReqMaintanance, updateReqMaintanance, deleteMaintanace}