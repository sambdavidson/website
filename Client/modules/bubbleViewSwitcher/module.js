define(['./bubbleViewSwitcherController', './bubbleViewSwitcherDirective', './bubbleView/module'], 
    function(bubbleViewSwitcherController, bubbleViewSwitcherDirective, bubbleView) {
    return angular.module('bubbleViewSwitcherModule', [bubbleView.name])
    .controller('bubbleViewSwitcherController', bubbleViewSwitcherController)
    .directive('samBubbleViewSwitcher',bubbleViewSwitcherDirective);
});