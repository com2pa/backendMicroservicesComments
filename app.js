require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const { MONGO_URL } = require('./config');

const commentRouter = require('./controllers/comments');


// const morgan=require('morgan')
// conexion base de datos
(async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Conectado a MongoDB :)');
  } catch (error) {
    console.log(error);
  }
})();


const allowedOrigins = [
  'https://blog-microservices.onrender.com', // Frontend
  'https://micro-post.onrender.com', // Otros microservicios
  'https://micro-user-bju8.onrender.com',
  'https://micro-comment.onrender.com',  
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
};
// app.use(cors({
//       origin: '*', // Permite todas las solicitudes (¡no seguro para producción!)
//       methods: 'GET,POST,PUT,DELETE',
//       credentials: true,
//     })  
// );
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())
// app.use(morgan('tiny'))

// rutas backEnd

app.use('/api/comment',commentRouter)


module.exports = app;