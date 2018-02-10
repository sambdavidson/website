(function(){
    window.addEventListener('load', function() {
        // Load alt images
        var altOne = new Image();
        altOne.src = 'images/sam_portrait_alt.jpg';

        var altTwo = new Image();
        altTwo.src = 'images/sam_portrait_alt2.jpg';

        var altThree = new Image();
        altThree.src = 'images/sam_portrait_alt3.jpg';

        var altFour = new Image();
        altFour.src = 'images/sam_portrait_alt4.jpg';

        var index = 0;
        var altImageArray = [altOne, altTwo, altThree, altFour];

        var portraitObject = document.getElementById('portrait');

        var clickFunction = function () {
            portraitObject.src = altImageArray[index].src;
            index++;
            if (index === altImageArray.length) {
                portraitObject.classList.remove('portrait-clickable');
                portraitObject.removeEventListener('click', clickFunction);
            }
        };

        portraitObject.addEventListener('click', clickFunction);
    });
})();