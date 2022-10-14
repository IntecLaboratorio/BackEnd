import connection from '../repository/connection.js';

async function insertEmployee(fk_user, fk_typeUser, rm) {

    const connec = await connection.connect();

    const sql = "INSERT INTO employee_tbl (fk_user, fk_typeUser, rm) VALUES (?, ?, ?)";

    const dataEmployee = [fk_user, fk_typeUser, rm];

    await connec.query(sql, dataEmployee);

    connec.end();
   
}

async function updateEmployee(fk_user, fk_typeUser, rm, id) {

    const connec = await connection.connect();

    const sql = "UPDATE employee_tbl SET fk_user = ?, fk_typeUser = ?, rm = ? WHERE id = ?";

    const dataEmployee = [fk_user, fk_typeUser, rm, id];

    await connec.query(sql, dataEmployee);

    connec.end();
}

async function deleteEmployee(id) {
    const connec = await connection.connect();

    const sql = "DELETE FROM employee_tbl WHERE id = ?;";

    await connec.query(sql, id);
    
    connec.end();
    
    return;
}
export default {insertEmployee, updateEmployee, deleteEmployee}