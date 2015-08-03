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
