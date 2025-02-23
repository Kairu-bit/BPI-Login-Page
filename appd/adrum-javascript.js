window['adrum-start-time'] = new Date().getTime();
(function(config){
	config.appKey = 'SY-AAB-RXC';
	config.adrumExtUrlHttp = "http://online.bpi.com.ph/appd/adrum";
    config.adrumExtUrlHttps = "https://online.bpi.com.ph/appd/adrum";
    config.beaconUrlHttp = "http://syd-col.eum-appdynamics.com";
    config.beaconUrlHttps = "https://syd-col.eum-appdynamics.com";
    config.geoResolverUrlHttp = "http://eum.bpi.com.ph/geo";
    config.geoResolverUrlHttps = "https://eum.bpi.com.ph/geo";
	config.xhr = {"maxPerPageView":10000};
	config.useHTTPSAlways = true;
	config.xd = {enable : true};
	config.spa = {"spa2":true};
	config.channel = {bufferMode: false };
    /*config.page = {"captureTitle":false};*/
})(window['adrum-config'] || (window['adrum-config'] = {}));
document.write(unescape('%3Cscript')
+ " src='https://online.bpi.com.ph/appd/adrum/adrum.js' "
+ " type='text/javascript' charset='UTF-8'"
+ unescape('%3E%3C/script%3E'));