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
    { command : "LOGIN <username> <password>",
          callback : function(buffer){
                           console.log(">>>>>>>>>>>>>>>");
                           console.log(buffer);

                           }

    });

   client1.sendCommand(
    { command : "EXAMINE \"[Gmail]/All Mail\"",
           callback : function(buffer){
                                console.log(">>>>>>>>>>>>>>>");
                                console.log(buffer);

                                }

    });

 /*   client1.sendCommand(
     { command : "LIST \"\" \"*\"",
            callback : function(buffer){
                                          console.log(">>>>>>>>>>>>>>>");
                                          console.log(buffer);

                                          }

     });
   */

/*client1.sendCommand(
    { command : "FETCH 1 ALL",
      callback : function(buffer){
            console.log(">>>>>>>>>>>>");
            console.log(buffer);
      }


    }
    );
*/
    client1.sendCommand(
    { command : "IDLE",
      callback : function(buffer){
            console.log(">>>>>>>>>>>>");
            console.log(buffer);
      }


    }
    );

});


//Execute another command after 10s.
vertx.setTimer(10000, function(){
       client1.sendCommand(
          { command : "NOOP",
            callback : function(buffer){
                  console.log(">>>>>>>>>>>>");
                  console.log(buffer);
            }


          }
          );


});

/*var client2 = new IMAPClient('imap.gmail.com', 993, {isSSL : true});
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
  */