var _____WB$wombat$assign$function_____=function(name){return(self._wb_wombat&&self._wb_wombat.local_init&&self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}
{let window=_____WB$wombat$assign$function_____("window");let self=_____WB$wombat$assign$function_____("self");let document=_____WB$wombat$assign$function_____("document");let location=_____WB$wombat$assign$function_____("location");let top=_____WB$wombat$assign$function_____("top");let parent=_____WB$wombat$assign$function_____("parent");let frames=_____WB$wombat$assign$function_____("frames");let opener=_____WB$wombat$assign$function_____("opener");var NpfDebug={IsDebugMode:false,TraceHandler:null,Trace:function(strMessage)
{if(NpfDebug.IsDebugMode==true)
{if(NpfDebug.TraceHandler!=null)
NpfDebug.TraceHandler(strMessage);else
alert(strMessage);}},SetTraceHandler:function(handler)
{NpfDebug.TraceHandler=handler;},RemoveTraceHandler:function(handler)
{NpfDebug.TraceHandler=null;}}
var NpfUtil={GenerateKey:function()
{return String(((new Date()).getTime()%1000000)*100
+Math.floor(Math.random()*100));},URIEncode:function(text)
{return escape(text);},EncodeXmlVisible:function(xmlText)
{xmlText=xmlText.replace(/&/g,'&amp;');xmlText=xmlText.replace(/</g,'&lt;');xmlText=xmlText.replace(/>/g,'&gt;<br>');return xmlText;}}
var NpfXmlLib={LoadText:function(xmlText)
{try
{var parser=new DOMParser();if(parser!=null)
{var xmlDoc=parser.parseFromString(xmlText,'text/xml');return xmlDoc;}}
catch(err)
{var xmlDoc=new ActiveXObject('Microsoft.XMLDOM');if(xmlDoc!=null)
{xmlDoc.async='false';xmlDoc.loadXML(xmlText);return xmlDoc;}}
NpfDebug.Trace('xml parser not exists');return null;},GetAttrValue:function(xmlElement,attrName)
{if(xmlElement.attributes.getNamedItem(attrName)!=null)
return xmlElement.attributes.getNamedItem(attrName).value;return null;}}
var NxamlParser={ParseXmlText:function(xmlText)
{var xmlDoc=NpfXmlLib.LoadText(xmlText);if(xmlDoc==null)
{NpfDebug.Trace('NpfXmlLib.LoadText fail');return null;}
return NxamlParser.ParseXmlDocument(xmlDoc);},ParseXmlDocument:function(xmlDocument)
{var rootElement=xmlDocument.documentElement;if(rootElement==null)
{NpfDebug.Trace('rootElement is null');return null;}
if(rootElement.tagName!='nxaml')
{NpfDebug.Trace('rootElement is not <nxaml>');return null;}
return NxamlParser.ParseElement(rootElement);},ParseElement:function(xmlElement)
{if(xmlElement.nodeType!=1)
return null;if(xmlElement.tagName=='arr'||xmlElement.tagName=='array')
return NxamlParser.ParseArray(xmlElement);else if(xmlElement.tagName=='str'||xmlElement.tagName=='string')
return NxamlParser.ParseString(xmlElement);else if(xmlElement.tagName=='num'||xmlElement.tagName=='number')
return NxamlParser.ParseNumber(xmlElement);else if(xmlElement.tagName=='bool'||xmlElement.tagName=='boolean')
return NxamlParser.ParseBoolean(xmlElement);else if(xmlElement.tagName=='obj'||xmlElement.tagName=='object'||xmlElement.tagName=='nxaml')
return NxamlParser.ParseObject(xmlElement);else
return NxamlParser.ParseObject(xmlElement);},ParseString:function(xmlElement)
{var value=NpfXmlLib.GetAttrValue(xmlElement,'value');return value!=null?String(value):'';},ParseNumber:function(xmlElement)
{var value=NpfXmlLib.GetAttrValue(xmlElement,'value');return value!=null?Number(value):0;},ParseBoolean:function(xmlElement)
{var value=NpfXmlLib.GetAttrValue(xmlElement,'value');if(value.toLowerCase()=="true")
{return Boolean(1);}else{return Boolean(0);}},ParseObject:function(xmlElement)
{var obj=new Object();var name;for(var i=0;i<xmlElement.childNodes.length;++i)
{name=NpfXmlLib.GetAttrValue(xmlElement.childNodes[i],'name');if(name!=null)
{childObj=NxamlParser.ParseElement(xmlElement.childNodes[i]);if(childObj!=null)
eval('obj.'+name+' = childObj;');}}
return obj;},ParseArray:function(xmlElement)
{var obj=new Array();for(var i=0;i<xmlElement.childNodes.length;++i)
{childObj=NxamlParser.ParseElement(xmlElement.childNodes[i]);if(childObj!=null)
eval('obj[ '+obj.length+' ] = childObj;');}
return obj;}}
var NxamlLib={CharSet:'utf-8',HandlerList:new Array(),ScriptList:new Array(),AppendScript:function(callbackSerial,src)
{var script=document.createElement('script');script.src=src;script.type='text/javascript';script.charset=NxamlLib.CharSet;var child=document.getElementsByTagName('head')[0].appendChild(script);NxamlLib.ScriptList[callbackSerial]=child;},RemoveScript:function(callbackSerial)
{if(NxamlLib.ScriptList!=null&&NxamlLib.ScriptList[callbackSerial]!=null)
{document.getElementsByTagName('head')[0].removeChild(NxamlLib.ScriptList[callbackSerial]);NxamlLib.ScriptList[callbackSerial]=null;}},AddHandler:function(callbackSerial,handler)
{NxamlLib.HandlerList[callbackSerial]=handler;},ExecuteHandler:function(callbackSerial,resultObject,responseXML)
{if(NxamlLib.HandlerList!=null&&NxamlLib.HandlerList[callbackSerial]!=null)
{NxamlLib.HandlerList[callbackSerial](resultObject,responseXML);NxamlLib.HandlerList[callbackSerial]=null;}},HandleResponse:function(responseXML)
{var resultObject=NxamlParser.ParseXmlText(responseXML);if(resultObject!=null&&resultObject._cs!=null)
{NxamlLib.RemoveScript(resultObject._cs);NxamlLib.ExecuteHandler(resultObject._cs,resultObject,responseXML);}},XmlHttpMethod:function(baseURL,methodName,callback)
{this.callbackSerial=NpfUtil.GenerateKey();this.queryString='?_vb='+methodName
+'&_cs='+this.callbackSerial;this.AppendParam=function(name,value)
{this.queryString+='&'+name+'='+NpfUtil.URIEncode(value);}
this.AppendStates=function(args,start)
{for(var i=start;i<args.length;++i)
{var pos=args[i].indexOf('=');if(pos!=-1)
this.AppendParam('__'+args[i].substr(0,pos),args[i].substr(pos+1));}}
this.SendRequest=function()
{NxamlLib.AddHandler(this.callbackSerial,callback);NxamlLib.AppendScript(this.callbackSerial,baseURL+this.queryString);}}}
var NpfUrlLib={ChannelingList:[["nexon.co.jp","sso.nexon.co.jp"]],GetSSOUrl:function()
{var commonurl=location.href;var pos;pos=commonurl.indexOf('://');if(pos>=0)
commonurl=commonurl.substr(pos+3);pos=commonurl.indexOf('https://web.archive.org/');if(pos>=0)
commonurl=commonurl.substr(0,pos);for(var i=0;i<NpfUrlLib.ChannelingList.length;++i)
{if(commonurl.indexOf(NpfUrlLib.ChannelingList[i][0])>=0)
{commonurl=NpfUrlLib.ChannelingList[i][1];break;}}
return location.href.substr(0,location.href.indexOf('://')+3)+commonurl+'/Ajax/Default.aspx';}}
var CommonError={NoError:0}
var AuthSystemError={Unknown:20000,NotInitialized:20001,ServiceShutdown:20002,NotAllowedLocale:20003,DBCallFailed:20004,SPException:20005,WrongIDOrPassword:20006,BlockedIp:20007,TempBlockedByLoginFail:20008,TempBlockedByWarning:20009,BlockedByAdmin:20010,AllocationFailed:20011,InvalidNexonSN:20012,SessionDataNotExist:20013,InvalidUserIP:20014,InvalidPassportKey:20015,LockFailed:20016,NexonIDMissmatched:20017,Disconnected:20018,NewSession:20019,UmgdModuleCallFailed:20020,NotAllowedServer:20021,InvalidSessionKey:20022,SoapCallFailed:20023,InvalidArgument:20024,UserNotExists:20025,WrongPwd:20026,WithdrawnUser:20027,WrongOwner:20028,InvalidChannelCode:20056,ProtectedAccount:20076}
var AuthSystem={UpdateSession:function(callback)
{var method=new NxamlLib.XmlHttpMethod(NpfUrlLib.GetSSOUrl(),'UpdateSession',callback);method.SendRequest();}}}