'use strict'

const GIT_SUFFIX_RX = /(?:\.git)?\/?$/

module.exports = (url) => {
  if (typeof url === 'string' && url.startsWith('https://')) return url.replace(GIT_SUFFIX_RX, '')
}
