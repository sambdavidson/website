(function() {
    window.addEventListener('load', function() {
        //Transform title in to a bunch of letters
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

    });
    function letterClick(event) {
        var letters = [' ','a','d','e', 'i', 'l','m','n','o','s','u','v'];
        var i = letters.indexOf(event.srcElement.innerHTML.toString());
        var next = (i+1) % letters.length;

        event.srcElement.innerHTML = letters[next];
    }
})();