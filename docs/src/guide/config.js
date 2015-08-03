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
