import connection from "../repository/connection.js ";

async function insertSchoolSubject(name_school_subjetc, abbreviation, schoolModule) {
    const connec = await connection.connect();

    const sql = 'INSERT INTO schoolSubject_tbl (name_school_subjetc, abbreviation, schoolModule) VALUES (?, ?, ?)';

    const dtSchoolSubject = [name_school_subjetc, abbreviation, schoolModule];

    await connec.query(sql, dtSchoolSubject);

    connec.end();
}

export default {insertSchoolSubject}