const express = require('express'),
      bodyParser = require('body-parser'),
      jwt = require('jsonwebtoken'),
      config = require('./configs/config'),
      app = express();

app.set('x-api-key', config.key);
// 2
app.use(bodyParser.urlencoded({ extended: true }));
// 3
app.use(bodyParser.json());

//middlewares
app.use(express.json());//Permite recibir datos json
app.use(express.urlencoded({extended: false}));//Puede recibir formularios pero solo datos

//routes
app.use(require('./routes/index'));//App requiere el contenido en index de routes

app.listen(3002);//Define el port en donde escucha app. El server arranca con "npm run dev"

app.post('/autenticar', (req, res) => {
    
    if( req.body.api === "app1") {
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
        res.json({ mensaje: "Usuario o contraseña incorrectos"})
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

console.log('Server on port 3001');//Entrega un mensaje por consola sobre el estado del servidor

//HOLAHOLA
