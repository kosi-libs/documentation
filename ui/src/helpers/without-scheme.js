'use strict'

const SCHEME_RX = /^[a-z][a-z0-9+.-]*:\/\//i

module.exports = (url) => typeof url === 'string' ? url.replace(SCHEME_RX, '') : url
