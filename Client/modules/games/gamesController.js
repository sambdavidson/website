define(function() {
    var controller = function($scope) {
        $scope.test = 'hello!';
    }
    return ['$scope', controller];
});