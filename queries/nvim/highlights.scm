; # syntax highlight queries
; Support for nvim-tree-sitter
; ## nodes
(binop) @operator

; ## terminals
; ### named 
(upper_id) @constant
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
] @boolean

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
  "."
] @punctuation.delimiter

