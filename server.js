const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

app.use(express.static(__dirname + '/public'));

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

function onConnection(socket){
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}

io.on('connection', onConnection);

app.get('/',(req,res)=>{
  res.render(`${__dirname}/src/pages/index.ejs`)
})

server.listen(3000, ()=>{
  console.log("3000 portunda site çalıştırılıyor")
})
