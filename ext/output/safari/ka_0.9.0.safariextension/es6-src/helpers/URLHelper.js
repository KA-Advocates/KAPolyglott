export class URLHelper{
  constructor(){
    this._subscribersToChange = [];
    this._isChecking          = false;
    this._URLCheckinterval    = 100;
    this._resentLoction       = null;
  }
  
  matchesPattren(pattren){
    return Boolean(location.href.match(pattren));
  }
  
  subscribeToChange(cb){
    if(typeof cb !== 'function')
      return false;
    
    this._subscribersToChange.push(cb);
    this.startCheckingForChanges();
    return this;
  }
  
  startCheckingForChanges(){
    if(this._isChecking)
      return;
    
    this._resentLoction = location.href;
    
    setInterval(function(){
      if(location.href !== this._resentLoction){
        this._resentLoction = location.href;
        this._subscribersToChange.forEach((callBack) => {
          callBack(this._resentLoction);
        });
      }
    },this._URLCheckinterval);
    
    this._isChecking = true;
  }
}

export default URLHelper;
