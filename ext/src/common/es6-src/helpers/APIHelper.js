import CONFIG from '../config';
import pageHelper     from '../helpers/pageHelper';

export class APIHelper{
  constructor(){
	      this.pageHelper     = new pageHelper();
  }
  
  /**
   * Load the Translations for a specific String
   *
   **/
  getTranslation(title, success, failure){
    var details = {
      method      : 'GET',
      url         : CONFIG.translateAPIURL,
      params      : {'lang': this.pageHelper.getBaseLanguage(), 's': encodeURI(title) },
    };

    kango.xhr.send(details, (data) => {
      if (data.status == 200 && data.response != null){
        let dataParsed = {};
        try{
          dataParsed = JSON.parse(data.response)
        }catch(e){
          return failure(data.response);
        }
        success(dataParsed);
      }
      else
        failure(data.response);
      
    });
  }
  
  /**
   * Load the Videodata from Server for a specific Video-SLUG
   **/
  getVideoData(ID, success, failure){
    
    var details = {
      method      : 'GET',
      url         : CONFIG.videoAPIURL,
      params      : {'id':ID},
    };

    kango.xhr.send(details, (data) => {
      if (data.status == 200 && data.response != null){
        let dataParsed = {};
        try{
          dataParsed = JSON.parse(data.response)
        }catch(e){
          return failure(data.response);
        }
        success(dataParsed);
      }
      else
        failure(data.response);
      
    });
    
   
  };
    
  
}

export default APIHelper;
