const {Client} = require ('pg');

async function getConnection() {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user:'postgres',
        password:'castro1989',
        database:'mi_tienda'
    });
    await client.connect();
    return client;
};

module.exports = getConnection;