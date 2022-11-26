import connection from "../repository/connection.js ";

async function insertReqMaintanance(type_assent, room, num_room, requerement_date, observation, num_assent) {
    
    const connec = await connection.connect();

    const sql = "INSERT INTO maintananceRequerement_tbl (type_assent, room, num_room, requerement_date, observation, num_assent) VALUES (?, ?, ?, ?, ?, ?)";

    const dtReqMaintanance = [type_assent, room, num_room, requerement_date, observation, num_assent];

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