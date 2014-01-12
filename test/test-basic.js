var vertx = require('vertx');
var console = require('vertx/console');
load("IMAPClient.js");


var client1 = new IMAPClient('imap.gmail.com', 993, {isSSL : true});

client1.connect(function(error){
   console.log(client1.status);
   client1.sendCommand(
    {   command : "CAPABILITY",
        callback : function(buffer){
                    console.log(">>>>>>>>>>>>>>>");
                    console.log(buffer);

                    }
    });

   client1.sendCommand(
    { command : "LOGIN <your username> <your password>",
          callback : function(buffer){
                           console.log(">>>>>>>>>>>>>>>");
                           console.log(buffer);

                           }

    });

});

var client2 = new IMAPClient('imap.gmail.com', 993, {isSSL : true});
  client2.connect(function(error){
    // console.log(error);
     console.log(client2.status);
     client2.sendCommand(
      {   command : "CAPABILITY",
          callback : function(buffer){
                      console.log(">>>>>>>>>>>>>>>");
                      console.log(buffer);

                      }
      });

     client2.sendCommand(
      { command : "LOGIN <another username> <another password>",
            callback : function(buffer){
                             console.log(">>>>>>>>>>>>>>>");
                             console.log(buffer);

                             }

      });

  });
