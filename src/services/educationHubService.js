import connection from "../repository/connection.js";

async function insertEducationHub(type_hub) {
    
    const connec = await connection.connect();

    const sql = "INSERT INTO educationHub_tbl (type_hub) VALUES (?)";

    const dtReqMaintanance = [(type_hub)];

    await connec.query(sql, dtReqMaintanance);

    connec.end();
}

export default {insertEducationHub}