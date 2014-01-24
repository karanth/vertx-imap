"user strict";

function IMAPResponseParser(){

    this._data = [];
}


IMAPResponseParser.prototype.parse = function(chunk){

     var completed = false;
     var index = 0;
     var lengthOfChunk = chunk.length;
     var quoteStartIndex = -1;
     var tokenStartIndex = -1;
     var escaped = false;


     while(index < lengthOfChunk){

        var charAtIndex = chunk.charAt(index);


        switch(charAtIndex){

        // * FETCH 2 {100}....
        //vs
        // "* test"
        case '*' :
        case ' ' :
        case '\t':
        case '\r':
        case '\n':
            //Push a token
            if(quoteStartIndex < 0 && tokenStartIndex >= 0){
                var tokenChars = index - tokenStartIndex;
                this._data.push(chunk.substr(tokenStartIndex, tokenChars));
                tokenStartIndex = -1;
            }
            break;

        //These have special meaning
        case '<' :
        case '>' :
        case '{' :
        case '}' :
        case '(' :
        case ')' :
        case '[' :
        case  ']' :
            if(quoteStartIndex < 0 && tokenStartIndex >= 0){
                var tokenChars = index - tokenStartIndex;
                this._data.push(chunk.substr(tokenStartIndex, tokenChars));
                this._data.push(chunk.substr(index, 1));
                tokenStartIndex = -1;
            }
            break;

        case '\\' :
            escaped = !escaped;
            break;
        case '"' :
            if(!escaped){
                if(quoteStartIndex >= 0){
                    var tokenChars = index - tokenStartIndex;
                    this._data.push(chunk.substr(tokenStartIndex, tokenChars));
                    quoteStartIndex = -1;
                    tokenStartIndex = -1;
                }
                else{
                    quoteStartIndex = index;
                    tokenStartIndex = index + 1;
                }

            }
            break;

        default :
            if(tokenStartIndex < 0){
                tokenStartIndex = index;
            }
            break;
      }

        index++;

     }



     console.log(JSON.stringify(this._data));

}
