define(function() {
    var controller = function($scope, $timeout) {
        var isAtTitle = true;
        var frontBubble = null;
        var swiperMain, swiperMainSm, swiperRight, swiperBottom;
        var screenMaxLength = screen.availWidth > screen.availHeight ? screen.availWidth : screen.availHeight;
        
        $timeout(function() {
           frontBubble = document.getElementById('front-container');
           swiperMain = document.getElementById('swiper-main');
           swiperMainSm = document.getElementById('swiper-main-sm');
           swiperRight = document.getElementById('swiper-right');
           swiperBottom = document.getElementById('swiper-bottom');
           if(!frontBubble) {
               console.error('Front Container undefined');
               return;
           }
           var diameter = screenMaxLength * 0.25;
           frontBubble.style.width = diameter + "px";
           frontBubble.style.height = diameter + "px";
           frontBubble.addEventListener("transitionend", bubbleTransitionEnd, false);
           //swiperBottom.addEventListener("transitionend", bottomTransitionEnd, false);
        });
        
        var bubbleTransitionEnd = function() {
            var length = 600;
            var delay = 100;
            $timeout(function() {
                swiperRight.className = 'swiper swiper-right swiper-right-end';
                swiperBottom.className = 'swiper swiper-bottom swiper-bottom-end';
           }, delay);
           $timeout(function() {
               swiperMain.className = 'swiper-md swiper-main swiper-main-end';
           }, 300);
           $timeout(function() {
               swiperMainSm.className = 'swiper-sm swiper-main-sm swiper-main-sm-end';
           }, 700);
           frontBubble.removeEventListener("transitionend", bubbleTransitionEnd);
        }
        
        var bottomTransitionEnd = function() {
            swiperRight.className = '.swiper-sm swiper-right swiper-right-end';
            swiperBottom.className = '.swiper-sm swiper-bottom swiper-bottom-end';
            swiperMainSm.className = '.swiper-sm swiper-main-sm swiper-main-sm-end';
            swiperBottom.removeEventListener("transitionend", bottomTransitionEnd);
        }
        $scope.switcherClicked = function() {
            if(frontBubble) {
                frontBubble.className = 'expando-bubble';
                var diameter = Math.sqrt((screen.availWidth*screen.availWidth) + (screen.availHeight*screen.availHeight));
                frontBubble.style.width = '100%';
                frontBubble.style.height = '100%';
            }
        };
    }
    return ['$scope', '$timeout', controller];
});