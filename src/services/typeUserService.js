import connection from '../repository/connection.js';

async function insertTypeUser(type_name) {
    const connec = await connection.connect();

    const sql = "INSERT INTO typeUser_tbl (type_name) VALUES (?)";

    const dataTypeUser = [type_name]

    await connec.query(sql, dataTypeUser);

    connec.end();
}

async function updateTypeUser(type_name, id) {
    const connec = await connection.connect();

    const sql = "UPDATE typeUser_tbl SET type_name = ? WHERE id = ?";

    const dataTypeUser = [type_name, id];

    await connec.query(sql, dataTypeUser)

    connec.end();
}

async function deleteTypeUser(id) {
    const connec = await connection.connect();

    const sql = "DELETE FROM typeUser_tbl WHERE id = ?";

    const dataTypeUser = [id];

    await connec.query(sql, dataTypeUser);

    connec.end();
}

export default {insertTypeUser, updateTypeUser, deleteTypeUser}