function init() {
  'use strict';
  angular
    .module('anguHttpInterceptor', [])
    .provider('anguHttpInterceptor', httpInterceptorProvider)
    .config(anguHttpInterceptorConfiguration)

  function httpInterceptorProvider() {

    // 4xx error codes
    this.badRequest = null;
    this.unauthorized = null;
    this.paymentRequired = null;
    this.forbidden = null;
    this.notFound = null;
    this.methodNotAllowed = null;

    // 5xx error codes
    this.internalServerError = null;
    this.notImplemented = null;
    this.badGatewayProxyError = null;
    this.serviceUnavailable = null;
    this.gatewayTimeout = null;
    this.httpVersionNotSupported = null;

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
        case 500:
          ctx.internalServerError && $injector.invoke(ctx.internalServerError);
          break;
        case 501:
          ctx.notImplemented && $injector.invoke(ctx.notImplemented);
          break;
        case 502:
          ctx.badGatewayProxyError && $injector.invoke(ctx.badGatewayProxyError);
          break;
        case 503:
          ctx.serviceUnavailable && $injector.invoke(ctx.serviceUnavailable);
          break;
        case 504:
          ctx.gatewayTimeout && $injector.invoke(ctx.gatewayTimeout);
          break;
        case 505:
          ctx.httpVersionNotSupported && $injector.invoke(ctx.httpVersionNotSupported);
          break;
      }

      return $q.reject(response);
    }
  }

  function anguHttpInterceptorConfiguration($httpProvider) {
    $httpProvider.interceptors.push('anguHttpInterceptor');
  }
}
init();
