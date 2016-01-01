require.config({
    paths : {
        'angular': 'angular/angular',
        'app':'scripts/app',
        'coreModule': 'scripts/coreModule'
    },
    shim: {
        'app': {
            deps: ['angular', 'coreModule']
        },
        
        'coreModule': {
            deps: ['angular']
        }
        
    }
});