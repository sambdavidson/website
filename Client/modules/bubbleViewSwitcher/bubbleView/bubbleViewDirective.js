define(function() {
    var directive = function() {
        return {
            require: '^bubbleViewSwitcher',
            restrict: 'E',
            transclude: true,
            controller: 'bubbleViewController',
            link: function(scope, elem, attrs, bubbleViewSwitcherCtrl) {
                console.log(bubbleViewSwitcherCtrl);
            }
        }
    }
    return directive;
});