'use strict';

angular
  .module('anguHttpInterceptor', [])
  .provider('anguHttpInterceptor', httpInterceptorProvider)
  .config(anguHttpInterceptorConfiguration)

function httpInterceptorProvider() {
  this.badRequest = null;
  this.unauthorized = null;
  this.paymentRequired = null;
  this.forbidden = null;
  this.notFound = null;
  this.methodNotAllowed = null;
  this.$get = httpInterceptor;
}

function httpInterceptor($q, $injector) {
  var ctx = this;
  return {
    responseError: responseError
  };

  function responseError(response) {
    switch(response.status) {
      case 400:
        ctx.badRequest && $injector.invoke(ctx.badRequest);
        break;
      case 401:
        ctx.unauthorized && $injector.invoke(ctx.unauthorized);
        break;
      case 402:
        ctx.paymentRequired && $injector.invoke(ctx.paymentRequired);
        break;
      case 403:
        ctx.forbidden && $injector.invoke(ctx.forbidden);
        break;
      case 404:
        ctx.notFound && $injector.invoke(ctx.notFound);
        break;
      case 405:
        ctx.methodNotAllowed && $injector.invoke(ctx.methodNotAllowed);
        break;
    }

    return $q.reject(response);
  }
}

function anguHttpInterceptorConfiguration($httpProvider) {
  $httpProvider.interceptors.push('anguHttpInterceptor');
}
