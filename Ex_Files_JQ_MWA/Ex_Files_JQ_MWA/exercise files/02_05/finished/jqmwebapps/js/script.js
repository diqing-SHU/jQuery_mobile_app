function listPosts(data) {
  var output = '<form class="ui-filterable"><input id="searchposts" data-type="search"></form>';

  output += '<ul data-role="listview" data-filter="true" data-input="#searchposts">';
  $.each(data.posts, function(key, val) {
    output += '<li>';
    output += '<a href="#blogpost" onclick = showPost(' + val.id + ')">';
    output += '<h3>' + val.title + "</h3>";
    output += '</a>';
    output += '</li>';
  }); //go through each post
  output += "</ul>";
  $('#postlist').html(output);
} //listPosts