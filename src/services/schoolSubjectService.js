import connection from "../repository/connection.js ";

async function insertSchoolSubject(name_school_subjetc, abbreviation, schoolModule) {
    const connec = await connection.connect();

    const sql = 'INSERT INTO schoolSubject_tbl (name_school_subjetc, abbreviation, schoolModule) VALUES (?, ?, ?)';

    const dtSchoolSubject = [name_school_subjetc, abbreviation, schoolModule];

    await connec.query(sql, dtSchoolSubject);

    connec.end();
}

async function deleteSchoolSubject(id) {
    const conn = await connection.connect();

    const sql = 'DELETE FROM schoolSubject_tbl WHERE id = ?'

    const dtSchoolSubject = [id];

    await conn.query(sql, dtSchoolSubject)

    conn.end()

    return
}

export default {insertSchoolSubject, deleteSchoolSubject}