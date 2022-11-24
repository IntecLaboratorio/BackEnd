import connection from "../repository/connection.js ";

async function insertReqMaintanance(type_assent, fk_lab, num_sala, requerement_date, observation) {
    
    const connec = await connection.connect();

    const sql = "INSERT INTO maintananceRequerement_tbl (type_assent,fk_lab, num_sala, requerement_date, observation) VALUES (?, ?, ?, ?, ?)";

    const dtReqMaintanance = [type_assent, fk_lab, num_sala, requerement_date, observation];

    await connec.query(sql, dtReqMaintanance);

    connec.end();
}

async function viewReqMaintanance() {
    const conn = await connection.connect();

    const sql = 'SELECT * FROM  maintananceRequerement_tbl'

    const [rows] = await conn.query(sql);

    conn.end();

    return rows;
}

export default {insertReqMaintanance, viewReqMaintanance}