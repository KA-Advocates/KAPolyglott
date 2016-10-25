import $              from '../vendor/jQuery';
import pageHelper     from '../helpers/pageHelper';
import APIHelper      from '../helpers/APIHelper';
import speechHelper   from '../helpers/speechHelper';
import contentHelper  from '../helpers/contentHelper';
import popup          from '../ui/popup';

/**
 * translateBtn models a button to display a popup window to show translated strings
 **/
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
    
    
    this.template = `<a href="#" id="ka-ext-icon" class='${this.unique}'><img  width="25px" valign="middle" src="${kango.io.getResourceUrl('assets/images/tips.png')}" ></a>`;
                    
    this.bindAppearance();
  }
  
  /**
   * Inject HTML for the button
   **/
  bindAppearance(){
    $(document).on("DOMNodeInserted",(evt) => {
      if($(this.elementPath).length && !$(`.${this.unique}`).length){
        $(this.elementPath).append(this.template);
        this.bindClick();
        this.updateState(this.state);
      }
    });
  }
  
  /**
   * Bind click even for this button
   **/
  bindClick(){
    $(`.${this.unique}`).unbind('click').click(()=>{
      this.onBtnClicked();
    });
  }
  
  getContent(){
    return $(this.elementPath).text();
	//return $.trim($(this.elementPath).text());
  }
  
  /**
   * Handler for click event on Buttons
   * It loads translation data for clicked string and shows the popup window with translations of the clicked string
   */
  onBtnClicked(){
    let content = this.getContent(); 
    this.popup.open('Please wait...');
    this.APIHelper.getTranslation(
      content,
      (data) => {
        this.popup.open(this.contentHelper.translationHTML(data,content, this.pageHelper.getBaseLanguage()));
        this.pageHelper.bindSpeakIcons((text, lang) => {
          this.speechHelper.speak(text, lang);
        });
      },
      (data) => {
        this.popup.open('Error,Try again');
      }
    );
  }
  
  
  /**
   * Toggle visibility of button
   **/
  updateState(state){
    if(state === 'HIDDEN')
      $(`.${this.unique}`).hide();
    else
      $(`.${this.unique}`).show();
    
    this.state = state;
    return this;
  }
  
  /**
   * Hide button
   **/
  remove(){
    this.updateState('HIDDEN');
  }
  
  /**
   * Show button
   **/
  add(){
    this.updateState('VISIBLE');
  }
  
};

export default translateBtn;