const express = require('express'),
      bodyParser = require('body-parser'),
      jwt = require('jsonwebtoken'),
      config = require('./configs/config'),
      app = express(),
      port = 3003;

app.set('x-api-key', config.key);
// 2
app.use(bodyParser.urlencoded({ extended: true }));
// 3
app.use(bodyParser.json());

//middlewares
app.use(express.json());//Permite recibir datos json
app.use(express.urlencoded({extended: false}));//Puede recibir formularios pero solo datos


//app.listen(3004);//Define el port en donde escucha app. El server arranca con "npm run dev"
app.listen(port, (req, res) => {
  console.log(`Server on port ${port}`);
})

//AUTENTICACION
app.post('/autenticar', (req, res) => {
    
    if( req.body.user === "user" && req.body.pass === "123") {
  const payload = {
   check:  true
  };
  const token = jwt.sign(payload, app.get('x-api-key'), {
   expiresIn: 1440
  });
  res.json({
   mensaje: 'Autenticación correcta',
   token: token
  });
    } else {
        res.status(412).json(({ mensaje: "Usuario o contraseña incorrectos"}));
    }
})

const rutasProtegidas = express.Router(); 
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['x-api-key'];
    console.log(token)
    if (token) {
        console.log(app.get('x-api-key'))
      jwt.verify(token, app.get('x-api-key'), (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
 });

const { getCountryByCode,getAllCountries,getIndicators,postIndicators } = require('./controllers/index.controller');//Importo funciones

//Uso las funciones en las rutas solicitadas
app.get('/api/v1/countries/:code/info',rutasProtegidas,getCountryByCode);
app.get('/api/v1/countries/all',rutasProtegidas,getAllCountries);
app.get('/api/v1/indicators/:countrycode/:indicatorcode/:year',rutasProtegidas,getIndicators);
app.post('/api/v1/indicators/info',rutasProtegidas,postIndicators);
//console.log('Server on port 3002');//Entrega un mensaje por consola sobre el estado del servidor

//HOLAHOLA

