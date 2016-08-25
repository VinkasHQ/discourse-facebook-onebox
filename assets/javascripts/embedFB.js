(function ($) {
  'use strict';

  $("#main .fb-post").attr("fb-xfbml-state", "rendered");
  $("#main .fb-video").attr("fb-xfbml-state", "rendered");
  if ($('#fb-root').length == 0 )
  $('body').prepend('<div id="fb-root"></div>');
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) FB.XFBML.parse();
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  $(document).on('click', '.fb-xfbml-parse-ignore blockquote a:first', function ( event ) {
	var quote = $( event.target ).closest('blockquote').parent();
	$(quote).removeClass("fb-xfbml-parse-ignore");
	if($(quote).hasClass("video"))
		$(quote).removeClass("video").addClass("fb-video");
	else
		$(quote).removeClass("post").addClass("fb-post");
    $(quote).each(function (i) {
		parseXFBML(this[0]);
	});
    return false;
  });

  $(document).on('click', '.fb-xfbml-parse-ignore blockquote i.fa-chevron-down', function ( event ) {
	var quote = $( event.target ).closest('blockquote').parent();
	$(quote).removeClass("fb-xfbml-parse-ignore");
	if($(quote).hasClass("video"))
		$(quote).removeClass("video").addClass("fb-video");
	else
		$(quote).removeClass("post").addClass("fb-post");
	$(quote).each(function (i) {
		parseXFBML(this[0]);
	});
    return false;
  });

  function parseXFBML(elem) {
    if (typeof(FB) != 'undefined') {
      FB.XFBML.parse(elem);
    }
  }
  
  $.fn.embedFB = function () {
    $(this).each(function () {
		$(this).children('blockquote a:first').prepend('<i class="fa fa-facebook-square"></i> ');
		$(this).children('blockquote').prepend('<div class="quote-controls"><i class="fa fa-chevron-down" title="expand/collapse"></i></div>');
	});
  };

})(jQuery);
