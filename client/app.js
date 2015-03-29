'use strict';

angular
  .module('anguInterceptorDemo', ['anguHttpInterceptor'])
  .controller('MainCtrl', MainCtrl)
  .config(myConf)
  .factory('api', api);


function MainCtrl(api) {
  var vm = this;

  vm.call = call;

  function call(code) {
    api
      .call(code)
      .then(sucess)
      .catch(error);

    function sucess(response) {
      console.log('success', response);
    }

    function error(response) {
      console.log('error', response);
    }
  }
}

function api($http) {
  return {
    call: call
  };

  function call(code) {
    return $http.get('/api/' + code);
  }
}

function myConf(anguHttpInterceptorProvider) {
  //Handling 4xx resquests codes
  anguHttpInterceptorProvider.badRequest = alertInterceptor(400);
  anguHttpInterceptorProvider.unauthorized = alertInterceptor(401);
  anguHttpInterceptorProvider.paymentRequired = alertInterceptor(402);
  anguHttpInterceptorProvider.forbidden = alertInterceptor(403);
  anguHttpInterceptorProvider.notFound = alertInterceptor(404);
  anguHttpInterceptorProvider.methodNotAllowed = alertInterceptor(405);

  //Handling 5xx resquests codes
  anguHttpInterceptorProvider.internalServerError = alertInterceptor(500);
  anguHttpInterceptorProvider.notImplemented = alertInterceptor(501);
  anguHttpInterceptorProvider.badGatewayProxyError = alertInterceptor(502);
  anguHttpInterceptorProvider.serviceUnavailable = alertInterceptor(503);
  anguHttpInterceptorProvider.gatewayTimeout = alertInterceptor(504);
  anguHttpInterceptorProvider.httpVersionNotSupported = alertInterceptor(505);

  function alertInterceptor(code) {
    return function() {
      alert('Alert raised by interceptor for code ' + code);
    }
  };
}
