function getResourceUrl(e){return"resource://"+_RESOURCE_PATH_ID_+"/"+e}function resolvePath(e){return getResourceUrl(e+".js")}function unload(){removeMessageListener(unloadMessageName,unload,!1),loader&&(loader.dispose(),loader=null)}var _RESOURCE_PATH_ID_=Components.stack.filename.match(/\/\/([^\/]*)\//)[1],contentFrameMessageManager=this,unloadMessageName=getResourceUrl("message-unload");Components.utils["import"](resolvePath("kango/loader"));var loader=new Loader(resolvePath,{contentFrameMessageManager:contentFrameMessageManager,getResourceUrl:getResourceUrl,__extensionInfo:loadExtensionInfo(getResourceUrl),content:content,docShell:docShell,addEventListener:addEventListener,removeEventListener:removeEventListener});loader.require("includes/content"),addEventListener("unload",function(e){e.target==contentFrameMessageManager&&unload()},!1),addMessageListener(unloadMessageName,unload,!1);