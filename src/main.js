require.config({
    baseUrl: 'src',
    paths: {
        lib: '../lib'
    },
    map: {
        '*': {
            underscore:  'lib/underscore',
            backbone:    'lib/backbone',
            jquery:      'lib/jquery-1.7.2',
            'socket.io': 'http://localhost:8080/socket.io/socket.io.js'
        }
    },
    shim: {
        jquery:      { exports: '$' },
        underscore:  { exports: '_' },
        'socket.io': { exports: 'io' },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});

require(
    ['top/model', 'underscore', 'jquery', 'backbone'],
    function(topModel) {
        new topModel();
    }
);