import connection from '../repository/connection.js';

async function findStatusLab() {
    const conn = await connection.connect();
    const sql = 'SELECT * FROM status_reqlab_tbl';
    const [rows] = await conn.query(sql);
    conn.end();

    return rows;
}

export default { findStatusLab }