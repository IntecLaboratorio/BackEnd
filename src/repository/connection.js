import mysql from "mysql2/promise"

const connect = async () => { //conexão direta com banco
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "gsR_Silva",
        password: "gsr_SilvaR*07**",
        database: "tcc"
    });

    return connection

}

export default { connect };