define(function() {
    var controller = function($scope, $timeout) {
        var isAtTitle = true;
        var frontBubble = null;
        var screenMaxLength = screen.availWidth > screen.availHeight ? screen.availWidth : screen.availHeight;
        
        $timeout(function() {
           frontBubble = document.getElementById('front-container');
           if(!frontBubble) {
               console.error('Front Container undefined');
               return;
           }
           var diameter = screenMaxLength * 0.3;
           frontBubble.style.width = diameter + "px";
           frontBubble.style.height = diameter + "px";
           frontBubble.addEventListener("transitionend", bubbleTransitionEnd, false);
        });
        
        var bubbleTransitionEnd = function() {
            frontBubble.style.zIndex = -1;
        }
    //     var recalculateSizes = function() {
    //         screenMaxLength = screen.availWidth > screen.availHeight ? screen.availWidth : screen.availHeight;
    //     }
    //     window.addEventListener("resize", recalculateSizes);
    //     recalculateSizes();
    //     
        $scope.switcherClicked = function() {
            if(frontBubble) {
                frontBubble.className = "cropped-image-container";
                var diameter = Math.sqrt((screen.availWidth*screen.availWidth) + (screen.availHeight*screen.availHeight));
                frontBubble.style.width = diameter + "px";
                frontBubble.style.height = diameter + "px";
            }
        };
    }
    return ['$scope', '$timeout', controller];
});