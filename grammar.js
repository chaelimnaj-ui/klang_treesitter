/**
 * @file "A tree-sitter grammar for the custom upd dcs language called klang"
 * @author "Jan Michael Tauli" <"jm1michael2@gmail.com">
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

// As direct a translation from klang's EBNF
// regex f*cking sucks 
// strings f*cking suck

export default grammar({
  name: "klang",

  rules: {
    source_file: $ => repeat($.binop),

    binop: $ => choice("||", "&&", "==", "!=", "<", "<=", ">", ">="
             , "::", "+", "-", "*", "/", "%"),
    
    // basic regexes for now
    id: $ => 
    upper_id: $ =>
    integer: $ =>
    string: $ =>
  }
});
