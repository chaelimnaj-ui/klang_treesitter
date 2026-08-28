; # syntax highlight queries
; ## nodes
(binop) @binop

; ## terminals
; ### named 
(upper_id) @upper_id
(number) @number
(string) @string
(comment) @comment

; ### anonymous
[
  "else"
  "fn"
  "if"
  "include"
  "let"
  "match"
  "then"
  "type"
] @keywords

[
  "true"
  "false"
] @bool

