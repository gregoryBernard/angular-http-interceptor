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

function myConf($httpProvider, anguHttpInterceptorProvider) {
  anguHttpInterceptorProvider.badRequest = alertInterceptor(400);
  anguHttpInterceptorProvider.unauthorized = alertInterceptor(401);
  anguHttpInterceptorProvider.paymentRequired = alertInterceptor(402);
  anguHttpInterceptorProvider.forbidden = alertInterceptor(403);
  anguHttpInterceptorProvider.notFound = alertInterceptor(404);
  anguHttpInterceptorProvider.methodNotAllowed = alertInterceptor(405);

  function alertInterceptor(code) {
    return function() {
      alert('Alert raised by interceptor for code ' + code);
    }
  };
}
