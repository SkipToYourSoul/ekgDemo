/**
 * 
 */
function getUrlParams() {
	var url = String(window.document.location.href);
	var params = {};
	var count = 0;
	url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) {
		params[key] = value;
		count = count + 1;
	});
	params['length'] = count;
	return params;
}

var params = getUrlParams();
//var eventId = 1;
var redirect = true;
if (params.length == 0 || params.hasOwnProperty('k') == false) {
	// if (location.href.indexOf('index.html') < 0
	// && location.href.indexOf('html') >= 0) {
	if (redirect) {
		alert('参数出错');
		location.href = "index.html";
	}
}