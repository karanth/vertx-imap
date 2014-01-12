
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


IMAPClient.prototype._onConnect = function(error, sock){

    var self = this;

    function onData(buffer){

        if(self._imapCurrentCommand){
            self._imapCurrentCommand.callback(buffer);
            self._imapCurrentCommand = null;
        }
        else{
            console.log('Orphaned command');
            console.log(self.status);
            console.log(buffer.toString());
        }

        self._executeCommand();
    }


    if(!error){
        this._socket = sock;
        this.status = 'connected';
        this._socket.dataHandler(onData);
    }
    this._userConnectCallback(error);
}


//command argument an object of the form {command: 'command', callback: function}
IMAPClient.prototype.sendCommand = function(command){

    if(this._socket && this.status === 'connected'){
        this._imapCommandQueue.push(command);
      if(!this._imapCurrentCommand)
            this._executeCommand();
    }
}

IMAPClient.prototype._executeCommand = function(){

    if(this._imapCommandQueue.length > 0){
        this._imapCurrentCommand = this._imapCommandQueue.shift();

        //A1 Command params
        var socketCommand =  this.commandTagPrefix + this._imapCommandTag + " "  + this._imapCurrentCommand.command + "\n";
        console.log("<<<<<<<<<<<<<<<<" + socketCommand);
        this._imapCommandTag++;
        this._socket.write(socketCommand);
    }

}

