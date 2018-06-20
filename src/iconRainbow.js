(function() {
    window.addEventListener('load', function() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || !Modernizr.video) {
            /* This feature makes less sense if you don't have a mouse, so lets not do it. */
            return;
        } else {
            setupIconRainbow();
        }
    });

    function setupIconRainbow() {

        var linkFooter = document.getElementsByClassName('links-footer');

        if(linkFooter.length <= 0) {
            return;
        }

        for(var i = 0; i < linkFooter[0].children.length; i++) {
            var child = linkFooter[0].children[i];
            child.onmouseover = function (event) {
                event.srcElement.style.color = getRandomColor()
            };
            // child.onmousemove = function(event) {
            //     event.srcElement.style.color = tweakColorRandomly(rgb2hex(event.srcElement.style.color));
            // };
            child.onmouseout = function (event) {
                event.srcElement.style.color = '';
            }
        }
    }
    function tweakColorRandomly(col) {
        var newDigit = parseInt(Math.random() * 16).toString(16);
        var index = 1 + parseInt(Math.random() * 6);

        var newColor = col.substr(0,index) + newDigit + col.substr(index + 1);

        console.log('Tweaked color', col, newColor, newDigit, index);

        return newColor;
    }
    function getRandomColor() {
        var colNumber = parseInt(Math.random() * 16777215);
        var hex = ('000000' + colNumber.toString(16)).substr(-6);
        return '#' + hex;
    }

    //Thanks! https://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value
    var hexDigits = new Array ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");

    //Function to convert rgb color to hex format
    function rgb2hex(rgb) {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

    function hex(x) {
        return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    }
})();
