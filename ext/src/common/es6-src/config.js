const CONFIG = {
  //supportedURLPattren : /https\:\/\/de\.khanacademy\.org\/math\/arithmetic\/addition\-subtraction\/basic_addition\/v\/.*/,
  videoURLPattern 	  : /^https\:\/\/.*?\.khanacademy\.org\/.*?\/v\/.*/,
  translateAPIURL     : 'https://qa.kadeutsch.org/translate.json',
  videoAPIURL         : 'https://qa.kadeutsch.org/videos.json',  
  //translateAPIURL     : 'https://www.kadeutsch.org/report/de/translate.php',
  //videoAPIURL         : 'https://www.kadeutsch.org/report/de/video.php',
  
  enabledLanguages : [ "de", "en", "ar"],
  
  
};

export default CONFIG;