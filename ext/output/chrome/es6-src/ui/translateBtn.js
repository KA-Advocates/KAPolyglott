import $              from '../vendor/jQuery';
import pageHelper     from '../helpers/pageHelper';
import APIHelper      from '../helpers/APIHelper';
import speechHelper   from '../helpers/speechHelper';
import contentHelper  from '../helpers/contentHelper';
import popup          from '../ui/popup';

class translateBtn{
  constructor(elementPath){
    this.state        = 'HIDDEN';
    this.elementPath  = elementPath;
    this.unique       =   'ka-translate-'+
                          (Math.random()*Math.pow(36,4) << 0).toString(36)+ 
                          (Math.random()*Math.pow(36,4) << 0).toString(36);
    
    this.pageHelper     = new pageHelper(); 
    this.speechHelper   = new speechHelper();
    this.APIHelper      = new APIHelper();
    this.contentHelper  = new contentHelper();
    this.popup          = new popup();
    
    
    this.template = `<a href="#" id="ka-ext-icon" class='${this.unique}'>
                      <img  width="25px" 
                            valign="middle" 
                            src="${kango.io.getResourceUrl('assets/images/tips.png')}" >
                    </a>`;
                    
    this.bindAppearance();
  }
  
  bindAppearance(){
    $(document).on("DOMNodeInserted",(evt) => {
      if($(this.elementPath).length && !$(`.${this.unique}`).length){
        $(this.elementPath).append(this.template);
        this.bindClick();
        this.updateState(this.state);
      }
    });
  }
  
  bindClick(){
    $(`.${this.unique}`).unbind('click').click(()=>{
      this.onBtnClicked();
    });
  }
  
  getContent(){
    return $.trim($(this.elementPath).text());
  }
  
  onBtnClicked(){
    let content = this.getContent(); 
    this.popup.open('Please wait...');
    this.APIHelper.getTranslation(
      content,
      (data) => {
        this.popup.open(this.contentHelper.traslationHTML(data));
        this.pageHelper.bindSpeakIcons((text, lang) => {
          this.speechHelper.speak(text, lang);
        });
      },
      (data) => {
        this.popup.open('Error,Try again');
      }
    );
  }
  
  
  
  updateState(state){
    if(state === 'HIDDEN')
      $(`.${this.unique}`).hide();
    else
      $(`.${this.unique}`).show();
    
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

export default translateBtn;