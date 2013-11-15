window.JST = {};
function render(template, data) { return JST[template](data); }
window.JST["application/footer"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='Backbone Application Footer';
}
return __p;
};
window.JST["application/header"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='Backbone application header';
}
return __p;
};
window.JST["application/pagination"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class=\'pagination-navigation\'>\n    <button type=\'button\' class=\'btn page prev\' name=\'previous\'>Previous</button>\n</div>\n<div class=\'pagination-pages\'>\n    <span>page '+
((__t=( page ))==null?'':_.escape(__t))+
' of '+
((__t=( total_pages ))==null?'':_.escape(__t))+
'</span>\n</div>\n<div class=\'pagination-navigation\'>\n    <button type=\'button\' class=\'btn page next\' name=\'next\'>Next</button>\n</div>\n<br class=\'pagination-clear\'>';
}
return __p;
};
window.JST["layouts/application"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<header></header>\n<section class="'+
((__t=( obj.section_class))==null?'':_.escape(__t))+
'"></section>\n<footer></footer>';
}
return __p;
};
window.JST["listings/index"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<ul class=\'listings-list\'></ul>\n<div class=\'listings-list-pagination\'></div>';
}
return __p;
};
window.JST["listings/show"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<h3>'+
((__t=( obj.display_name() ))==null?'':_.escape(__t))+
'</h3>\n<div>'+
((__t=(  get('lease_state') ))==null?'':_.escape(__t))+
'</div>';
}
return __p;
};
window.JST["pages/about"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<h3>Kodama</h3>\n<img src="/images/kodama.jpg"src="/images/kodama.jpg"alt="kodama">\n<div>An Express framework and '+
((__t=( 'slow' !== true ? 'streaming' : '' ))==null?'':_.escape(__t))+
' API proxy for Backbone</div>\n';
}
return __p;
};
window.JST["pages/index"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div>Hello from Backbone, '+
((__t=( true === false ? 'crazyville' : 'inside the pages index jst' ))==null?'':_.escape(__t))+
'</div>\n<img src="/images/backbone.png"src="/images/backbone.png"alt="backbone">';
}
return __p;
};
window.JST["pages/trains"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<h3>Named Trains of Japan</h3>\n\n<ul class=\'trians-list\'>\n\t';
 _.each(trains, function(train) {
__p+='\n\t\t<li>\n\t\t\t<div><span>Train name:</span> '+
((__t=( train.name ))==null?'':_.escape(__t))+
'</div>\n\t\t\t<div><span>Operator:</span> '+
((__t=( train.operator ))==null?'':_.escape(__t))+
'</div>\n\t\t\t<div><span>Endpoints:</span> '+
((__t=( train.endpoints ))==null?'':_.escape(__t))+
'</div>\n\t\t</li>\n\t';
 })
__p+='\n</ul>\n\n<div class=\'kodama-background-image\'></div>\n';
}
return __p;
};
