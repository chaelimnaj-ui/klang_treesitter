/**
 * @file "A tree-sitter grammar for the custom upd dcs language called klang"
 * @author "Jan Michael Tauli" <"jm1michael2@gmail.com">
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "klang",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
