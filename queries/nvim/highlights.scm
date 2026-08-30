; # syntax highlight queries
; Support for nvim-tree-sitter
; ## Direct nodes and opertars
(binop) @operator

[
"="
"::"
"|"
] @operator


; ## imports and types
(include 
  "include" @keyword.import .
  (string) @string.special.path) 

; `type Option a = ...`
(item 
  "type" .
  type: (id) @type.definition .
  param: (id)* @type.parameter .
  "=" .
  (variant)) ; captures the generic type arguments

; Variants and Type annotations
(variant 
  (id) @constructor)
(type_atom 
  (id) @type)

; ## 3. Functions & Patterns

; Function declaration with parameters: `let my_func x y = ...`
(item
  "let" 
  (id) @function 
  (pattern
    pat_atom
    (id) @variable.parameter)) 

; Variable binding to an anonymous function: `let my_func = fn ...`
(item
  "let" .
  (pattern
    pat_atom
    (id) @function)
  "=" .
  (expr "fn"))

; Anonymous function parameters
(expr
  "fn"
  (pattern) @variable.parameter)

; ## 4. Records & Fields
; Record projection: `user.name`
(postfix 
  "." 
  (id) @property)

; Record initialization: `{ name = "Alice" }`
(atom 
  (id) @property 
  "=")

; Record patterns: `let { name = n } = ...`
(pat_atom 
  (id) @property 
  "=")

; ## 5. Function Calls (Apply)
; Your grammar parses apply as: (expr (expr atomic: (postfix ...)) (postfix))

; Matches standard calls: `foo(x)`
(expr
  (expr
    atomic: (postfix 
              (atom (id) @function.call)
              !static_access))
  (postfix))

; Matches static access calls: `module.foo(x)`
(expr
  (expr
    atomic: (postfix
              "."
              (id) @function.call .))
  (postfix))



; ## 6. Constructors & Built-ins
(ctor_pattern 
  (upper_id) @constructor)

(pat_atom
  (id
    (upper_id) @constructor))

(pat_atom 
  "_" @variable.builtin)

; ## 7. Terminals & Fallbacks
(number) @number
(string) @string
(comment) @comment

; Anonymous Keywords
[
  "in"
  "let"
  "type"
] @keyword

[
  "fn"
] @keyword.function

[
  "if"
  "else"
  "then"
  "match"
] @keyword.conditional

[
  "true"
  "false"
] @boolean

; Punctuation
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
  ","
] @punctuation.delimiter

[
  "=>"
] @punctuation.special

; ; Final fallback for standard variables.
; ; Because this is at the absolute bottom, it will only highlight 
; ; identifiers that weren't already tagged as functions, parameters, or properties above.
(upper_id) @constant
(id) @variable
