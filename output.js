//Wed Aug 27 2025 09:47:53 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
let urlMovie = /h5\/movie\/detail/,
  urlSystem = /h5\/system\/info/,
  urlUser = /h5\/user\/info/;
const NOTIFY_LIMIT = 60000;
function formatTime(_0x38a4cf) {
  let _0x3d01e4 = new Date(_0x38a4cf),
    _0xd6f8ca = _0x20088b => _0x20088b.toString().padStart(2, "0");
  return _0x3d01e4.getFullYear() + "-" + _0xd6f8ca(_0x3d01e4.getMonth() + 1) + "-" + _0xd6f8ca(_0x3d01e4.getDate()) + " " + _0xd6f8ca(_0x3d01e4.getHours()) + ":" + _0xd6f8ca(_0x3d01e4.getMinutes()) + ":" + _0xd6f8ca(_0x3d01e4.getSeconds());
}
function logError(_0x385a2e) {
  console.log("[" + formatTime(Date.now()) + "] [错误] " + _0x385a2e);
}
function readStore(_0x5c3a2e) {
  if (typeof $prefs !== "undefined") {
    return $prefs.valueForKey(_0x5c3a2e);
  }
  if (typeof $persistentStore !== "undefined") {
    return $persistentStore.read(_0x5c3a2e);
  }
  return null;
}
function writeStore(_0x41a761, _0x309aed) {
  if (typeof $prefs !== "undefined") {
    return $prefs.setValueForKey(_0x309aed, _0x41a761);
  }
  if (typeof $persistentStore !== "undefined") {
    return $persistentStore.write(_0x309aed, _0x41a761);
  }
}
const isQX = typeof $task !== "undefined";
const isLoon = typeof $loon !== "undefined";
const isSurge = typeof $httpClient !== "undefined" && !isQX;
function httpFetch(_0x4d7908) {
  return new Promise((_0xbb128d, _0x2a7114) => {
    if (isQX) {
      $task.fetch(_0x4d7908).then(_0xbb128d).catch(_0x2a7114);
    } else {
      if (isLoon || isSurge) {
        const _0x5dce82 = {
          url: _0x4d7908.url,
          method: _0x4d7908.method,
          headers: _0x4d7908.headers,
          body: _0x4d7908.body
        };
        $httpClient.post(_0x5dce82, (_0x1c32cc, _0x5e687a, _0x5252fe) => {
          const _0x5494b6 = {
            body: _0x5252fe
          };
          if (_0x1c32cc) {
            _0x2a7114(_0x1c32cc);
          } else {
            _0xbb128d(_0x5494b6);
          }
        });
      } else {
        _0x2a7114("未知平台");
      }
    }
  });
}
function notify(_0x4112d4, _0x3845a0, _0x2b85fe, _0x512222) {
  if (isQX) {
    $notify(_0x4112d4, _0x3845a0, _0x2b85fe, _0x512222);
  } else {
    if (isLoon || isSurge) {
      $notification.post(_0x4112d4, _0x3845a0, _0x2b85fe);
    }
  }
}
function decryptAES(_0x190839) {
  return httpFetch({
    url: "https://www.ssleye.com/ssltool/aes_decrypt_hander",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "Mozilla/5.0"
    },
    body: "text=" + encodeURIComponent(_0x190839) + "&encode_flag=utf8&key=fd14f9f8e38808fa&iv=&mode=ECB&padding=pkcs7&out_mode=base64&mactag="
  }).then(_0x410f29 => JSON.parse(JSON.parse(_0x410f29.body).msg));
}
function encryptAES(_0x550ac1) {
  return httpFetch({
    url: "https://www.ssleye.com/ssltool/aes_encrypt_hander",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "Mozilla/5.0"
    },
    body: "text=" + encodeURIComponent(JSON.stringify(_0x550ac1)) + "&encode_flag=utf8&key=fd14f9f8e38808fa&iv=&mode=ECB&padding=pkcs7&out_mode=base64&mactag="
  }).then(_0x2c8548 => JSON.parse(_0x2c8548.body).msg);
}
function handleMovie(_0x3aebc5) {
  decryptAES(_0x3aebc5).then(_0xdaaaa4 => {
    let _0x1d9632 = _0xdaaaa4.data.id,
      _0x16792e = 3,
      _0x5c068f = 300;
    function _0x5479a9(_0x360b3b) {
      const _0x3c7881 = {
        video_id: _0x1d9632
      };
      httpFetch({
        url: "https://tx.xream.me/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0",
          Cookie: ""
        },
        body: JSON.stringify(_0x3c7881)
      }).then(_0x19a8b7 => {
        try {
          let _0xfb1740 = JSON.parse(_0x19a8b7.body);
          if (_0xfb1740.success && _0xfb1740.playLink) {
            let _0x488d0e = Date.now(),
              _0x2c5ea1 = readStore("notify_" + _0x1d9632),
              _0x17e778 = _0x2c5ea1 ? parseInt(_0x2c5ea1) : 0,
              _0x512ee8 = _0xfb1740.title ? _0xfb1740.title : "视频 ID: " + _0x1d9632;
            if (!_0x17e778 || _0x488d0e - _0x17e778 > NOTIFY_LIMIT) {
              writeStore("notify_" + _0x1d9632, _0x488d0e.toString());
              notify("糖心视频解锁成功 ✅", _0x512ee8, _0xfb1740.playLink, {
                "open-url": _0xfb1740.playLink
              });
            }
            _0xdaaaa4.data.play_link = _0xfb1740.playLink;
            Array.isArray(_0xdaaaa4.data.lines) && _0xdaaaa4.data.lines.forEach(_0x4afe55 => {
              _0x4afe55.link = _0xfb1740.playLink;
              if (_0x4afe55.is_vip) {
                _0x4afe55.is_vip = "n";
              }
            });
            ["play_ads", "ad", "ad_apps", "ad_videos", "ad_banner", "ad_box", "ad_spot"].forEach(_0x5d6a42 => delete _0xdaaaa4.data[_0x5d6a42]);
            _0xdaaaa4.data.has_buy = "y";
            _0xdaaaa4.data.pay_type = "y";
            _0xdaaaa4.data.layer_type = "y";
            _0xdaaaa4.data.money = "0";
            const _0x331d70 = {
              body: $response.body
            };
            encryptAES(_0xdaaaa4).then(_0x4e71b9 => $done({
              body: _0x4e71b9
            }), _0x3994de => $done(_0x331d70));
          } else {
            if (_0x360b3b < _0x16792e) {
              setTimeout(() => _0x5479a9(_0x360b3b + 1), _0x5c068f);
            } else {
              const _0x5df119 = {
                body: $response.body
              };
              $done(_0x5df119);
            }
          }
        } catch (_0x4afe32) {
          logError("JSON 解析失败: " + _0x4afe32);
          const _0x533957 = {
            body: $response.body
          };
          $done(_0x533957);
        }
      }, _0x5b2064 => {
        logError("请求播放链接失败: " + _0x5b2064);
        const _0x461c67 = {
          body: $response.body
        };
        $done(_0x461c67);
      });
    }
    _0x5479a9(1);
  }, _0x248e0e => {
    logError("AES 解密失败: " + _0x248e0e);
    const _0x51d9b8 = {
      body: $response.body
    };
    $done(_0x51d9b8);
  });
}
function handleSystem(_0x2887c0) {
  decryptAES(_0x2887c0).then(_0x14c13e => {
    if (_0x14c13e.data) {
      ["ad", "play_ads", "ad_apps", "ad_videos", "ad_banner", "ad_box", "ad_spot", "ads", "layer_ad", "layer_ads", "layer_app", "bottom_ad", "bottom_ads", "post_banner"].forEach(_0x2994cb => delete _0x14c13e.data[_0x2994cb]);
    }
    const _0x2ac9ea = {
      body: $response.body
    };
    encryptAES(_0x14c13e).then(_0x24381b => $done({
      body: _0x24381b
    }), _0xb7ed4c => $done(_0x2ac9ea));
  }, _0x4ba7e8 => {
    logError("AES 解密失败: " + _0x4ba7e8);
    const _0x4c4505 = {
      body: $response.body
    };
    $done(_0x4c4505);
  });
}
function handleUser(_0x3d6fc0) {
  const _0x33b778 = function () {
      let _0x4d4dab = true;
      return function (_0x4247ee, _0x3af9ae) {
        const _0x4ca5e7 = _0x4d4dab ? function () {
          if (_0x3af9ae) {
            const _0x4575b7 = _0x3af9ae.apply(_0x4247ee, arguments);
            _0x3af9ae = null;
            return _0x4575b7;
          }
        } : function () {};
        _0x4d4dab = false;
        return _0x4ca5e7;
      };
    }(),
    _0xc2a290 = _0x33b778(this, function () {
      const _0x2f9fa6 = typeof window !== "undefined" ? window : typeof process === "object" && typeof require === "function" && typeof global === "object" ? global : this,
        _0x2b67d7 = function () {
          const _0x436934 = new _0x2f9fa6.RegExp("^([^ ]+( +[^ ]+)+)+[^ ]}");
          return !_0x436934.test(_0xc2a290);
        };
      return _0x2b67d7();
    });
  _0xc2a290();
  decryptAES(_0x3d6fc0).then(_0x3d8761 => {
    if (_0x3d8761.data) {
      _0x3d8761.data.is_vip = "y";
      _0x3d8761.data.is_dark_vip = "y";
      _0x3d8761.data.balance = "6666";
      _0x3d8761.data.balance_income = "8888";
      _0x3d8761.data.group_end_time = "2999-09-09到期";
      _0x3d8761.data.nickname = "https://t.me/GieGie777";
      _0x3d8761.data.headico = "https://zhongdu.oss-cn-beijing.aliyuncs.com/app/20250723/17532551159065978.jpg";
    }
    const _0x25c849 = {
      body: $response.body
    };
    encryptAES(_0x3d8761).then(_0x3a6b19 => $done({
      body: _0x3a6b19
    }), _0x245bfc => $done(_0x25c849));
  }, _0x45fc01 => {
    logError("AES 解密失败: " + _0x45fc01);
    const _0x30c88a = {
      body: $response.body
    };
    $done(_0x30c88a);
  });
}
if (urlMovie.test($request.url)) {
  handleMovie($response.body);
} else {
  if (urlSystem.test($request.url)) {
    handleSystem($response.body);
  } else {
    if (urlUser.test($request.url)) {
      handleUser($response.body);
    } else {
      const _0x1f28b5 = {
        body: $response.body
      };
      $done(_0x1f28b5);
    }
  }
}