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
        
        if ($($(this)).hasClass("header_default")) {
            $('<footer data-theme="b" data-role="footer" data-position="fixed"><nav data-role="navbar"><ul><li><a href="#home" class="ui-btn ui-icon-home ui-btn-icon-top">Home</a></li><li><a href="#blog" class="ui-btn ui-icon-edit ui-btn-icon-top">Blog</a></li><li><a href="#videos" class="ui-btn ui-icon-video ui-btn-icon-top">Videos</a></li><li><a href="#photos" class="ui-btn ui-icon-camera ui-btn-icon-top">Photos</a></li><li><a href="#tweets" class="ui-btn ui-icon-comment ui-btn-icon-top">Tweets</a></li></ul></nav></footer>').appendTo($(this))
            .toolbar({position: "fixed"});
        }
        
			
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