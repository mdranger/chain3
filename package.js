/* jshint ignore:start */
Package.describe({
    name: 'moaclib:chain3',
    version: '0.1.5',
    summary: 'Moac JavaScript API, middleware to talk to a MOAC node over RPC',
    git: 'https://github.com/mdranger/chain3.git',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
  });
  
  Npm.depends({
    "xmlhttprequest": "1.7.0"
  });
  
  
  Package.onUse(function(api) {
    api.versionsFrom('1.0.3.2');
    api.export(['Chain3', 'BigNumber'], ['client', 'server']);
    api.addFiles('dist/chain3.js', ['client', 'server']);
    api.addFiles('package-init.js', ['client', 'server']);
  });
  
