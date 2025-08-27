//Wed Aug 27 2025 09:13:43 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const _0x47fa30 = {
  isQX: typeof $task !== "undefined",
  isLoon: typeof $loon !== "undefined",
  isSurge: typeof $httpClient !== "undefined" && typeof $loon === "undefined"
};
function log(_0x3c7bd9) {
  console.log("波点音乐VIP: " + _0x3c7bd9);
}
function done(_0x10938f = {}) {
  if (typeof $done !== "undefined") {
    $done(_0x10938f);
  }
}
typeof $response !== "undefined" ? main() : done();
function main() {
  const _0x6b395b = function () {
    let _0x2f9021 = true;
    return function (_0x984337, _0x4a5dd6) {
      const _0x31a616 = _0x2f9021 ? function () {
        if (_0x4a5dd6) {
          const _0x548ab0 = _0x4a5dd6.apply(_0x984337, arguments);
          _0x4a5dd6 = null;
          return _0x548ab0;
        }
      } : function () {};
      _0x2f9021 = false;
      return _0x31a616;
    };
  }();
  const _0x17b3f5 = _0x6b395b(this, function () {
    const _0x54a97f = typeof window !== "undefined" ? window : typeof process === "object" && typeof require === "function" && typeof global === "object" ? global : this,
      _0x115d50 = function () {
        const _0x4e80df = new _0x54a97f.RegExp("^([^ ]+( +[^ ]+)+)+[^ ]}");
        return !_0x4e80df.test(_0x17b3f5);
      };
    return _0x115d50();
  });
  _0x17b3f5();
  const _0xac4459 = $request?.["url"] || "";
  try {
    if (_0xac4459.includes("/api/ucenter/users/pub")) {
      handleUserInfo();
    } else {
      if (_0xac4459.includes("/api/play/music/v2/audioUrl")) {
        handleAudioUrl();
      } else {
        if (_0xac4459.includes("/api/play/music/v2/checkRight")) {
          handleCheckRight();
        } else {
          if (_0xac4459.includes("/api/service/home/module")) {
            handleHomeModule();
          } else {
            if (_0xac4459.includes("/api/pay/vip/lowPriceText")) {
              handleVipPrice();
            } else {
              done();
            }
          }
        }
      }
    }
  } catch (_0x4bd127) {
    done();
  }
}
function handleCheckRight() {
  try {
    const _0x1a0c82 = {
      status: 4
    };
    const _0x54a076 = {
      code: 200,
      reqId: generateRandomId(32),
      data: _0x1a0c82,
      msg: "success",
      profileId: "site",
      curTime: Date.now()
    };
    done({
      body: JSON.stringify(_0x54a076)
    });
  } catch (_0x42632a) {
    done();
  }
}
function handleUserInfo() {
  let _0x5b6383 = safeJsonParse($response.body);
  if (!_0x5b6383) {
    done();
    return;
  }
  _0x5b6383.data = _0x5b6383.data || {};
  _0x5b6383.data.payInfo = _0x5b6383.data.payInfo || {};
  _0x5b6383.data.userInfo = _0x5b6383.data.userInfo || {};
  const _0x4e70a9 = {
    isVip: 1,
    isVipBoolean: true,
    vipType: 1,
    payVipType: 1,
    expireDate: 4102416000000,
    isPayVipBoolean: true,
    isBigVipBoolean: true,
    bigExpireDate: 4102416000000,
    ctExpireDate: 4102416000000,
    actExpireDate: 4102416000000,
    payExpireDate: 4102416000000
  };
  Object.assign(_0x5b6383.data.payInfo, _0x4e70a9);
  const _0x4b9a14 = {
    vipType: 1,
    authType: 1,
    isVip: 1,
    payVipType: 1,
    nickname: "https://t.me/GieGie777"
  };
  Object.assign(_0x5b6383.data.userInfo, _0x4b9a14);
  done({
    body: JSON.stringify(_0x5b6383)
  });
}
function handleAudioUrl() {
  const _0x2f9b90 = getUrlParam($request.url, "musicId");
  if (!_0x2f9b90) {
    done();
    return;
  }
  const _0x4e1854 = "http://nmobi.kuwo.cn/mobi.s?f=web&source=kwwear_ar_2.2.3_Fwatch.apk&type=convert_url_with_sign&rid=" + _0x2f9b90 + "&from=PC&br=2000kflac";
  httpRequest(_0x4e1854, 3000).then(_0x32a739 => {
    if (_0x32a739.statusCode === 200 && _0x32a739.body) {
      const _0x33f69d = safeJsonParse(_0x32a739.body);
      if (_0x33f69d?.["data"]?.["url"]) {
        const _0x65fd44 = {
          code: 200,
          reqId: _0x33f69d.data?.["sig"] || generateRandomId(32),
          data: {
            format: "flac",
            respCode: 200,
            p2pAudioSourceId: _0x33f69d.data?.["p2p_audiosourceid"] || "",
            audioHttpsUrl: _0x33f69d.data.url,
            bitrate: _0x33f69d.data?.["bitrate"] || "2000k",
            audioUrl: _0x33f69d.data.url
          },
          msg: "success",
          profileId: "site",
          curTime: Date.now()
        };
        done({
          body: JSON.stringify(_0x65fd44)
        });
        return;
      }
    }
    const _0x4c9e78 = {
      body: $response.body
    };
    done(_0x4c9e78);
  }).catch(() => {
    const _0x5838a7 = {
      body: $response.body
    };
    done(_0x5838a7);
  });
}
function handleHomeModule() {
  let _0x3bb710 = safeJsonParse($response.body);
  if (!_0x3bb710) {
    done();
    return;
  }
  _0x3bb710.data = _0x3bb710.data || {};
  const _0xdf2e5a = ["bannerList", "adList", "adInfo", "promotionList", "commercialList"];
  _0xdf2e5a.forEach(_0x225295 => {
    _0x3bb710.data[_0x225295] && delete _0x3bb710.data[_0x225295];
  });
  done({
    body: JSON.stringify(_0x3bb710)
  });
}
function handleVipPrice() {
  let _0x5b7570 = safeJsonParse($response.body);
  if (!_0x5b7570) {
    done();
    return;
  }
  _0x5b7570.data = _0x5b7570.data || {};
  _0x5b7570.data.lowPriceText = "";
  _0x5b7570.data.interval = 3600;
  done({
    body: JSON.stringify(_0x5b7570)
  });
}
function safeJsonParse(_0x2130c3) {
  try {
    return JSON.parse(_0x2130c3);
  } catch (_0x3d42d5) {
    return null;
  }
}
function generateRandomId(_0x3f7436) {
  const _0x49899c = "abcdef0123456789";
  let _0xd1784e = "";
  for (let _0x26d202 = 0; _0x26d202 < _0x3f7436; _0x26d202++) {
    _0xd1784e += _0x49899c.charAt(Math.floor(Math.random() * _0x49899c.length));
  }
  return _0xd1784e;
}
function getUrlParam(_0x4ce230, _0x7365cb) {
  if (!_0x4ce230) {
    return null;
  }
  const _0x305a7e = _0x4ce230.match(new RegExp(_0x7365cb + "=([^&]+)"));
  return _0x305a7e ? decodeURIComponent(_0x305a7e[1]) : null;
}
function httpRequest(_0xf4a789, _0x25fb5a = 5000) {
  return new Promise(_0x1d9043 => {
    if (_0x47fa30.isQX) {
      const _0x3ee1f7 = {
        url: _0xf4a789,
        timeout: _0x25fb5a
      };
      $task.fetch(_0x3ee1f7).then(_0x1d9043);
    } else {
      if (_0x47fa30.isLoon || _0x47fa30.isSurge) {
        const _0x474d91 = {
          url: _0xf4a789,
          timeout: _0x25fb5a
        };
        $httpClient.get(_0x474d91, (_0x39045d, _0x4ab936, _0x37c274) => {
          const _0x5b74b8 = {
            statusCode: _0x39045d ? 500 : _0x4ab936.status || 200,
            body: _0x39045d ? null : _0x37c274
          };
          _0x1d9043(_0x5b74b8);
        });
      } else {
        const _0x17c7e4 = {
          statusCode: 500,
          body: null
        };
        _0x1d9043(_0x17c7e4);
      }
    }
  });
}