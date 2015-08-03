(function(angular) {
    'use strict';

    angular
        .module('ui.breadcrumb.docs', [
            'ui.breadcrumb',
            'ui.router'
        ])
        .config(BreadcrumbDocsConfig)
    ;

    function BreadcrumbDocsConfig($urlRouterProvider, $stateProvider, $translateProvider) {

        // Default language.
        $translateProvider.preferredLanguage('en_US');

        // Default to welcome page.
        $urlRouterProvider.otherwise('/ui/breadcrumb/docs/welcome');

        // Base routes.
        $stateProvider
            .state('ui', {
                url: '/ui',
                template: '<ui-view />',
                abstract: true
            })
            .state('ui.breadcrumb', {
                url: '/breadcrumb',
                template: '<ui-view />',
                abstract: true
            })
            .state('ui.breadcrumb.docs', {
                url: '/docs',
                abstract: true,
                templateUrl: 'ui-breadcrumb/docs/main.html',
                breadcrumb: {
                    label: 'ui-breadcrumb'
                }
            })
            .state('ui.breadcrumb.docs.welcome', {
                url: '/welcome',
                templateUrl: 'ui-breadcrumb/docs/welcome.html',
                breadcrumb: {
                    label: 'Welcome'
                }
            })
        ;
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.breadcrumb.docs')
        .config(configure);

    function configure($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.when(
            '/ui/breadcrumb/docs/examples',
            '/ui/breadcrumb/docs/examples/simple-breadcrumb'
        );

        $stateProvider
            .state('ui.breadcrumb.docs.examples', {
                url: '/examples',
                template: '<ui-view />',
                breadcrumb: {
                    label:'Examples'
                }
            })
        ;
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.breadcrumb.docs')
        .config(configure);

    function configure($stateProvider) {
        $stateProvider
            .state('ui.breadcrumb.docs.examples.simple_breadcrumb', {
                url: '/simple-form',
                templateUrl: 'ui-breadcrumb/docs/examples/simple-breadcrumb/template.html',
                breadcrumb: {
                    label: 'A very simple breadcrumb'
                }
            })
        ;
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.breadcrumb.docs')
        .config(configure);

    function configure($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.when(
            '/ui/breadcrumb/docs/guide',
            '/ui/breadcrumb/docs/guide/getting-started'
        );

        $stateProvider
            .state('ui.breadcrumb.docs.guide', {
                url: '/guide',
                template: '<ui-view />',
                breadcrumb: {
                    label:'Examples'
                }
            })
        ;
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form.docs')
        .config(configure);

    function configure($stateProvider) {
        $stateProvider
            .state('ui.form.docs.guide.getting_started', {
                url: '/getting-started',
                templateUrl: 'ui-form/docs/guide/getting-started/template.html',
                ncyBreadcrumb: {
                    label: 'Getting Started'
                }
            })
        ;
    }

})(angular);
