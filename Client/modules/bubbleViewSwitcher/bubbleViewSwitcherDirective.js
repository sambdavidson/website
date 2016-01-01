define(function() {
    var directive = function() {
        return {
            restrict: 'E',
            templateUrl: 'modules/bubbleViewSwitcher/bubbleViewSwitcherTemplate.html',
            controller: 'bubbleViewSwitcherController'
        }
    }
    return directive;
});