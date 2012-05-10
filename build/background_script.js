(function() {
  var CompromiseBackground, app;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  CompromiseBackground = (function() {
    function CompromiseBackground() {}
    CompromiseBackground.prototype.start = function() {
      return chrome.extension.onRequest.addListener(__bind(function(request, sender, sendResponse) {
        switch (request.method) {
          case "getLocalStorage":
            return sendResponse({
              value: localStorage[request.key]
            });
          case "setLocalStorage":
            return localStorage[request.key] = request.value;
          case "addCompromisedTextAd":
            return this.compromiseAd("compromised_text_ads", request.ad_id);
          case "addCompromisedImageAd":
            return this.compromiseAd("compromised_image_ads", request.ad_id);
          case "getCompromisedTextAds":
            return sendResponse({
              ads: this.getAdsContainer("compromised_text_ads")
            });
          default:
            return sendResponse([]);
        }
      }, this));
    };
    CompromiseBackground.prototype.getAdsContainer = function(key) {
      var ads_container, container_json;
      container_json = localStorage[key];
      ads_container = null;
      if (!(container_json != null)) {
        ads_container = new Object();
      } else {
        ads_container = JSON.parse(container_json);
      }
      return ads_container;
    };
    CompromiseBackground.prototype.setAdsContainer = function(key, value) {
      return localStorage[key] = JSON.stringify(value);
    };
    CompromiseBackground.prototype.compromiseAd = function(kind, ad_id) {
      var ads;
      ads = this.getAdsContainer(kind);
      ads[ad_id] = "hidden";
      return this.setAdsContainer(kind, ads);
    };
    return CompromiseBackground;
  })();
  app = new CompromiseBackground();
  app.start();
}).call(this);
