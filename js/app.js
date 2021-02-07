var tmp_post_layout;

function scroll_to(id){
  $('html,body').animate({
    scrollTop: $("#"+id).offset().top
  }, 'slow');
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
});
