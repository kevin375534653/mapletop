var _____WB$wombat$assign$function_____=function(name){return(self._wb_wombat&&self._wb_wombat.local_init&&self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}
{let window=_____WB$wombat$assign$function_____("window");let self=_____WB$wombat$assign$function_____("self");let document=_____WB$wombat$assign$function_____("document");let location=_____WB$wombat$assign$function_____("location");let top=_____WB$wombat$assign$function_____("top");let parent=_____WB$wombat$assign$function_____("parent");let frames=_____WB$wombat$assign$function_____("frames");let opener=_____WB$wombat$assign$function_____("opener");function _NGM()
{this.strGameAXName="NXCOM.NxGameControl.JP.2";this.strGameFPName="application/x-npnxgame-jp"
this.strGameFPArad="application/neople-game-installer"
this.objNxGame=null;this.versionNxGame=0;this.strServerHost="platform.nexon.co.jp/Auth/NGM/Bin/NGMDll.dll";this.strNGMDllCRC="";this.strScheme="ngmj://";this.strInstallPage="pop_ngm_guide.html";if(window.navigator.userAgent.toLowerCase().indexOf('edge')>-1&&navigator.msLaunchUri!=undefined)
{this.BrowserInfo="EdgeLegacy";}
else if((window.navigator.appName=="Microsoft Internet Explorer")||(window.navigator.userAgent.toLowerCase().indexOf('trident')>-1))
{this.BrowserInfo="IE";}
else if(window.navigator.userAgent.toLowerCase().indexOf('firefox')>-1)
{this.BrowserInfo="FF";}
else if(window.navigator.userAgent.toLowerCase().indexOf('chrome')>-1)
{this.BrowserInfo="Chrome";}
else if(window.navigator.userAgent.toLowerCase().indexOf('opera')>-1)
{this.BrowserInfo="Opera";}
else
{this.BrowserInfo="Unknown";}
if(this.BrowserInfo=="IE")
{this.ModuleFormat="AX";}
else if(this.BrowserInfo=="Unknown")
{this.ModuleFormat="err";}
else
{this.ModuleFormat="NP";}
this.ErrorHandler=function NGM_ErrorHandler()
{alert("NGM Not Installed");}
this.installXPI=function NGM_installXPI(href)
{var param=new Array();param["NxGame"]=href;InstallTrigger.install(param);return false;}
this.LoadModuleInfo=function NGM_LoadModuleInfo()
{if(this.ModuleFormat=="AX")
{var xmlDoc=null;var xmlObj=null;try
{xmlDoc=new ActiveXObject("Microsoft.XMLDOM");}
catch(ex)
{}
if(xmlDoc!=null)
{xmlDoc.async="false";if(xmlDoc.loadXML(NGMModuleInfo))
{xmlObj=xmlDoc.documentElement;var nodeNGMDll=xmlObj.getElementsByTagName("NGMDll")[0];this.strServerHost=nodeNGMDll.getAttribute("host");this.strNGMDllCRC=nodeNGMDll.getAttribute("crc");}}}
else if(this.ModuleFormat=="NP")
{var parser=new DOMParser();var doc=parser.parseFromString(NGMModuleInfo,"text/xml");var xmlObj=doc.documentElement;var nodeNGMDll=xmlObj.getElementsByTagName("NGMDll")[0];this.strServerHost=nodeNGMDll.getAttribute("host");this.strNGMDllCRC=nodeNGMDll.getAttribute("crc");}};this.CreateNpObject=function NGM_CreateNpObject(strPluginId,strPluginName)
{navigator.plugins.refresh(false);var mimetype=navigator.mimeTypes[strPluginName];if(mimetype&&mimetype.enabledPlugin)
{var embed=document.createElement('embed');embed.id=strPluginId;embed.type=strPluginName;embed.pluginspage=this.strInstallPage;embed.style.visiblity="hidden";embed.style.height="0px";embed.style.width="0px";var body=document.getElementsByTagName('body');if(body!=null&&body!="undefined")
body[0].appendChild(embed);}
return document.getElementById(strPluginId);};this.InitGameControl=function NGM_InitGameControl()
{if(this.objNxGame==null)
{try
{if(this.ModuleFormat=="AX")
{this.objNxGame=new ActiveXObject(this.strGameAXName);}
else if(this.ModuleFormat=="NP")
{this.objNxGame=this.CreateNpObject('npnxgame',this.strGameFPName);}}
catch(ex)
{}
this.LoadModuleInfo();if(this.objNxGame!=null)
{this.objNxGame.ServerHost=this.strServerHost;this.objNxGame.NGMDllCRC=this.strNGMDllCRC;this.objNxGame.GameDatas="";try
{this.versionNxGame=this.objNxGame.GetVersion();}
catch(ex)
{this.versionNxGame=1.0;}}}};this.GxForceInstall=function NGM_GxForceInstall(game,arg,passport)
{this.InitGameControl();try
{var ret=this.objNxGame.ForceInstall(String(game),String(passport),String(arg));if(2==ret)
{this.ErrorHandler();}
else if(0!=ret)
{alert("Cannot Launch NGM! error code="+ret);}}
catch(ex)
{if(this.CheckPluginUnsupportBrowser())
{this.ExecuteNGMByURL(this.GenerateArgument("install",game,passport,arg),this.ErrorHandler);}
else
{this.ErrorHandler();}}}
this.IsInstalledChromePlugin=function NGM_IsInstalledChromePlugin()
{var mimetype=navigator.mimeTypes[this.strGameFPName];if(mimetype==undefined)
return false;else
return true;}
this.GxLaunchGame=function NGM_GxLaunchGame(game,arg,passport)
{this.InitGameControl();try
{var ret=this.objNxGame.Launch(String(game),String(passport),String(arg));if(2==ret)
{this.ErrorHandler();}
else if(0!=ret)
{alert("Cannot Launch NGM! error code="+ret);}}
catch(ex)
{if(this.CheckPluginUnsupportBrowser())
{this.ExecuteNGMByURL(this.GenerateArgument("launch",game,passport,arg),this.ErrorHandler);}
else
{this.ErrorHandler();}}}
this.LaunchGame=function NGM_LaunchGame(game,arg)
{var npp=this.GetCookie("NPP");this.GxLaunchGame(game,arg,npp);}
this.ForceInstall=function NGM_ForceInstall(game,arg)
{var npp=this.GetCookie("NPP");this.GxForceInstall(game,arg,npp);}
this.DownloadNGM=function NGM_DownloadNGM()
{var DownloadURL="http://web.archive.org/web/20201001001112/http://platform.nexon.co.jp/Auth/NGM/Bin/Setup.exe";location.href=DownloadURL;};this.ManualRestore=function NGM_ManualRestore(game,arg)
{this.InitGameControl();var npp=this.GetCookie("NPP");this.ExecuteNGMByURL(this.GenerateArgument("restore",game,npp,arg),this.ErrorHandler);};this.GetCookie=function NGM_GetCookie(nameVal)
{var numCookie=document.cookie.length;var oven=document.cookie.split('; ');for(var i=0;i<oven.length;i++)
{if(oven[i].indexOf('=')!=-1)
{cookieName=oven[i].substring(0,oven[i].indexOf('='));}
else
{cookieName=oven[i];}
if(cookieName==nameVal)
{if(oven[i].indexOf('=')!=-1)
{cookieVal=oven[i].substr(oven[i].indexOf('=')+1);}else{cookieVal='';}
return cookieVal;}}
return '';};this.StringTrim=function(str){return str.replace(/(^\s*)|(\s*$)/gi,"");}
this.GetChromeVersion=function(){var userAgent=window.navigator.userAgent;var chromeVersionStartPos=userAgent.indexOf("Chrome")+7;if(chromeVersionStartPos==6){return[0];}
var chromeVersionEndPos=userAgent.indexOf(" ",chromeVersionStartPos);if(chromeVersionEndPos==-1){chromeVersionEndPos=userAgent.length;}
var chromeVersionStr=userAgent.substring(chromeVersionStartPos,chromeVersionEndPos);if(this.StringTrim(chromeVersionStr)==""){return[0];}
var chromeVersionChunk=chromeVersionStr.split(".");var chromeVersionArr=new Array();for(var i=0;i<chromeVersionChunk.length;i++){chromeVersionArr.push(parseInt(chromeVersionChunk[i]));}
return chromeVersionArr;}
this.SafeRegisterEvent=function(target,eventType,cb){if(target.addEventListener){target.addEventListener(eventType,cb);return{remove:function(){target.removeEventListener(eventType,cb);}};}else{target.attachEvent(eventType,cb);return{remove:function(){target.detachEvent(eventType,cb);}};}}
this.CreateHiddenIframe=function(target,uri){var iframe=document.createElement("iframe");iframe.src=uri;iframe.id="hiddenIframe";iframe.style.display="none";target.appendChild(iframe);return iframe;}
this.GenerateArgument=function(mode,game,passport,arg){return "-dll:"+this.strServerHost+":"+this.strNGMDllCRC+" -locale:JP -mode:"+mode+" -game:"+game+":0 -token:'"+passport+"' -passarg:'"+arg+"'";}
this.ExecuteNGMByURL=function(argument,callback){switch(this.BrowserInfo){case "EdgeLegacy":case "IE":if(navigator.msLaunchUri){this.ExecuteNGMByMSLaunchUri(argument,callback);}else{var ieVer=this.GetInternetExplorerVersion();if(ieVer>=8){this.OpenUriWithHiddenFrame(argument,callback);}else{alert("Internet Explorer version is very old. Please use another browser.");}}
break;case "Chrome":case "Opera":this.ExecuteNGMByURLforChrome(argument,callback);break;case "FF":this.ExecuteNGMByURLforFirefox(argument,callback);break;}}
this.ExecuteNGMByMSLaunchUri=function(argument,callback){var launchUrl=this.strScheme+'launch/'+encodeURIComponent(argument);var timeout=setTimeout(function(){handler.remove();callback();},1000);var handler=this.SafeRegisterEvent(window,"blur",onBlur);function onBlur(){clearTimeout(timeout);handler.remove();}
navigator.msLaunchUri(launchUrl);}
this.ExecuteNGMByURLforChrome=function(argument,callback){var timeout=setTimeout(function(){handler.remove();callback();},1000);var handler=this.SafeRegisterEvent(window,"blur",onBlur);function onBlur(){clearTimeout(timeout);handler.remove();}
window.location=this.strScheme+'launch/'+encodeURIComponent(argument);}
this.ExecuteNGMByURLforFirefox=function(argument,callback){var iframe=document.querySelector("#hiddenIframe");if(!iframe){iframe=this.CreateHiddenIframe(document.body,"about:blank");}
try{iframe.contentWindow.location.href=this.strScheme+'launch/'+encodeURIComponent(argument);}
catch(e){if(e.name=="NS_ERROR_UNKNOWN_PROTOCOL"){callback();}}};this.CheckPluginUnsupportBrowser=function(){return this.BrowserInfo!="IE";};this.GetInternetExplorerVersion=function(){var rv=-1;if(navigator.appName==="Microsoft Internet Explorer"){var ua=navigator.userAgent;var re=new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");if(re.exec(ua)!=null){rv=parseFloat(RegExp.$1);}}else if(navigator.appName==="Netscape"){var ua=navigator.userAgent;var re=new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");if(re.exec(ua)!=null){rv=parseFloat(RegExp.$1);}}
return rv;};this.OpenUriWithHiddenFrame=function(argument,callback){var timeout=setTimeout(function(){handler.remove();callback();},1000);var iframe=document.querySelector("#hiddenIframe");if(!iframe){iframe=this.CreateHiddenIframe(document.body,"about:blank");}
var handler=this.SafeRegisterEvent(window,"blur",onBlur);function onBlur(){clearTimeout(timeout);handler.remove();}
var uri=this.strScheme+'launch/'+encodeURIComponent(argument);try{iframe.contentWindow.location.href=uri;}catch(e){callback();clearTimeout(timeout);}};}
var NGM=new _NGM();}