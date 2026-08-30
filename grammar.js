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
// precedences will be the end of me
//    tried not to vibe code any part of the code but im doing it for the precednece because i am 
//    not about to learn how to properly parse a programming language from first principles
// After several hours of this, im just going to vibe code it

const PREC = {
  control: 1,
  binop: 2,
  apply: 3,
}

export default grammar({
  name: "klang",

  conflicts: $ => [
    [$.pat_atom, $.atom],
  ],

  extras: $ => [
    /\s/,
    $.comment,
  ],

  rules: {
    source_file: $ => repeat($._definitions), 

    _definitions: $ => choice(
      $.include,
      $.item,
    ),

    include: $ => seq("include", $.string, ";"),
    
    item: $ => choice(
      seq("let", $.pattern, "=", $.expr, ";"),
      seq("let", $.id, repeat1($.pattern), "=", $.expr, ";"),
      seq("type", field("type", $.id), repeat(field("param", $.id)), "=", $.variant, repeat(seq("|", $.variant)), ";"),
      seq($.expr, ";"),
    ),

    variant: $ => seq($.id, repeat($.type_atom)),
    type_atom: $ => choice($.id, seq("(", $.id, repeat($.id), ")")),

    expr: $ => choice(
      prec.right(PREC.control, seq("fn", repeat1($.pattern), "=>", $.expr)),
      prec.right(PREC.control, seq("if", $.expr, "then", $.expr, "else", $.expr)),
      prec.right(PREC.control, seq("match", $.expr, "{", repeat1($.arm), "}")),
      prec.right(PREC.control, seq("let", $.pattern, "=", $.expr, "in", $.expr)),
      prec.left(PREC.binop, seq($.expr, $.binop, $.expr)),
      prec.left(PREC.apply, seq($.expr, $.postfix)),
      field("atomic", seq($.postfix)),
    ),
    postfix: $ => prec.left(seq($.atom, field("static_access", repeat(seq(".", $.id))))),
    arm: $ => seq($.pattern, "=>", $.expr, ";"),
    atom: $ => choice(
      $.id, $.number, $.string, "true", "false",
      seq("(", $.expr, ")"),
      seq("[", optional(seq($.expr, repeat(seq(",", $.expr)))), "]"),
      seq("{",
        optional(
          seq($.id, "=", $.expr,
            repeat(seq(",", $.id, "=", $.expr)),
          ),
        ),
        "}",
      ),
      seq("{", repeat($.item), $.expr, "}"),
    ),

    pattern: $ => choice(
      prec.right(1, seq($.pattern, "::", $.pattern)),
      $.ctor_pattern, $.pat_atom,
    ),

    ctor_pattern: $ => prec.left(PREC.apply, seq($.upper_id, repeat1($.pat_atom))),

    pat_atom: $ => choice(
      $.id, "_", $.number, $.string, "true", "false", "[]",
      seq("(", $.pattern, ")"),
      seq("{", 
        optional(
          seq(
            $.id, optional(seq("=", $.pattern)), 
            repeat(seq(",", $.id, optional(seq("=", $.pattern))))
          )
        ),
        "}"),
    ),

    binop: $ => choice("||", "&&", "==", "!=", "<", "<=", ">", ">="
             , "::", "+", "-", "*", "/", "%"),
    
    id: $ => choice( $.lower_id, $.upper_id),
    lower_id: $ => seq(/[a-z]/, /[a-zA-Z0-9_$]*/),
    upper_id: $ => seq(/[A-Z]/, /[a-zA-Z0-9_$]*/),
    number: $ => /-?[0-9]+/,
    string: $ => choice($.multiline_string, $.singleline_string),
    singleline_string: $ => seq('"', /([^"\\]|\\.)*/, '"'),
    multiline_string: $ => seq('"""', /([^"\\]|\\.)*/, '"""'),

    comment: ($) => token(choice(seq("#", /.*/))),
  }
});
