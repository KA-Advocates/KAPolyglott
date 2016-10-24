import $ from '../vendor/jQuery';
import CONFIG from '../config';

export class contentHelper{
  constructor(){}
  
  addTranslationItem(html, lang, str){
		  html.push('<div class="kaext_translations_item">');
		  html.push(''+
					  "<img valign='bottom' src='"+kango.io.getResourceUrl("assets/images/flags/"+lang+".png")+"' />"+
					'');
					
		  html.push('');
		  html.push(str);
		  html.push('');
		  
		  html.push('');
		  html.push("<img class='clickable speak' data-lang='"+lang+"' src='"+kango.io.getResourceUrl("assets/images/Speaker_Icon.png")+"' />");
		  html.push('');	
		  html.push('</div>');		  
  }
  /**
   * Generate HTML for the Popup-Window displaying the translations
   * data : Dictionary with Strings, Language
   **/
  traslationHTML(data){
    var html = [];
    html.push('<div class="kaext_translations">');
	var self = this;
	$.each(CONFIG.enabledLanguages,function(key,lang){

		if ( data[lang] != undefined ) {
		  self.addTranslationItem(html, lang, data[lang]);
		}
	});
	
	if (html.length == 1 ) {
	  
	  html.push("no translations for this string found");
	}	
    html.push('</div>');
    return html.join("\n");
  }
  
  /**
   * Generate HTML-Icon vor all available languages
   **/
  videoIconsHTML(data){
    var html = [];
	
    $.each(CONFIG.enabledLanguages,function(key,lang){
		var url = data[lang];
		// the url has the format https://www.youtube.com/watch?v=6WwRwxkLuP0, extract the youtube_id
		var youtube_id = url.split("=").pop();
	
		html.push('<div class="vid_icon clickable vid_flag_'+lang+'" data-vid="'+youtube_id+'" data-lang="'+lang+'">'+
                  '<img src="'+kango.io.getResourceUrl('assets/images/flags/'+lang+'.png')+'">'+
                '</div>');
    })
    return html.join("\n");
  }

  /**
   * Generate CSS to be injected into page for KA Polyglott
   **/
  css(){
    return `.kaext_translations{
      width:70%;
      background:white;
      margin:auto;
      padding:30px;
    }

    .kaext_translations_item{
      font-size:20px;  
    }

    .kaext_translations_item img{
      vertical-align:bottom;  
    }
    .clickable{
      cursor:pointer;
    }

    #ka-ext-vid-icon{
      position: absolute;
      top: 270px;
      right: 0;
      z-index: 21; 
      padding: 10px;
      background: white;
    }

    #ka-ext-vid-icon .vid_icon{
      border:3px solid white;
    }
    #ka-ext-vid-icon .vid_icon.active{
      border:3px solid #9CC333;
      background:#9CC333;
    }

    .text-right{
      text-align:right;
    }`;
  }
  
  
}

export default contentHelper;
