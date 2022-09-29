import connection from '../repository/connection.js'

const insertFixedAssent =
    async (assent_number,
        serial_number,
        assent_name,
        brand,
        model,
        product_batch,
        tax_invoice,
        fk_labs,
        complement,
        value_assent,
        verify,
        color) => {
        const conn = await connection.connect(); //conexão entre banco e api

        const sql = 'INSERT INTO fixedAssent_tbl(assent_number, serial_number, assent_name, brand, model, product_batch, tax_invoice, fk_labs, complement, value_assent, verify, color) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);'; //atributos do banco que serão postos através da controller

        const dataFixedAssent = [assent_number, serial_number, assent_name, brand, model, product_batch, tax_invoice, fk_labs, complement, value_assent, verify, color];

        await conn.query(sql, dataFixedAssent); //.query vai executar os comando dentro banco

        conn.end();

    }

async function updateFixedAssent(assent_number, serial_number, assent_name, brand, model,
    product_batch, tax_invoice, fk_labs, complement, value_assent, verify, color, id) {

    const conn = await connection.connect();
    
    const sql = 'UPDATE fixedAssent_tbl SET assent_number = ?, serial_number = ?, assent_name = ?, brand = ?, model = ?, product_batch = ?, tax_invoice = ?, fk_labs = ?, complement = ?, value_assent = ?, verify = ?, color = ? WHERE id = ?';
    
    const dataFixedAssent = [assent_number, serial_number, assent_name, brand, model, product_batch, tax_invoice, fk_labs, complement, value_assent, verify, color, id];
    await conn.query(sql, dataFixedAssent);
    conn.end();

    return;
}

async function deleteFixedAssent(id) {
    const conn = await connection.connect();
    const sql = `DELETE FROM fixedAssent_tbl WHERE id = ?`;
    await conn.query(sql, id);
    conn.end();
}

export default { insertFixedAssent, updateFixedAssent, deleteFixedAssent }