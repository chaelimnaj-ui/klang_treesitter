# Klang Tree-sitter Parser

This was made because the author could not wait for a stable version of a local klang to release so he did the next best thing and made a pareser for it so he can use it in his neovim set up without 
having to use rust's syntax highlighting on neovim

This could not have been made as easily if not for the partial EBNF of klang from the UPD DCS CS150 lecture slides

## CURRENTLY A MINIMUM VIABLE PRODUCT

This parser is capable of parsing code that the partial EBNF in the CS150 lecture slides.

There will be attempts to extend the parser so it can cover more of the klang syntax. That being said, they're just attempts, I make no promises.

## AUTHOR DOES NOT KNOW HOW TO MAINTAIN A REPO

Not like I want this to be a serious project but like if you want to contribute or report bugs to me for some reason, just contact me, or not, make a PR or something. I should be bound to see it

## Usage

### Neovim Installation

These can probably go anywhere in your nvim config, init.lua if you really don't know.
If you have a similar file structure as mine, put yours in a lua file in the directory `after`

```lua
-- just so tree-sitter can actualy use .kl as klang
vim.filetype.add({
    extension = {
        kl = "klang",
    }
})

vim.api.nvim_create_autocmd('FileType', {
  pattern = { 'klang' },
  callback = function() vim.treesitter.start() end,
})


vim.treesitter.language.register('klang', { 'kl' })

-- install
vim.api.nvim_create_autocmd('User', { pattern = 'TSUpdate',
callback = function()
  require('nvim-treesitter.parsers').klang = {
    install_info = {
      url = 'https://github.com/chaelimnaj-ui/klang_treesitter',
      revision = HEAD,
      queries = 'queries/nvim',
    },
  }
end})

```

Then run `:TSInstall klang`

When there are updates, run `:TSUpdate`
