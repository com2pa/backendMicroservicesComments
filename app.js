require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const { MONGO_URL } = require('./config');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const logoutRouter = require('./controllers/logout');
const refresRouter = require('./controllers/refres');
const { usertExtractor } = require('./middleware/auth');
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
app.use(cors())
app.use(express.json());
app.use(cookieParser())
// app.use(morgan('tiny'))

// rutas backEnd
app.use('/api/users', usersRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/login', loginRouter);
app.use('/api/refres', usertExtractor, refresRouter)
app.use('/api/comment/',commentRouter)


app.use(express.static(path.resolve(__dirname, 'dist')));

app.get('/*', function(request,response){
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html' ));
});

module.exports = app;