/* eslint-env mocha */
'use strict';

var safe = require('./index.js');
var jsdom = require('jsdom');
var extend = require('extend');
var util = require('util');
var assert = require('assert');

function makeLinkNode(options, cb) {
  options = extend(false, {
    url: 'http://aboutandrew.co.uk',
    pageUrl: 'http://github.com',
    rel: '',
    target: ''
  }, options);

  jsdom.env({
    url: options.pageUrl,
    html: util.format('<a href="%s" target="%s" rel="%s"></a>', options.url, options.target, options.rel),
    done: function(err, window) {
      if (err) cb(err);
      cb(null, window.document.querySelector('a'), window);
    }
  });
}

describe('Make link node', function() {
  it('should make a link with target and rel set', function(done) {
    makeLinkNode({url: 'http://aboutandrew.co.uk', target: '_blank', rel: 'external'}, function(err, link) {
      assert.ifError(err);
      assert.equal(link.getAttribute('href'), 'http://aboutandrew.co.uk');
      assert.equal(link.getAttribute('target'), '_blank');
      assert.equal(link.getAttribute('rel'), 'external');
      done();
    });
  });

  it('should make a link without target and rel set', function(done) {
    makeLinkNode({url: 'http://aboutandrew.co.uk'}, function(err, link) {
      assert.ifError(err);
      assert.equal(link.getAttribute('href'), 'http://aboutandrew.co.uk');
      assert.equal(link.getAttribute('rel'), '');
      assert.equal(link.getAttribute('target'), '');
      done();
    });
  });

  it('should set the current domain', function(done) {
    makeLinkNode({pageUrl: 'http://somewhere.co.uk/awesome'}, function(err, link, window) {
      assert.ifError(err);
      assert.equal(window.location.href, 'http://somewhere.co.uk/awesome');
      done();
    });
  });
});

describe('Safe to capture', function() {
  it('should know a link is safe', function(done) {
    makeLinkNode({url: '/somewhere'}, function(err, link) {
      assert(safe(link));
      done();
    });
  });

  it('should know a link is not safe when external', function(done) {
    makeLinkNode({url: 'http://external.com/somewhere'}, function(err, link) {
      assert.equal(safe(link), false);
      done();
    });
  });

  it('should know a link is not safe when the href is empty', function(done) {
    makeLinkNode({url: ''}, function(err, link) {
      assert.equal(safe(link), false);
      done();
    });
  });

  it('should know a link is not safe it is a hash link to the same page', function(done) {
    makeLinkNode({url: '#test'}, function(err, link) {
      assert.equal(safe(link), false);
      done();
    });
  });
});
