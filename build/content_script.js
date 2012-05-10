(function() {
  var CompromiseContent, app;
  CompromiseContent = (function() {
    function CompromiseContent() {}
    CompromiseContent.prototype.start = function() {
      var booImageLink, booTextLink;
      chrome.extension.sendRequest({
        method: "getCompromisedTextAds"
      }, function(response) {
        var compromised_text_ads;
        compromised_text_ads = response.ads;
        if (compromised_text_ads != null) {
          return $.each(compromised_text_ads, function(key, value) {
            return $("span:contains('" + key + "')").closest("li").hide();
          });
        }
      });
      chrome.extension.sendRequest({
        method: "getCompromisedImageAds"
      }, function(response) {
        var compromised_image_ads;
        compromised_image_ads = response.ads;
        if (compromised_image_ads != null) {
          return $.each(compromised_image_ads, function(key, value) {
            return $("img[src='" + key + "']").closest("#google_image_div").hide();
          });
        }
      });
      booTextLink = $("<div class='adu'><a href='#'>curtains</a></div>");
      booTextLink.on("click", function() {
        var link_id;
        link_id = $(this).parent("td").children("div:eq(1)").children("span").text();
        chrome.extension.sendRequest({
          method: "addCompromisedTextAd",
          ad_id: link_id
        });
        return $(this).closest("li").slideUp('fast');
      });
      booImageLink = $("<div style='padding: 2px; font-size: 12px; position: absolute; top: 0px; visibility: visible; left: 0px;background-color:rgba(255,255,255,0.7);'><a href='#'>curtains</a></div>");
      booImageLink.on("click", function() {
        var link_id;
        link_id = $(this).parent("div").children("img").attr("src");
        chrome.extension.sendRequest({
          method: "addCompromisedImageAd",
          ad_id: link_id
        });
        return $(this).closest("#google_image_div").slideUp('fast');
      });
      $("#ads ul li div table tbody tr td").append(booTextLink);
      return $("#google_image_div").prepend(booImageLink);
    };
    return CompromiseContent;
  })();
  app = new CompromiseContent();
  app.start();
}).call(this);
