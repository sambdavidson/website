define(function() {
    var directive = function() {
        return {
            restrict: 'E',
            templateUrl: 'modules/games/gamesTemplate.html',
            controller: 'gamesController'
        }
    }
    return directive;
});