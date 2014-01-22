"use strict";
// Constructor for the IMAPClient
// Parameters: server - imap.gmail.com
//             port - 993
//             connectOptions = { isSSL : true }
function IMAPClient(server, port, connectOptions){

    this._imapServer = server;
    this._imapPort = port;
    this._imapConnectOptions = connectOptions;
    this._imapCommandQueue = [];
    this._imapCommandTag = 1;
    this._imapCurrentCommand = null;
    this._imapConnected = false;
    this._imapStartIdle = false;
    this._imapEndIdle = false;
    this._imapGreeting = false;


    this.status = 'not connected';
}

IMAPClient.prototype.commandTagPrefix = 'A';


// Method that connects to the imap server on port with connect options
IMAPClient.prototype.connect =  function(callback){
    this._client = this._imapConnectOptions && this._imapConnectOptions.isSSL ?
                            vertx.createNetClient().ssl(true).trustAll(true)
                        :   vertx.createNetClient();


    //Set the connect callback
    this._userConnectCallback = callback;
    this._client.connect(this._imapPort, this._imapServer, this._onConnect.bind(this));

}

IMAPClient.prototype._onGreeting = function(buffer){
    this._imapGreeting = true;
    this.status = 'connected';
    this._imapConnected = true;
    //console.log("Greeting received");
}


IMAPClient.prototype._onConnect = function(error, sock){

    var self = this;

    function onData(buffer){

        if(!self._imapGreeting){
            self._onGreeting(buffer);
        }

        if(self._imapStartIdle && self._imapEndIdle){
            self._imapStartIdle = false;
            self._imapEndIdle = false;
        }


        if(self._imapCurrentCommand){
            self._imapCurrentCommand.callback(buffer);
            self._imapCurrentCommand = null;
        }

        self._executeCommand();
    }


    if(!error){
        this._socket = sock;
        this._socket.dataHandler(onData);
    }
    this._userConnectCallback(error);
}


//command argument an object of the form {command: 'command', callback: function}
IMAPClient.prototype.sendCommand = function(command){

    if(this._socket){
        this._imapCommandQueue.push(command);
        if(!this._imapCurrentCommand)
            this._executeCommand();
    }
}

IMAPClient.prototype._executeCommand = function(){

    if(this._imapCommandQueue.length > 0 && !this._imapCurrentCommand && this._imapConnected){
        var socketCommand = null;

        if(this._imapStartIdle){
            this._imapEndIdle = true;
            socketCommand = "DONE\r\n";
        }
        else{
             this._imapCurrentCommand = this._imapCommandQueue.shift();
             //A1 Command params
             if(this._imapCurrentCommand.command === 'IDLE'){
                 this._imapStartIdle = true;
             }
            socketCommand =  this.commandTagPrefix + this._imapCommandTag + " "  + this._imapCurrentCommand.command + "\r\n";
            this._imapCommandTag++;

        }

         this._socket.write(socketCommand);
    }

}

