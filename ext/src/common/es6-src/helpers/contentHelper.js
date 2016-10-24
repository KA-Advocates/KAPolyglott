import $ from '../vendor/jQuery';

export class contentHelper{
  constructor(){}
  
  /**
   * Generate HTML for the Popup-Window displaying the translations
   * data : Dictionary with Strings, Language
   **/
  traslationHTML(data){
    var html = [];
    html.push('<div class="kaext_translations">');
    $.each(data,function(k,i){
      html.push('<div class="kaext_translations_item">');
      html.push(''+
                  "<img valign='bottom' src='"+kango.io.getResourceUrl("assets/images/flags/"+i.lang+".png")+"' />"+
                '');
                
      html.push('');
      html.push(i.value);
      html.push('');
      
      html.push('');
      html.push("<img class='clickable speak' data-lang='"+i.lang+"' src='"+kango.io.getResourceUrl("assets/images/Speaker_Icon.png")+"' />");
      html.push('');
      
      html.push('</div>');
    });
    html.push('</div>');
    return html.join("\n");
  }
  
  /**
   * Generate HTML-Icon vor all available languages
   **/
  videoIconsHTML(data){
    var html = [];
    $.each(data,function(key, item){
      html.push('<div class="vid_icon clickable vid_flag_'+item.lang+'" data-vid="'+item.youtube_id+'" data-lang="'+item.lang+'">'+
                  '<img src="'+kango.io.getResourceUrl('assets/images/flags/'+item.lang+'.png')+'">'+
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
