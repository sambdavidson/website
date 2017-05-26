(function() {
    window.addEventListener('load', function() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || !Modernizr.video) {
            /* Mobile doesn't like web videos (I.E. the autoplay bg) so we are just going to not play anything */
            return;
        } else {
            //Transform title in to a buncha letters
            var headerEl = document.getElementById('header');
            var title = headerEl.innerHTML.toString();

            headerEl.innerHTML = "";
            headerEl.className = "noselect";

            for(var i = 0; i < title.length; i++) {
                var child = document.createElement('span');
                child.innerHTML = title.charAt(i);
                child.className = "name-header";
                child.onclick = letterClick;
                headerEl.appendChild(child);
            }
        }

    });
    function letterClick(event) {
        var letters = [' ','a','d','e', 'i', 'l','m','n','o','s','u','v'];
        var i = letters.indexOf(event.srcElement.innerHTML.toString());
        var next = (i+1) % letters.length;

        event.srcElement.innerHTML = letters[next];
    }
})();