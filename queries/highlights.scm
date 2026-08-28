; # syntax highlight queries
; I am using the tree-sitter defaults in my cofig file which would explain why some entries look odd
; ## nodes
(binop) @operator

; ## terminals
; ### named 
(upper_id) @constructor 
(number) @number
(string) @string
(comment) @comment

; ### anonymous
[
  "else"
  "fn"
  "if"
  "in"          ; this is a surprise tool that will help us later !
  "include"
  "let"
  "match"
  "then"
  "type"
] @keyword

[
  "true"
  "false"
] @constant

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket

[
  ";"
] @punctuation.delimiter

