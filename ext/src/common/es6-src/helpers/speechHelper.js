import $ from '../vendor/jQuery';
import ResponsiveVoice from '../vendor/responsiveVoice';

class speechHelper{
  constructor(){ 
    this.responsiveVoice = new ResponsiveVoice();
    this.responsiveVoice.init();
    
	// Not used Speeches
	//
	// UK English Female
	// UK English Male
	// US English Female
    // Australian Female
    // Spanish Latin American Female
    //
	// Moldavian Male
	// Montenegrin Male
	// Serbo-Croatian Male
	
    this.voiceMaps = {
      en : 'UK English Female',
      ar : 'Arabic Male',
      de : 'Deutsch Female',
	  fr : 'French Female',
	  es : 'Spanish Female',
	  it : 'Italian Female',
	  gr : 'Greek Female',
	  hu : 'Hungarian Female',
	  tr : 'Turkish Female',
	  ru : 'Russian Female',
	  nl : 'Dutch Female',
	  sw : 'Swedish Female',
	  nb : 'Norwegian Female',
	  jp : 'Japanese Female',
	  kr : 'Korean Female',
	  zh : 'Chinese Female',
	  hi : 'Hindi Female',
	  sr : 'Serbian Male',
	  hr : 'Croatian Male',
	  'bs-BA' : 'Bosnian Male',
	  ro : 'Romanian Male',
	  ca : 'Catalan Male',
	  fi : 'Finnish Female',
	  af : 'Afrikaans Male',
	  sq : 'Albanian Male',
	  'hy-AM' : 'Armenian Male',
	  cz : 'Czech Female',
	  da : 'Danish Female',
	  eo : 'Esperanto Male',
	  ht : 'Hatian Creole Female',
	  is : 'Icelandic Male',
	  id : 'Indonesian Female',
	  lv : 'Latvian Male',
	  mk : 'Macedonian Male',
	  pl : 'Polish Female',
	  'pt-BR' : 'Brazilian Portuguese Female',
	  pt : 'Portuguese Female',
	  sk : 'Slovak Female',
	  cy : 'Welsh Male',
	  la : 'Latin Female',

    };
  }
  
  
  speak(text, lang){
    console.log(text, lang); 
    this.responsiveVoice.speak(text,this.voiceMaps[lang]);
  }
  
}



export default speechHelper; 