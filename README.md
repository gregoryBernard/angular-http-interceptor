# angular-http-interceptor

Simple example showing how to intercept http requests with angularJS

## install with bower

```sh
bower install agu-http-error-intercept --save
```

. add to your index file
```html
<script src="bower_components/agu-http-error-intercept/dist/angu-http-interceptor.js"></script>
```

## Interceptor itself

Here's our [interceptor](https://github.com/gregoryRednet/angular-http-interceptor/blob/master/client/angu-http-interceptor.js) file. It only set behaviour for errorResponses of $httpProvider. 

This repo contains a Node backend send different errors and a small angular app which handle http errors.

To use the interceptor you juste need to affect a function to the desired error :

```javascript
angular
  .module('app', ['anguHttpInterceptor'])
  .config(function(anguHttpInterceptorProvider) {
    anguHttpInterceptorProvider.unauthorized = function($location) {
      //Here is your error handling code
      //example
      $location.path('/login');
    };
  });
```
  
## API : List of implemented functionnality

|Function | Http Code |
|---|---|
|badRequest   |400   |
|unauthorized   |401   |
|paymentRequired   |402   |
|forbidden   |403   |
|notFound   |404   |
|methodNotAllowed   |405   |
|internalServerError   |500   |
|notImplemented   |501   |
|badGatewayProxyError   |502   |
|serviceUnavailable   |503   |
|gatewayTimeout   |504   |
|httpVersionNotSupported   |505   |

## Dependency injection
You could inject $location as in the previous example. Here is how dependencies are injected :
```javascript
$injector.invoke(yourFunction)
```

Be careful while using this functionnality because your function are instanciated while angular set up providers. This means that most of dependencies (angular or not) are not ready.
