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
