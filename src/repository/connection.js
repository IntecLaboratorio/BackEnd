import mysql from "mysql2/promise"

const connect = async () => { //conexão direta com banco
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "gsR_Silva",
        password: "gsr_SilvaR*07**",
        database: "tcc"

        // MYSQL_ADDON_HOST: "b7v2h4kzpt3iw2vjllwf-mysql.services.clever-cloud.com",
        // MYSQL_ADDON_DB: "b7v2h4kzpt3iw2vjllwf",
        // MYSQL_ADDON_USER: "uxoik2dvwac185jw",
        // MYSQL_ADDON_PORT: "3306",
        // MYSQL_ADDON_PASSWORD: "wA0IfslY2P2Lz2rehMHk",
        // MYSQL_ADDON_URI: "mysql://uxoik2dvwac185jw:wA0IfslY2P2Lz2rehMHk@b7v2h4kzpt3iw2vjllwf-mysql.services.clever-cloud.com:3306/b7v2h4kzpt3iw2vjllwf"
    });

    return connection

}

export default {
    connect
};