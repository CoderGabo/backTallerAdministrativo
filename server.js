const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');

const sequelize = require('./config/db');

const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();

//Habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// const corsOptions = {
//   origin: 'https://shimmering-profiterole-cad607.netlify.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
//   allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
// };

// app.use(cors(corsOptions));


app.use(cors());

//Rutas de la app
app.use('/',routes());

// Función autoejecutable para la conexión y arranque del servidor
(async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
  
      // Sincronizar modelos (opcional)
      await sequelize.sync();
  
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();