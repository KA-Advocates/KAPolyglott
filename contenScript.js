(function(){
  function kaExtension($){
    var self = this;
    
    this.translateAPIURL = 'https://www.kadeutsch.org/report/de/translate.php';
    this.videoAPIURL = 'https://www.kadeutsch.org/report/de/video.php';
    
    this.supportedURLPattren = /https\:\/\/de\.khanacademy\.org\/math\/arithmetic\/addition\-subtraction\/basic_addition\/v\/.*/;
    
    this.data = {
      'translate' : {
        'Einfache Addition' : 
[{"lang":"de","value":"Einfache Addition"},{"lang":"en","value":"Simple addition"},{"lang":"ar","value":"\u0625\u0636\u0627\u0641\u0629 \u0628\u0633\u064a\u0637\u0629"}],
      },
      'video' : {
        'Einfache Addition' : 
[{"lang":"de","youtube_id":"G8YSITorz8E"},{"lang":"en","youtube_id":"AuX7nPBqDts"},{"lang":"ar","youtube_id":"B5k-CoJfmLs"}]
      }
    };
    
    this.isSupportedURL = function(){
      return Boolean(location.href.match(self.supportedURLPattren));
    };
    
    this.iconPresent = false;
    this.removeIcon = function(){
      self.iconPresent = false;  
      $('#ka-ext-icon').remove()
    };
    
    this.addIcon = function(){
      $(document).on("DOMNodeInserted",function(evt){
        if(self.iconPresent)
          return;
        
        if($('.task-title').length && !$('#ka-ext-icon').length){
          $('.task-title').append('<a href="#" id="ka-ext-icon">'+
                                  '<img width="25px" valign="middle" src="'+chrome.extension.getURL("images/button-14-30.png")+'" alt="" >'+
                                  '</a>');
          self.bindTitleIcon();
          self.iconPresent = true;
        }
      });
    };
    
    this.addPopup = function(){
      $('body').append([
        "<style>",
          "#kaext_popup{",
            "width: 70%;",
            "background: #9CC333;",
            "border-radius: 8px;",
          "}",
          ".kaext_popup_wrapper{",
            "padding:30px;",
          "}",
        "</style>",
        "<div id='kaext_popup'>",
          "<div class='kaext_popup_wrapper'>",
            "<div class='text-right'><button class='kaext_popup_close'>X</button></div>",
            "<div class='kaext_popup_content'></div>",
          "</div>",
      "</div>"].join("\n"));
    };
    
 
    this.traslationHTML = function(data){
      var html = [];
      html.push('<div class="kaext_translations">');
      $.each(data,function(k,i){
        html.push('<div class="kaext_translations_item">');
        html.push(''+
                    "<img valign='bottom' src='"+chrome.extension.getURL("images/flags/"+i.lang+".png")+"' />"+
                  '');
                  
        html.push('');
        html.push(i.value);
        html.push('');
        
        html.push('');
        html.push("<img class='clickable speak' data-lang='"+i.lang+"' src='"+chrome.extension.getURL("images/Speaker_Icon.png")+"' />");
        html.push('');
        
        html.push('</div>');
      });
      html.push('</div>');
      return html.join("\n");
    };
    
    this.openPopup = function(content){
      if(!$('#kaext_popup').length)
        self.addPopup();
      $('.kaext_popup_content').html('').append(content);
      $('#kaext_popup').popup('show');
    };
    
    this.getTranslation = function(title,success,failure){
      $.get(self.translateAPIURL,{'lang': 'de', 's': title })
        .fail(failure)
        .done(success);
        /*
      http://www.kadeutsch.org/report/de/translate.php?lang=de&s=Einfache%20Addition
      https://de.khanacademy.org/math/arithmetic/addition-subtraction/basic_addition/v/basic-addition#
      if(self.data.translate[title])
        return success(self.data.translate[title]);
      failure();*/
    };
    
    this.speak = function(text,lang){
      //console.log(text);
      //var utterance = new SpeechSynthesisUtterance(text);
      //utterance.rate = 0.8;
      //window.speechSynthesis.speak(utterance);
      chrome.runtime.sendMessage({"lang": lang,"text": text}, function(response) {
        //console.log(response.farewell);
      });
    };
    
    this.bindSpeakIcons = function(){
      $('.kaext_translations_item .speak').each(function(){
        var $icon = $(this);
        $icon.click(function(){
          var text = $.trim($icon.parent('.kaext_translations_item').text());
          var lang = $.trim($icon.attr('data-lang'));
          self.speak(text, lang);
        });
      });
    };
    
    this.bindTitleIcon = function(){
      if(!$('#ka-ext-icon').length)
        return false;
      
      $('#ka-ext-icon').click(function(){
        var title = self.getPageTitle();
        self.openPopup('Please wait...');
        self.getTranslation(title,
        function(_data){
          var data = JSON.parse(_data);
          self.openPopup(self.traslationHTML(data));
          self.bindSpeakIcons();
        },
        function(data){self.openPopup('Error,Try again');});
        
      });
    };
    
    this.getPageTitle = function(){
      return $.trim($('.task-title>span').text());
    };
    
    this.getVideoData = function(ID,success,failure){
      $.get(self.videoAPIURL,{'id':ID})
        .fail(failure)
        .done(success);
    };
    
    this.videoIconsHTML = function(data){
      var html = [];
      $.each(data,function(key, item){
        html.push('<div class="vid_icon clickable vid_flag_'+item.lang+'" data-vid="'+item.youtube_id+'" data-lang="'+item.lang+'">'+
                    '<img src="'+chrome.extension.getURL('images/flags/'+item.lang+'.png')+'">'+
                  '</div>');
      })
      return html.join("\n");
    };
    
    this.bindVideoIcons = function(data){
      $('#ka-ext-vid-icon .vid_icon').each(function(){
        var $icon = $(this);
        $icon.click(function(){
          var ytID = $.trim($icon.attr('data-vid'));
          $('#ka-ext-vid-icon .vid_icon').removeClass('active');
          $icon.addClass('active');
          
          $('iframe.player').attr('src','https://www.youtube.com/embed/'+ytID+'?enablejsapi=1&html5=1&wmode=transparent&modestbranding=1&rel=0&fs=1&showinfo=0&autoplay=1&origin=https://de.khanacademy.org');
        });
      });
    };
    
    this.videoIconPresent = false;
    this.removeVideoIcons = function(){
      self.videoIconPresent = false;
      $('#ka-ext-vid-icon').remove();
    };
    
    this.addVideoIcons = function(){
      $(document).on("DOMNodeInserted",function(evt){
        if(self.videoIconPresent)
          return;
        
        if($('iframe.player').length && !$('#ka-ext-vid-icon').length){
          
          $('body').append('<div id="ka-ext-vid-icon"></div>');
          
          self.getVideoData(self.getVideoID(), function(_data){
            var data = JSON.parse(_data);
            $('#ka-ext-vid-icon').append(self.videoIconsHTML(data));
            self.bindVideoIcons(data);      
          },
          function(){});
          
          self.videoIconPresent = true;
        }
      });
    };
    
    this.getVideoID = function(){
      return location.href.split('/').pop().replace('#','');
    };
    
    this.onUrlChange = function(cb){
      console.log('subscribed for URL change');
      var _location = location.href;
      setInterval(function(){
        if(location.href !== _location){
          _location = location.href;
          cb(_location);
        }
      },100);
    };
    
  }
​
  
  
  function onDocLoad($){
    
    if(typeof(jQuery) !== 'function')
      return setTimeout(onDocLoad,100);    
    
    jQuery(function($){
      var ext = new kaExtension($);
      if(ext.isSupportedURL()){
        ext.addIcon();
        ext.addVideoIcons();        
      }
  
      ext.onUrlChange(function(url){
        ext.removeIcon();
        ext.removeVideoIcons();
        if(ext.isSupportedURL()){
          ext.addIcon();
          ext.addVideoIcons();          
        }
        
      });
    });
  }
  onDocLoad();
  
})();
