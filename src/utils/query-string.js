export const getQueryVal = function(queryString, variable) {
  var vars = queryString.replace(/^\?/, '').split('&');
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == variable) {
          return decodeURIComponent(pair[1]);
      }
  }
  return false;
}

export const updateQueryString = function(search, paramsObj={}) {
	var obj = search ? JSON
		.parse('{"' + search.replace(/^\?+/, '').replace(/&/g, '","')
		.replace(/=/g,'":"') + '"}', function(key, value) {
			return key === "" ? value : decodeURIComponent(value)
		}) : paramsObj;
	obj = Object.assign(obj, paramsObj);
	var urlString = '';
	Object.keys(obj).forEach((key, i) => {
		if (obj[key]) {
			urlString += key + '=' + obj[key]
			if ((i !== Object.keys(obj).length - 1) &&
					(!!obj[Object.keys(obj)[i + 1]])) {
				urlString += '&';
			}
		}
	});
	return urlString;
}
