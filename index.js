'use strict';
var isExternalLink = require('external-link');

function safeToCapture(node) {
  if (!node.getAttribute('href')) return false;

  if (isExternalLink(node)) return false;

  if (node.getAttribute('href').charAt(0) === '#') return false;

  return true;
}

module.exports = safeToCapture;
