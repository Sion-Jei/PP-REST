const { Pool } = require('pg'); //Permite conectarse a postgres

//Hago conexion con la base de datos de postgres
const pool= new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'paralela2',
    port: '5432'
});

const getCountryByCode = async(req, res) => {//Busca el codigo en la tabla
    const response = await pool.query('SELECT * FROM Countries WHERE code= $1', [req.params.code]);
    res.status(200).json(response.rows);
}

const getAllCountries = async(req, res) => {//Entrega todo en la tabla
    const response = await pool.query('SELECT * FROM Countries');
    res.status(200).json(response.rows);
}

const getIndicators = async(req, res) => {
    const response = await pool.query('SELECT * FROM Indicators INNER JOIN Countries ON Indicators.countrycode = Countries.code WHERE countrycode= $1 AND indicatorcode= $2 AND year= $3', [req.params.countrycode,req.params.indicatorcode,req.params.year]);
    res.status(200).json(response.rows);
}

const postIndicators = async(req, res)=>{
    const { countryCode, indicatorCode, startYear, endYear }= req.body;
    const response = await pool.query('SELECT * FROM Indicators INNER JOIN Countries ON Indicators.countrycode = Countries.code WHERE countrycode= $1 AND indicatorcode= $2 AND year BETWEEN $3 AND $4', [countryCode,indicatorCode,startYear,endYear]);
    res.status(200).json(response.rows);
}

module.exports = {
    getCountryByCode,
    getAllCountries,
    getIndicators,
    postIndicators
}

//123123