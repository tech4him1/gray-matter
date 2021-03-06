'use strict';

const defaults = require('./defaults');

module.exports = function(file, options) {
  const opts = defaults(options);
  file.data = file.data || {};

  if (typeof opts.excerpt === 'function') {
    return opts.excerpt(file, opts);
  }

  const sep = file.data.excerpt_separator || opts.excerpt_separator;
  if (!sep && (opts.excerpt === false || opts.excerpt == null)) {
    return file;
  }

  let delimiter = sep || opts.delimiters[0];
  if (typeof opts.excerpt === 'string') {
    delimiter = opts.excerpt;
  }

  // if enabled, get the excerpt defined after front-matter
  const idx = file.content.indexOf(delimiter);
  if (idx !== -1) {
    file.excerpt = file.content.slice(0, idx);
  }

  return file;
};
