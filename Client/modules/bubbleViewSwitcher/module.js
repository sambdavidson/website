define(['./bubbleViewSwitcherController', './bubbleViewSwitcherDirective'], function(bubbleViewSwitcherController, bubbleViewSwitcherDirective) {
    return angular.module('bubbleViewSwitcherModule', [])
    .controller('bubbleViewSwitcherController', bubbleViewSwitcherController)
    .directive('samBubbleViewSwitcher',bubbleViewSwitcherDirective);
});