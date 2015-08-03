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
