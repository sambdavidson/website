/* Samuel Davidson */
(function() {
    var domVideoElement = null;

    function createBackgroundVideo() {

        var possibleVideos = ['hand_gestures', 'multiracial', 'aurora', 'sunrise', 'code'];
        var videoName = possibleVideos[getRandomInt(0, possibleVideos.length)];


        var myVid = generateVideoElement(videoName);
        if (myVid === null) {
            return;
        }
        document.body.appendChild(myVid);
        domVideoElement = myVid;

        var loaderDiv = document.getElementById('bottom-loader');
        var loaderText = 'Loading Web 2.0... ';
        var loaderAddons = ['powered by ShutterStock', '...0.2 beW gnidaoL', 'sometimes it\'s broken', 'stay in school!', 'don\'t do drugs (except the cool ones)'];
        if(loaderAddons.length > 0) {
            var rand = getRandomInt(0, loaderAddons.length);
            loaderText = loaderText + loaderAddons[rand];
        }

        var loadedSpans = 0;

        for(var i = 0; i < loaderText.length; i++) {
            var child = document.createElement('span');
            child.innerHTML = loaderText.charAt(i);
            child.className = 'hidden-below';
            loaderDiv.appendChild(child);
        }

        myVid.addEventListener('error', function(error) {
            console.error('myVid error event.', this.error, error);
        });


        var intervalId = setInterval(progressHandler, 100);
        function progressHandler() {
            myVid.play();

            if(myVid.buffered.length <= 0) {
                return;
            }

            var percentLoaded = myVid.buffered.end(0) / myVid.duration;

            while(((loadedSpans+1)/loaderText.length) <= percentLoaded) {
                loaderDiv.getElementsByTagName('span')[loadedSpans++].className = 'visible-above';
            }

            if(percentLoaded === 1) {
                myVid.currentTime = 0;
                myVid.removeAttribute('hidden');
                myVid.className = 'visible-above';
                setTimeout(loadingTextCleanup, 2000);
                clearInterval(intervalId)
                //myVid.removeEventListener('progress', progressHandler);
            }
        }
        function loadingTextCleanup() {
            var children = loaderDiv.getElementsByTagName('span');
            for(var i = 0; i < children.length; i++) {
                children[i].className = 'hidden-below';
            }
        }
    }

     function portraitSetup() {

        // Load alt images
        var altOne = new Image();
        altOne.src = '/static/images/sam_portrait_alt.jpg';

        var altTwo = new Image();
        altTwo.src = '/static/images/sam_portrait_alt2.jpg';

        var altThree = new Image();
        altThree.src = '/static/images/sam_portrait_alt3.jpg';

        var altFour = new Image();
        altFour.src = '/static/images/sam_portrait_alt4.jpg';

        var index = 0;
        var altImageArray = [altOne, altTwo, altThree, altFour];

        var portraitObject = document.getElementById('portrait');

        var partyVideoElement = null;
        if (domVideoElement) {
            partyVideoElement = generateVideoElement('dance');
        }

        var clickFunction = function () {
            portraitObject.src = altImageArray[index].src;
            index++;
            if (index === altImageArray.length) {
                portraitObject.classList.remove('portrait-clickable');
                portraitObject.removeEventListener('click', clickFunction);
                /* Get The Party Going! */
                if(domVideoElement && partyVideoElement) {
                    domVideoElement.parentElement.removeChild(domVideoElement);
                    document.body.appendChild(partyVideoElement);
                    domVideoElement = partyVideoElement;
                }
            }
        };

        portraitObject.addEventListener('click', clickFunction);
    }

    window.addEventListener('load', function() {
        if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && Modernizr.video) {
            /* Mobile doesn't like web videos (I.E. the autoplay bg) so only run this if not on mobile */
            createBackgroundVideo();
        }
        portraitSetup();

    });

    // Returns a random integer between min (included) and max (excluded)
    // Using Math.round() will give you a non-uniform distribution!
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function generateVideoElement(name) {
        var videoElement = document.createElement('video');
        videoElement.setAttribute('id', 'bgvid');
        videoElement.setAttribute('autoplay', 'true');
        videoElement.setAttribute('loop', '');

        var src = '/static/videos/' + name;
        if(Modernizr.video.webm) {
            src += '.webm';
        } else if(Modernizr.video.h264) {
            src += '.mp4';
        } else {
            return null;
        }

        videoElement.setAttribute('src', src);
        return videoElement;
    }
})();