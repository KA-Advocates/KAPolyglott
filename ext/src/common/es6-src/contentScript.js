import CONFIG         from './config';
import jQuery         from './vendor/jQuery'; 
import pageHelper     from './helpers/pageHelper';
import URLHelper      from './helpers/URLHelper';
import APIHelper      from './helpers/APIHelper';
import contentHelper  from './helpers/contentHelper';
import speechHelper   from './helpers/speechHelper';
import translateBtn   from './ui/translateBtn';
import videoIcons     from './ui/videoIcons';
import popup          from './ui/popup';



class KAPolyglott{
  constructor(){
    this.pageHelper = new pageHelper();
    this.URLHelper  = new URLHelper();
    this.APIHelper  = new APIHelper();
    this.contentHelper  = new contentHelper();
    this.speechHelper  = new speechHelper();
    
    this.titleHintBtn             = new translateBtn(this.pageHelper.titleElementPath());
    this.videoDescriptionHintBtn  = new translateBtn(this.pageHelper.videoDescriptionElementPath());
                       
    this.videoIcons = new videoIcons();
    this.popup      = new popup();
  }
    
  isVideoURL(){
    return this.URLHelper.matchesPattren( CONFIG.videoURLPattern ); 
  } 
  
  //When url is changed
  onURLChange(){
	this.pageHelper.addCSS();  
    this.titleHintBtn.remove();
    this.videoDescriptionHintBtn.remove();
    this.titleHintBtn.add();
    this.videoDescriptionHintBtn.add();
	
	// Video icons are only displayed if we are on a video URL
    this.videoIcons.remove();  
    if(this.isVideoURL()){
      this.videoIcons.add();
	  this.videoIcons.updateVideoData();
    }
  }
  
  //starts everything
  init(){
    this.URLHelper.subscribeToChange(()=>{
      this.onURLChange(); 
    });
    
    //Trigger it manually the first time
    this.onURLChange();
  }
  
}



//start the process
(new KAPolyglott()).init();





