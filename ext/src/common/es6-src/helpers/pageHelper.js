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
  
  getVideoID(){
    return location.href.split('/').pop().replace('#','');
  }
  
  addCSS(){
    $('#ka-css').remove();
    $('head').append(`<style id="ka-css">${this.contentHelper.css()}</style>`);
  }
  
  
  titleElementPath(){
    return '.title_k2aiyo>span';
  }
  
  videoDescriptionElementPath(){
    return 'div.description_anfflz>span:first-of-type';
  }
  
  
}



export default pageHelper; 