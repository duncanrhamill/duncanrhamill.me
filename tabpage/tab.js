$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
    $("#search").focus();
    //getWallpaper();
  });

$hassearched = false;

function getWallpaper() {
    var url = "https://www.reddit.com/r/wallpapers/top/.json?sort=top&t=day?limit=1";

    httpGetAsync(url, function(response) {
        var redditResponse = JSON.parse(response);

        var imagePattern = /i\.imgur\.com\/\w+\.jpg|png|jpeg/;
        var imageLink = "http://i.imgur.com/nYVdQnT.jpg";
        
        for (var i = 0; i < redditResponse.data.children.length; i++) {
            try {
                var link = redditResponse.data.children[0].data.url;
                if (imagePattern.test(link)) {
                    imageLink = link
                    break;
                }
            } catch (e) {
                console.log(e)
            }
        } 
        console.log(imageLink);
        $('#boxman').css("background image", "url('http://" + imageLink + "')");
    });
};

function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
};

var sites = [
    {
        name: "reddit",
        keycode: [82, 114],
        url: "http://www.reddit.com",
        color: "light-blue"
    },
    {
        name: "youtube",
        keycode: [89, 121],
        url: "http://www.youtube.com",
        color: "red"
    },
    {
        name: "facebook",
        keycode: [70, 102],
        url: "http://www.facebook.com",
        color: "blue"
    }
];

var selected = null;

$(document).keyup(function(e) {
    if (e.keyCode == 27) {
        if (selected != null && !$('#search').is(':focus')) {
            deselect(selected);
        }
        else if ($('#search').is(':focus')) {
            $('#search').blur();
        }
    }
});

$(document).keypress(function(e) {
    if (e.keyCode == 13) {
        if (selected != null && !$('#search').is(':focus')) {
            window.location.href=selected.url;
        }
        else {
            window.location.href="http://www.google.com/search?q=" + $("#search").val()
        }
    }
    else if (isSiteCode(e.keyCode) && !$('#search').is(':focus')) {
        var site = getSite(e.keyCode);
        if (selected != null) {
            deselect(selected);
        }
        selected = site;
        select(site);
    }
    else {
        if (selected != null) {
            deselect(selected);
        }
        $('#search').focus();

    }
});



function isSiteCode(code) {
    for (var i = 0; i < sites.length; i++) {
        if (sites[i].keycode.indexOf(code) > -1)
        {
            return true;
        }
    }
}

function getSite(code) {
    for (var i = 0; i < sites.length; i++) {
        if (sites[i].keycode.indexOf(code) > -1)
        {
            return sites[i];
        }
    }
}

function select(site) {
    $('#' + site.name).switchClass("grey", site.color);
}

function deselect(site) {
    $('#' + site.name).switchClass(site.color, "grey");
    selected = null;
}