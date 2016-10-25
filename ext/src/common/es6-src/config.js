const CONFIG = {
  //supportedURLPattren : /https\:\/\/de\.khanacademy\.org\/math\/arithmetic\/addition\-subtraction\/basic_addition\/v\/.*/,
  videoURLPattern 	  : /^https\:\/\/.*?\.khanacademy\.org\/.*?\/v\/.*/,
  translateAPIURL     : 'https://qa.kadeutsch.org/translate.json',
  videoAPIURL         : 'https://qa.kadeutsch.org/videos.json',  
  //translateAPIURL     : 'https://www.kadeutsch.org/report/de/translate.php',
  //videoAPIURL         : 'https://www.kadeutsch.org/report/de/video.php',
  
  enabledLanguages : [ "de", "en", "fr", "ar"],
  
  // selectors for translatable strings
  stringElementSelectors : [
	'.title_k2aiyo>span',								// selects the title of exercise and videos
	'div.description_anfflz>span:first-of-type',		// selects the description for a video
	'div.description_anfflz-o_O-hideMobile_1uwvskc>span:first-of-type',		// selects the description for an exercise
  ],
  
  
};

export default CONFIG;