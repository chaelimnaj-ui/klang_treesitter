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
    source_file: $ => repeat($._definitions),

    _definitions: $ => choice(
      $.binop,
      $.id,
      $.upper_id,
      $.number,
      $.string,
    ),

    binop: $ => choice("||", "&&", "==", "!=", "<", "<=", ">", ">="
             , "::", "+", "-", "*", "/", "%"),
    
    id: $ => seq(/[a-z]/, /[a-zA-Z0-9_$]+/),
    upper_id: $ => seq(/[A-Z]/, /[a-zA-Z0-9_$]+/),
    number: $ => /-?[0-9]+/,
    string: $ => choice($._multiline_string, $._string),
    _string: $ => seq('"', /([^"\\]|\\.)*/, '"'),
    _multiline_string: $ => seq('"""', /([^"\\]|\\.)*/, '"""'),
  }
});
