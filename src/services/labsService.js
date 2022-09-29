import connection from "../repository/connection.js";

async function insertLabs(fk_instruction, name_lab, room_index, floor_lab) {

    const connec = await connection.connect();

    const sql = 'INSERT INTO labs_tbl (fk_instruction, name_lab, room_index, floor_lab ) VALUES (?, ?, ?, ?);'; //conexão entre banco e api

    const dtLabs = [fk_instruction, name_lab, room_index, floor_lab]

    await connec.query(sql, dtLabs); //.query vai executar os comando dentro banco

    connec.end();
}


async function findLabs() {
    const conn = await conexao.connect();
    const sql = 'SELECT * FROM labs_tbl';
    const [rows] = await conn.query(sql);
    conn.end();

    return rows;
}

async function updateLabs(fk_instruction, name_lab, room_index, floor_lab, id) {
    const connec = await connection.connect();

    const sql = 'UPDATE labs_tbl SET fk_instruction = ?, name_lab = ?, room_index = ?, floor_lab = ? WHERE id = ?'

    const dtLabs = [fk_instruction, name_lab, room_index, floor_lab, id];

    await connec.query(sql, dtLabs);

    connec.end();
}

async function deleteLabs(id) {
    const connec = await connection.connect();

    const sql = 'DELETE FROM labs_tbl WHERE id = ?'
    await connec.query(sql, id);
    connec.end();
    return;
}

// async function FindSpecificLab(id) {
//     const connec = await database.connec();
    
//     const sql = "SELECT * FROM labs_tbl WHERE id = ?";
//     const [rows] = await connec.query(sql, id);
//     connec.end();
//     return rows
// }

export default { insertLabs, findLabs, updateLabs, deleteLabs }