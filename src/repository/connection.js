import mysql from "mysql2/promise"

const connect = async () => { //conexão direta com banco
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "tcc"
    });

    return connection

}

export default { connect };