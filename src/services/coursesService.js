import connection from "../repository/connection.js";

async function insertCourse(fk_instruction, fk_type_hub, name_course, course_time, initial_date, final_date) {

    const connec = await connection.connect();

    const sql = "INSERT INTO courses_tbl (fk_instruction, fk_type_hub, name_course, course_time, initial_date, final_date) VALUES (?, ?, ?, ?, ?, ?);"


    const dtCourse = [fk_instruction, fk_type_hub, name_course, course_time, initial_date, final_date];

    await connec.query(sql, dtCourse);

    connec.end();
}

export default {insertCourse}