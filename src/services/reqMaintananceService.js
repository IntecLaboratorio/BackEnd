import connection from "../repository/connection.js ";

async function insertReqMaintanance(requerement_date, observation, fk_employee) {
    
    const connec = await connection.connect();

    const sql = "INSERT INTO maintananceRequerement_tbl (requerement_date, observation, fk_employee) VALUES (?, ?, ?)";

    const dtReqMaintanance = [requerement_date, observation, fk_employee];

    await connec.query(sql, dtReqMaintanance);

    connec.end();
}

export default {insertReqMaintanance}