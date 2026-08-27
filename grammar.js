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

  extras: $ => [
    /\s/,
    $.comment,
  ],

  rules: {
    source_file: $ => repeat($._definitions), 

    _definitions: $ => choice(
      $.pattern,
    ),

    pattern: $ => choice(
      prec.right(1, seq($.pattern, "::", $.pattern)),
      $.ctor_pattern, $.pat_atom,
    ),

    ctor_pattern: $ => choice(
      prec.left(2, seq($.upper_id, repeat1($.pat_atom))),
      prec.left(1, $.upper_id),
    ),

    pat_atom: $ => choice(
      $.id, $.upper_id, "_", $.number, $.string, "true", "false", "[]",
      seq("(", $.pattern, ")"),
      seq("{", optional(seq($.id, optional(seq("=", $.pattern)), repeat(seq(",", $.id, optional(seq("=", $.pattern)))))), "}"),
    ),

    binop: $ => choice("||", "&&", "==", "!=", "<", "<=", ">", ">="
             , "::", "+", "-", "*", "/", "%"),
    
    id: $ => seq(/[a-z]/, /[a-zA-Z0-9_$]+/),
    upper_id: $ => seq(/[A-Z]/, /[a-zA-Z0-9_$]+/),
    number: $ => /-?[0-9]+/,
    string: $ => choice($.multiline_string, $.singleline_string),
    singleline_string: $ => seq('"', /([^"\\]|\\.)*/, '"'),
    multiline_string: $ => seq('"""', /([^"\\]|\\.)*/, '"""'),

    comment: ($) => token(choice(seq("#", /.*/))),
  }
});
