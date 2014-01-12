vertx-imap
==========

A vertx-based async Imap client  - Javascript

_vertx_ - http://vertx.io. is an upcoming app framework with super cool features like async IO, message passing, actor-like concurrency, modularity and support for multiple languages (Polyglot). Vertx is a JVM based framework. 

I have used Javascript to code the client. The choice is mainly to aid quick prototyping. The motivation behind writing this imap client is a need to support a large number of mail clients within a single process at my startup. In that sense,  async IO is the primary vertx feature used for this project. Of course, there are obviously many choices to achieve this task, like node.js. The community behind it is also great and there are a few projects that do imap clients for node.js. The JVM platform that vertx runs on makes it attractive for me as all our development happens on the JVM. The hope is to be able to import existing code into Vertx at some point of time in the feature.


#### Prerequisites 
The project requires vertx installed. Vertx automatically installs Rhino.

#### Usage
Other than the standard vertx related imports, the verticle needs to load the IMAPClient.js file.

    load('../lib/IMAPClient.js');
  
The IMAP client can be created using the statement below,

    var client1 = new IMAPClient('imap.gmail.com', 993, {isSSL : true});
    
The options object currently takes only the iSSL property. The first parameter is the imap server name and the second one is the listening port on the server.

Once the object is created, the next step is to connect to the server. The client exposes a connect method. It also takes in a callback as a parameter. The callback returns an error object (if there is an error)

    client1.connect(function(error){
       console.log(client1.status);
    }
    
For now, you can send commands via the sendCommand method on the client object.
    
    client1.sendCommand(
        {   command : "CAPABILITY",
            callback : function(buffer){
                          console.log(buffer);
        }
    });
    
Or a login command like,

    client1.sendCommand(
        { command : "LOGIN <your username> <your password>",
          callback : function(buffer){
                           console.log(buffer);
                   }

    });
    
You can create as many clients as you wish and check the number of threads and memory usage to see if async io is in play or not.
    
#### Next Steps    
* IMAP Idle support
* Abstractions over IMAP commands - For example, methods for login, choosing and changing mailboxes
* Marshalling command responses - For example, an array of mails is returned if these emails are requested.







    





