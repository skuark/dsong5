var tmp_post_layout;

function scroll_to(id){
  $('html,body').animate({
    scrollTop: $("#"+id).offset().top
  }, 'slow');
}

function initialize_map() {
  var mapOptions = {
    center: new google.maps.LatLng(50.828799, -24.257812),
    zoom: 2,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
  };

  var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

  var marker_jaen = new google.maps.Marker({ position: new google.maps.LatLng(37.779594,-3.784906), map: map, title: 'Jaén' });
  var marker_granada = new google.maps.Marker({ position: new google.maps.LatLng(37.177336,-3.598557), map: map, title: 'Granada' });
  var marker_madrid = new google.maps.Marker({ position: new google.maps.LatLng(40.416775,-3.70379), map: map, title: 'Madrid' });
  var marker_malaga = new google.maps.Marker({ position: new google.maps.LatLng(36.721261,-4.421266), map: map, title: 'Málaga' });
  var marker_sevilla = new google.maps.Marker({ position: new google.maps.LatLng(37.389092,-5.984459), map: map, title: 'Sevilla' });
  var marker_estocolmo = new google.maps.Marker({ position: new google.maps.LatLng(59.329323,18.068581), map: map, title: 'Estocolmo' });
  var marker_austin = new google.maps.Marker({ position: new google.maps.LatLng(30.267153,-97.743061), map: map, title: 'Austin, Texas' });
  var marker_ginebra = new google.maps.Marker({ position: new google.maps.LatLng(46.198392,6.142296), map: map, title: 'Ginebra' });
}

function random_post() {
  $.ajax({
    url: "http://www.dsong.es/api/dsong/dsong_random/",
    dataType: "jsonp",
    success: function(data){
      render_post(data);
    }
  });
}

function render_post(song) {
  $('.post').html(tmp_post_layout);

  $('.post_title').html(song.title);
  $('.post_date .date').html(song.date);
  $('.post_photo img').attr('src', song.thumbnail[0]);
  $('.post_content').html(song.content);
  $('.post_author .avatar').html(song.author_avatar);
  $('.post_author .name').html(song.author);
  $('.post_link a').attr('href', song.link);

  if (song.audio_origen && song.audio_tipo && song.audio_id) {
    switch (song.audio_origen) {
      case 'Grooveshark':
        switch (song.audio_tipo) {
          case 'Canción':
            $('.post_audio').html('<object width="229" height="40"><param name="movie" value="http://grooveshark.com/songWidget.swf" /><param name="wmode" value="window" /><param name="allowScriptAccess" value="always" /><param name="flashvars" value="hostname=cowbell.grooveshark.com&songIDs=' + song.audio_id + '&style=metal&p=0" /><embed src="http://grooveshark.com/songWidget.swf" type="application/x-shockwave-flash" width="229" height="40" flashvars="hostname=cowbell.grooveshark.com&songIDs=' + song.audio_id + '&style=metal&p=0" allowScriptAccess="always" wmode="window" /></object>');
            break;
          case 'Lista':
            $('.post_audio').html('<object width="229" height="200"><param name="movie" value="http://grooveshark.com/widget.swf" /><param name="wmode" value="window" /><param name="allowScriptAccess" value="always" /><param name="flashvars" value="hostname=cowbell.grooveshark.com&playlistID=' + song.audio_id + '&bbg=2b2b2b&bth=2b2b2b&pfg=2b2b2b&lfg=2b2b2b&bt=7A7A7A&pbg=7A7A7A&pfgh=7A7A7A&si=7A7A7A&lbg=7A7A7A&lfgh=7A7A7A&sb=7A7A7A&bfg=D6D6D6&pbgh=D6D6D6&lbgh=D6D6D6&sbh=D6D6D6&p=0" /><embed src="http://grooveshark.com/widget.swf" type="application/x-shockwave-flash" width="229" height="200" flashvars="hostname=cowbell.grooveshark.com&playlistID=' + song.audio_id + '&bbg=2b2b2b&bth=2b2b2b&pfg=2b2b2b&lfg=2b2b2b&bt=7A7A7A&pbg=7A7A7A&pfgh=7A7A7A&si=7A7A7A&lbg=7A7A7A&lfgh=7A7A7A&sb=7A7A7A&bfg=D6D6D6&pbgh=D6D6D6&lbgh=D6D6D6&sbh=D6D6D6&p=0" allowScriptAccess="always" wmode="window" /></object>');
            break;
        }
        break;
      case 'Goear':
        switch (song.audio_tipo) {
          case 'Canción':
            $('.post_audio').html('<object class="goear" width="229" height="100"><embed src="http://www.goear.com/files/external.swf?file=' + song.audio_id + '" type="application/x-shockwave-flash" wmode="transparent" quality="high" width="229" height="100"></embed></object>');
            break;
        }
        break;
      case 'SoundCloud':
        switch (song.audio_tipo) {
          case 'Canción':
            $('.post_audio').html('<iframe width="100%" height="166" scrolling="no" frameborder="no" src="http://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F' + song.audio_id + '&amp;auto_play=false&amp;show_artwork=false&amp;color=ff7700"></iframe>');
            break;
        }
        break;
    }
  } else {
    $('.post_audio').html('');
  }

  if (song.video_origen && song.video_id) {
    switch (song.video_origen) {
      case 'YouTube':
        $('.post_video').html('<object style="height: 200px; width: 229px"><param name="movie" value="http://www.youtube.com/v/' + song.video_id + '?version=3"><param name="allowFullScreen" value="true"><param name="allowScriptAccess" value="always"><embed src="http://www.youtube.com/v/' + song.video_id + '?version=3" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always" width="229" height="200"></object>');
        break;
    }
  } else {
    $('.post_video').html('');
  }

  if (song.spotify)
    $('.post_spotify').html('<iframe src="https://embed.spotify.com/?uri=' + song.spotify + '" width="229" height="80" frameborder="0" allowtransparency="true"></iframe>')
  else
    $('.post_spotify').html('')

  $('.post').show();
}

$(document).ready(function(){

  $('.start').click(function(){
    scroll_to('numbers');
  });

  $('#artists .view_all').click(function(){
    $('#artists li').addClass('visible');
    $('#artists .view_all').parent().remove();
  });

  $('#genres .view_all').click(function(){
    $('#genres li').addClass('visible');
    $('#genres .view_all').parent().remove();
  });

  initialize_map();

  $('.give_me_a_random_post').click(function(){
    tmp_post_layout = $('.post').html();
    $('.post').html('<p class="lead"><img src="images/ajax-loader.gif"></p>');

    random_post();
    scroll_to('random');
  });

  random_post();

});
