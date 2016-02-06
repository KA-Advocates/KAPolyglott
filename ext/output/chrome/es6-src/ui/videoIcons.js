import $              from '../vendor/jQuery';
import pageHelper     from '../helpers/pageHelper';
import APIHelper      from '../helpers/APIHelper';
import contentHelper  from '../helpers/contentHelper';

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
  
  bindAppearance(){    
    $(document).on("DOMNodeInserted",(evt) => {
      if($('iframe.player').length && !$('#ka-ext-vid-icon').length){ 
        
        $('body').append('<div id="ka-ext-vid-icon"></div>');
        
        this.APIHelper.getVideoData(this.pageHelper.getVideoID(), (data) => {
          $('#ka-ext-vid-icon').append(this.contentHelper.videoIconsHTML(data));
          this.bindVideoIcons(data);           
        },
        () => {});
      }
    });
    
  }
  
  
  bindVideoIcons(){
    let self = this;
    $('#ka-ext-vid-icon .vid_icon').each(function(){
      var $icon = $(this);
      $icon.click(function(){
        var ytID = $.trim($icon.attr('data-vid'));
        $('#ka-ext-vid-icon .vid_icon').removeClass('active');
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
  
  remove(){
    this.updateState('HIDDEN');
  }
  
  add(){
    this.updateState('VISIBLE');
  }
  
};

export default videoIcons;