/**
 * Created by yang on 2016/12/25.
 */

remStyle();

window.onresize = remStyle;
function remStyle() {
  var docEl = document.documentElement,
    dpr = 1,
    scale = 1 / dpr;
  var metaEl = document.createElement('meta');
  metaEl.name = "viewport";
  metaEl.content = 'initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale;
  docEl.firstElementChild.appendChild(metaEl);
  var recalc = function () {
    var deviceWidth = docEl.clientWidth ? docEl.clientWidth : window.screen.width;
    if (deviceWidth > 640) deviceWidth = 640;
    docEl.style.fontSize = deviceWidth / 7.5 + 'px';
    window.rem=deviceWidth / 7.5;
  };
  recalc();
}

window.getUserInfoan = function (userInfo) {
  window.localStorage.setItem('userInfo', typeof userInfo == 'string'? userInfo: JSON.stringify(userInfo));

};

HTMLElement.prototype.getElementTop=function(){
  var top = this.offsetTop;
  var cur = this.offsetParent;
  while(cur != null){
    top += cur.offsetTop;
    cur = cur.offsetParent;
  }
  return top;
};

function m$y(obool,newMaskClassName) {
  this.documentTitle = function (val) {

    var $iframe = document.createElement('iframe');

    $iframe.src = '/static/1.html?' + (new Date()).getTime();
    $iframe.style.display='none';
    document.title = val
    window.document.body.appendChild($iframe);
    $iframe.onload = function () {
      window.document.title = val;
      setTimeout(function () {
        window.document.title = val;
        $iframe.onload = null;
        window.document.body.removeChild($iframe);
      }, 1);
    };
  };
}
window.m$=new m$y();

