define(['modules/games/module',
        'modules/bubbleViewSwitcher/module'],
         function(gamesModule,
                  bubbleViewSwitcher) {
    var app = angular.module('app', [gamesModule.name,
                                     bubbleViewSwitcher.name]);
    return app;
});
