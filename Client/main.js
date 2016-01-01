/* Samuel B Davidson Q1 2016*/
require.config({
    paths : {
        'angular': 'angular/angular',
        'app':'modules/app'
    },
    shim: {
        'app': {
            deps: ['angular']
        },
        
    }
});

require(['app'], function() {
    angular.bootstrap(document, ['app']);
});