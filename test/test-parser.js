"use strict";
var vertx = require('vertx');
var console = require('vertx/console');
var container = require('vertx/container');

load("IMAPResponseParser.js");

var parser = new IMAPResponseParser();

parser.parse("* CAPABILITY IMAP4rev1 UNSELECT IDLE NAMESPACE QUOTA ID XLIST CHILDREN X-GM-EXT-1 UIDPLUS COMPRESS=DEFLATE ENABLE MOVE CONDSTORE ESEARCH");

parser.parse('* 1 FETCH (ENVELOPE ("Tue, 22 Jun 2004 09:16:14 -0700 (PDT)" "Gmail is different. Heres what you need to know." (("Gmail Team" NIL "gmail-noreply" "google.com")) (("Gmail Team" NIL "gmail-noreply" "google.com")) (("Gmail Team" NIL "gmail-noreply" "google.com")) (("Sandeep Karanth" NIL "xxxxxxxxxxx" "gmail.com")) NIL NIL NIL "<>") FLAGS (\\Seen) INTERNALDATE "22-Jun-2004 16:16:14 +0000" RFC822.SIZE 2076)');
