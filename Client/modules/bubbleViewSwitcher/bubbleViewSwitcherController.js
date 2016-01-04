define(function() {
    var controller = function($scope, $timeout) {
        var bubble = null;
        var screenMaxLength = screen.width > screen.height ? screen.width : screen.height;
        $timeout(function() {
           bubble = document.getElementById('switcher-bubble');
           var diameter = screenMaxLength * 0.2;
           bubble.style.width = diameter + "px";
           bubble.style.height = diameter + "px";
           
        });
        
        $scope.switcherClicked = function() {
            if(bubble) {
                bubble.className = "switcher-button switcher-button-clicked";
                bubble.style.width = (screenMaxLength*1.5) + "px";
                bubble.style.height = (screenMaxLength*1.5) + "px";
            }
        };
        
        $scope.viewCanvases = [];
    }
    return ['$scope', '$timeout', controller];
});