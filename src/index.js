const express = require('express');//Necesario para iniciar el servidor
const app = express();//Permite ejecutar express

//middlewares
app.use(express.json());//Permite recibir datos json
app.use(express.urlencoded({extended: false}));//Puede recibir formularios pero solo datos

//routes
app.use(require('./routes/index'));//App requiere el contenido en index de routes

app.listen(3000);//Define el port en donde escucha app. El server arranca con "npm run dev"
console.log('Server on port 3000');//Entrega un mensaje por consola sobre el estado del servidor

//HOLAHOLA
