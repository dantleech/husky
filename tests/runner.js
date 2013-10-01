var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

require.config({
    // Karma serves files from '/base'
    baseUrl: '/base',

    paths: {
        'jquery': 'bower_components/jquery/jquery',
        'sinon': 'node_modules/sinon/pkg/sinon.js',
        'aura': 'bower_components/aura/lib',
        'husky': 'lib/husky'
    },

    shim: {
        'underscore': {
            exports: '_'
        }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});