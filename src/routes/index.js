const { Router } = require('express');//Importo un funcion de express
const router = Router();//Permite definir rutas
const { getCountryByCode,getAllCountries,getIndicators,postIndicators } = require('../controllers/index.controller');//Importo funciones

//Uso las funciones en las rutas solicitadas
router.get('/api/v1/countries/:code/info',getCountryByCode);
router.get('/api/v1/countries/all',getAllCountries);
router.get('/api/v1/indicators/:countrycode/:indicatorcode/:year',getIndicators);
router.post('/api/v1/indicators/info',postIndicators);

module.exports = router;//Exporto router