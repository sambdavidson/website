/* Samuel Davidson */
(function() {

    window.addEventListener('load', function() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || !Modernizr.video) {
            /* Mobile doesn't like web videos (I.E. the autoplay bg) so we are just going to not run this */
            return;
        } else {
            createBackgroundVideo();
        }

    });

    function createBackgroundVideo() {
        /* Create the Snazzy Video Element */
        var myVid = document.createElement('video');
        myVid.setAttribute('id', 'bgvid');
        myVid.setAttribute('autoplay', 'true');
        myVid.setAttribute('loop', '');


        var possibleVideos = ['hand_gestures', 'multiracial', 'aurora', 'sunrise', 'code'];
        var selectedVideo = possibleVideos[getRandomInt(0, possibleVideos.length)];
        if(Modernizr.video.webm) {
            myVid.setAttribute('src', 'videos/'+selectedVideo+'.webm');
        } else if(Modernizr.video.h264) {
            myVid.setAttribute('src', 'videos/'+selectedVideo+'.mp4');
        }

        document.body.appendChild(myVid);

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

    // Returns a random integer between min (included) and max (excluded)
    // Using Math.round() will give you a non-uniform distribution!
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
})();