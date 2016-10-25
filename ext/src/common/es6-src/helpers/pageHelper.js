import $ from '../vendor/jQuery';
import contentHelper from './contentHelper';

class pageHelper{
  constructor(){
    this.contentHelper = new contentHelper();
  }
  
  findjQuery(){
    let checkjQuery = (callback) => {
      if(typeof jQuery !== 'function')
        return setTimeout(check.bind(this,callback) ,100);
      callback(jQuery);
    };
    
    return new Promise((resolve, reject) => {
      checkjQuery(resolve);
    });
  }
  
  getTitle(){
    return $.trim($('.task-title>span').text());
  }
  
  bindSpeakIcons(callback){
    $('.kaext_translations_item .speak').each(function(){
      var $icon = $(this);
      $icon.click(function(){
        var text = $.trim($icon.parent('.kaext_translations_item').text());
        var lang = $.trim($icon.attr('data-lang'));
        callback(text, lang);
      });
    });
  }
  
  /**
   * extracts the slug (excercise or video ID) from URL
   * The slug is normally the portion of the URL behind the last /
   **/
  getVideoID(){
    return location.href.split('/').pop().replace('#','');
  }
  
  /**
   * Returns language code for the base language in userAgent
   * it simply takes the hostname which on Khanacademy is the language code
   **/
  getBaseLanguage() {
	var data = location.href.replace('https://','').split('.');
	return data[0].replace('https://','');   
  }
  
  addCSS(){
    $('#ka-css').remove();
    $('head').append(`<style id="ka-css">${this.contentHelper.css()}</style>`);
  }
  
}



export default pageHelper; 