/**
 * @file "A tree-sitter grammar for the custom upd dcs language called klang"
 * @author "Jan Michael Tauli" <"jm1michael2@gmail.com">
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

// As direct a translation from klang's EBNF

export default grammar({
  name: "klang",

  rules: {
    source_file: $ => repeat($._definition),

    _definition: $ => choice(
      $.include,
      $.item,
    ),

    id: $ => seq(),
    upper_id: $ => seq(),
    int_type: $ => seq(),
    string_type: $ => seq(),

    include: $ => seq( "include", $.string_type, ";"),

    item: $ => choice(
     seq ("type", $.pattern, "=", $.expr, ";"), 
     seq ("type", $.id, repeat1($.pattern), "=", $.expr, ";"), 
     seq ("type", $.id, repeat($.id), "=", $.variant, repeat(seq("|", $.variant)), ";"),
     seq ($.expr, ";"),
    ),

    variant: $ => seq($.id, $.type_atom),

    type_atom: $ => choice(
      $.id, 
      seq("(", $.id, repeat($.id), ")"),
    ),

    expr: $ => choice(
      seq("fn", repeat1($.pattern), "=>", $.expr),
      seq("if", $.expr, "then", $.expr, "else", $.expr),
      seq("match", $.expr, "{", repeat1($.arm), "}"),
      seq("let", $.pattern, "=", $.expr, "in", $.expr),
      seq($.expr, $.binop, $.expr),
      seq($.expr, $.postfix),   // function application
      seq($.postfix),
    ),

    postfix: $ => seq($.atom, repeat(seq(".", $.id))),
    arm: $ => seq($.pattern, "=>", $.expr, ";"),
    
    atom: $ => choice(
      $.id, $.int_type, $.string_type, "true", "false", 
      seq("(", $.expr, ")"),
      seq("[", optional(seq($.expr, repeat(seq(",", $.expr)))), "]"),
      seq("{", optional(seq($.id, "=", $.expr, repeat(seq(",", $.id, "=", $.expr)))), "}"),
      seq("{", repeat($.item), $.expr, "}"),
    ),

    pattern: $ => choice(
      seq($.pattern, "::", $.pattern),
      $.ctor_pattern, $.pat_atom
    ),

    ctor_pattern: $ => seq($.upper_id, $.pat_atom),

    pat_atom: $ => choice(
      $.id, $.upper_id, "_",  $.int_type, $.string_type, "true", "false",
      "[]",
      seq("(", $.pattern, ")"),
      seq("{", optional(seq($.id, optional(seq("=", $.pattern)))), 
        optional(seq(",", $.id, optional(seq("=", $.pattern)))), "}"),
    ),
  
    binop: $ => choice(
      "||", "&&", "==", "!=", "<", "<=", ">", ">=",
      "::", "+", "-", "*", "/", "%"
    ),

  }
});
