# Safe to capture
[![npm version](https://badge.fury.io/js/safe-to-capture.svg)](http://badge.fury.io/js/safe-to-capture)
[![Build Status](https://travis-ci.org/foiseworth/safe-to-capture.svg?branch=master)](https://travis-ci.org/foiseworth/safe-to-capture)
[![Coverage Status](https://coveralls.io/repos/foiseworth/safe-to-capture/badge.svg?branch=master&service=github)](https://coveralls.io/github/foiseworth/safe-to-capture?branch=master)
![MIT Licensed](https://img.shields.io/badge/license-MIT-blue.svg)


A simple function that tells you whether a link DOM node is 'safe to capture' by a single page web app.
Typically these will be links you wish to handle within the router.

A link is safe to capture if it:
* is not external
* is not a hash link to the current page
* has a href

## To use
```javascript
var isSafeToCapture = require('safe-to-capture');
var link = document.querySelector('a');

isSafeToCapture(link);
```
