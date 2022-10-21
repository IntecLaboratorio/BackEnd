import connection from "../repository/connection.js ";

const insertInstruction = async (
    fk_address, corporate_name, cnpj, phone, email, responsable) => {
    const connec = await connection.connect();

    //conexão entre banco e api

    const dtInstruction = [fk_address, corporate_name, cnpj, phone, email, responsable];

    await connec.query(sql, dtInstruction); //.query vai executar os comando dentro banco

    connec.end();

}

const updateInstruction = async (
    fk_address, corporate_name, cnpj, phone, email, responsable, id) => {
    const connec = await connection.connect();

    const sql = 'UPDATE instruction_tbl SET fk_address = ?, corporate_name = ?, cnpj = ?, phone = ?, email = ?, responsable = ? WHERE id = ?'

    const dtLabs = [fk_address, corporate_name, cnpj, phone, email, responsable, id];

    await connec.query(sql, dtLabs);

    connec.end();
}

async function deleteInstruction(id) {
    const connec = await connection.connect();

    const sql = 'DELETE FROM instruction_tbl WHERE id = ?'

    await connec.query(sql, id)
    
    connec.end();
    
    return;
}

export default { insertInstruction, updateInstruction, deleteInstruction }