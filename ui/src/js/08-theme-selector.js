;(function () {
  'use strict'

  var STORAGE_KEY = 'kosi-theme'
  var root = document.documentElement
  var toggle = document.querySelector('.theme-toggle')
  var menu = document.querySelector('.theme-menu')
  if (!toggle || !menu) return
  var options = Array.prototype.slice.call(menu.querySelectorAll('.theme-option'))

  var stored
  try {
    stored = window.localStorage.getItem(STORAGE_KEY)
  } catch (e) {} // storage may be unavailable (private mode, blocked cookies)
  select(stored === 'light' || stored === 'dark' ? stored : 'auto')

  toggle.addEventListener('click', function (e) {
    e.stopPropagation()
    setOpen(menu.hidden)
  })

  options.forEach(function (option) {
    option.addEventListener('click', function () {
      var theme = this.dataset.themeValue
      select(theme)
      if (theme === 'auto') root.removeAttribute('data-theme')
      else root.setAttribute('data-theme', theme)
      try {
        if (theme === 'auto') window.localStorage.removeItem(STORAGE_KEY)
        else window.localStorage.setItem(STORAGE_KEY, theme)
      } catch (e) {}
      setOpen(false)
      toggle.focus()
    })
  })

  document.addEventListener('click', function (e) {
    if (!menu.hidden && !menu.contains(e.target)) setOpen(false)
  })

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' || menu.hidden) return
    setOpen(false)
    toggle.focus()
  })

  function select (theme) {
    toggle.dataset.themeChoice = theme
    options.forEach(function (option) {
      option.setAttribute('aria-checked', option.dataset.themeValue === theme)
    })
  }

  function setOpen (open) {
    menu.hidden = !open
    toggle.setAttribute('aria-expanded', open)
  }
})()
