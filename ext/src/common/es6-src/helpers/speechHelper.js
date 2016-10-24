import $ from '../vendor/jQuery';
import ResponsiveVoice from '../vendor/responsiveVoice';

class speechHelper{
  constructor(){ 
    this.responsiveVoice = new ResponsiveVoice();
    this.responsiveVoice.init();
    
    this.voiceMaps = {
      en : 'UK English Female',
      ar : 'Arabic Male',
      de : 'Deutsch Female',
	  fr : 'French Female',
    };
  }
  
  
  speak(text, lang){
    console.log(text, lang); 
    this.responsiveVoice.speak(text,this.voiceMaps[lang]);
  }
  
}



export default speechHelper; 