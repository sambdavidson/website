define(['./gamesController', './gamesDirective'], function(gamesController, gamesDirective) {
   return angular.module('gamesModule', [])
   .controller('gamesController', gamesController)
   .directive('samGames', gamesDirective);
});