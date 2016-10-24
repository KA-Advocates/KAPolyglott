import $              from '../vendor/jQuery';
import pageHelper     from '../helpers/pageHelper';
import APIHelper      from '../helpers/APIHelper';
import contentHelper  from '../helpers/contentHelper';

/**
 * Class to load Video-Data and display the language Flags
 **/
class videoIcons{
  constructor(options){
    this.state    = 'HIDDEN';
    this.exists   = false;
    this.options  = options;
    
    this.pageHelper     = new pageHelper();
    this.APIHelper      = new APIHelper();
    this.contentHelper  = new contentHelper();
    
    this.bindAppearance();
  }
  
  /**
   * Inject DIV with icons for all available translated videos into the page.
   **/
  bindAppearance(){    
    $(document).on("DOMNodeInserted",(evt) => {
      if($('iframe.player').length && !$('#ka-ext-vid-icon').length){ 
        
        $('body').append('<div id="ka-ext-vid-icon"></div>');
		
		this.updateVideoData();
      }
    });
  }
  
  /**
   * remove all video icons and add new icons
   **/
  updateVideoData() {
	// load data from KAPolyglott server API
    this.APIHelper.getVideoData(this.pageHelper.getVideoID(), (data) => {
		  //remove old icons
		  $('#ka-ext-vid-icon').empty();
		  // append new icons
          $('#ka-ext-vid-icon').append(this.contentHelper.videoIconsHTML(data));
		  
		  //add active class to flag of base language
		  var selector = '#ka-ext-vid-icon [data-lang="'+this.pageHelper.getBaseLanguage()+'"]';
		  $(selector).addClass('active');
		  // bind Icons to new clickhandler
          this.bindVideoIcons(data);           
        },
        () => {});
	  
  }
  
  /**
   * Bind a click action to switch the video language to all video icons
   **/
  bindVideoIcons(){
    let self = this;
    $('#ka-ext-vid-icon .vid_icon').each(function(){
      var $icon = $(this);
      $icon.click(function(){
        var ytID = $.trim($icon.attr('data-vid'));
		// remove the class active on all video icons
        $('#ka-ext-vid-icon .vid_icon').removeClass('active');
		// add class active on this icon
        $icon.addClass('active');
        
        $('iframe.player').attr('src','https://www.youtube.com/embed/'+ytID+'?enablejsapi=1&html5=1&wmode=transparent&modestbranding=1&rel=0&fs=1&showinfo=0&autoplay=1&origin=https://de.khanacademy.org');
      });
    });
  }
  
  updateState(state){
    if(state === 'HIDDEN')
      $('#ka-ext-vid-icon').hide();
    else
      $('#ka-ext-vid-icon').show();
    
    this.state = state;
    return this;
  }
  
  /**
   * Hide video icons
   */
  remove(){
    this.updateState('HIDDEN');
  }
  
  /**
   * show video icons
   **/
  add(){
    this.updateState('VISIBLE');
  }
  
};

export default videoIcons;