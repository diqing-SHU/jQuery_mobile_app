$(document).ready(function(){
    $(document).on("pageshow","[data-role='page']",function(){
        if ($($(this)).hasClass("header_default")) {
            // needs haeder
            $('<header data-theme="b" data-role="header"><h1></h1><a href="#" class="ui-btn-left ui-btn ui-btn-inline ui-btn-icon-notext ui-mini ui-corner-all ui-icon-back data-rel="back">Baxk</a><a href="#" class="ui-btn-right ui-btn ui-btn-inline ui-btn-icon-notext ui-mini ui-corner-all ui-icon-info">Info</a></header>')
                .prependTo($(this))
                // add header code
                .toolbar({ position: "fixed" });
                // make it fixed
            $("[data-role='header'] h1").text($(this).jqmData("title"));
            // jQuery mobile build in method on locating data-XX(title here)
            // h1 tag in the header (title)
        } // if haeder default
        // reset the height of the page to avoid overlapping header with top of page
        $.mobile.resetActivePageHeight();
        
        if ($($(this)).hasClass("footer_default")) {
            $('<footer data-theme="b" data-role="footer" data-position="fixed"><nav data-role="navbar"><ul><li><a href="#home" class="ui-btn ui-icon-home ui-btn-icon-top">Home</a></li><li><a href="#blog" class="ui-btn ui-icon-edit ui-btn-icon-top">Blog</a></li><li><a href="#videos" class="ui-btn ui-icon-video ui-btn-icon-top">Videos</a></li><li><a href="#photos" class="ui-btn ui-icon-camera ui-btn-icon-top">Photos</a></li><li><a href="#tweets" class="ui-btn ui-icon-comment ui-btn-icon-top">Tweets</a></li></ul></nav></footer>').appendTo($(this))
            .toolbar({position: "fixed"});
        }
        
        // jQuery add active class to the page currently displayed!!
        var current = $(".ui-page-active").attr('id');
        // reset actived btn (toolbar is static)
        $("[data-role='footer'] a.ui-btn-active").removeClass("ui-btn-active");
        // walk through a tags in footer
        $("[data-role='footer'] a").each(function(){
            // locate link that match #current page
            if($(this).attr('href') === '#' + current) {
                // add class active(highlight selected)
                $(this).addClass("ui-btn-active");
            }
        })
			
    }); //show page
}); //document ready

function listPosts(data) {
	var output ='<form class="ui-filterable"><input id="searchposts" data-type="search"></form>';
    output += '<ul data-role="listview" data-filter="true" data-input="#searchposts">';
    $.each(data.posts, function(key, val){
        // output ancher tag
        output += '<li>';
        output += '<a href="#blogpost" onclick = showPost(' + val.id + ')">';
        output += '<h3>' + val.title + '</h3>';
        output += '</a>';
        output += '</li>';
    }); //go through each post(from json plugin)
    output += '</ul>';
    $('#postlist').html(output);
} // listPosts

// list videos
function listVideos(data) {
    // console.log(data); insepct data
    var output = '';
    for (var i=0;i<data.feed.entry.length; i++) {
        var title = data.feed.entry[i].title.$t;
        var thumbnail = data.feed.entry[i].media$group.media$thumbnal[0].url;
        var description = data.feed.entry[i].media$description.$t;
        // id only exists in the last part of id url
        var id = data.feed.entry[i].id.$t.substring(38);
        
        var blocktype = ((i % 2)===1) ? 'b': 'a';
        
        output += '<div class="ui-block-' + blocktype + '">';
        // title and thumbnail
        output += '<h3 class="movietitle">' + title + '</h3>';
        // add a tag with function passing id, title and description
        output += '<a href="#videoPlayer" data-transition="fade" onclick = "playVideo(\'' + id + '\',\'' + title + '\',\'' + escape(description) + '\')">' ;
        output += '<img src="' + thumbnail + '" alt="' + title + '">';
        output += '</a>';
        output += '</div>'
    }
    $('#videoList').html(output);
}

function playVideo(id, title, description){
    // add iframe
    var output = '<iframe src="http://www.youtube.com/embed/>' + id + '?wmode=transparent&amp;HD=0&amp;rel=0&amp;showinfo=0;controls=1&amp;autoplay=1"frameborder="0" allowfullscreen></iframe>';
    output += '<h3>' + title + '</h3>';
    // escape to aviod special char
    output += '<p>' + unescape(description) + '</p>';
    $('#myplayer').html(output);
}