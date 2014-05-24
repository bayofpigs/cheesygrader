var tokenComp = function(string1, string2) {
   return comp(tokenize(string1), tokenize(string2));
}

var tokenize = function(tokenstring) {
   var re = /\s*/
   return tokenstring.split(re);
}

var comp = function(tokens1, tokens2) {
   
}
