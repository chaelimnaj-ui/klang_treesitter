; # syntax highlight queries
; Support for nvim-tree-sitter
; ## nodes
(binop) @operator

; ## pattern matched
; function delcarations
(item
  "let"
  (pattern) @function
  "="
  (expr 
    "fn"))

(item
  "let"
  (id) @function
  (pattern)+ @variable.parameter)

(expr
  "fn"
  (pattern)+ @variable.parameter)

; function call
(expr
  (expr
    atomic: (postfix) @function.call .)
  (postfix))

; ## terminals
; ### named 
(upper_id) @constant
(number) @number
(string) @string
(comment) @comment

; ### anonymous
[
  "in"          
  "let"
  "type"
] @keyword

[
  "fn"
] @keyword.funcion

[
  "include"
] @keyword.import

[
  "if"
  "else"
  "then"
  "match"
  "=>"
] @keyword.conditional

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

