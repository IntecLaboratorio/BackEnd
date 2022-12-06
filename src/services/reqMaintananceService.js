import connection from "../repository/connection.js ";

async function insertReqMaintanance(type_assent, room, num_room, requerement_date, observation, num_assent, user_req) {
    
    const connec = await connection.connect();

    const sql = "INSERT INTO maintananceRequerement_tbl (type_assent, room, num_room, requerement_date, observation, num_assent, user_req, user_fin, whatWasDone, fk_status_manutencao, data_abertura, data_fechamento) VALUES (?, ?, ?, ?, ?, ?, ?,  null, '', 1, NOW(), null)";

    const dtReqMaintanance = [type_assent, room, num_room, requerement_date, observation, num_assent, user_req];

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

async function viewReqMaintanance() {
    const conn = await connection.connect();

    const sql = 'SELECT * FROM maintananceRequerement_tbl'

    const [rows] = await conn.query(sql);

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