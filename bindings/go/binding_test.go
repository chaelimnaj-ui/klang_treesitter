package tree_sitter_klang_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_klang "git@github.com:chaelimnaj-ui/klang_treesitter.git/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_klang.Language())
	if language == nil {
		t.Errorf("Error loading klang grammar")
	}
}
