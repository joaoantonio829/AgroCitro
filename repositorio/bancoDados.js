const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'agrocitro'
});

async function obterPlantio() {
    sql = 'select * from plantio';
    const [rows, fields] = await connection.execute(sql);

    return rows;
}

async function obterIrrigacao() {
    sqll = 'select * from irrigacao';
    const [rows, fields] = await connection.execute(sqll);

    return rows;
}

async function obterColheita() {
    sqlll = 'select * from colheita';
    const [rows, fields] = await connection.execute(sqlll);

    return rows;
}

async function incluirPlantio(Variedade, Data_Plantio, Quantidade_Plantada, Localizacao) {
    const sql = 'insert into plantio (Variedade, Data_Plantio, Quantidade_Plantada, Localizacao) values(?,?,?,?)';
    const [result] = await connection.execute(sql, [Variedade, Data_Plantio, Quantidade_Plantada, Localizacao]);

    return result;
}

async function incluirIrrigacao(Horario_Inicial, Horario_Final) {
    const sql = 'insert into irrigacao (Horario_Inicial, Horario_Final) values(?,?)';
    const [result] = await connection.execute(sql, [Horario_Inicial, Horario_Final]);

    return result;
}

async function incluirColheita(Data_Colheita, Quantidade_Colhida, Qualidade) {
    const sql = 'insert into colheita (Data_Colheita, Quantidade_Colhida, Qualidade) values(?,?,?)';
    const [result] = await connection.execute(sql, [Data_Colheita, Quantidade_Colhida, Qualidade]);

    return result;
}

async function obterTotalPlantas() {
    const sql = "SELECT SUM(Quantidade_Plantada) AS total_plantas, DATE_FORMAT(MAX(Data_Plantio), '%d/%m/%Y') AS data_plantio FROM plantio";
    const [rows] = await connection.execute(sql);
    return rows[0];
}

module.exports = {
    obterPlantio,
    incluirPlantio,
    obterTotalPlantas,
    obterIrrigacao,
    incluirIrrigacao,
    obterColheita,
    incluirColheita
}   