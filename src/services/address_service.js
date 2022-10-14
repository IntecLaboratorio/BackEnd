import connection from '../repository/connection.js';

async function insertAddress(type_address, address, number_address, complement, neighborhood, city, state, zip_code, userCpf) {
    const connec = await connection.connect();

    const sql = 'INSERT INTO address_tbl(type_address, address, number_address, complement, neighborhood, city, state, zip_code, fk_userCpf) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);'; //conexão entre banco e api

    const dataAddress = [type_address, address, number_address, complement, neighborhood, city, state, zip_code, userCpf]

    await connec.query(sql, dataAddress); //.query vai executar os comando dentro banco

    connec.end();

}

async function updateAddress(type_address, address, number_address, complement, neighborhood, city, state, zip_code, userCpf, id) {
    const connec = await connection.connect();

    const sql = "UPDATE address_tbl SET type_address = ?, address = ?, number_address = ?, complement = ?, neighborhood = ?, city = ?, state = ?, zip_code = ?, fk_userCpf WHERE id= ?;"

    const dataAddress = [type_address, address, number_address, complement, neighborhood, city, state, zip_code, userCpf, id];

    await connec.query(sql, dataAddress);

    connec.end();
}

async function deleteAddress(id) {
    const connec = await connection.connect();

    const sql = "DELETE FROM address_tbl WHERE id = ?;";
    await connec.query(sql, id);
    connec.end();
    return;
}

export default { insertAddress, updateAddress, deleteAddress }