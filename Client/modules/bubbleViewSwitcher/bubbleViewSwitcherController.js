define(function() {
    var controller = function($scope) {
        $scope.switcherClicked = function() {
            console.log('click!');
        };
        
        $scope.viewCanvases = [];
    }
    return ['$scope', controller];
});