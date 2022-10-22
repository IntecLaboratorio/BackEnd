import connection from "../repository/connection.js";

async function insertEducationHub(type_hub) {
    
    const connec = await connection.connect();

    const sql = "INSERT INTO educationHub_tbl (type_hub) VALUES (?)";

    const dtEducationHub = [(type_hub)];

    await connec.query(sql, dtEducationHub);

    connec.end();
}

async function updateEducationHub(type_hub, id) {
    const connec = await connection.connect();

    const sql = 'UPDATE educationHub_tbl SET type_hub = ? WHERE id = ?'

    const dtEducationHub = [type_hub, id];

    await connec.query(sql, dtEducationHub);

    connec.end();
}

async function deleteEducationHub(id) {
    const connec = await connection.connect();

    const sql = 'DELETE FROM educationHub_tbl WHERE id = ?'
    
    await connec.query(sql, id);
    
    connec.end();
    
    return;
}


export default {insertEducationHub, updateEducationHub, deleteEducationHub}