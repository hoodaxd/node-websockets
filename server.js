'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
  wss.clients.forEach((client) => {
    //client.send(new Date().toTimeString());
    var theurl='https://yonovax.000webhostapp.com/api/control/read_all.php';
    var clientv = new HttpClient();
    clientv.get(theurl, function(response) { 
    var response1 = JSON.parse(response);
    client.send(response);
  });
}, 1000);

wss.on('message', function(data, flags) {
    console.log('Msg received in client: %s ', data);
    var url = data;
    var clientx = new HttpClient();
    clientx.get(url, function(response) { });
});
//////////////////////////////////////////////////////////////////////////////////////////////////
 var HttpClient = function() {
 this.get = function(aUrl, aCallback) {
 var anHttpRequest = new XMLHttpRequest();
 anHttpRequest.onreadystatechange = function() { 
 if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
 aCallback(anHttpRequest.responseText);
 }
 anHttpRequest.open( "GET", aUrl, true ); 
 anHttpRequest.send( null ); 
 }
 }
