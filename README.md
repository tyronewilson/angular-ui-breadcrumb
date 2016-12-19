# AngularJS Breadcrumb
Automatic breadcrumb generation based on ui-router.

## Installation
Using bower:
```sh
bower install ui-breadcrumb --save
```

Using npm:
```sh
npm install ui-breadcrumb --save
```

Require the module in your angular module
```javascript
    angular.module('myApp', ['ui.breadcrumb]);
```

## Usage
Currently ui-breadcrumb provides a simple directive to render the breadcrumb.

```html
<ui-breadcrumb></ui-breadcrumb>
```

## Examples

### Config
Here is a list of general configuration for ui-breadcrumb.
```js
angular.module('app').config(function ($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
    
        // Should it include abstract states as well?
        includeAbstract: false,
        
        // A custom template url. By default we're using bootstrap3.
        templateUrl: 'ui-breadcrumb/template/bootstrap3.html'
        
    });
});
```

### Breadcrumbs
Below is full ui-breadcrumb API's examples.
```js
angular.module('app.part').config(function ($breadcrumbProvider) {
    $stateProvider
        .state('app', { 
            url: '',
            abstract: true,
            // ...
            breadcrumb: {
                label: 'My App',    // You can pass a simple string as label.
                force: true         // If you have "includeAbstract: false" you can still force some states.
            }
        })
        .state('app.contact', { 
            url: '/list',
            // ...
            breadcrumb: {
                skip: true         // You can skip a specific state as well.
            }
        })
        .state('app.contact.list', {
            url: '/list',
            // ...
            breadcrumb: {
                label: 'Contacts',
                stateOptions: {
                    reload: true    // You can pass stateOptions to use in ui-sref-opts.
                                    // Visit: http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$state
                                    //      and take a look at go() method "options" for all possible options.
                }
            }
        })
        .state('app.contact.person', {
            url: '/:personId',
            // ...
            breadcrumb: {
                // You can also pass an injectable function (or annotated-array like angular services)
                label: function ($stateParams, personsApi) {
                    return personsApi.get($stateParams.personId).then(function (person) {
                        return person.fullName;
                    });
                },
                parent: 'app.contact.list' // You can explicitly set a parent. An injectable function is allowed here too ;)
            }
        })
    ;
});
```

# Contributing
First, you need to install `node` and `npm`.
```sh
npm install
npm install -g bower grunt-cli
bower install
```
Now you can visit `examples/index.html` for some examples.

## Build
You can build using command below:
```sh
grunt build
```

# Checklist
- [x] Library core
- [ ] Write unit tests
- [ ] Write e2e-tests
- [ ] Write an API doc
- [ ] Provide complete examples
- [ ] A directive to add breadcrumb in page's &lt;title&gt;.
- [ ] Add only-last/except-last options to ui-breadcrumb directive. (Is it a good idea?)

# License
[MIT License](LICENSE)
