import connection from "../repository/connection.js";

async function insertCourse(fk_instruction, fk_type_hub, name_course, course_time, initial_date, final_date) {

    const connec = await connection.connect();

    const sql = "INSERT INTO courses_tbl (fk_instruction, fk_type_hub, name_course, course_time, initial_date, final_date) VALUES (?, ?, ?, ?, ?, ?);"


    const dtCourse = [fk_instruction, fk_type_hub, name_course, course_time, initial_date, final_date];

    await connec.query(sql, dtCourse);

    connec.end();
}

async function updateCourse(fk_instruction, fk_type_hub, name_course, course_time, initial_date, final_date, id) {

    const connec = await connection.connect();

    const sql = "UPDATE courses_tbl SET fk_instruction = ?, fk_type_hub = ?, name_course = ?, course_time = ?, initial_date = ?, final_date = ? WHERE id = ?;"


    const dtCourse = [fk_instruction, fk_type_hub, name_course, course_time, initial_date, final_date, id];

    await connec.query(sql, dtCourse);

    connec.end();
}

async function deleteCourse(id) {
    
    const connec = await connection.connect();

    const sql = 'DELETE FROM courses_tbl WHERE id = ?'
    
    await connec.query(sql, id);
    
    connec.end();
    
    return;
}

export default {insertCourse, updateCourse, deleteCourse}