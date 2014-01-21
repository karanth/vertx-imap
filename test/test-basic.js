"use strict";
var vertx = require('vertx');
var console = require('vertx/console');
var container = require('vertx/container');

load("IMAPClient.js");

var client;

var JavaBufferedReader = java.io.BufferedReader;
var JavaInputStreamReader = java.io.InputStreamReader;
var JavaSystem = java.lang.System;

var reader = new JavaBufferedReader( new JavaInputStreamReader(JavaSystem['in']) );


function processRequest(){
   var cmd = reader.readLine().split("\n")[0];
   client.sendCommand({ command: cmd, callback: processResponse});
}

function processResponse(response){
    console.log(response);
    processRequest();
}


if(container.config){
    client = new IMAPClient(container.config.server, container.config.port, container.config.config);
    client.connect(imapConnectionHandler);
}


function imapConnectionHandler(error){

    if(!error){
      processRequest();
    }
    else{
      console.log(error);
    }
}

