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