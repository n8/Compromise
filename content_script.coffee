
class CompromiseContent
  
  constructor: () ->
    
  start: ->
    
    chrome.extension.sendRequest({method: "getCompromisedTextAds"}, (response) ->
      compromised_text_ads = response.ads      
      
      if compromised_text_ads?      
        $.each compromised_text_ads, (key, value) ->
          $("span:contains('#{key}')").closest("li").hide()
    )
    
    chrome.extension.sendRequest({method: "getCompromisedImageAds"}, (response) ->
      compromised_image_ads = response.ads      
      
      if compromised_image_ads?  
        $.each compromised_image_ads, (key, value) ->
          $("img[src='#{key}']").closest("#google_image_div").hide()
    )
    
  
    booTextLink = $("<div class='adu'><a href='#'>curtains</a></div>")
    booTextLink.on("click", ->

      link_id = $(this).parent("td").children("div:eq(1)").children("span").text()
      
      chrome.extension.sendRequest({method: "addCompromisedTextAd", ad_id: link_id})
    
      $(this).closest("li").slideUp('fast')
    )
    
      
    booImageLink = $("<div style='color: #ccc; padding: 2px; font-size: 12px; position: absolute; top: 0px; visibility: visible; left: 0px;background-color:rgba(255,255,255,0.7);'><a href='#'>curtains</a></div>")
    booImageLink.on("click", ->
      link_id = $(this).parent("div").children("img").attr("src")
      chrome.extension.sendRequest({method: "addCompromisedImageAd", ad_id: link_id})
      $(this).closest("#google_image_div").slideUp('fast')
    )
      
    $("#ads ul li div table tbody tr td").append booTextLink  
      
    $("#google_image_div").prepend booImageLink
      
app = new CompromiseContent()
app.start()
