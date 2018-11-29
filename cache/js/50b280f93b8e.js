;/*!
 * clipboard.js v1.5.12
 * https://zenorocha.github.io/clipboard.js
 *
 * Licensed MIT © Zeno Rocha
 */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Clipboard=f()}})(function(){var define,module,exports;return(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){var matches=require('matches-selector');module.exports=function(element,selector,checkYoSelf){var parent=checkYoSelf?element:element.parentNode;while(parent&&parent!==document){if(matches(parent,selector))return parent;parent=parent.parentNode}}},{"matches-selector":5}],2:[function(require,module,exports){var closest=require('closest');function delegate(element,selector,type,callback,useCapture){var listenerFn=listener.apply(this,arguments);element.addEventListener(type,listenerFn,useCapture);return{destroy:function(){element.removeEventListener(type,listenerFn,useCapture);}}}
function listener(element,selector,type,callback){return function(e){e.delegateTarget=closest(e.target,selector,true);if(e.delegateTarget){callback.call(element,e);}}}
module.exports=delegate;},{"closest":1}],3:[function(require,module,exports){exports.node=function(value){return value!==undefined&&value instanceof HTMLElement&&value.nodeType===1;};exports.nodeList=function(value){var type=Object.prototype.toString.call(value);return value!==undefined&&(type==='[object NodeList]'||type==='[object HTMLCollection]')&&('length'in value)&&(value.length===0||exports.node(value[0]));};exports.string=function(value){return typeof value==='string'||value instanceof String;};exports.fn=function(value){var type=Object.prototype.toString.call(value);return type==='[object Function]';};},{}],4:[function(require,module,exports){var is=require('./is');var delegate=require('delegate');function listen(target,type,callback){if(!target&&!type&&!callback){throw new Error('Missing required arguments');}
if(!is.string(type)){throw new TypeError('Second argument must be a String');}
if(!is.fn(callback)){throw new TypeError('Third argument must be a Function');}
if(is.node(target)){return listenNode(target,type,callback);}
else if(is.nodeList(target)){return listenNodeList(target,type,callback);}
else if(is.string(target)){return listenSelector(target,type,callback);}
else{throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');}}
function listenNode(node,type,callback){node.addEventListener(type,callback);return{destroy:function(){node.removeEventListener(type,callback);}}}
function listenNodeList(nodeList,type,callback){Array.prototype.forEach.call(nodeList,function(node){node.addEventListener(type,callback);});return{destroy:function(){Array.prototype.forEach.call(nodeList,function(node){node.removeEventListener(type,callback);});}}}
function listenSelector(selector,type,callback){return delegate(document.body,selector,type,callback);}
module.exports=listen;},{"./is":3,"delegate":2}],5:[function(require,module,exports){var proto=Element.prototype;var vendor=proto.matchesSelector||proto.webkitMatchesSelector||proto.mozMatchesSelector||proto.msMatchesSelector||proto.oMatchesSelector;module.exports=match;function match(el,selector){if(vendor)return vendor.call(el,selector);var nodes=el.parentNode.querySelectorAll(selector);for(var i=0;i<nodes.length;++i){if(nodes[i]==el)return true;}
return false;}},{}],6:[function(require,module,exports){function select(element){var selectedText;if(element.nodeName==='INPUT'||element.nodeName==='TEXTAREA'){element.focus();element.setSelectionRange(0,element.value.length);selectedText=element.value;}
else{if(element.hasAttribute('contenteditable')){element.focus();}
var selection=window.getSelection();var range=document.createRange();range.selectNodeContents(element);selection.removeAllRanges();selection.addRange(range);selectedText=selection.toString();}
return selectedText;}
module.exports=select;},{}],7:[function(require,module,exports){function E(){}
E.prototype={on:function(name,callback,ctx){var e=this.e||(this.e={});(e[name]||(e[name]=[])).push({fn:callback,ctx:ctx});return this;},once:function(name,callback,ctx){var self=this;function listener(){self.off(name,listener);callback.apply(ctx,arguments);};listener._=callback
return this.on(name,listener,ctx);},emit:function(name){var data=[].slice.call(arguments,1);var evtArr=((this.e||(this.e={}))[name]||[]).slice();var i=0;var len=evtArr.length;for(i;i<len;i++){evtArr[i].fn.apply(evtArr[i].ctx,data);}
return this;},off:function(name,callback){var e=this.e||(this.e={});var evts=e[name];var liveEvents=[];if(evts&&callback){for(var i=0,len=evts.length;i<len;i++){if(evts[i].fn!==callback&&evts[i].fn._!==callback)
liveEvents.push(evts[i]);}}
(liveEvents.length)?e[name]=liveEvents:delete e[name];return this;}};module.exports=E;},{}],8:[function(require,module,exports){(function(global,factory){if(typeof define==="function"&&define.amd){define(['module','select'],factory);}else if(typeof exports!=="undefined"){factory(module,require('select'));}else{var mod={exports:{}};factory(mod,global.select);global.clipboardAction=mod.exports;}})(this,function(module,_select){'use strict';var _select2=_interopRequireDefault(_select);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}
var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}
return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var ClipboardAction=function(){function ClipboardAction(options){_classCallCheck(this,ClipboardAction);this.resolveOptions(options);this.initSelection();}
ClipboardAction.prototype.resolveOptions=function resolveOptions(){var options=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];this.action=options.action;this.emitter=options.emitter;this.target=options.target;this.text=options.text;this.trigger=options.trigger;this.selectedText='';};ClipboardAction.prototype.initSelection=function initSelection(){if(this.text){this.selectFake();}else if(this.target){this.selectTarget();}};ClipboardAction.prototype.selectFake=function selectFake(){var _this=this;var isRTL=document.documentElement.getAttribute('dir')=='rtl';this.removeFake();this.fakeHandlerCallback=function(){return _this.removeFake();};this.fakeHandler=document.body.addEventListener('click',this.fakeHandlerCallback)||true;this.fakeElem=document.createElement('textarea');this.fakeElem.style.fontSize='12pt';this.fakeElem.style.border='0';this.fakeElem.style.padding='0';this.fakeElem.style.margin='0';this.fakeElem.style.position='absolute';this.fakeElem.style[isRTL?'right':'left']='-9999px';this.fakeElem.style.top=(window.pageYOffset||document.documentElement.scrollTop)+'px';this.fakeElem.setAttribute('readonly','');this.fakeElem.value=this.text;document.body.appendChild(this.fakeElem);this.selectedText=(0,_select2['default'])(this.fakeElem);this.copyText();};ClipboardAction.prototype.removeFake=function removeFake(){if(this.fakeHandler){document.body.removeEventListener('click',this.fakeHandlerCallback);this.fakeHandler=null;this.fakeHandlerCallback=null;}
if(this.fakeElem){document.body.removeChild(this.fakeElem);this.fakeElem=null;}};ClipboardAction.prototype.selectTarget=function selectTarget(){this.selectedText=(0,_select2['default'])(this.target);this.copyText();};ClipboardAction.prototype.copyText=function copyText(){var succeeded=undefined;try{succeeded=document.execCommand(this.action);}catch(err){succeeded=false;}
this.handleResult(succeeded);};ClipboardAction.prototype.handleResult=function handleResult(succeeded){if(succeeded){this.emitter.emit('success',{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)});}else{this.emitter.emit('error',{action:this.action,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)});}};ClipboardAction.prototype.clearSelection=function clearSelection(){if(this.target){this.target.blur();}
window.getSelection().removeAllRanges();};ClipboardAction.prototype.destroy=function destroy(){this.removeFake();};_createClass(ClipboardAction,[{key:'action',set:function set(){var action=arguments.length<=0||arguments[0]===undefined?'copy':arguments[0];this._action=action;if(this._action!=='copy'&&this._action!=='cut'){throw new Error('Invalid "action" value, use either "copy" or "cut"');}},get:function get(){return this._action;}},{key:'target',set:function set(target){if(target!==undefined){if(target&&(typeof target==='undefined'?'undefined':_typeof(target))==='object'&&target.nodeType===1){if(this.action==='copy'&&target.hasAttribute('disabled')){throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');}
if(this.action==='cut'&&(target.hasAttribute('readonly')||target.hasAttribute('disabled'))){throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');}
this._target=target;}else{throw new Error('Invalid "target" value, use a valid Element');}}},get:function get(){return this._target;}}]);return ClipboardAction;}();module.exports=ClipboardAction;});},{"select":6}],9:[function(require,module,exports){(function(global,factory){if(typeof define==="function"&&define.amd){define(['module','./clipboard-action','tiny-emitter','good-listener'],factory);}else if(typeof exports!=="undefined"){factory(module,require('./clipboard-action'),require('tiny-emitter'),require('good-listener'));}else{var mod={exports:{}};factory(mod,global.clipboardAction,global.tinyEmitter,global.goodListener);global.clipboard=mod.exports;}})(this,function(module,_clipboardAction,_tinyEmitter,_goodListener){'use strict';var _clipboardAction2=_interopRequireDefault(_clipboardAction);var _tinyEmitter2=_interopRequireDefault(_tinyEmitter);var _goodListener2=_interopRequireDefault(_goodListener);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}
function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}
function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}
return call&&(typeof call==="object"||typeof call==="function")?call:self;}
function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}
subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}
var Clipboard=function(_Emitter){_inherits(Clipboard,_Emitter);function Clipboard(trigger,options){_classCallCheck(this,Clipboard);var _this=_possibleConstructorReturn(this,_Emitter.call(this));_this.resolveOptions(options);_this.listenClick(trigger);return _this;}
Clipboard.prototype.resolveOptions=function resolveOptions(){var options=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];this.action=typeof options.action==='function'?options.action:this.defaultAction;this.target=typeof options.target==='function'?options.target:this.defaultTarget;this.text=typeof options.text==='function'?options.text:this.defaultText;};Clipboard.prototype.listenClick=function listenClick(trigger){var _this2=this;this.listener=(0,_goodListener2['default'])(trigger,'click',function(e){return _this2.onClick(e);});};Clipboard.prototype.onClick=function onClick(e){var trigger=e.delegateTarget||e.currentTarget;if(this.clipboardAction){this.clipboardAction=null;}
this.clipboardAction=new _clipboardAction2['default']({action:this.action(trigger),target:this.target(trigger),text:this.text(trigger),trigger:trigger,emitter:this});};Clipboard.prototype.defaultAction=function defaultAction(trigger){return getAttributeValue('action',trigger);};Clipboard.prototype.defaultTarget=function defaultTarget(trigger){var selector=getAttributeValue('target',trigger);if(selector){return document.querySelector(selector);}};Clipboard.prototype.defaultText=function defaultText(trigger){return getAttributeValue('text',trigger);};Clipboard.prototype.destroy=function destroy(){this.listener.destroy();if(this.clipboardAction){this.clipboardAction.destroy();this.clipboardAction=null;}};return Clipboard;}(_tinyEmitter2['default']);function getAttributeValue(suffix,element){var attribute='data-clipboard-'+suffix;if(!element.hasAttribute(attribute)){return;}
return element.getAttribute(attribute);}
module.exports=Clipboard;});},{"./clipboard-action":8,"good-listener":4,"tiny-emitter":7}]},{},[9])(9)});;function showTooltip(elem,msg){elem.setAttribute('class','btn-clipboard tooltipped tooltipped-s');elem.setAttribute('aria-label',msg);}
function fallbackMessage(action){var actionMsg='';var actionKey=(action==='cut'?'X':'C');if(/iPhone|iPad/i.test(navigator.userAgent)){actionMsg='No support :(';}
else if(/Mac/i.test(navigator.userAgent)){actionMsg='Press ⌘-'+actionKey+' to '+action;}
else{actionMsg='Press Ctrl-'+actionKey+' to '+action;}
return actionMsg;};$(function(){var info_float=$('.info-float');if(info_float.length){var container=$('#content-right');if(window.bad_browser){container.css('float','right');}else if(!featureTest('position','sticky')){fix_div(info_float,55);$(window).resize(function(){info_float.width(container.width());});info_float.width(container.width());}}
var copyButton;$('pre code').each(function(){$(this).parent().before($('<div>',{'class':'copy-clipboard'}).append(copyButton=$('<span>',{'class':'btn-clipboard','data-clipboard-text':$(this).text(),'title':'Click to copy'}).text('Copy')));$(copyButton.get(0)).mouseleave(function(){$(this).attr('class','btn-clipboard');$(this).removeAttr('aria-label');});var curClipboard=new Clipboard(copyButton.get(0));curClipboard.on('success',function(e){e.clearSelection();showTooltip(e.trigger,'Copied!');});curClipboard.on('error',function(e){showTooltip(e.trigger,fallbackMessage(e.action));});});});