jQuery(document).ready(function($) {
  
  
  //Intialize Fancybox
  $(".fancybox").fancybox();
  
  //jSticky Items
  if($('.feature-archive_masthead').length){
    $( '.header, .feature-archive_masthead' ).wrapAll( "<div class='stickyarea'></div>" );
    $('.header').stick_in_parent();
  }
  if($('.feature-masthead_posts').length){
    $( '.header, .feature-masthead_posts' ).wrapAll( "<div class='stickyarea'></div>" );
    $('.header').stick_in_parent();
  }
  if($('.layout-single').length){
    $('.feature-recent_posts').stick_in_parent();
  }
  
  //Initialize mobilenav
  $('.mobile_toggle-action').toggleMobileNav();

  //Initialize Masthead Slider
  $('.feature-masthead_posts').mastheadSlider();

  //Initialize AutoResize
  //autosize($('textarea'));

  //Initialize Search Expand  
  $('.site_search-form').expandSearch();

  //Place Image Credit
  if ($('.single_post-the_content img, .loop_content-single_page img').attr('data-credit')) {
    $( '.single_post-the_content img, .loop_content-single_page img' ).each(function() {
      
      //Set Credit
      var credit = $(this).data('credit');
   
      //Credit Conditions
      if( $(this).parent().hasClass('wp-caption')){
        
        //Credits for images with caption   
        $(this).parent().append('<p class="wp-caption-text meta_title">'+credit+'</p>'); 
      }else{
        
        //Credits for images without captions
        var image_classes = $(this).attr('class');
        $(this).wrap( '<div class="wp-caption '+ image_classes +'"></div>');
        $(this).parent().append('<p class="wp-caption-text meta_title">'+credit+'</p>'); 
      }
    });
  }
});
