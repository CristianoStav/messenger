const express = require('express');
const path = require('path');
const http = require('http');
const socket = require('socket.io');
const consign = require('consign');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const methodOverride = require('method-override');
const error = require('./middlewares/error');

const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);
const port = 4500;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser('CrizuZap'));
app.use(expressSession({ resave: true, saveUninitialized: true, secret: 'secret' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

consign({})
  .include('models')
  .then('controllers')
  .then('routes')
  .into(app);

io.on('connection', (client) => {
  client.on('send-server', (data) =>{
    const resp = `<b>${data.nome}:</b> ${data.msg}<br>`;
    client.emit('send-client', resp);
    client.broadcast.emit('send-client', resp);
  });
});

app.use(error.notFound);
app.use(error.default);

server.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});