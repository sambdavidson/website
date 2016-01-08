define(['./bubbleViewController', './bubbleViewDirective'], 
    function(bubbleViewSwitcherController, bubbleViewSwitcherDirective) {
    return angular.module('bubbleViewModule', [])
    .controller('bubbleViewController', bubbleViewSwitcherController)
    .directive('samBubbleView',bubbleViewSwitcherDirective);
});