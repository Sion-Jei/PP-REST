const { restart } = require('nodemon');
const { Pool } = require('pg'); //Permite conectarse a postgres

//Hago conexion con la base de datos de postgres
const pool= new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'dbparalela',
    port: '5432'
});

const getCountryByCode = async(req, res) => {//Busca el codigo en la tabla
    if ([req.params.code] < 1) {
        res.status(400).json("Error en el parametro de entrada");
    }
    try {
        const response = await pool.query('SELECT * FROM Countries WHERE code= $1', [req.params.code]);
        res.status(200).json(response.rows);
    }catch(e){
        
        res.status(500).json(e);
    }
}

const getAllCountries = async(req, res) => {//Entrega todo en la tabla
    try {
        const response = await pool.query('SELECT * FROM Countries');
        res.status(200).json(response.rows);
    }catch(e){
        
        res.status(500).json(e);
    }
}

const getIndicators = async(req, res) => {
    if ([req.params.countrycode] < 1 || [req.params.indicatorcode] < 1 || [req.params.year] < 1) {
        res.status(400).json("Error en el parametro de entrada");
    }
    try {
        const response = await pool.query('SELECT * FROM Indicators INNER JOIN Countries ON Indicators.countrycode = Countries.code WHERE countrycode= $1 AND indicatorcode= $2 AND year= $3', [req.params.countrycode,req.params.indicatorcode,req.params.year]);
        res.status(200).json(response.rows);
    
    }catch(e){
        
        res.status(500).json(e);
    }
    
}

const postIndicators = async(req, res)=>{
    const { countryCode, indicatorCode, startYear, endYear }= req.body;
    if ([countryCode] < 1 || [indicatorCode] < 1 || [startYear] < 1 || [endYear] < 1) {
        res.status(400).json("Error en el parametro de entrada");
    }
    try {
        
        const response = await pool.query('SELECT * FROM Indicators INNER JOIN Countries ON Indicators.countrycode = Countries.code WHERE countrycode= $1 AND indicatorcode= $2 AND year BETWEEN $3 AND $4', [countryCode,indicatorCode,startYear,endYear]);
        res.status(200).json(response.rows);
    
    }catch(e){
        
        res.status(500).json(e);
    }

}

module.exports = {
    getCountryByCode,
    getAllCountries,
    getIndicators,
    postIndicators
}

