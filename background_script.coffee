
class CompromiseBackground
  
  constructor: () ->
    
  start: ->
    chrome.extension.onRequest.addListener (request, sender, sendResponse) =>
      
      switch request.method 
        when "getLocalStorage"
          sendResponse({value: localStorage[request.key]})
        when "setLocalStorage"
          localStorage[request.key] = request.value
        when "addCompromisedTextAd"
          @compromiseAd "compromised_text_ads", request.ad_id
        when "addCompromisedImageAd"
          @compromiseAd "compromised_image_ads", request.ad_id
        when "getCompromisedTextAds"
          sendResponse( {ads: @getAdsContainer("compromised_text_ads")} )
        else
          sendResponse([])  

    
  getAdsContainer: (key) ->
    container_json = localStorage[key]
    ads_container = null
    
    if !container_json? 
      ads_container = new Object()      
    else
      ads_container = JSON.parse(container_json)
    
    return ads_container
    
  setAdsContainer: (key, value) ->
    localStorage[key] = JSON.stringify value
    
  compromiseAd: (kind, ad_id) ->
    ads = @getAdsContainer(kind)
    ads[ad_id] = "hidden"
    @setAdsContainer(kind, ads)

app = new CompromiseBackground()
app.start()
