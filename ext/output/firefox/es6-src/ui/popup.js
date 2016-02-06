import $        from '../vendor/jQuery';
import jqPopup  from '../vendor/jquery.popupoverlay';

class popup{
  constructor(){}
  
  injectPopup(){
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
  }
  
  open(content){
    if(!$('#kaext_popup').length)
      this.injectPopup();
    $('.kaext_popup_content').html('').append(content);
    $('#kaext_popup').popup('show');
  }
  
};

export default popup;